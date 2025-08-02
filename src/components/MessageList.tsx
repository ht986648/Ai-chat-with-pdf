import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import { Loader2, User, Bot, CheckCheck } from "lucide-react";
import React from "react";

type Props = {
  isLoading: boolean;
  messages: Message[];
};

const MessageList = ({ messages, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-white" />
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 animate-pulse opacity-30"></div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              AI is thinking...
            </p>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-4 py-12">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center mb-4">
          <Bot className="w-8 h-8 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Start a conversation
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-md">
          Send a message to begin chatting with the AI assistant
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-4 py-6 max-w-4xl mx-auto">
      {messages.map((message, index) => {
        const isUser = message.role === "user";
        const isLastMessage = index === messages.length - 1;
        
        return (
          <div
            key={message.id}
            className={cn(
              "flex gap-3 group animate-in slide-in-from-bottom-2 duration-300",
              {
                "flex-row-reverse": isUser,
              }
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Avatar */}
            <div className={cn(
              "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ring-2 ring-offset-2 transition-all duration-200",
              {
                "bg-gradient-to-br from-blue-500 to-blue-600 ring-blue-200 ring-offset-blue-50 dark:ring-blue-800 dark:ring-offset-gray-900": isUser,
                "bg-gradient-to-br from-purple-500 to-purple-600 ring-purple-200 ring-offset-purple-50 dark:ring-purple-800 dark:ring-offset-gray-900": !isUser,
              }
            )}>
              {isUser ? (
                <User className="w-4 h-4 text-white" />
              ) : (
                <Bot className="w-4 h-4 text-white" />
              )}
            </div>

            {/* Message Content */}
            <div className={cn("flex flex-col gap-1 max-w-[80%] sm:max-w-[70%]", {
              "items-end": isUser,
              "items-start": !isUser,
            })}>
              {/* Role Label */}
              <span className={cn("text-xs font-medium px-2", {
                "text-blue-600 dark:text-blue-400": isUser,
                "text-purple-600 dark:text-purple-400": !isUser,
              })}>
                {isUser ? "You" : "Assistant"}
              </span>

              {/* Message Bubble */}
              <div
                className={cn(
                  "relative rounded-2xl px-4 py-3 shadow-sm ring-1 transition-all duration-200 group-hover:shadow-md",
                  {
                    "bg-gradient-to-br from-blue-500 to-blue-600 text-white ring-blue-200/50 dark:ring-blue-800/50": isUser,
                    "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ring-gray-200/50 dark:ring-gray-700/50": !isUser,
                    "rounded-br-md": isUser,
                    "rounded-bl-md": !isUser,
                  }
                )}
              >
                <div className="relative z-10">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {message.content}
                  </p>
                </div>
                
                {/* Message tail */}
                <div className={cn(
                  "absolute w-3 h-3 transform rotate-45",
                  {
                    "bg-gradient-to-br from-blue-500 to-blue-600 -right-1 bottom-2": isUser,
                    "bg-white dark:bg-gray-800 -left-1 bottom-2": !isUser,
                  }
                )}></div>
              </div>

              {/* Message Status/Timestamp */}
              <div className={cn("flex items-center gap-1 px-2", {
                "flex-row-reverse": isUser,
              })}>
                {isUser && isLastMessage && (
                  <CheckCheck className="w-3 h-3 text-blue-500 dark:text-blue-400" />
                )}
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {new Date().toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;