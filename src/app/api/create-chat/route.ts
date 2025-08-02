import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getContext } from "@/lib/context";
import { chats, messages as _messages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function GET() {
  return NextResponse.json({ 
    message: "Chat API is working!", 
    timestamp: new Date().toISOString(),
  });
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { file_key, file_name } = body;

    if (!file_key || !file_name) {
      return NextResponse.json(
        { error: "Invalid input. Please provide 'file_key' and 'file_name'." },
        { status: 400 }
      );
    }

    // Create a new chat entry
    const [newChat] = await db.insert(chats).values({
      pdfName: file_name,
      pdfUrl: `https://your-s3-bucket.s3.amazonaws.com/${file_key}`, // You might want to generate the actual URL
      userId: userId,
      fileKey: file_key,
    }).returning();

    return NextResponse.json({ 
      chat_id: newChat.id,
      message: "Chat created successfully" 
    });

  } catch (error) {
    console.error("❌ CREATE CHAT API ERROR:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
