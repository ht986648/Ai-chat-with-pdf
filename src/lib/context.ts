import { Pinecone } from "@pinecone-database/pinecone";
import { convertToAscii } from "./utils";
import { getEmbeddings } from "./embeddings";

export async function getMatchesFromEmbeddings(
  embeddings: number[],
  fileKey: string
) {
  try {
    console.log('🔍 getMatchesFromEmbeddings called');
    console.log('📁 Original fileKey:', fileKey);
    const asciiFileKey = convertToAscii(fileKey);
    console.log('📝 ASCII fileKey:', asciiFileKey);
    
    const client = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
    const pineconeIndex = await client.index("himanshu");
    console.log('📊 Connected to Pinecone index: himanshu');
    
    const namespace = pineconeIndex.namespace(asciiFileKey);
    console.log('📝 Using namespace:', asciiFileKey);
    
    const queryResult = await namespace.query({
      topK: 5,
      vector: embeddings,
      includeMetadata: true,
    });
    
    console.log('📄 Pinecone query result:', {
      matchCount: queryResult.matches?.length || 0,
      namespace: queryResult.namespace,
      usage: queryResult.usage
    });
    
    return queryResult.matches || [];
  } catch (error) {
    console.log("error querying embeddings", error);
    throw error;
  }
}

export async function getContext(query: string, fileKey: string) {
  console.log('🔍 getContext called with query:', query);
  console.log('📁 fileKey:', fileKey);
  
  const queryEmbeddings = await getEmbeddings(query);
  console.log('🧮 Generated embeddings, length:', queryEmbeddings.length);
  
  const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey);
  console.log('🎯 try to debug mathes:', matches);

  // Fix: Safe access for originalText
  const originalText = matches[0]?.metadata?.originalText ?? "No original text found";
  console.log(originalText);

  console.log('🎯 Found matches:', matches.length);
  console.log('📊 Match scores:', matches.map(m => m.score));

  // Temporarily lower threshold to see if any matches exist
  const qualifyingDocs = matches.filter(
    (match) => match.score && match.score > 0.3
  );
  console.log('✅ Qualifying docs (score > 0.3):', qualifyingDocs.length);
  console.log('📋 All match details:', matches.map(m => ({ score: m.score, id: m.id, hasMetadata: !!m.metadata })));

  type Metadata = {
    text: string;
    pageNumber: number;
  };

  const docs = qualifyingDocs.map((match) => (match.metadata as Metadata).text);
  const context = docs.join("\n").substring(0, 3000);
  console.log('📄 Final context length:', context.length);
  
  return context;
}
