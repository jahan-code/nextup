'use client';

import { useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { Appbar } from '@/src/components';
import { ThumbsUp, Loader2, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import type { YouTubePlayer } from '@/src/types';

interface Stream {
  id: string;
  title: string;
  url: string;
  extractedId: string;
  bigImg: string;
  smallImg: string;
  type: string;
  active: boolean;
  UserId: string;
  user: {
    id: string;
    email: string;
  };
  upvoteCount: number;
  upvotes: Array<{ id: string; UserId: string }>;
}

export default function StreamsPage() {
  const { data: session } = useSession();
  const [streams, setStreams] = useState<Stream[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [upvotedStreams, setUpvotedStreams] = useState<Set<string>>(new Set());
  const [isUpvoting, setIsUpvoting] = useState<string | null>(null);
  const [featuredStreamId, setFeaturedStreamId] = useState<string | null>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [containerMounted, setContainerMounted] = useState(false);
  const [youtubeApiReady, setYoutubeApiReady] = useState(false);

  // Get user ID when session is available
  useEffect(() => {
    if (session?.user?.email) {
      fetchUserId();
    }
  }, [session]);

  // Fetch streams on mount
  useEffect(() => {
    fetchStreams();
  }, []);

  // Load YouTube IFrame API
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/a46e77e0-b8d3-4f82-be7a-d50704bb9982', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'streams/page.tsx:55', message: 'YouTube API load effect started', data: { hasYT: !!window.YT, hasPlayer: !!(window.YT?.Player) }, timestamp: Date.now(), sessionId: 'debug-session', hypothesisId: 'A' }) }).catch(() => { });
    // #endregion

    // Check if API is already loaded
    if (window.YT && window.YT.Player) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/a46e77e0-b8d3-4f82-be7a-d50704bb9982', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'streams/page.tsx:60', message: 'YouTube API already loaded', data: {}, timestamp: Date.now(), sessionId: 'debug-session', hypothesisId: 'A' }) }).catch(() => { });
      // #endregion
      setYoutubeApiReady(true);
      return;
    }

    // Set up callback BEFORE loading script
    const originalCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/a46e77e0-b8d3-4f82-be7a-d50704bb9982', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'streams/page.tsx:71', message: 'YouTube API ready callback fired', data: { hasYT: !!window.YT, hasPlayer: !!(window.YT?.Player) }, timestamp: Date.now(), sessionId: 'debug-session', hypothesisId: 'A' }) }).catch(() => { });
      // #endregion
      setYoutubeApiReady(true);
      if (originalCallback) {
        originalCallback();
      }
    };

    // Check if script is already being loaded
    const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
    if (existingScript) {
      // Script is loading, wait for callback
      return;
    }

    // Load the IFrame Player API script
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    tag.async = true;
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
  }, []);

  // Determine featured stream (auto-play logic)
  // Always set to the most upvoted stream (first in sorted list)
  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/a46e77e0-b8d3-4f82-be7a-d50704bb9982', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'streams/page.tsx:73', message: 'Featured stream effect triggered', data: { streamsCount: streams.length, currentFeaturedId: featuredStreamId, firstStreamId: streams[0]?.id, firstStreamUpvotes: streams[0]?.upvoteCount }, timestamp: Date.now(), sessionId: 'debug-session', hypothesisId: 'B' }) }).catch(() => { });
    // #endregion

    if (streams.length === 0) {
      setFeaturedStreamId(null);
      return;
    }

    // If no featured stream is set, set it to the most upvoted
    if (!featuredStreamId) {
      const mostUpvotedStream = streams[0];
      if (mostUpvotedStream) {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/a46e77e0-b8d3-4f82-be7a-d50704bb9982', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'streams/page.tsx:82', message: 'Setting initial featured stream', data: { streamId: mostUpvotedStream.id, title: mostUpvotedStream.title, upvotes: mostUpvotedStream.upvoteCount }, timestamp: Date.now(), sessionId: 'debug-session', hypothesisId: 'B' }) }).catch(() => { });
        // #endregion
        setFeaturedStreamId(mostUpvotedStream.id);
      }
      return;
    }

    // If we have a featured stream, check if it still exists
    const currentFeatured = streams.find((s) => s.id === featuredStreamId);
    if (!currentFeatured) {
      // Current featured stream no longer exists, switch to most upvoted
      const mostUpvotedStream = streams[0];
      if (mostUpvotedStream) {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/a46e77e0-b8d3-4f82-be7a-d50704bb9982', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'streams/page.tsx:92', message: 'Featured stream no longer exists, switching', data: { oldId: featuredStreamId, newId: mostUpvotedStream.id }, timestamp: Date.now(), sessionId: 'debug-session', hypothesisId: 'B' }) }).catch(() => { });
        // #endregion
        setFeaturedStreamId(mostUpvotedStream.id);
      }
    }
    // Otherwise, keep the current featured stream playing (don't interrupt)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streams]);

  // Create YouTube player when featured stream changes
  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/a46e77e0-b8d3-4f82-be7a-d50704bb9982', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'streams/page.tsx:115', message: 'Player creation effect triggered', data: { featuredStreamId, hasContainer: !!playerContainerRef.current, containerMounted, hasYT: !!window.YT, hasPlayer: !!(window.YT?.Player) }, timestamp: Date.now(), sessionId: 'debug-session', hypothesisId: 'C' }) }).catch(() => { });
    // #endregion

    if (!featuredStreamId || !containerMounted || !playerContainerRef.current) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/a46e77e0-b8d3-4f82-be7a-d50704bb9982', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'streams/page.tsx:120', message: 'Player creation skipped - missing requirements', data: { featuredStreamId, hasContainer: !!playerContainerRef.current, containerMounted }, timestamp: Date.now(), sessionId: 'debug-session', hypothesisId: 'C' }) }).catch(() => { });
      // #endregion
      return;
    }
    if (!youtubeApiReady || !window.YT || !window.YT.Player) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/a46e77e0-b8d3-4f82-be7a-d50704bb9982', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'streams/page.tsx:130', message: 'Player creation skipped - YouTube API not ready', data: { youtubeApiReady, hasYT: !!window.YT, hasPlayer: !!(window.YT?.Player) }, timestamp: Date.now(), sessionId: 'debug-session', hypothesisId: 'A' }) }).catch(() => { });
      // #endregion
      return;
    }

    const featuredStream = streams.find((s) => s.id === featuredStreamId);
    if (!featuredStream) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/a46e77e0-b8d3-4f82-be7a-d50704bb9982', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'streams/page.tsx:118', message: 'Featured stream not found in streams array', data: { featuredStreamId, streamsCount: streams.length }, timestamp: Date.now(), sessionId: 'debug-session', hypothesisId: 'B' }) }).catch(() => { });
      // #endregion
      return;
    }

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/a46e77e0-b8d3-4f82-be7a-d50704bb9982', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'streams/page.tsx:122', message: 'Creating YouTube player', data: { videoId: featuredStream.extractedId, title: featuredStream.title }, timestamp: Date.now(), sessionId: 'debug-session', hypothesisId: 'C' }) }).catch(() => { });
    // #endregion

    // Destroy existing player if any
    if (playerRef.current) {
      try {
        playerRef.current.destroy();
      } catch {
        // Ignore errors when destroying
      }
    }

    // Create new player
    try {
      if (!window.YT) {
        setError('YouTube API not loaded');
        return;
      }
      playerRef.current = new window.YT.Player(playerContainerRef.current, {
        videoId: featuredStream.extractedId,
        playerVars: {
          autoplay: 1,
          rel: 0,
          controls: 0,
          modestbranding: 1,
          iv_load_policy: 3,
        },
        events: {
          onStateChange: (event: { data: number }) => {
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/a46e77e0-b8d3-4f82-be7a-d50704bb9982', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'streams/page.tsx:150', message: 'Player state changed', data: { state: event.data, stateName: event.data === 0 ? 'ENDED' : event.data === 1 ? 'PLAYING' : event.data === 2 ? 'PAUSED' : 'OTHER' }, timestamp: Date.now(), sessionId: 'debug-session', hypothesisId: 'E' }) }).catch(() => { });
            // #endregion
            // State 0 = ended
            if (window.YT && event.data === window.YT.PlayerState.ENDED) {
              // #region agent log
              fetch('http://127.0.0.1:7242/ingest/a46e77e0-b8d3-4f82-be7a-d50704bb9982', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'streams/page.tsx:154', message: 'Video ended, calling playNextStream', data: { currentId: featuredStreamId }, timestamp: Date.now(), sessionId: 'debug-session', hypothesisId: 'E' }) }).catch(() => { });
              // #endregion
              playNextStream();
            }
          },
          onReady: () => {
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/a46e77e0-b8d3-4f82-be7a-d50704bb9982', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'streams/page.tsx:160', message: 'Player ready, attempting to play', data: { videoId: featuredStream.extractedId, hasPlayVideo: !!playerRef.current?.playVideo }, timestamp: Date.now(), sessionId: 'debug-session', hypothesisId: 'D' }) }).catch(() => { });
            // #endregion
            // Player is ready, ensure it starts playing
            if (playerRef.current && playerRef.current.playVideo) {
              try {
                playerRef.current.playVideo();
                // #region agent log
                fetch('http://127.0.0.1:7242/ingest/a46e77e0-b8d3-4f82-be7a-d50704bb9982', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'streams/page.tsx:165', message: 'playVideo called', data: {}, timestamp: Date.now(), sessionId: 'debug-session', hypothesisId: 'D' }) }).catch(() => { });
                // #endregion
              } catch (error) {
                // #region agent log
                fetch('http://127.0.0.1:7242/ingest/a46e77e0-b8d3-4f82-be7a-d50704bb9982', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'streams/page.tsx:168', message: 'playVideo failed', data: { error: String(error) }, timestamp: Date.now(), sessionId: 'debug-session', hypothesisId: 'D' }) }).catch(() => { });
                // #endregion
              }
            }
          },
        },
      });
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/a46e77e0-b8d3-4f82-be7a-d50704bb9982', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'streams/page.tsx:175', message: 'Player created successfully', data: {}, timestamp: Date.now(), sessionId: 'debug-session', hypothesisId: 'C' }) }).catch(() => { });
      // #endregion
    } catch (error) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/a46e77e0-b8d3-4f82-be7a-d50704bb9982', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'streams/page.tsx:178', message: 'Player creation error', data: { error: String(error) }, timestamp: Date.now(), sessionId: 'debug-session', hypothesisId: 'C' }) }).catch(() => { });
      // #endregion
      console.error('Error creating YouTube player:', error);
      setError('Failed to load video player');
    }

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          // Ignore errors
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [featuredStreamId, streams, containerMounted, youtubeApiReady]);

  // Function to play the next most upvoted stream
  const playNextStream = () => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/a46e77e0-b8d3-4f82-be7a-d50704bb9982', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'streams/page.tsx:186', message: 'playNextStream called', data: { streamsCount: streams.length, currentId: featuredStreamId }, timestamp: Date.now(), sessionId: 'debug-session', hypothesisId: 'E' }) }).catch(() => { });
    // #endregion

    if (streams.length <= 1) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/a46e77e0-b8d3-4f82-be7a-d50704bb9982', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'streams/page.tsx:190', message: 'No next stream available', data: { streamsCount: streams.length }, timestamp: Date.now(), sessionId: 'debug-session', hypothesisId: 'E' }) }).catch(() => { });
      // #endregion
      return; // No next stream available
    }

    // Find current stream index in sorted list (by upvote count)
    const currentIndex = streams.findIndex((s) => s.id === featuredStreamId);
    if (currentIndex === -1) {
      // If current not found, play the most upvoted (first)
      if (streams.length > 0) {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/a46e77e0-b8d3-4f82-be7a-d50704bb9982', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'streams/page.tsx:198', message: 'Current stream not found, playing first', data: { newId: streams[0].id }, timestamp: Date.now(), sessionId: 'debug-session', hypothesisId: 'E' }) }).catch(() => { });
        // #endregion
        setFeaturedStreamId(streams[0].id);
      }
      return;
    }

    // Find the next most upvoted stream (skip current one)
    const nextIndex = currentIndex + 1;
    if (nextIndex < streams.length) {
      // Play next stream in sorted order (next most upvoted)
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/a46e77e0-b8d3-4f82-be7a-d50704bb9982', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'streams/page.tsx:207', message: 'Playing next stream', data: { currentIndex, nextIndex, newId: streams[nextIndex].id }, timestamp: Date.now(), sessionId: 'debug-session', hypothesisId: 'E' }) }).catch(() => { });
      // #endregion
      setFeaturedStreamId(streams[nextIndex].id);
    } else {
      // If we're at the end, loop back to the first (most upvoted)
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/a46e77e0-b8d3-4f82-be7a-d50704bb9982', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'streams/page.tsx:212', message: 'Looping back to first stream', data: { newId: streams[0].id }, timestamp: Date.now(), sessionId: 'debug-session', hypothesisId: 'E' }) }).catch(() => { });
      // #endregion
      setFeaturedStreamId(streams[0].id);
    }
  };

  // Track which streams the user has upvoted
  useEffect(() => {
    if (streams.length > 0 && userId) {
      const upvoted = new Set<string>();
      streams.forEach((stream) => {
        const userUpvoted = stream.upvotes?.some(
          (upvote) => upvote.UserId === userId
        );
        if (userUpvoted) {
          upvoted.add(stream.id);
        }
      });
      setUpvotedStreams(upvoted);
    }
  }, [streams, userId]);

  const fetchUserId = async () => {
    try {
      const response = await fetch('/api/user', {
        credentials: 'include',
      });
      if (response.ok) {
        const user = await response.json();
        setUserId(user.id);
      }
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  };

  const fetchStreams = async () => {
    try {
      setLoading(true);
      setError(null);
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/a46e77e0-b8d3-4f82-be7a-d50704bb9982', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'streams/page.tsx:230', message: 'Fetching streams', data: {}, timestamp: Date.now(), sessionId: 'debug-session', hypothesisId: 'F' }) }).catch(() => { });
      // #endregion
      const response = await fetch('/api/streams?sort=mostUpvoted', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch streams');
      }

      const data = await response.json();
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/a46e77e0-b8d3-4f82-be7a-d50704bb9982', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'streams/page.tsx:242', message: 'Streams fetched successfully', data: { streamsCount: data.streams?.length || 0, firstStreamId: data.streams?.[0]?.id, firstStreamUpvotes: data.streams?.[0]?.upvoteCount }, timestamp: Date.now(), sessionId: 'debug-session', hypothesisId: 'F' }) }).catch(() => { });
      // #endregion
      setStreams(data.streams || []);
    } catch (error) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/a46e77e0-b8d3-4f82-be7a-d50704bb9982', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'streams/page.tsx:246', message: 'Error fetching streams', data: { error: String(error) }, timestamp: Date.now(), sessionId: 'debug-session', hypothesisId: 'F' }) }).catch(() => { });
      // #endregion
      console.error('Error fetching streams:', error);
      setError('Failed to load streams. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = async (streamId: string) => {
    if (!userId || isUpvoting) return;

    const isUpvoted = upvotedStreams.has(streamId);

    try {
      setIsUpvoting(streamId);
      setError(null);

      const endpoint = isUpvoted ? '/api/streams/downvote' : '/api/streams/upvote';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ streamId }),
      });

      if (response.ok) {
        const newUpvotedStreams = new Set(upvotedStreams);
        if (isUpvoted) {
          newUpvotedStreams.delete(streamId);
        } else {
          newUpvotedStreams.add(streamId);
        }
        setUpvotedStreams(newUpvotedStreams);

        // Refresh streams to get updated counts
        fetchStreams();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to upvote stream');
      }
    } catch (error) {
      console.error('Error upvoting stream:', error);
      setError('Failed to upvote stream. Please try again.');
    } finally {
      setIsUpvoting(null);
    }
  };

  const featuredStream = streams.find((s) => s.id === featuredStreamId);
  const otherStreams = streams.filter((s) => s.id !== featuredStreamId);

  return (
    <div className="min-h-screen bg-gray-900">
      <Appbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Streams Hub
          </h1>
          <p className="text-gray-400">
            Discover and upvote your favorite streams from all creators
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="text-indigo-400 animate-spin" size={48} />
          </div>
        ) : error ? (
          <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-6 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        ) : streams.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-gray-800/30 rounded-xl border border-purple-500/20"
          >
            <p className="text-gray-400 text-lg mb-4">No streams available</p>
            <p className="text-gray-500 text-sm">
              Be the first to add a stream!
            </p>
          </motion.div>
        ) : (
          <>
            {/* Featured Stream Player */}
            {featuredStream && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
              >
                <div className="bg-gray-800/60 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden">
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <div
                      ref={(el) => {
                        playerContainerRef.current = el;
                        setContainerMounted(!!el);
                        // #region agent log
                        if (el) {
                          fetch('http://127.0.0.1:7242/ingest/a46e77e0-b8d3-4f82-be7a-d50704bb9982', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'streams/page.tsx:425', message: 'Player container ref callback - mounted', data: { hasEl: !!el }, timestamp: Date.now(), sessionId: 'debug-session', hypothesisId: 'C' }) }).catch(() => { });
                        }
                        // #endregion
                      }}
                      className="absolute top-0 left-0 w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-white mb-2">
                          {featuredStream.title || 'Untitled Stream'}
                        </h2>
                        <p className="text-gray-400 text-sm">
                          by {featuredStream.user?.email || 'Unknown'}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => {
                            if (!userId) {
                              // Show message or redirect to sign in
                              alert('Please sign in to upvote streams!');
                              return;
                            }
                            handleUpvote(featuredStream.id);
                          }}
                          disabled={isUpvoting === featuredStream.id}
                          className={`bg-gray-900/80 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 transition-all hover:bg-gray-800/90 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${upvotedStreams.has(featuredStream.id)
                            ? 'bg-pink-500/20 border border-pink-500/50'
                            : ''
                            }`}
                          title={!userId ? 'Sign in to upvote' : upvotedStreams.has(featuredStream.id) ? 'Remove upvote' : 'Upvote this stream'}
                        >
                          <ThumbsUp
                            size={20}
                            className={`transition-colors ${upvotedStreams.has(featuredStream.id)
                              ? 'text-pink-400 fill-pink-400'
                              : 'text-pink-400'
                              }`}
                          />
                          <span className="text-white font-semibold">
                            {featuredStream.upvoteCount}
                          </span>
                          {isUpvoting === featuredStream.id && (
                            <Loader2
                              size={16}
                              className="animate-spin text-pink-400"
                            />
                          )}
                        </button>
                        {!userId && (
                          <p className="text-xs text-gray-500">Sign in to upvote</p>
                        )}
                      </div>
                    </div>
                    <a
                      href={featuredStream.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 transition-colors inline-flex items-center gap-2 text-sm font-medium"
                    >
                      Watch on YouTube
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Other Streams Grid */}
            {otherStreams.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  More Streams
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherStreams.map((stream, index) => (
                    <motion.div
                      key={stream.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-800/60 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/20 transition-all group cursor-pointer"
                      onClick={() => setFeaturedStreamId(stream.id)}
                    >
                      {/* Stream Thumbnail */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={
                            stream.bigImg ||
                            stream.smallImg ||
                            '/placeholder.jpg'
                          }
                          alt={stream.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              `https://img.youtube.com/vi/${stream.extractedId}/maxresdefault.jpg`;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />

                        {/* Play Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                            <svg
                              className="w-12 h-12 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                          </div>
                        </div>

                        {/* Upvote Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!userId) {
                              alert('Please sign in to upvote streams!');
                              return;
                            }
                            handleUpvote(stream.id);
                          }}
                          disabled={isUpvoting === stream.id}
                          className={`absolute top-4 right-4 bg-gray-900/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 transition-all hover:bg-gray-800/90 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${upvotedStreams.has(stream.id)
                            ? 'bg-pink-500/20 border border-pink-500/50'
                            : ''
                            }`}
                          title={!userId ? 'Sign in to upvote' : upvotedStreams.has(stream.id) ? 'Remove upvote' : 'Upvote this stream'}
                        >
                          <ThumbsUp
                            size={16}
                            className={`transition-colors ${upvotedStreams.has(stream.id)
                              ? 'text-pink-400 fill-pink-400'
                              : 'text-pink-400'
                              }`}
                          />
                          <span className="text-white font-semibold text-sm">
                            {stream.upvoteCount}
                          </span>
                          {isUpvoting === stream.id && (
                            <Loader2
                              size={14}
                              className="animate-spin text-pink-400"
                            />
                          )}
                        </button>
                      </div>

                      {/* Stream Info */}
                      <div className="p-6">
                        <h3 className="text-white font-semibold text-lg mb-3 line-clamp-2">
                          {stream.title || 'Untitled Stream'}
                        </h3>

                        <div className="flex items-center justify-between">
                          <a
                            href={stream.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-2 text-sm font-medium"
                          >
                            Watch on YouTube
                            <ExternalLink size={16} />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

