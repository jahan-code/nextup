'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Loader2 } from 'lucide-react';
import { useToast } from '@/src/components/ui';

interface JoinRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JoinRoomModal({ isOpen, onClose }: JoinRoomModalProps) {
  const router = useRouter();
  const { addToast } = useToast();
  const [roomCode, setRoomCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Listen for custom event to open modal
  useEffect(() => {
    const handleOpen = () => {
      // Modal state is controlled by parent, but we can handle the event
    };
    window.addEventListener('open-join-room', handleOpen);
    return () => window.removeEventListener('open-join-room', handleOpen);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!roomCode.trim()) {
      setError('Please enter a room code');
      return;
    }

    // Validate room code format (UUID format)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(roomCode.trim())) {
      setError('Invalid room code format');
      return;
    }

    try {
      setIsJoining(true);
      
      // Check if room exists
      const response = await fetch(`/api/rooms/${roomCode.trim()}`, {
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 404) {
          setError('Room not found. Please check the code and try again.');
        } else {
          setError('Failed to join room. Please try again.');
        }
        return;
      }

      // Room exists, redirect to it
      addToast('Joining room...', 'info');
      router.push(`/rooms/${roomCode.trim()}`);
      onClose();
      setRoomCode('');
    } catch (err) {
      console.error('Error joining room:', err);
      setError('Failed to join room. Please try again.');
    } finally {
      setIsJoining(false);
    }
  };

  const handleClose = () => {
    setRoomCode('');
    setError(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-800/95 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6 max-w-md w-full shadow-2xl pointer-events-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="join-room-title"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-900/30 border border-indigo-500/50 rounded-lg">
                    <Users className="text-indigo-400" size={24} />
                  </div>
                  <div>
                    <h3 id="join-room-title" className="text-xl font-bold text-white">
                      Join Room
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      Enter the room code to join
                    </p>
                  </div>
                </div>
                {!isJoining && (
                  <button
                    onClick={handleClose}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="room-code" className="block text-gray-300 font-medium mb-2">
                    Room Code
                  </label>
                  <input
                    id="room-code"
                    type="text"
                    value={roomCode}
                    onChange={(e) => {
                      setRoomCode(e.target.value);
                      setError(null);
                    }}
                    placeholder="Enter room code..."
                    className="w-full px-4 py-3 bg-gray-900/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                    disabled={isJoining}
                    autoFocus
                  />
                  {error && (
                    <p className="mt-2 text-sm text-red-400">{error}</p>
                  )}
                  <p className="mt-2 text-xs text-gray-500">
                    You can find the room code in the room URL or ask the room creator
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={isJoining}
                    className="flex-1 px-4 py-2.5 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isJoining || !roomCode.trim()}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
                  >
                    {isJoining ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        Joining...
                      </>
                    ) : (
                      <>
                        <Users size={16} />
                        Join Room
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
