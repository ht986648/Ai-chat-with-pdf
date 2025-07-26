import { Configuration, OpenAIApi } from 'openai-edge';

export const runtime = "edge"; // Use "edge" for streaming in Next.js edge runtime

const config = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY!,
});

const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await openai.createChatCompletion({
      model: 'gpt-4-turbo',
      messages,
      stream: true,
    });

    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
