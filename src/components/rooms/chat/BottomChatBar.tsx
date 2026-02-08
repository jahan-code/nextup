"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageSquare, Users, Mic, MicOff } from "lucide-react";
import { useChat } from "@/src/hooks/useChat";
import VoiceControls from "@/src/components/rooms/chat/VoiceControls";

interface BottomChatBarProps {
  roomId: string;
  userId: string | null;
  isRoomCreator: boolean;
  className?: string;
}

export default function BottomChatBar({
  roomId,
  userId,
  isRoomCreator,
  className,
}: BottomChatBarProps) {
  const [messageInput, setMessageInput] = useState("");
  const [isMuted, setIsMuted] = useState(true);
  const [isPushToTalk, setIsPushToTalk] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage } = useChat(
    roomId,
    userId || "",
    isRoomCreator,
  );

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !userId) return;

    sendMessage(messageInput);
    setMessageInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    // TODO: Implement actual microphone toggle logic
  };

  const handleTogglePushToTalk = () => {
    setIsPushToTalk(!isPushToTalk);
    // TODO: Implement push-to-talk logic
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className={`relative bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-lg border-t border-white/10 ${className}`}
    >
      {/* Message Display Area */}
      <div className="h-64 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-start gap-2"
            >
              {/* User Avatar */}
              <div className="shrink-0 mt-1">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[8px] font-bold text-white">
                  {message.userName[0]?.toUpperCase()}
                </div>
              </div>

              {/* Message Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xs font-semibold text-white/90">
                    {message.userName}
                  </span>
                  <span className="text-xs text-white/50">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="text-sm text-white/80 break-words">
                  {message.type === "text" && <p>{message.content}</p>}
                  {message.type === "emoji" && (
                    <span className="text-xl">{message.content}</span>
                  )}
                  {message.type === "system" && (
                    <p className="text-xs text-white/60 italic">
                      {message.content}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Header with User Count */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-white/10 bg-black/50">
        <div className="flex items-center gap-2">
          <MessageSquare size={14} className="text-green-400" />
          <span className="text-xs font-medium text-white/70">Chat</span>
          <div className="flex items-center gap-1">
            <Users size={12} className="text-white/50" />
            <span className="text-xs text-white/50">{messages.length}</span>
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="p-3 bg-black/80 border-t border-white/10">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-white/50 resize-none outline-none focus:border-white/30 focus:bg-white/15 transition-all"
            disabled={!userId}
          />
          <button
            onClick={handleToggleMute}
            disabled={!userId}
            className={`p-2 rounded-lg transition-all duration-200 ${
              isMuted
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            title={isMuted ? "Unmute microphone" : "Mute microphone"}
          >
            {isMuted ? <MicOff size={14} /> : <Mic size={14} />}
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!messageInput.trim() || !userId}
            className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Send size={14} />
          </button>
        </div>
        {!userId && (
          <p className="text-xs text-white/50 text-center mt-2">
            Sign in to send messages
          </p>
        )}
      </div>
    </div>
  );
}
