"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { 
  MessageCircle, 
  PlusCircle, 
  Search, 
  FileText, 
  MoreVertical,
  Trash2,
  Edit3,
  Star,
  Clock,
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DrizzleChat } from '@/lib/db/schema';

type Props = {
  chats: DrizzleChat[];
  chatId: number;
  isPro: boolean;
};

const ChatSideBar = ({ chats, chatId, isPro }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredChatId, setHoveredChatId] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "recent" | "starred">("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredChats = chats.filter(chat => 
    chat.pdfName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 border-r border-gray-700/50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700/50 bg-gray-900/80 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-blue-400" />
            Chats
          </h2>
          {isPro && (
            <div className="px-2 py-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-xs font-medium text-white">
              PRO
            </div>
          )}
        </div>

        {/* New Chat Button */}
        <Link href="/">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] text-white font-medium">
            <PlusCircle className="mr-2 w-4 h-4" />
            New Chat
          </Button>
        </Link>

        {/* Search Bar */}
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1 mt-3 p-1 bg-gray-800/50 rounded-lg">
          {[
            { key: "all", label: "All", icon: MessageCircle },
            { key: "recent", label: "Recent", icon: Clock },
            { key: "starred", label: "Starred", icon: Star }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setFilter(key as any)}
              className={cn(
                "flex-1 flex items-center justify-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all duration-200",
                filter === key 
                  ? "bg-blue-600 text-white shadow-sm" 
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-700/50"
              )}
            >
              <Icon className="w-3 h-3" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 space-y-1 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <MessageCircle className="w-12 h-12 mb-3 opacity-50" />
            <p className="text-sm">No chats found</p>
            <p className="text-xs opacity-75">Start a new conversation</p>
          </div>
        ) : (
          filteredChats.map((chat) => (
            <Link key={chat.id} href={`/chat/${chat.id}`}>
              <div
                className={cn(
                  "group relative rounded-xl p-3 transition-all duration-300 cursor-pointer",
                  "hover:bg-gray-800/50 hover:shadow-lg hover:scale-[1.01]",
                  chat.id === chatId
                    ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 shadow-lg shadow-blue-500/10"
                    : "bg-gray-800/30 border border-gray-700/30 hover:border-gray-600/50"
                )}
                onMouseEnter={() => setHoveredChatId(chat.id)}
                onMouseLeave={() => setHoveredChatId(null)}
              >
                {/* Chat Content */}
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200",
                    chat.id === chatId
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-gray-300 group-hover:bg-gray-600"
                  )}>
                    <FileText className="w-4 h-4" />
                  </div>

                  {/* Chat Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={cn(
                        "font-medium text-sm truncate transition-colors duration-200",
                        chat.id === chatId ? "text-white" : "text-gray-200 group-hover:text-white"
                      )}>
                        {chat.pdfName}
                      </h3>
                      
                      {/* Action Button */}
                      {(hoveredChatId === chat.id || chat.id === chatId) && (
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-gray-600 rounded">
                          <MoreVertical className="w-3 h-3 text-gray-400 hover:text-gray-200" />
                        </button>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center gap-2 text-xs">
                      <span className={cn(
                        "transition-colors duration-200",
                        chat.id === chatId ? "text-blue-200" : "text-gray-400 group-hover:text-gray-300"
                      )}>
                        {mounted && chat.createdAt ? formatTimeAgo(new Date(chat.createdAt)) : "Just now"}
                      </span>
                      
                      {/* Status indicators */}
                      <div className="flex items-center gap-1">
                        {isPro && (
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        )}
                        <div className={cn(
                          "w-1.5 h-1.5 rounded-full transition-colors duration-200",
                          chat.id === chatId ? "bg-blue-400" : "bg-gray-500"
                        )}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Active Indicator */}
                {chat.id === chatId && (
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-r-full"></div>
                )}
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700/50 bg-gray-900/80 backdrop-blur-sm">
        <div className="text-xs text-gray-400 text-center">
          {filteredChats.length} chat{filteredChats.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
};

export default ChatSideBar;