"use client";

import { useState, useCallback, useEffect } from "react";
import { useRoomAbly } from "@/src/hooks/useRoomAbly";
import type { ChatMessage } from "@/src/types/chat";

export const useChat = (
  roomId: string,
  userId: string | null,
  isCreator: boolean = false,
) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Use the existing useRoomAbly hook to get the publishMessage function
  const {
    isConnected,
    publishPlaybackUpdate,
    publishStreamChange,
    publishReaction,
    publishSkipUpdate,
    publishMessage,
  } = useRoomAbly({
    roomId,
    userId,
    isCreator,
    onMessage: (message) => {
      setMessages((prev) => [...prev, message]);
    },
    onVoiceEvent: (message) => {
      // Handle voice events for future voice chat implementation
      console.log("Voice event received:", message);
    },
  });

  const sendMessage = useCallback(
    (content: string) => {
      if (!userId) return; // Don't send if no userId

      const message: ChatMessage = {
        id: `msg-${Date.now()}-${Math.random()}`,
        userId,
        userName: "You", // This would come from user session
        content: content.trim(),
        type: "text",
        timestamp: new Date(),
        roomId,
      };

      publishMessage(message);
      setIsTyping(false);
    },
    [roomId, userId, publishMessage],
  );

  const startTyping = useCallback(() => {
    setIsTyping(true);
  }, []);

  const stopTyping = useCallback(() => {
    setIsTyping(false);
  }, []);

  return {
    messages,
    sendMessage,
    isTyping,
    startTyping,
    stopTyping,
  };
};
