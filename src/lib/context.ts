import { Pinecone } from "@pinecone-database/pinecone";
import { convertToAscii } from "./utils";
import { getEmbeddings } from "./embeddings";

/**
 * Queries Pinecone with the given embeddings and returns the top matching documents.
 */
export async function getMatchesFromEmbeddings(
  embeddings: number[],
  fileKey: string
) {
  try {
    console.log("🔍 getMatchesFromEmbeddings called");
    console.log("📁 Original fileKey:", fileKey);

    const asciiFileKey = convertToAscii(fileKey);
    console.log("📝 ASCII fileKey:", asciiFileKey);

    const client = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });

    const pineconeIndex = await client.index(process.env.PINECONE_INDEX_NAME!);
    console.log("📊 Connected to Pinecone index:", process.env.PINECONE_INDEX_NAME);

    const namespace = pineconeIndex.namespace(asciiFileKey);
    console.log("📂 Using namespace:", asciiFileKey);

    const queryResult = await namespace.query({
      topK: 5,
      vector: embeddings,
      includeMetadata: true,
    });

    console.log("📄 Pinecone query result:", {
      matchCount: queryResult.matches?.length || 0,
      namespace: queryResult.namespace,
      usage: queryResult.usage,
    });

    return queryResult.matches || [];
  } catch (error) {
    console.error("❌ Error querying embeddings:", error);
    throw error;
  }
}

/**
 * Generates context from Pinecone for a given query and fileKey.
 */
export async function getContext(query: string, fileKey: string): Promise<string> {
  console.log("🔍 getContext called");
  console.log("🗣️ Query:", query);
  console.log("📁 FileKey:", fileKey);

  const queryEmbeddings = await getEmbeddings(query);
  console.log("🧠 Embeddings generated. Length:", queryEmbeddings);

  const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey);

  // Log raw matches for debug purposes
  console.log("🎯 Matches fetched:", matches.length);
  console.log("📊 Match scores:", matches.map(m => m.score));
  console.log("📋 Match details:", matches.map(m => ({
    id: m.id,
    score: m.score,
    hasMetadata: !!m.metadata,
  })));

  // Log original text of the first match for quick sanity check
  const originalText = typeof matches[0]?.metadata?.originalText === "string"
    ? matches[0]?.metadata?.originalText
    : "No original text found";
  console.log(
    "📌 First match originalText preview:",
    typeof originalText === "string" ? originalText.substring(0, 300) : originalText
  );

  // Filter high-confidence matches (lowered threshold for more variety)
  const qualifyingDocs = matches.filter(
    (match) => match.score && match.score > 0.5
  );
  console.log("✅ Qualifying docs (score > 0.5):", qualifyingDocs.length);

  type Metadata = {
    text?: string;
    originalText?: string;
    pageNumber?: number;
  };

  // Collect qualifying context text
  const docs = qualifyingDocs.map((match) => {
    const metadata = match.metadata as Metadata;
    return metadata?.text || metadata?.originalText || "";
  });
  const context = docs.join("\n").substring(0, 3000); // Keep it under model token limit

  console.log("📄 Final context length:", context.length);
  console.log("📄 Context preview:\n", context.substring(0, 500));

  return context || "No relevant context found.";
}
