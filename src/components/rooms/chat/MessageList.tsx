"use client";

import React from "react";
import { motion } from "framer-motion";
import type { ChatMessage } from "@/src/types/chat";

interface MessageListProps {
  messages: ChatMessage[];
  currentUserId: string;
  className?: string;
}

export default function MessageList({ messages, currentUserId, className }: MessageListProps) {
  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    
    if (diff < 60000) { // Less than 1 minute
      return timestamp.toLocaleTimeString();
    } else if (diff < 3600000) { // Less than 1 hour
      return timestamp.toLocaleTimeString();
    } else if (diff < 86400000) { // Less than 1 day
      return timestamp.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } else {
      return timestamp.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  const getMessageIcon = (type: ChatMessage['type']) => {
    switch (type) {
      case 'text':
        return null;
      case 'emoji':
        return '😊';
      case 'system':
        return 'ℹ️';
      default:
        return '💬';
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {messages.map((message, index) => {
        const isOwn = message.userId === currentUserId;
        const showDateHeader = index === 0 || 
          new Date(messages[index - 1].timestamp).toDateString() !== new Date(message.timestamp).toDateString();

        return (
          <React.Fragment key={message.id}>
            {/* Date Header */}
            {showDateHeader && (
              <div className="flex items-center justify-center my-4">
                <div className="flex-1 h-px bg-white/20" />
                <span className="px-3 text-xs text-gray-400 font-medium">
                  {formatTimestamp(message.timestamp)}
                </span>
                <div className="flex-1 h-px bg-white/20" />
              </div>
            )}

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex gap-3 ${isOwn ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              <div className="shrink-0">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full ring-2 ring-gray-600 bg-gray-800">
                    {message.userImage ? (
                      <img
                        src={message.userImage}
                        alt={message.userName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white">
                        {message.userName[0]?.toUpperCase()}
                      </div>
                    )}
                  </div>
                  
                  {/* Online Status */}
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800" />
                </div>
              </div>

              {/* Message Content */}
              <div className={`max-w-[70%] flex flex-col ${isOwn ? "items-end" : "items-start"}`}>
                {/* User Name */}
                {!isOwn && (
                  <div className="text-xs text-gray-400 font-medium mb-1">
                    {message.userName}
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={`relative px-4 py-3 rounded-2xl ${
                    isOwn
                      ? "bg-blue-500 text-white rounded-br-2xl rounded-bl-sm"
                      : "bg-white/10 text-white border border-white/20 rounded-bl-2xl rounded-tr-sm"
                  }`}
                >
                  {/* Message Type Icon */}
                  {getMessageIcon(message.type) && (
                    <div className="absolute -top-2 -left-2 text-lg">
                      {getMessageIcon(message.type)}
                    </div>
                  )}

                  {/* Content */}
                  {message.type === 'text' && (
                    <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
                      {message.content}
                    </p>
                  )}
                  {message.type === 'emoji' && (
                    <span className="text-3xl">{message.content}</span>
                  )}
                  {message.type === 'system' && (
                    <p className="text-xs text-gray-300 italic leading-relaxed">
                      {message.content}
                    </p>
                  )}

                  {/* Timestamp */}
                  <div className="absolute -bottom-1 -right-1 text-xs text-gray-400">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </motion.div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
