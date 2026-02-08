"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Users } from "lucide-react";
import Image from "next/image";
import { useChat } from "@/src/hooks/useChat";

interface ChatPanelProps {
  roomId: string;
  userId: string | null;
  isRoomCreator: boolean;
  className?: string;
}

export default function ChatPanel({
  roomId,
  userId,
  isRoomCreator,
  className,
}: ChatPanelProps) {
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage } = useChat(
    roomId,
    userId || "",
    isRoomCreator,
  );

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !isRoomCreator) return;

    sendMessage(messageInput);
    setMessageInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className={`flex flex-col h-full bg-black/20 backdrop-blur-md border border-white/10 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Users size={16} className="text-green-400" />
          <span className="text-sm font-semibold text-white">
            Chat ({messages.length})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full ring-2 ring-green-500 bg-gray-800">
            <div className="w-full h-full rounded-full bg-gray-600 flex items-center justify-center text-[10px] font-bold text-white">
              🎵
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex gap-3 ${
                message.userId === userId ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* User Avatar */}
              <div className="shrink-0">
                <div className="w-8 h-8 rounded-full ring-2 ring-gray-600 bg-gray-800">
                  {message.userImage ? (
                    <Image
                      src={message.userImage}
                      alt={message.userName}
                      width={32}
                      height={32}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gray-600 flex items-center justify-center text-[10px] font-bold text-white">
                      {message.userName[0]?.toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              {/* Message Content */}
              <div
                className={`max-w-[70%] ${
                  message.userId === userId ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    message.userId === userId
                      ? "bg-blue-500 text-white rounded-br-2xl rounded-bl-sm"
                      : "bg-white/10 text-white border border-white/20 rounded-br-2xl rounded-tr-sm"
                  }`}
                >
                  {message.type === "text" && (
                    <p className="text-sm wrap-break-word">{message.content}</p>
                  )}
                  {message.type === "emoji" && (
                    <span className="text-2xl">{message.content}</span>
                  )}
                  {message.type === "system" && (
                    <p className="text-xs text-gray-400 italic">
                      {message.content}
                    </p>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {message.userName} •{" "}
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 bg-transparent text-white placeholder-gray-400 resize-none outline-none transition-all"
            disabled={!isRoomCreator} // Only room members can chat
          />
          <button
            onClick={handleSendMessage}
            disabled={!isRoomCreator}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send size={16} />
          </button>
        </div>
        {!isRoomCreator && (
          <p className="text-xs text-gray-400 text-center mt-2">
            Only room members can send messages
          </p>
        )}
      </div>
    </div>
  );
}
