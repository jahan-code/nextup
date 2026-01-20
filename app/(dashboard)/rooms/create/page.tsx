'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Appbar, useToast } from '@/src/components';
import { Loader2, Lock, Globe, Search, X, Play, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';

const CreateRoomSchema = z.object({
  name: z.string().min(1, 'Room name is required').max(100, 'Room name must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  isPublic: z.boolean().default(true),
});

type CreateRoomInput = z.infer<typeof CreateRoomSchema>;

interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  channelTitle: string;
  duration?: string;
}

export default function CreateRoomPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { addToast } = useToast();

  const [formData, setFormData] = useState<CreateRoomInput>({
    name: '',
    description: '',
    isPublic: true,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CreateRoomInput, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdRoomId, setCreatedRoomId] = useState<string | null>(null);
  const [showStreamSelection, setShowStreamSelection] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Video[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isAddingStream, setIsAddingStream] = useState(false);
  const [addingVideoId, setAddingVideoId] = useState<string | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error for this field
    if (errors[name as keyof CreateRoomInput]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof CreateRoomInput];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const validatedData = CreateRoomSchema.parse(formData);
      setIsSubmitting(true);

      const response = await fetch('/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(validatedData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to create room');
      }

      // Handle both direct response and wrapped response formats
      const room = data.data || data;
      if (!room || !room.id) {
        throw new Error('Invalid response from server');
      }

      setCreatedRoomId(room.id);
      addToast('Room created successfully!', 'success');
      setShowStreamSelection(true);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof CreateRoomInput, string>> = {};
        err.issues.forEach((issue) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0] as keyof CreateRoomInput] = issue.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        addToast(err instanceof Error ? err.message : 'Failed to create room', 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setIsSearching(true);
      const response = await fetch(`/api/youtube/search?q=${encodeURIComponent(searchQuery)}`, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to search videos');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to search videos');
      }

      // Handle both direct response and wrapped response formats
      const result = data.data || data;
      setSearchResults(result?.videos || []);
    } catch (err) {
      console.error('Error searching videos:', err);
      addToast('Failed to search videos', 'error');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectStream = async (video: Video) => {
    if (!createdRoomId) return;

    try {
      setAddingVideoId(video.id);
      setIsAddingStream(true);

      // First, create the stream
      const streamResponse = await fetch('/api/streams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          url: video.url,
          title: video.title,
        }),
      });

      const streamData = await streamResponse.json();

      if (!streamResponse.ok) {
        throw new Error(streamData.error || streamData.message || 'Failed to create stream');
      }

      // Handle both direct response and wrapped response formats
      const stream = streamData.data || streamData;
      if (!stream || !stream.id) {
        throw new Error('Invalid stream response from server');
      }

      // Then, add it to the room
      const roomStreamResponse = await fetch(`/api/rooms/${createdRoomId}/streams`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          streamId: stream.id,
        }),
      });

      if (!roomStreamResponse.ok) {
        throw new Error('Failed to add stream to room');
      }

      const roomStreamData = await roomStreamResponse.json();
      const roomStream = roomStreamData.data || roomStreamData;
      // The API expects Stream.id (not RoomStream.id) for the play endpoint
      const streamId = roomStream.stream?.id || roomStream.streamId;

      // Set the stream as current
      if (streamId) {
        const playResponse = await fetch(`/api/rooms/${createdRoomId}/streams/${streamId}/play`, {
          method: 'PUT',
          credentials: 'include',
        });

        if (!playResponse.ok) {
          console.warn('Failed to set stream as current, but stream was added');
        }
      }

      addToast('Stream added and set as current!', 'success');

      // Redirect to the room page
      setTimeout(() => {
        router.push(`/rooms/${createdRoomId}`);
      }, 500);
    } catch (err) {
      console.error('Error adding stream:', err);
      addToast(err instanceof Error ? err.message : 'Failed to add stream', 'error');
    } finally {
      setIsAddingStream(false);
      setAddingVideoId(null);
    }
  };

  const handleSkipStreamSelection = () => {
    if (createdRoomId) {
      router.push(`/rooms/${createdRoomId}`);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="text-indigo-400 animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Appbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
            Create Watch Party Room
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Set up a room where you and your friends can watch streams together
          </p>

          {/* Room Creation Form */}
          {!showStreamSelection && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/60 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 sm:p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Room Name */}
                <div>
                  <label htmlFor="name" className="block text-gray-300 font-semibold mb-2">
                    Room Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="My Awesome Watch Party"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-gray-300 font-semibold mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="What's this room about?"
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
                    disabled={isSubmitting}
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-400">{errors.description}</p>
                  )}
                </div>

                {/* Privacy Setting */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-4">
                    Privacy Setting
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 bg-gray-900/50 border border-purple-500/20 rounded-lg cursor-pointer hover:border-purple-500/40 transition-colors">
                      <input
                        type="radio"
                        name="isPublic"
                        value="true"
                        checked={formData.isPublic === true}
                        onChange={() => setFormData((prev) => ({ ...prev, isPublic: true }))}
                        disabled={isSubmitting}
                        className="sr-only"
                      />
                      <div className={`flex-1 flex items-center gap-3 ${formData.isPublic ? 'text-white' : 'text-gray-400'}`}>
                        <Globe size={20} className={formData.isPublic ? 'text-indigo-400' : ''} />
                        <div>
                          <div className="font-medium">Public Room</div>
                          <div className="text-sm">Anyone can find and join this room</div>
                        </div>
                      </div>
                      {formData.isPublic && (
                        <div className="w-4 h-4 bg-indigo-600 rounded-full border-2 border-indigo-400"></div>
                      )}
                    </label>

                    <label className="flex items-center gap-3 p-4 bg-gray-900/50 border border-purple-500/20 rounded-lg cursor-pointer hover:border-purple-500/40 transition-colors">
                      <input
                        type="radio"
                        name="isPublic"
                        value="false"
                        checked={formData.isPublic === false}
                        onChange={() => setFormData((prev) => ({ ...prev, isPublic: false }))}
                        disabled={isSubmitting}
                        className="sr-only"
                      />
                      <div className={`flex-1 flex items-center gap-3 ${!formData.isPublic ? 'text-white' : 'text-gray-400'}`}>
                        <Lock size={20} className={!formData.isPublic ? 'text-pink-400' : ''} />
                        <div>
                          <div className="font-medium">Private Room</div>
                          <div className="text-sm">Only people with the room link can join</div>
                        </div>
                      </div>
                      {!formData.isPublic && (
                        <div className="w-4 h-4 bg-pink-600 rounded-full border-2 border-pink-400"></div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Video size={20} />
                        Create Room
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Stream Selection Modal */}
          <AnimatePresence>
            {showStreamSelection && createdRoomId && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                  onClick={() => setShowStreamSelection(false)}
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                >
                  <div
                    className="bg-gray-800/95 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                          Add Your First Stream
                        </h2>
                        <p className="text-gray-400">
                          Search for a YouTube video to add to your room (optional)
                        </p>
                      </div>
                      <button
                        onClick={handleSkipStreamSelection}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <X size={24} />
                      </button>
                    </div>

                    {/* Search Form */}
                    <form onSubmit={handleSearch} className="mb-6">
                      <div className="flex gap-3">
                        <div className="flex-1 relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search YouTube videos..."
                            className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                            disabled={isSearching}
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isSearching || !searchQuery.trim()}
                          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold"
                        >
                          {isSearching ? (
                            <Loader2 className="animate-spin" size={20} />
                          ) : (
                            <Search size={20} />
                          )}
                          Search
                        </button>
                      </div>
                    </form>

                    {/* Search Results */}
                    {searchResults.length > 0 && (
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {searchResults.map((video) => (
                          <motion.div
                            key={video.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-4 p-4 bg-gray-900/50 border border-purple-500/20 rounded-lg hover:border-purple-500/40 hover:bg-gray-900/70 transition-all cursor-pointer group"
                            onClick={() => handleSelectStream(video)}
                          >
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-32 h-20 object-cover rounded flex-shrink-0"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/128x80?text=No+Image';
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white font-medium text-sm line-clamp-2 group-hover:text-indigo-400 transition-colors">
                                {video.title}
                              </h4>
                              <p className="text-gray-400 text-xs mt-1">{video.channelTitle}</p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectStream(video);
                              }}
                              disabled={isAddingStream}
                              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm font-semibold flex-shrink-0"
                            >
                              {isAddingStream && addingVideoId === video.id ? (
                                <Loader2 className="animate-spin" size={16} />
                              ) : (
                                <>
                                  <Play size={16} />
                                  Add & Play
                                </>
                              )}
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 mt-6 pt-6 border-t border-purple-500/20">
                      <button
                        onClick={handleSkipStreamSelection}
                        className="flex-1 px-6 py-3 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700/70 transition-colors font-medium"
                      >
                        Skip for Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
