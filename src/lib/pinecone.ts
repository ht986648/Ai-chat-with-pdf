import { Pinecone } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3-server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import md5 from "md5";
import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { convertToAscii } from "./utils";
import { getEmbeddings } from "./embeddings";

const PINECONE_API_KEY = process.env.PINECONE_API_KEY!;
const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME!; // e.g., "chatpdf"
const PINECONE_INDEX_HOST = process.env.PINECONE_INDEX_HOST!; // e.g., "your-index-YOUR_REGION.svc.YOUR_ENVIRONMENT.pinecone.io"

type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};

export async function loadS3IntoPinecone(fileKey: string) {
  console.log("Downloading PDF from S3...");
  const fileName = await downloadFromS3(fileKey);
  if (!fileName) {
    throw new Error("Could not download file from S3.");
  }

  console.log("Loading PDF into memory: " + fileName);
  const loader = new PDFLoader(fileName);
  const pages = (await loader.load()) as PDFPage[];

  console.log("Splitting PDF into documents...");
  const documents = await Promise.all(pages.map(prepareDocument));
  const flatDocs = documents.flat();

  // 4. Generate embeddings and build vector records
  const records = await Promise.all(flatDocs.map(async (doc) => {
    const embeddings = await getEmbeddings(doc.pageContent);
    return {
      id: md5(doc.pageContent),
      values: embeddings,
      metadata: {
        pageNumber: (doc.metadata.loc as { pageNumber: number }).pageNumber,
        originalText: String(doc.metadata.text),
        category: "document"
      }
    };
  }));

  // 5. Upload to Pinecone
  const client = new Pinecone({ apiKey: PINECONE_API_KEY });
  const index = client.index(PINECONE_INDEX_NAME, PINECONE_INDEX_HOST);
  const namespace = index.namespace(convertToAscii(fileKey));

  console.log("Inserting vectors into Pinecone", records);
  await namespace.upsert(records);

  return documents[0]; // optional: return first page for confirmation
}

export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

async function prepareDocument(page: PDFPage) {
  let { pageContent, metadata } = page;
  pageContent = pageContent.replace(/\n/g, "");

  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ]);
  return docs;
}
