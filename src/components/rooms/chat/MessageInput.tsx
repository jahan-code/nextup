"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Smile, Paperclip } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  onTypingStart: () => void;
  onTypingEnd: () => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  className?: string;
}

export default function MessageInput({
  onSendMessage,
  onTypingStart,
  onTypingEnd,
  placeholder = "Type a message...",
  disabled = false,
  maxLength = 500,
  className,
}: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Common emojis
  const commonEmojis = [
    "😀", "😂", "😍", "🤔", "😎", "👍", "👎", 
    "❤️", "🔥", "💯", "🎵", "🎶", "💃",
    "😊", "😢", "😡", "🤯", "👏", "🙏", "👋",
  ];

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        onSendMessage(message.trim());
        setMessage("");
        setShowEmojis(false);
      }
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage(prev => prev + emoji);
    setShowEmojis(false);
    inputRef.current?.focus();
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  const remainingChars = maxLength - message.length;

  return (
    <div className={`relative ${className}`}>
      {/* Emoji Picker */}
      {showEmojis && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute bottom-full mb-2 left-0 bg-gray-800 border border-gray-600 rounded-xl p-3 shadow-xl z-50"
        >
          <div className="grid grid-cols-8 gap-2 max-w-sm">
            {commonEmojis.map((emoji) => (
              <motion.button
                key={emoji}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => handleEmojiSelect(emoji)}
                className="text-2xl hover:bg-gray-700 rounded p-1 transition-all"
              >
                {emoji}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Input Area */}
      <div className="flex items-end gap-2 bg-white/5 border border-white/20 rounded-xl p-2">
        {/* Emoji Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowEmojis(!showEmojis)}
          className="p-2 text-gray-400 hover:text-white transition-colors"
          title="Add emoji"
        >
          <Smile size={20} />
        </motion.button>

        {/* Text Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              adjustTextareaHeight();
              if (e.target.value.length > 0) {
                onTypingStart();
              } else {
                onTypingEnd();
              }
            }}
            onKeyDown={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              setShowEmojis(false);
              onTypingEnd();
            }}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            rows={1}
            className={`w-full px-4 py-3 bg-transparent text-white placeholder-gray-400 resize-none outline-none transition-all ${
              isFocused ? 'placeholder-gray-500' : ''
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            style={{ minHeight: '44px' }}
          />

          {/* Character Count */}
          {message.length > maxLength * 0.8 && (
            <div className="absolute bottom-2 right-2 text-xs text-gray-400">
              {remainingChars}
            </div>
          )}
        </div>

        {/* Send Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (message.trim()) {
              onSendMessage(message.trim());
              setMessage("");
              setShowEmojis(false);
            }
          }}
          disabled={!message.trim() || disabled}
          className={`p-3 rounded-full transition-all ${
            message.trim() && !disabled
              ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
        >
          <Send size={20} className={message.trim() && !disabled ? "text-white" : ""} />
        </motion.button>
      </div>

      {/* File Upload (Future Feature) */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-2 text-gray-400 hover:text-white transition-colors"
        title="Attach file (coming soon)"
        disabled
      >
        <Paperclip size={18} />
      </motion.button>
    </div>
  );
}
