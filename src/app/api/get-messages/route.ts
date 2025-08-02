import { db } from "@/lib/db";
import { messages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = "edge";

export const POST = async (req: Request) => {
  const { chatId } = await req.json();
  console.log("📥 Getting messages for chat ID:", chatId);
  
  const _messages = await db
    .select()
    .from(messages)
    .where(eq(messages.chatId, chatId));
  
  console.log("📄 Retrieved messages:", _messages.map(m => ({
    id: m.id,
    role: m.role,
    contentLength: m.content.length,
    createdAt: m.createdAt
  })));
  
  return NextResponse.json(_messages);
};