'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Appbar, useToast, SkeletonRoomGrid } from '@/src/components';
import { useDashboardAbly } from '@/src/hooks';
import { Plus, ExternalLink, Video, Globe, Lock, Users, Search, User } from 'lucide-react';
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
    creator: {
      id: string;
      email: string;
      image: string | null;
    };
    members: Array<{
      user: {
        id: string;
        email: string;
        image: string | null;
      };
    }>;
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
  const [searchQuery, setSearchQuery] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  // Real-time updates for new rooms
  useDashboardAbly({
    onRoomCreated: (data) => {
      console.log('New room created:', data);
      // Add new room to the top of the list
      setRooms(prev => {
        // Check if room already exists to avoid duplicates
        const exists = prev.some(r => r.id === data.room.id);
        if (exists) return prev;

        return [data.room, ...prev];
      });

      addToast(`New room "${data.room.name}" is now available!`, 'success');
    }
  });

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
      // Fetch all public rooms instead of just user's rooms
      const response = await fetch('/api/rooms?public=true', {
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

  // Filter rooms based on search query
  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (room.description && room.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black">
        <Appbar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-12">
            <div className="h-10 w-48 bg-gray-700/50 rounded animate-pulse mb-3" />
            <div className="h-6 w-72 bg-gray-700/50 rounded animate-pulse mb-4" />
            <div className="flex justify-end mb-4">
              <div className="h-12 w-32 bg-gray-700/50 rounded-lg animate-pulse" />
            </div>
          </div>
          <div className="mb-12">
            <div className="h-8 w-48 bg-gray-700/50 rounded animate-pulse mb-6" />
            <SkeletonRoomGrid />
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black">
      <Appbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent mb-3">
                My Dashboard
              </h1>
              <p className="text-gray-400 text-lg">
                Create and manage your watch party rooms
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/rooms/create')}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:shadow-lg hover:bg-gray-500 transition-all flex items-center gap-2 font-semibold whitespace-nowrap"
            >
              <Video size={20} />
              Create Room
            </motion.button>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-600/30 rounded-lg leading-5 bg-gray-800/50 text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-gray-800 focus:border-gray-500/50 transition duration-150 ease-in-out sm:text-sm"
              placeholder="Search public rooms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Rooms Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            {searchQuery ? 'Search Results' : 'Public Rooms'}
          </h2>

          {loading ? (
            <SkeletonRoomGrid />
          ) : filteredRooms.length === 0 ? (
            <div className="bg-gray-800/30 rounded-xl border border-gray-600/30 p-8 text-center">
              <Video className="mx-auto mb-4 text-gray-500" size={48} />
              <p className="text-gray-400 text-lg mb-4">
                {searchQuery ? `No rooms found matching "${searchQuery}"` : 'No rooms available yet'}
              </p>
              {!searchQuery && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/rooms/create')}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:shadow-lg hover:bg-gray-500 transition-all inline-flex items-center gap-2 font-semibold"
                >
                  <Plus size={20} />
                  Create Your First Room
                </motion.button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.map((room, index) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  onClick={() => router.push(`/rooms/${room.id}`)}
                  className={`bg-gray-800/60 backdrop-blur-sm border rounded-xl overflow-hidden hover:border-gray-500/50 hover:shadow-lg hover:shadow-gray-500/20 transition-all cursor-pointer group ${index === 0 && !searchQuery ? 'border-gray-500/50 shadow-lg shadow-gray-500/10' : 'border-gray-600/30'
                    }`}
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
                      <div className="w-full h-full bg-gradient-to-br from-gray-800/50 to-gray-700/50 flex items-center justify-center">
                        <Video className="text-gray-500" size={48} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      {room.isPublic ? (
                        <div className="bg-gray-500/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-white flex items-center gap-1">
                          <Globe size={12} />
                          Public
                        </div>
                      ) : (
                        <div className="bg-gray-600/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-white flex items-center gap-1">
                          <Lock size={12} />
                          Private
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Room Info */}
                  <div className="p-6">
                    <h3 className="text-white font-bold text-lg mb-2 line-clamp-1 group-hover:text-gray-400 transition-colors">
                      {room.name}
                    </h3>
                    {room.description && (
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{room.description}</p>
                    )}
                    <div className="flex items-center justify-between w-full">
                      {/* Avatar Stack */}
                      <div className="flex -space-x-2 overflow-hidden">
                        {/* Creator always first */}
                        <div
                          className="inline-block h-8 w-8 rounded-full ring-2 ring-gray-900 bg-gray-800 flex items-center justify-center overflow-hidden"
                          title={`Host: ${room.creator.email}`}
                        >
                          {room.creator.image ? (
                            <img src={room.creator.image} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <User size={14} className="text-gray-500" />
                          )}
                        </div>

                        {/* Members (top 3) */}
                        {room.members
                          .filter(m => m.user.id !== room.creator.id)
                          .slice(0, 3)
                          .map((member, i) => (
                            <div
                              key={member.user.id}
                              className="inline-block h-8 w-8 rounded-full ring-2 ring-gray-900 bg-gray-800 flex items-center justify-center overflow-hidden"
                              title={member.user.email}
                            >
                              {member.user.image ? (
                                <img src={member.user.image} alt="" className="h-full w-full object-cover" />
                              ) : (
                                <User size={14} className="text-gray-500" />
                              )}
                            </div>
                          ))}

                        {/* Counter if more than shown */}
                        {room._count.members > 4 && (
                          <div className="flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-gray-900 bg-gray-800 text-[10px] font-bold text-gray-400">
                            +{room._count.members - 4}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-gray-400">
                        <div className="flex items-center gap-1" title={`${room._count.streams} Streams`}>
                          <Video size={14} />
                          <span className="text-xs">{room._count.streams}</span>
                        </div>
                        <ExternalLink className="group-hover:text-white transition-colors" size={14} />
                      </div>
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
