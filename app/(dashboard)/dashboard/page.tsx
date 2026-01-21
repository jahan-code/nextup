'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Appbar, useToast } from '@/src/components';
import { Plus, ExternalLink, Video, Globe, Lock, Users, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { addToast } = useToast();

  const [rooms, setRooms] = useState<Array<{
    id: string;
    name: string;
    description: string | null;
    isPublic: boolean;
    currentStream: {
      stream: {
    id: string;
    title: string;
    extractedId: string;
        bigImg: string;
        smallImg: string;
      };
    } | null;
    _count: {
      members: number;
      streams: number;
    };
    createdAt: string;
  }>>([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Check if user is logged in
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  // Get user ID when session is available
  useEffect(() => {
    if (session?.user?.email && status === 'authenticated') {
      fetchUserId();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, status]);

  // Fetch rooms when we have user ID (or on mount for global feed)
  useEffect(() => {
    fetchRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const fetchUserId = async () => {
    try {
      const response = await fetch('/api/user', {
        credentials: 'include',
      });

      if (response.ok) {
        const user = await response.json();
        setUserId(user.id);
      } else {
        addToast('Failed to load user information', 'error');
      }
    } catch (error) {
      console.error('Error fetching user ID:', error);
      addToast('Failed to load user information', 'error');
    }
  };

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/rooms', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch rooms');
      }

      const data = await response.json();
      const result = data.data || data;
      setRooms(result.rooms || []);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      addToast('Failed to load rooms. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="text-indigo-400 animate-spin" size={48} />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Appbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
            My Dashboard
          </h1>
          <p className="text-gray-400 text-lg mb-4">
            Create and manage your watch party rooms
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="flex-1" />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/rooms/create')}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2 font-semibold whitespace-nowrap self-start sm:self-auto"
            >
              <Video size={20} />
              Create Room
            </motion.button>
          </div>
        </motion.div>

        {/* Rooms Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Watch Party Rooms</h2>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="text-indigo-400 animate-spin" size={32} />
              </div>
          ) : rooms.length === 0 ? (
            <div className="bg-gray-800/30 rounded-xl border border-purple-500/20 p-8 text-center">
              <Video className="mx-auto mb-4 text-gray-500" size={48} />
              <p className="text-gray-400 text-lg mb-4">No rooms available yet</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/rooms/create')}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all inline-flex items-center gap-2 font-semibold"
              >
                <Plus size={20} />
                Create Your First Room
              </motion.button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room, index) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => router.push(`/rooms/${room.id}`)}
                  className="bg-gray-800/60 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/20 transition-all cursor-pointer group"
                >
                  {/* Room Image/Thumbnail */}
                  <div className="relative h-40 overflow-hidden">
                    {room.currentStream?.stream?.bigImg ? (
                      <img
                        src={room.currentStream.stream.bigImg}
                        alt={room.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x225?text=No+Stream';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-900/50 to-pink-900/50 flex items-center justify-center">
                        <Video className="text-gray-500" size={48} />
                      </div>
                    )}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      {room.isPublic ? (
                        <div className="bg-indigo-500/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-white flex items-center gap-1">
                          <Globe size={12} />
                          Public
                        </div>
                      ) : (
                        <div className="bg-pink-500/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-white flex items-center gap-1">
                          <Lock size={12} />
                          Private
                        </div>
                      )}
                    </div>
                    </div>

                  {/* Room Info */}
                  <div className="p-6">
                    <h3 className="text-white font-bold text-lg mb-2 line-clamp-1 group-hover:text-indigo-400 transition-colors">
                      {room.name}
                      </h3>
                    {room.description && (
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{room.description}</p>
                    )}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4 text-gray-400">
                        <div className="flex items-center gap-1">
                          <Users size={16} />
                          <span>{room._count.members}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Video size={16} />
                          <span>{room._count.streams}</span>
                        </div>
                      </div>
                      <ExternalLink className="text-gray-400 group-hover:text-indigo-400 transition-colors" size={16} />
                    </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
      </div>
    </div>
  );
}
