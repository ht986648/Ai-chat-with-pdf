import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { getContext } from "@/lib/context";
import { db } from "@/lib/db";
import { messages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// Set up Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { chatId, messages: incomingMessages } = body;

  // Get the last message content
  const lastMessage = incomingMessages[incomingMessages.length - 1];
  if (!lastMessage?.content) {
    return NextResponse.json({ error: "No message content" }, { status: 400 });
  }

  // Save user message to database first
  await db.insert(messages).values({
    chatId,
    content: lastMessage.content,
    role: "user",
  });

  // Get context from the database for this chat
  const chatMessages = await db.select().from(messages).where(eq(messages.chatId, chatId));
  
  const prompt = chatMessages
    .map((msg: any) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
    .join("\n") + `\nUser: ${lastMessage.content}\nAssistant:`;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text = await result.response.text();

    // Save assistant message to DB (using "user" role temporarily)
    await db.insert(messages).values({
      chatId,
      content: text,
      role: "user",
    });

    return NextResponse.json({ completion: text });
  } catch (error) {
    console.error("Gemini error:", error);
    return new NextResponse("Gemini Error", { status: 500 });
  }
}
