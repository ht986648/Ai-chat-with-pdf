import ChatComponent from "@/components/ChatComponent";
import ChatSideBar from "@/components/ChatSidebar";
import PDFViewer from "@/components/PDFViewer";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{
    chatId: string;
  }>;
};

const ChatPage = async ({ params }: Props) => {
  try {
    const { chatId } = await params;
    const { userId } = await auth();
    
    if (!userId) {
      return redirect("/sign-in");
    }

    // Validate chatId is a valid number
    const chatIdNum = parseInt(chatId);
    if (isNaN(chatIdNum)) {
      console.error("Invalid chatId:", chatId);
      return redirect("/");
    }

    const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
    
    if (!_chats || _chats.length === 0) {
      console.error("No chats found for user:", userId);
      return redirect("/");
    }

    const currentChat = _chats.find((chat) => chat.id === chatIdNum);
    if (!currentChat) {
      console.error("Chat not found or access denied:", chatIdNum);
      return redirect("/");
    }

    const isPro = await checkSubscription();

    return (
      <div className="flex max-h-screen overflow-scroll">
        <div className="flex w-full max-h-screen overflow-scroll">
          {/* chat sidebar */}
          <div className="flex-[1] max-w-xs">
            <ChatSideBar chats={_chats} chatId={chatIdNum} isPro={isPro} />
          </div>
          {/* pdf viewer */}
          <div className="max-h-screen p-4 oveflow-scroll flex-[5]">
            <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
          </div>
          {/* chat component */}
          <div className="flex-[3] border-l-4 border-l-slate-200">
            <ChatComponent chatId={chatIdNum} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in ChatPage:", error);
    return redirect("/");
  }
};

export default ChatPage;