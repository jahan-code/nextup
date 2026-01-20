'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Users, Music, Search, Share2 } from 'lucide-react';
import { useToast } from './Toast';

interface Action {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  color?: string;
}

export default function FloatingActionButton() {
  const router = useRouter();
  const pathname = usePathname();
  const { addToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  // Determine actions based on current route
  const getActions = (): Action[] => {
    const actions: Action[] = [];

    // Common actions available everywhere
    actions.push({
      id: 'join-room',
      label: 'Join Room',
      icon: <Users size={20} />,
      onClick: () => {
        setIsOpen(false);
        // Will be handled by JoinRoomModal component
        const event = new CustomEvent('open-join-room');
        window.dispatchEvent(event);
      },
    });

    // Context-specific actions
    if (pathname?.startsWith('/dashboard')) {
      actions.push(
        {
          id: 'create-room',
          label: 'Create Room',
          icon: <Plus size={20} />,
          onClick: () => {
            setIsOpen(false);
            router.push('/rooms/create');
          },
        },
        {
          id: 'add-stream',
          label: 'Add Stream',
          icon: <Music size={20} />,
          onClick: () => {
            setIsOpen(false);
            const event = new CustomEvent('open-add-stream');
            window.dispatchEvent(event);
          },
        }
      );
    } else if (pathname?.startsWith('/rooms') && !pathname?.includes('/create')) {
      if (pathname?.includes('/rooms/') && pathname !== '/rooms') {
        // Room detail page
        actions.push(
          {
            id: 'add-stream',
            label: 'Add Stream',
            icon: <Music size={20} />,
            onClick: () => {
              setIsOpen(false);
              const event = new CustomEvent('open-add-stream');
              window.dispatchEvent(event);
            },
          },
          {
            id: 'share-room',
            label: 'Share Room',
            icon: <Share2 size={20} />,
            onClick: () => {
              setIsOpen(false);
              const roomId = pathname.split('/rooms/')[1];
              if (roomId) {
                const roomUrl = `${window.location.origin}/rooms/${roomId}`;
                navigator.clipboard.writeText(roomUrl).then(() => {
                  addToast('Room link copied to clipboard!', 'success');
                }).catch(() => {
                  addToast('Failed to copy link', 'error');
                });
              }
            },
          }
        );
      } else {
        // Rooms list page
        actions.push({
          id: 'create-room',
          label: 'Create Room',
          icon: <Plus size={20} />,
          onClick: () => {
            setIsOpen(false);
            router.push('/rooms/create');
          },
        });
      }
    } else if (pathname === '/streams') {
      actions.push({
        id: 'add-stream',
        label: 'Add Stream',
        icon: <Music size={20} />,
        onClick: () => {
          setIsOpen(false);
          router.push('/dashboard');
        },
      });
    }

    return actions;
  };

  const actions = getActions();

  // Don't show FAB if no actions available
  if (actions.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            />

            {/* Actions Menu */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute bottom-16 right-0 mb-2 bg-gray-800/95 backdrop-blur-xl border border-purple-500/20 rounded-xl shadow-2xl overflow-hidden min-w-[200px]"
            >
              {actions.map((action, index) => (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={action.onClick}
                  className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-gray-700/50 transition-colors text-white border-b border-purple-500/10 last:border-b-0"
                >
                  <div className="text-indigo-400">{action.icon}</div>
                  <span className="font-medium text-sm">{action.label}</span>
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all flex items-center justify-center"
        aria-label="Quick actions"
        aria-expanded={isOpen}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X size={24} /> : <Plus size={24} />}
        </motion.div>
      </motion.button>
    </div>
  );
}
