"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import type { VoiceChatState } from "@/src/types/chat";

interface VoiceControlsProps {
  isEnabled: boolean;
  isMuted: boolean;
  isPushToTalk: boolean;
  audioLevel?: number;
  onToggleMute: () => void;
  onTogglePushToTalk: () => void;
  className?: string;
}

export default function VoiceControls({
  isEnabled,
  isMuted,
  isPushToTalk,
  audioLevel = 0,
  onToggleMute,
  onTogglePushToTalk,
  className,
}: VoiceControlsProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`p-4 bg-black/30 backdrop-blur-md border border-white/10 ${className}`}>
      {/* Voice Status */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${
            isEnabled ? "bg-green-500 animate-pulse" : "bg-gray-500"
          }`} />
          <span className="text-sm font-medium text-white">
            {isEnabled ? "Voice Chat Active" : "Voice Chat Inactive"}
          </span>
        </div>
        
        {/* Audio Level Indicator */}
        {audioLevel > 0 && (
          <div className="flex items-center gap-2">
            <Volume2 size={16} className="text-blue-400" />
            <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${audioLevel * 100}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${audioLevel * 100}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-4">
        {/* Mute/Unmute */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleMute}
          disabled={!isEnabled}
          className={`p-3 rounded-full transition-all ${
            isMuted
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          } ${!isEnabled ? "opacity-50 cursor-not-allowed" : ""}`}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
        </motion.button>

        {/* Push to Talk Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onTogglePushToTalk}
          disabled={!isEnabled}
          className={`p-3 rounded-full transition-all ${
            isPushToTalk
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-gray-600 hover:bg-gray-700 text-white"
          } ${!isEnabled ? "opacity-50 cursor-not-allowed" : ""}`}
          title={isPushToTalk ? "Release to Stop" : "Push to Talk"}
        >
          <div className="relative">
            <Mic size={20} />
            {isPushToTalk && (
              <motion.div
                className="absolute inset-0 bg-red-500 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            )}
          </div>
        </motion.button>
      </div>

      {/* Instructions */}
      <div className="text-center text-xs text-gray-400 mt-4">
        {isPushToTalk ? (
          <p>Release button to stop talking</p>
        ) : (
          <p>Hold button to talk, or enable "Always On" mode</p>
        )}
        {isMuted && (
          <p className="text-red-400 mt-2">You are muted</p>
        )}
      </div>
    </div>
  );
}
