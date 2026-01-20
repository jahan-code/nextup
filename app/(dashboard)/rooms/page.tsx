'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Appbar } from '@/src/components';
import { Plus, Users, Loader2, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import EmptyState from '@/src/components/ui/EmptyState';
import JoinRoomModal from '@/src/components/features/JoinRoomModal';

interface Room {
  id: string;
  name: string;
  description: string | null;
  isPublic: boolean;
  creator: {
    id: string;
    email: string;
  };
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
}

export default function RoomsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showJoinModal, setShowJoinModal] = useState(false);

  // Listen for join room event from FAB
  useEffect(() => {
    const handleOpenJoin = () => setShowJoinModal(true);
    window.addEventListener('open-join-room', handleOpenJoin);
    return () => window.removeEventListener('open-join-room', handleOpenJoin);
  }, []);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/rooms', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch rooms');
      }

      const data = await response.json();
      setRooms(data.rooms || []);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setError('Failed to load rooms. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <Appbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Watch Party Rooms
            </h1>
            <p className="text-gray-400">
              Join a room or create your own to watch streams together
            </p>
          </div>
          {session && (
            <button
              onClick={() => router.push('/rooms/create')}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2 font-semibold"
            >
              <Plus size={20} />
              Create Room
            </button>
          )}
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rooms..."
              className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
        </motion.div>

        {/* Main Content Area */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="text-indigo-400 animate-spin" size={48} />
          </div>
        ) : (
          <>
            {error && (
              <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-6 text-center mb-8">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {filteredRooms.length === 0 ? (
              <EmptyState
                title={searchQuery ? 'No rooms found' : 'No rooms available'}
                description={
                  searchQuery
                    ? 'Try adjusting your search terms or create a new room.'
                    : session
                      ? 'Be the first to create a watch party room and invite your friends!'
                      : 'Sign in to create or join watch party rooms.'
                }
                icon={Users}
                actions={
                  session && !searchQuery
                    ? [
                      {
                        label: 'Create Your First Room',
                        onClick: () => router.push('/dashboard'),
                        icon: Plus,
                        variant: 'primary',
                      },
                      {
                        label: 'Join Existing Room',
                        onClick: () => setShowJoinModal(true),
                        icon: Users,
                        variant: 'secondary',
                      },
                    ]
                    : []
                }
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRooms.map((room, index) => (
                  <motion.div
                    key={room.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800/60 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/20 transition-all cursor-pointer group"
                    onClick={() => router.push(`/rooms/${room.id}`)}
                  >
                    {/* Room Thumbnail */}
                    {room.currentStream?.stream && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={room.currentStream.stream.bigImg || room.currentStream.stream.smallImg || '/placeholder.jpg'}
                          alt={room.currentStream.stream.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${room.currentStream?.stream.extractedId}/maxresdefault.jpg`;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                      </div>
                    )}

                    {/* Room Info */}
                    <div className="p-6">
                      <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
                        {room.name}
                      </h3>
                      {room.description && (
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                          {room.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4 text-gray-400">
                          <span className="flex items-center gap-1">
                            <Users size={16} />
                            {room._count.members}
                          </span>
                          <span>{room._count.streams} streams</span>
                        </div>
                        {room.currentStream && (
                          <span className="text-indigo-400 text-xs">Now Playing</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Join Room Modal */}
      <JoinRoomModal isOpen={showJoinModal} onClose={() => setShowJoinModal(false)} />
    </div>
  );
}








