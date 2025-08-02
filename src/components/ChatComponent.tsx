"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send, MessageCircle, Bot, Sparkles, Zap } from "lucide-react";
import MessageList from "./MessageList";
import { Message as AIMessage } from "ai";

type Props = {
  chatId: number;
};

// Logging utility functions
const logError = (error: Error, chatId: number, input: string) => {
  console.error("\n❌ CHAT COMPONENT ERROR:");
  console.error("=====================================");
  console.error("Error:", error);
  console.error("Chat ID:", chatId);
  console.error("Input:", input);
  console.error("Timestamp:", new Date().toISOString());
  console.error("=====================================\n");
};

const logResponse = (response: any, chatId: number) => {
  console.log("\n✅ CHAT COMPONENT RESPONSE:");
  console.log("=====================================");
  console.log("Status:", response.status);
  console.log("Data:", response.data);
  console.log("Chat ID:", chatId);
  console.log("Timestamp:", new Date().toISOString());
  console.log("=====================================\n");
};

const ChatComponent = ({ chatId }: Props) => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: allMessages, refetch } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const res = await axios.post<AIMessage[]>("/api/get-messages", { chatId });
      console.log("📥 All messages loaded:", res.data.map(m => ({
        id: m.id,
        role: m.role,
        contentLength: m.content.length
      })));
      return res.data;
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    
    try {
      console.log("\n📝 Submitting message:", { input, chatId });
      
      const response = await axios.post("/api/chat", {
        messages: [{ role: "user", content: input }],
        chatId
      });

      logResponse(response, chatId);
      
      // Clear input and refetch messages
      setInput("");
      await refetch();
      
    } catch (err: any) {
      // console.error("❌ Chat submission error:", {
      //   // message: err.message,
      //   // status: err.response?.status,
      //   // data: err.response?.data,
      //   // chatId,
      //   // input
      // });
      
      logError(err, chatId, input);
      
      // Provide more specific error messages
      let errorMessage = "Failed to send message";
      if (err.response?.status === 401) {
        errorMessage = "Please sign in to continue";
      } else if (err.response?.status === 404) {
        errorMessage = "Chat not found. Please refresh the page.";
      } else if (err.response?.status === 400) {
        errorMessage = err.response?.data?.error || "Invalid request";
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Show all messages including AI responses
  const displayMessages = React.useMemo(() => allMessages || [], [allMessages]);

  useEffect(() => {
    const container = document.getElementById("message-container");
    container?.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  }, [displayMessages]);

  return (
    <div className="relative max-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-10 w-48 h-48 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-2xl animate-bounce" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-56 h-56 bg-gradient-to-r from-indigo-400/10 to-violet-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
        
        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/4 w-0.5 h-0.5 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-ping" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>

      {/* Enhanced Header */}
      <div className="sticky top-0 inset-x-0 z-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-blue-900/80 to-indigo-900/80 backdrop-blur-xl border-b border-white/10"></div>
        <div className="relative px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Animated Chat Icon */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-lg animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full border border-blue-400/30">
                  <MessageCircle className="w-6 h-6 text-white animate-bounce" style={{animationDuration: '2s'}} />
                </div>
              </div>
              
              {/* Enhanced Title */}
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                  AI Chat Assistant
                </h3>
                <div className="flex items-center mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                  <span className="text-sm text-blue-300/80">Online & Ready</span>
                </div>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600/20 backdrop-blur-sm rounded-full p-2 border border-blue-400/30">
                <Bot className="w-5 h-5 text-blue-400 animate-pulse" />
              </div>
              <div className="bg-purple-600/20 backdrop-blur-sm rounded-full p-2 border border-purple-400/30">
                <Sparkles className="w-5 h-5 text-purple-400 animate-spin" style={{animationDuration: '4s'}} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Message Container */}
      <div 
        className="relative overflow-y-auto px-4 py-2 h-[calc(100vh-200px)]" 
        id="message-container"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(59, 130, 246, 0.3) rgba(15, 23, 42, 0.1)'
        }}
      >
        {/* Enhanced Message List Container */}
        <div className="relative">
          <MessageList messages={displayMessages} isLoading={isLoading} />
          
          {/* Empty State Enhancement */}
          {displayMessages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-96 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-3xl blur-xl"></div>
              <div className="relative text-center">
                <div className="mb-6">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-lg animate-pulse"></div>
                    <div className="relative bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm rounded-full p-8 border border-white/10">
                      <Bot className="w-16 h-16 text-blue-400 animate-bounce" style={{animationDuration: '3s'}} />
                    </div>
                  </div>
                </div>
                <h4 className="text-xl font-semibold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent mb-2">
                  Start Your Conversation
                </h4>
                <p className="text-blue-200/70 max-w-md mx-auto">
                  Ask me anything about your PDF document. I'm here to help you find answers instantly!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Error Display */}
      {error && (
        <div className="mx-4 mb-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-pink-600/20 rounded-2xl blur-lg animate-pulse"></div>
          <div className="relative bg-red-900/20 backdrop-blur-sm border border-red-400/30 text-red-300 rounded-2xl p-4">
            <div className="flex items-center mb-2">
              <Zap className="w-5 h-5 text-red-400 mr-2 animate-bounce" />
              <p className="font-semibold">Connection Error</p>
            </div>
            <p className="text-sm opacity-90">{error}</p>
            <p className="text-xs mt-2 opacity-70">Please try again or check your connection.</p>
          </div>
        </div>
      )}

      {/* Enhanced Input Form */}
      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 inset-x-0 z-20 relative"
      >
        {/* Form Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-blue-900/90 to-indigo-900/90 backdrop-blur-xl border-t border-white/10"></div>
        
        <div className="relative px-4 py-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end space-x-4">
              {/* Enhanced Input Container */}
              <div className="flex-1 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-lg"></div>
                <div className="relative">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask any question about your PDF..."
                    className="w-full bg-white/10 backdrop-blur-sm border-white/20 rounded-2xl px-6 py-4 text-white placeholder-blue-200/60 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-lg resize-none"
                    style={{
                      minHeight: '56px'
                    }}
                    disabled={isLoading}
                  />
                  {/* Input Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent rounded-2xl pointer-events-none"></div>
                </div>
              </div>

              {/* Enhanced Send Button */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300 animate-pulse"></div>
                <Button 
                  className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-110 border border-blue-400/30 group-hover:border-purple-400/50" 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                >
                  <div className="flex items-center">
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    ) : (
                      <Send className="h-6 w-6 animate-pulse" />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl"></div>
                </Button>
              </div>
            </div>

            {/* Input Helper Text */}
            <div className="flex items-center justify-center mt-3">
              <div className="flex items-center space-x-2 text-blue-200/60 text-sm">
                <Sparkles className="w-3 h-3 animate-pulse" />
                <span>Press Enter to send • Powered by AI</span>
                <Sparkles className="w-3 h-3 animate-pulse" style={{animationDelay: '0.5s'}} />
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        #message-container::-webkit-scrollbar {
          width: 8px;
        }
        
        #message-container::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.1);
          border-radius: 4px;
        }
        
        #message-container::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 4px;
        }
        
        #message-container::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </div>
  );
};

export default ChatComponent;