import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { loadS3IntoPinecone } from "@/lib/pinecone";
import { getS3Url } from "@/lib/s3";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { file_key, file_name } = await req.json();

    if (!file_key || !file_name) {
      return NextResponse.json(
        { error: "Missing file_key or file_name" },
        { status: 400 }
      );
    }

    console.log(`Starting ingestion for file: ${file_key} (${file_name})`);

    // Ingest PDF into Pinecone (new upsertRecords flow)
    await loadS3IntoPinecone(file_key);

    // Store chat metadata in DB
    const [chat] = await db
      .insert(chats)
      .values({
        fileKey: file_key,
        pdfName: file_name,
        pdfUrl: getS3Url(file_key),
        userId,
      })
      .returning({
        insertedId: chats.id,
      });

    console.log(`Chat created with ID: ${chat.insertedId}`);

    return NextResponse.json(
      {
        chat_id: chat.insertedId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in /api/create-chat:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
