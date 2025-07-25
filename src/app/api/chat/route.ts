import { Configuration, OpenAIApi } from 'openai-edge';

export const runtime = "nodejs";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages,
      stream: true,
      // temperature: 0.3,
      // max_tokens: 300
    });
    return new Response(response.body, {
      headers: { 'Content-Type': 'text/event-stream' },
    });
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
