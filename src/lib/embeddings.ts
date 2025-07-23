import { OpenAIApi, Configuration } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function getEmbeddings(text: string): Promise<number[]> {
  try {
    const response = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-embedding-ada-002",
        input: text,
      }),
    });

    const result = await response.json();

    // Check for API errors
    if (!response.ok) {
      console.error("OpenAI API error:", result);
      throw new Error(result.error?.message || "OpenAI API error");
    }

    // Validate the response structure
    if (!result.data || !Array.isArray(result.data) || !result.data[0]?.embedding) {
      console.error("Unexpected OpenAI API response:", result);
      throw new Error("Invalid embedding response from OpenAI");
    }

    console.log(
      "Vectors to upsert:",
      result.data.map((d: { embedding: number[] }) => d.embedding)
    );

    if (!result.data || result.data.length === 0) {
      throw new Error("No vectors to upsert. Embedding generation may have failed.");
    }

    return result.data[0].embedding as number[];
  } catch (error) {
    console.log("error calling openai embeddings api", error);
    throw error;
  }
}
