'use client';

import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { Appbar, SkeletonPlayer, SkeletonStreamCard, SkeletonListItem } from '@/src/components';
import { ThumbsUp, Loader2, Plus, Users, LogOut, Search, X, Play, Crown } from 'lucide-react';
import { motion } from 'framer-motion';
import type { YouTubePlayer } from '@/src/types';
import { PlayerState, type YouTubeVideo } from '@/src/types/youtube';
import { useRoomAbly } from '@/src/hooks';
import FloatingReactions from '@/src/components/rooms/FloatingReactions';
import { useToast } from '@/src/components/ui/Toast';
import {
  getPlayerStateName
} from '@/src/lib/youtube/youtube-api.utils';
import { SYNC_THRESHOLDS, SYNC_INTERVALS, PLAYBACK_RATE } from '@/src/constants/rooms';
interface RoomStream {
  id: string;
  streamId: string;
  stream: {
    id: string;
    title: string;
    url: string;
    extractedId: string;
    bigImg: string;
    smallImg: string;
    type: string;
  };
  addedBy: {
    id: string;
    email: string;
    image?: string | null;
  };
  upvoteCount: number;
  upvotes: Array<{ id: string; userId: string }>;
}

interface Room {
  id: string;
  name: string;
  description: string | null;
  isPublic: boolean;
  creator: {
    id: string;
    email: string;
    image?: string | null;
  };
  members: Array<{
    id: string;
    userId: string;
    user: {
      id: string;
      email: string;
      image?: string | null;
    };
    role: string;
  }>;
  streams: RoomStream[];
  currentStream: {
    id: string;
    stream: {
      id: string;
      title: string;
      url: string;
      extractedId: string;
      bigImg: string;
      smallImg: string;
    };
  } | null;
  _count: {
    members: number;
    streams: number;
  };
  playbackTime: number | null;
  isPlaying: boolean;
  lastSyncTime: string | null;
}

// YouTube types are imported from shared types file

export default function RoomPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const roomId = params?.id as string;

  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isJoining, setIsJoining] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [upvotedStreams, setUpvotedStreams] = useState<Set<string>>(new Set());
  const [isUpvoting, setIsUpvoting] = useState<string | null>(null);

  const { addToast } = useToast();

  const [skipInfo, setSkipInfo] = useState<{ streamId: string | null, votes: string[], threshold: number }>({
    streamId: null,
    votes: [],
    threshold: 0
  });
  const [isVotingToSkip, setIsVotingToSkip] = useState(false);
  const [recommendedVideos, setRecommendedVideos] = useState<YouTubeVideo[]>([]);
  const [isLoadingRecommended, setIsLoadingRecommended] = useState(false);

  // Cache for recommendations to avoid redundant API calls
  const recommendationsCache = useRef<Map<string, YouTubeVideo[]>>(new Map());

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<YouTubeVideo[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // YouTube Player API ref (replaces iframe ref)
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [playerReady, setPlayerReady] = useState(false);
  const [playerError, setPlayerError] = useState<string | null>(null);

  const lastSyncRef = useRef<{ time: number; timestamp: number; isPlaying: boolean } | null>(null);
  const isSyncingRef = useRef(false);
  const lastUpdateTimeRef = useRef<number>(0);

  // Store latest playback data from Ably messages to avoid stale state
  const latestPlaybackDataRef = useRef<{ playbackTime: number; isPlaying: boolean; timestamp: number; serverTimestamp?: number } | null>(null);

  // Refs for real-time state access in event handlers
  const isRoomCreatorRef = useRef(false);
  const roomIsPlayingRef = useRef(false);
  const updatePlaybackStateRef = useRef<any>(null);

  // Determine if user is creator or member
  const isRoomCreator = useMemo(() => room?.creator.id === userId, [room?.creator.id, userId]);
  const isRoomMember = useMemo(() => room?.members.some((m) => m.userId === userId) || false, [room?.members, userId]);

  // Keep refs in sync
  useEffect(() => {
    isRoomCreatorRef.current = isRoomCreator;
    roomIsPlayingRef.current = room?.isPlaying || false;
  }, [isRoomCreator, room?.isPlaying]);

  // Initialize YouTube Player API
  useEffect(() => {
    if (!room?.currentStream) return;

    let player: YouTubePlayer | null = null;
    let mounted = true;

    const initPlayer = async () => {
      try {
        const YT = await (await import('@/src/lib/youtube/youtube-api.utils')).loadYouTubeAPI();

        if (!mounted) return;

        // Create player
        player = new YT.Player('youtube-player', {
          videoId: room.currentStream!.stream.extractedId,
          playerVars: {
            autoplay: 1, // Auto-play when stream changes
            controls: 1,
            enablejsapi: 1,
            origin: window.location.origin,
            rel: 0, // Don't show related videos from other channels
            modestbranding: 1,
          },
          events: {
            onReady: (event) => {
              if (!mounted) return;
              playerRef.current = event.target;
              setPlayerReady(true);
              setPlayerError(null);
            },
            onStateChange: (event) => {
              if (!mounted) return;

              // Auto-play next video when current one ends
              if (event.data === 0) { // VT.PlayerState.ENDED is 0
                console.log('Video ended, attempting to play next...');
                if (playNextStreamRef.current) {
                  playNextStreamRef.current();
                }
              }

              // Real-time Play/Pause Sync
              if (isRoomCreatorRef.current) {
                const isPlaying = event.data === PlayerState.PLAYING;
                const isPaused = event.data === PlayerState.PAUSED;

                if ((isPlaying || isPaused) && updatePlaybackStateRef.current) {
                  const currentTime = event.target.getCurrentTime();
                  console.log(`[Creator] State changed to ${isPlaying ? 'PLAYING' : 'PAUSED'}, broadcasting...`);
                  updatePlaybackStateRef.current(currentTime, isPlaying, true);
                }
              } else {
                // Member protection: If Host is paused, Member cannot manually play
                if (event.data === PlayerState.PLAYING && !roomIsPlayingRef.current) {
                  console.log('[Member] Host is paused, reverting manual play...');
                  event.target.pauseVideo();
                  addToast('The host has paused the video', 'info');
                }
              }
            },
            onError: (event) => {
              if (!mounted) return;
              const errorMsg = `Player error: ${event.data}`;
              setPlayerError(errorMsg);
            }
          }
        });
      } catch (error) {
        if (!mounted) return;
        const errorMsg = `Failed to initialize YouTube player: ${error}`;
        setPlayerError(errorMsg);
      }
    };

    initPlayer();

    return () => {
      mounted = false;
      if (player) {
        try {
          player.destroy();
        } catch (err) {
          console.error('Error destroying player:', err);
        }
      }
      playerRef.current = null;
      setPlayerReady(false);
    };
  }, [room?.currentStream?.stream.extractedId]);

  // Ref for handlePlayStream to avoid circular dependency
  const handlePlayStreamRef = useRef<((streamId: string) => Promise<void>) | null>(null);

  // Ably real-time hook
  const { isConnected, publishPlaybackUpdate, publishStreamChange, publishReaction, publishSkipUpdate } = useRoomAbly({
    roomId,
    userId: userId,
    userInfo: session?.user ? {
      name: session.user.name || 'Anonymous',
      image: session.user.image || null,
    } : undefined,
    isCreator: isRoomCreator || false,
    onPresenceUpdate: (data) => {
      console.log('Presence update:', data);
    },
    onSkipUpdate: (data) => {
      setSkipInfo(data);
    },
    onMemberJoined: (data) => {
      console.log('Member joined:', data);
      addToast(`${data.user.email || 'A user'} joined the room`, 'success');
      fetchRoom();
    },
    onMemberLeft: (data) => {
      console.log('Member left:', data);
      // Refresh room to update member list
      fetchRoom();

      // Show notification
      if (data.isCreator) {
        addToast('The room creator has left', 'info');
      }
    },
    onCreatorTransferred: (data) => {
      console.log('Creator transferred:', data);
      addToast(`${data.newCreator.email} is now the room creator`, 'info');

      // Refresh room to update creator and member roles
      fetchRoom();
    },
    onRoomEnded: (data) => {
      console.log('Room ended:', data);
      const reason = data.reason === 'creator_left_alone'
        ? 'The creator left the room'
        : 'All members have left';

      addToast(`Room ended: ${reason}`, 'error');

      // Navigate back to dashboard after a brief delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    },
    /* onReaction: (data) => {
      setReactions(prev => [
        ...prev,
        {
          id: `${Date.now()}-${Math.random()}`,
          emoji: data.emoji,
          x: 10 + Math.random() * 80 // random horizontal position 10% to 90%
        }
      ]);
    }, */
    onPlaybackUpdate: (data) => {
      // Member receives playback update via Ably
      if (!isRoomCreator && playerRef.current && playerReady) {
        try {
          const now = Date.now();
          const player = playerRef.current;

          // Get actual current time from player
          let actualTime = 0;
          try {
            actualTime = player.getCurrentTime();
          } catch (err) {
            console.warn('[Sync] Could not get current time:', err);
            actualTime = latestPlaybackDataRef.current?.playbackTime || 0;
          }

          // Account for network latency
          const latency = data.serverTimestamp ? now - data.serverTimestamp : 0;
          const targetTime = data.isPlaying
            ? data.playbackTime + (latency / 1000)
            : data.playbackTime;

          const drift = Math.abs(actualTime - targetTime);


          // Adaptive sync based on drift
          if (drift > SYNC_THRESHOLDS.HARD_SYNC) {
            // Large drift: immediate seek
            console.log('[Sync] Hard sync - seeking to:', targetTime);
            player.seekTo(targetTime, true);
          } else if (drift > SYNC_THRESHOLDS.SOFT_SYNC) {
            const currentState = player.getPlayerState();
            const isCurrentlyPlaying = currentState === PlayerState.PLAYING;

            if (!isCurrentlyPlaying) {
              // During pause: ONLY seek if drift is significant (avoid jitter loops)
              if (drift > 0.5) {
                console.log('[Sync] Soft sync (paused) - seeking to:', targetTime);
                player.seekTo(targetTime, true);
              }
            } else {
              // During playback: Predictive Sync with granular rate adjustments
              // Strategy:
              // - < 0.1s: Perfect (no action)
              // - 0.1s - 0.5s: Micro-nudge (1.02x / 0.98x) - Invisible to user
              // - 0.5s - 1.5s: Gentle nudge (1.1x / 0.9x) - Barely noticeable
              // - 1.5s - 3.0s: Aggressive catchup (1.25x / 0.75x) - Noticeable audio pitch shift but better than buffering

              const isBehind = actualTime < targetTime;
              let rate = 1.0;

              if (drift < 0.1) {
                rate = 1.0;
              } else if (drift < 0.5) {
                rate = isBehind ? 1.02 : 0.98;
              } else if (drift < 1.5) {
                rate = isBehind ? 1.1 : 0.9;
              } else {
                rate = isBehind ? 1.25 : 0.75;
              }

              if (rate !== 1.0) {
                console.log(`[Sync] Predictive Correction: ${isBehind ? 'BEHIND' : 'AHEAD'} by ${drift.toFixed(3)}s -> Rate: ${rate}x`);
                player.setPlaybackRate(rate);

                // Maintain rate based on severity (longer for larger drifts)
                const duration = drift > 1.0 ? 2000 : 1000;

                setTimeout(() => {
                  if (playerRef.current) {
                    playerRef.current.setPlaybackRate(1.0);
                  }
                }, duration);
              }
            }
          } else if (drift > 0.1) {
            // Micro-correction for very small drifts that don't trigger Soft Sync threshold
            // This ensures we don't ignore "almost perfect" sync
            const isBehind = actualTime < targetTime;
            const rate = isBehind ? 1.01 : 0.99;
            // Unlogged micro-adjustment
            player.setPlaybackRate(rate);
            setTimeout(() => { if (playerRef.current) playerRef.current.setPlaybackRate(1.0); }, 500);
          }

          // Sync play/pause state
          const currentState = player.getPlayerState();
          if (data.isPlaying && currentState !== PlayerState.PLAYING && currentState !== PlayerState.BUFFERING) {
            console.log('[Sync] Playing video');
            player.playVideo();
          } else if (!data.isPlaying && currentState === PlayerState.PLAYING) {
            console.log('[Sync] Pausing video');
            player.pauseVideo();
          }

          // Update refs
          latestPlaybackDataRef.current = {
            playbackTime: data.playbackTime,
            isPlaying: data.isPlaying,
            timestamp: now,
            serverTimestamp: data.serverTimestamp
          };

          // Update refs and room state
          roomIsPlayingRef.current = data.isPlaying;

          if (room) {
            setRoom(prev => prev ? ({
              ...prev,
              playbackTime: data.playbackTime,
              isPlaying: data.isPlaying,
            }) : null);
          }
        } catch (error) {
          console.error('[Sync] Error handling playback update:', error);
        }
      } else {
        const reason = [];
        if (isRoomCreator) reason.push('isCreator');
        if (!playerRef.current) reason.push('noPlayerRef');
        if (!playerReady) reason.push('playerNotReady');

      }
    },
    onStreamChange: (streamId) => {
      // Find the stream in our current data
      // Use functional update to access latest state without dependency
      setRoom(prev => {
        if (!prev) return null;

        const nextStream = prev.streams.find(s => s.streamId === streamId);

        // Optimistic update: Switch immediately without waiting for API
        if (nextStream) {
          return {
            ...prev,
            currentStream: {
              id: nextStream.id,
              stream: nextStream.stream
            }
          };
        }
        return prev;
      });

      // Still fetch to ensure consistency/receive full data, but UI should have already updated
      fetchRoom();
    },
  });




  // Fetch room function (defined early for use in useEffects)
  const fetchRoom = useCallback(async () => {
    if (!roomId) return;
    try {
      const response = await fetch(`/api/rooms/${roomId}`, {
        credentials: 'include',
      });
      if (!response.ok) {
        if (response.status === 404) {
          console.error('Room not found, redirecting to dashboard');
          setRoom(null); // Clear room state to stop sync loops
          setError('Room not found');
          router.push('/dashboard');
        } else {
          throw new Error('Failed to fetch room');
        }
        return;
      }

      const data = await response.json();
      setRoom(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching room:', error);
      if (!room) {
        setError('Failed to load room. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [roomId, userId, router]); // DO NOT include room here, it causes infinite loops

  // Removed automatic leave on unload/unmount to prevent accidental room deletion on refresh
  // Users will remain in the room database until they explicitly click leave or a cleanup job runs
  /* useEffect(() => {
    const handleUnload = () => {
      if (roomId && userId) {
        // Use beacon API for reliable request on unload
        const blob = new Blob([JSON.stringify({})], { type: 'application/json' });
        navigator.sendBeacon(`/api/rooms/${roomId}/leave`, blob);
      }
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      // Also leave when component unmounts (navigation)
      // Note context: handleUnload logic is synchronous, so we can't await fetch here
      // But for in-app navigation, we can fire and forget
      if (roomId) {
        fetch(`/api/rooms/${roomId}/leave`, {
          method: 'POST',
          keepalive: true
        }).catch(err => console.error('Error leaving room:', err));
      }
    };
  }, [roomId, userId]); */

  // Get user ID
  useEffect(() => {
    if (session?.user?.email) {
      fetchUserId();
    }
  }, [session]);

  // NOTE: Using direct YouTube iframe embed instead of IFrame Player API
  // The API was failing to load due to environmental blocking (extensions, firewall, etc.)
  // Direct iframe is simpler and more reliable across different environments

  // Fetch room data
  useEffect(() => {
    if (roomId) {
      fetchRoom();
    }
  }, [roomId, fetchRoom]);

  // Auto-select most upvoted stream if no current stream is set
  useEffect(() => {
    if (!room || !userId) return;
    const isRoomMemberCheck = room.members.some((m) => m.userId === userId);
    const hasAccess = isRoomMemberCheck || room.creator.id === userId;

    if (!hasAccess) {
      return;
    }
    if (room.currentStream) {
      return;
    }
    if (room.streams.length === 0) {
      return;
    }

    // Sort streams by upvote count and select the most upvoted one
    const sortedStreams = [...room.streams].sort((a, b) => b.upvoteCount - a.upvoteCount);
    const mostUpvotedStream = sortedStreams[0];
    if (mostUpvotedStream && handlePlayStreamRef.current) {
      // streamId in RoomStream is the Stream.id, which is what handlePlayStream expects
      handlePlayStreamRef.current(mostUpvotedStream.streamId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room?.id, room?.currentStream?.id, room?.streams?.length, userId, room?.members]);

  // Track upvoted streams
  useEffect(() => {
    if (room && userId) {
      const upvoted = new Set<string>();
      room.streams.forEach((rs) => {
        const userUpvoted = rs.upvotes?.some((u) => u.userId === userId);
        if (userUpvoted) {
          upvoted.add(rs.streamId);
        }
      });
      setUpvotedStreams(upvoted);
    }
  }, [room, userId]);

  // Reset skip votes when stream changes
  useEffect(() => {
    const currentStreamId = room?.currentStream?.stream.id || null;
    if (currentStreamId !== skipInfo.streamId) {
      setSkipInfo({
        streamId: currentStreamId,
        votes: [],
        threshold: 0
      });
    }
  }, [room?.currentStream?.id, skipInfo.streamId]);

  // Fetch recommended videos based on current stream
  useEffect(() => {
    const currentVideoId = room?.currentStream?.stream.extractedId;
    if (!currentVideoId) {
      setRecommendedVideos([]);
      return;
    }

    // Check cache first
    const cached = recommendationsCache.current.get(currentVideoId);
    if (cached) {
      setRecommendedVideos(cached);
      return;
    }

    const fetchRecommended = async () => {
      try {
        setIsLoadingRecommended(true);
        const response = await fetch(`/api/youtube/related?videoId=${currentVideoId}`);
        if (response.ok) {
          const data = await response.json();
          const result = data.data || data;
          const videos = result.videos || [];

          // Cache the results
          recommendationsCache.current.set(currentVideoId, videos);
          setRecommendedVideos(videos);
        }
      } catch (error) {
        console.error('Error fetching recommended videos:', error);
      } finally {
        setIsLoadingRecommended(false);
      }
    };

    fetchRecommended();

    // Prefetch suggestions for the next video in queue (if exists)
    // This makes switching to the next video feel instant
    if (room?.streams && room.streams.length > 0) {
      const sortedStreams = [...room.streams].sort((a, b) => b.upvoteCount - a.upvoteCount);
      const currentIndex = sortedStreams.findIndex(s => s.stream.extractedId === currentVideoId);
      const nextStream = sortedStreams[currentIndex + 1];

      if (nextStream && !recommendationsCache.current.has(nextStream.stream.extractedId)) {
        // Prefetch in background (don't await)
        fetch(`/api/youtube/related?videoId=${nextStream.stream.extractedId}`)
          .then(res => res.json())
          .then(data => {
            const result = data.data || data;
            const videos = result.videos || [];
            recommendationsCache.current.set(nextStream.stream.extractedId, videos);
          })
          .catch(err => console.log('Prefetch failed:', err));
      }
    }
  }, [room?.currentStream?.stream.extractedId, room?.streams]);

  // Combine recommendations with voted songs from queue
  const displayedSuggestions = useMemo(() => {
    if (!room) return [];

    // 1. Get all streams that have votes and are not currently playing
    const votedStreams = (room.streams || [])
      .filter(s =>
        s.upvoteCount > 0 &&
        s.stream.extractedId !== room.currentStream?.stream.extractedId
      )
      .map(s => ({
        id: s.stream.extractedId,
        title: s.stream.title,
        thumbnail: s.stream.smallImg,
        channelTitle: 'Trending in Room', // Generic label instead of adder's email
        upvoteCount: s.upvoteCount
      }));

    // 2. Map recommended videos to include their upvoteCount if they exist in room streams
    const recommendationsWithVotes = recommendedVideos.map(video => {
      const existingStream = room.streams.find(s => s.stream.extractedId === video.id);
      return {
        ...video,
        upvoteCount: existingStream?.upvoteCount || 0
      };
    });

    // 3. Create a unique list, prioritizing richness of metadata (YouTube API data)
    const uniqueMap = new Map();

    // Add recommendations first (rich metadata)
    recommendationsWithVotes.forEach(v => uniqueMap.set(v.id, v));

    // Add/Merge voted streams from the queue
    votedStreams.forEach(v => {
      if (!uniqueMap.has(v.id)) {
        uniqueMap.set(v.id, v);
      } else {
        // If it's already in recommendations, just ensure we have the highest vote count
        const existing = uniqueMap.get(v.id);
        if (v.upvoteCount > existing.upvoteCount) {
          uniqueMap.set(v.id, { ...existing, upvoteCount: v.upvoteCount });
        }
      }
    });

    // 4. Return sorted list (voted first, then by vote count)
    return Array.from(uniqueMap.values())
      .filter(v => v.id !== room.currentStream?.stream.extractedId)
      .sort((a, b) => (b.upvoteCount || 0) - (a.upvoteCount || 0));
  }, [recommendedVideos, room?.streams, room?.currentStream?.stream.extractedId]);

  // Handle search
  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      const response = await fetch(`/api/youtube/search?q=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        // Handle both wrapped { data: { videos: [] } } and direct { videos: [] } formats
        const result = data.data || data;
        setSearchResults(result.videos || []);
      }
    } catch (error) {
      console.error('Error searching videos:', error);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchQuery) {
      searchTimeoutRef.current = setTimeout(() => {
        handleSearch(searchQuery);
      }, 500);
    } else {
      setSearchResults([]);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, handleSearch]);



  // Update playback state (creator only) - no debouncing when playing for ultra-tight sync
  const updatePlaybackState = async (playbackTime: number, isPlaying: boolean, immediate = false) => {
    const isRoomCreatorCheck = room?.creator.id === userId;

    if (!roomId || !isRoomCreatorCheck) {
      return;
    }

    // No debouncing when playing - send updates every frame for ultra-tight sync
    const now = performance.now();

    // Throttle updates:
    // - Immediate if requested (manual play/pause/seek)
    // - CREATOR_BROADCAST interval if playing (2s)
    // - 1s if paused
    const throttleInterval = isPlaying ? SYNC_INTERVALS.CREATOR_BROADCAST : 1000;
    if (!immediate && (now - lastUpdateTimeRef.current) < throttleInterval) {
      return;
    }
    lastUpdateTimeRef.current = now;

    // Send to Ably immediately
    publishPlaybackUpdate(playbackTime, isPlaying);

    // Update DB in parallel (don't block on it)
    try {
      fetch(`/api/rooms/${roomId}/playback`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ playbackTime, isPlaying }),
      }).then((response) => {
        if (!response.ok) {
          console.error('Failed to update playback state in DB');
        } else {
          lastSyncRef.current = { time: playbackTime, timestamp: Date.now(), isPlaying };
        }
      }).catch((error) => {
        console.error('Error updating playback state in DB:', error);
      });
    } catch (error) {
      console.error('Error updating playback state:', error);
    }
  };

  // Keep updatePlaybackStateRef in sync
  useEffect(() => {
    updatePlaybackStateRef.current = updatePlaybackState;
  }, [updatePlaybackState]);

  // Creator sends playback state updates
  useEffect(() => {
    // Add debug logging for effect entry
    const checkState = {
      roomId: !!roomId,
      currentStream: !!room?.currentStream,
      isCreator: isRoomCreator,
      playerReady,
      hasPlayerRef: !!playerRef.current
    };

    if (!roomId) return; // Silent return if no room

    // Only log if something important is missing
    if (!roomId || !room?.currentStream || !isRoomCreator || !playerReady || !playerRef.current) {
      return;
    }

    let animationFrameId: number | null = null;
    let lastUpdateTime = 0;

    const scheduleSync = () => {
      if (!isSyncingRef.current && playerRef.current) {
        try {
          const now = Date.now();
          const player = playerRef.current;

          // Get current state directly from player
          const currentTime = player.getCurrentTime();
          const playerState = player.getPlayerState();
          const isPlaying = playerState === PlayerState.PLAYING;

          // Detect seeks or state changes
          const timeSinceLastUpdate = now - lastUpdateTime;

          // Calculate projected time from last sync to detect manual seeks
          let timeDrift = 0;
          if (lastSyncRef.current) {
            const timeSinceSync = (now - lastSyncRef.current.timestamp) / 1000;
            const projectedTime = lastSyncRef.current.time + (lastSyncRef.current.isPlaying ? timeSinceSync : 0);
            timeDrift = Math.abs(currentTime - projectedTime);
          }

          // Detect state change (Play <-> Pause)
          const stateChanged = isPlaying !== lastSyncRef.current?.isPlaying;

          const shouldUpdate =
            stateChanged ||
            !lastSyncRef.current ||
            (timeSinceLastUpdate >= SYNC_INTERVALS.CREATOR_BROADCAST) ||
            (timeDrift > 1.5); // Broadcast immediately if time jumps significantly (Seek)

          if (shouldUpdate) {
            // Force immediate update if state changed
            updatePlaybackState(currentTime, isPlaying, stateChanged);
            lastSyncRef.current = { time: currentTime, timestamp: now, isPlaying };
            lastUpdateTime = now;
          }
        } catch (error) {
          console.error('[Sync] Error syncing playback state:', error);
        }
      }

      // Schedule next frame
      animationFrameId = requestAnimationFrame(scheduleSync);
    };

    // Start the sync loop
    animationFrameId = requestAnimationFrame(scheduleSync);

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [roomId, room?.currentStream?.id, room?.creator.id, userId, publishPlaybackUpdate, isRoomCreator, playerReady]);



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

  const handleJoin = async () => {
    if (!roomId) return;

    try {
      setIsJoining(true);
      const response = await fetch(`/api/rooms/${roomId}/join`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        fetchRoom();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to join room');
      }
    } catch (error) {
      console.error('Error joining room:', error);
      setError('Failed to join room. Please try again.');
    } finally {
      setIsJoining(false);
    }
  };

  const handleLeave = async () => {
    if (!roomId) return;

    try {
      setIsLeaving(true);
      setError(null);
      const response = await fetch(`/api/rooms/${roomId}/leave`, {
        method: 'POST',
        credentials: 'include',
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        router.push('/rooms');
      } else {
        setError(data.error || data.message || 'Failed to leave room');
      }
    } catch (error) {
      console.error('Error leaving room:', error);
      setError('Failed to leave room. Please try again.');
    } finally {
      setIsLeaving(false);
    }
  };



  const handleUpvote = async (streamId: string) => {
    if (!userId || !roomId || isUpvoting) return;

    const isUpvoted = upvotedStreams.has(streamId);

    try {
      setIsUpvoting(streamId);
      const endpoint = isUpvoted
        ? `/api/rooms/${roomId}/streams/${streamId}/downvote`
        : `/api/rooms/${roomId}/streams/${streamId}/upvote`;

      const response = await fetch(endpoint, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        const newUpvotedStreams = new Set(upvotedStreams);
        if (isUpvoted) {
          newUpvotedStreams.delete(streamId);
        } else {
          newUpvotedStreams.add(streamId);
        }
        setUpvotedStreams(newUpvotedStreams);
        fetchRoom();
      }
    } catch (error) {
      console.error('Error upvoting:', error);
    } finally {
      setIsUpvoting(null);
    }
  };

  const handlePlayStream = useCallback(async (streamId: string) => {
    if (!roomId) {
      return;
    }

    // Optimistic update: Switch stream immediately in local state
    setRoom(prev => {
      if (!prev) return null;

      const targetStream = prev.streams.find(s => s.streamId === streamId);

      if (targetStream) {
        return {
          ...prev,
          currentStream: {
            id: targetStream.id,
            stream: targetStream.stream
          }
        };
      }
      return prev;
    });

    // Publish stream change via Ably immediately for real-time notification
    publishStreamChange(streamId);

    // Update server in background (don't block UI on this)
    try {
      const response = await fetch(`/api/rooms/${roomId}/streams/${streamId}/play`, {
        method: 'PUT',
        credentials: 'include',
      });
      if (response.ok) {
        // Fetch to ensure consistency, but UI already updated
        fetchRoom();
      }
    } catch (error) {
      console.error('Error playing stream:', error);
    }
  }, [roomId, publishStreamChange, fetchRoom]);

  const handleSkipVote = async () => {
    if (!room?.currentStream || !userId || isVotingToSkip) return;

    try {
      setIsVotingToSkip(true);
      const streamId = room.currentStream.stream.id;
      const response = await fetch(`/api/rooms/${roomId}/streams/${streamId}/skip`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        const result = data.data || data;

        // Update local state immediately
        setSkipInfo({
          streamId,
          votes: result.votes,
          threshold: result.threshold
        });

        // Broadcast to others
        publishSkipUpdate({
          streamId,
          votes: result.votes,
          threshold: result.threshold
        });

        if (result.shouldSkip) {
          if (result.nextStreamId) {
            publishStreamChange(result.nextStreamId);
          }
          fetchRoom();
        }
      }
    } catch (error) {
      console.error('Error voting to skip:', error);
    } finally {
      setIsVotingToSkip(false);
    }
  };

  // Update ref when handlePlayStream is defined
  useEffect(() => {
    handlePlayStreamRef.current = handlePlayStream;
  }, [handlePlayStream]);

  const playNextStream = useCallback(async () => {
    if (!room || !room.streams.length) {
      return;
    }

    // Sort streams by upvote count
    const sortedStreams = [...room.streams].sort((a, b) => b.upvoteCount - a.upvoteCount);
    const nextStream = sortedStreams.find((rs) => rs.streamId !== room.currentStream?.stream.id) || sortedStreams[0];

    if (nextStream && handlePlayStreamRef.current) {
      await handlePlayStreamRef.current(nextStream.streamId);
    }
  }, [room, roomId]); // Dependency on room is okay here as it's recreated, but we pass it to ref

  // Ref for playNextStream to be used in player event listener
  const playNextStreamRef = useRef<(() => Promise<void>) | null>(null);

  useEffect(() => {
    playNextStreamRef.current = playNextStream;
  }, [playNextStream]);

  // Helper to get upvoters for a video (from suggestions)
  const getUpvotersForVideo = useCallback((videoId: string) => {
    if (!room) return [];

    // Check if this video is in the queue
    const stream = room.streams.find(s => s.stream.extractedId === videoId);
    if (!stream || !stream.upvotes || stream.upvotes.length === 0) return [];

    // Map upvotes to member user data
    return stream.upvotes.map(vote => {
      const member = room.members.find(m => m.userId === vote.userId);
      return member?.user;
    }).filter(Boolean); // Type guard
  }, [room]);

  const handleRecommendUpvote = async (video: any) => {
    if (!roomId) return;

    // Check if video is already in queue
    const existingStream = room?.streams.find(s => s.stream.extractedId === video.id);

    // Creator: Play immediately (Add if needed -> Play)
    if (isRoomCreator) {
      if (existingStream) {
        // Just play existing
        handlePlayStream(existingStream.streamId);
      } else {
        // Optimistic Add + Play
        const tempId = `temp-${video.id}`;

        // Optimistic update
        setRoom(prev => {
          if (!prev) return null;
          const optimisticStream = {
            id: tempId,
            streamId: tempId,
            roomId: prev.id,
            addedById: userId || '',
            played: false,
            playedAt: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            order: prev.streams.length + 1,
            stream: {
              id: tempId,
              title: video.title,
              url: `https://www.youtube.com/watch?v=${video.id}`,
              extractedId: video.id,
              bigImg: video.thumbnail?.url || video.thumbnail || '',
              smallImg: video.thumbnail?.url || video.thumbnail || '',
              type: 'Youtube' as const,
              active: true,
              createdAt: new Date(),
              updatedAt: new Date(),
              userId: userId || ''
            },
            addedBy: { id: userId || '', email: '' },
            upvoteCount: 1, // Auto-vote
            upvotes: [],
            _count: { upvotes: 1 }
          };

          return {
            ...prev,
            streams: [...prev.streams, optimisticStream],
            currentStream: {
              id: tempId,
              stream: optimisticStream.stream
            }
          };
        });

        // Publish stream change immediately (optimistic)
        publishStreamChange(tempId);

        try {
          // Add to backend
          const response = await fetch(`/api/rooms/${roomId}/streams`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: `https://www.youtube.com/watch?v=${video.id}` })
          });

          if (response.ok) {
            const newStream = await response.json();
            const realStreamId = newStream.data.streamId; // get the real ID (Stream.id)

            // Now play it properly with the real ID
            await fetch(`/api/rooms/${roomId}/streams/${realStreamId}/play`, {
              method: 'PUT',
              credentials: 'include'
            });

            fetchRoom();
          }
        } catch (error) {
          console.error('Error adding recommended video:', error);
          fetchRoom(); // Revert on error
        }
      }
      return;
    }

    // Member: Vote logic
    if (existingStream) {
      // Already exists -> Upvote it
      handleUpvote(existingStream.streamId);
    } else {
      // Doesn't exist -> Add it (Backend now auto-upvotes)
      try {
        const response = await fetch(`/api/rooms/${roomId}/streams`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: `https://www.youtube.com/watch?v=${video.id}` })
        });

        if (response.ok) {
          addToast('Added to queue', 'success');
          fetchRoom();
        }
      } catch (error) {
        console.error('Error adding video:', error);
        addToast('Failed to add video', 'error');
      }
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Appbar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="h-10 w-64 bg-gray-700/50 rounded animate-pulse mb-2" />
            <div className="h-4 w-96 bg-gray-700/50 rounded animate-pulse mb-4" />
            <div className="flex gap-4">
              <div className="h-4 w-24 bg-gray-700/50 rounded animate-pulse" />
              <div className="h-4 w-20 bg-gray-700/50 rounded animate-pulse" />
            </div>
          </div>
          <div className="mb-8">
            <SkeletonPlayer className="mb-6" />
          </div>
          <div>
            <div className="h-8 w-36 bg-gray-700/50 rounded animate-pulse mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonStreamCard key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !room) {
    return (
      <div className="min-h-screen bg-black">
        <Appbar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 text-center">
            <p className="text-red-400">{error}</p>
            <button
              onClick={() => router.push('/rooms')}
              className="mt-4 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
            >
              Back to Rooms
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!room) return null;

  // Sort streams by upvote count
  const sortedStreams = room.streams ? [...room.streams].sort((a, b) => b.upvoteCount - a.upvoteCount) : [];


  return (
    <div className="min-h-screen bg-black text-gray-100 selection:bg-gray-500/30 selection:text-white pb-20 md:pb-0 overflow-x-hidden">
      <Appbar />
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gray-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gray-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-gray-400/5 rounded-full blur-[100px]" />
      </div>

      {/* Connection status indicator */}
      <div className="fixed top-24 right-8 z-[100]">
        {isConnected ? (
          <div className="bg-black/40 backdrop-blur-md border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-lg shadow-green-500/5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
            Connected
          </div>
        ) : (
          <div className="bg-black/40 backdrop-blur-md border border-yellow-500/30 text-yellow-400 px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-lg shadow-yellow-500/5">
            <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce"></span>
            Connecting...
          </div>
        )}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 py-10 max-w-[1400px]">
        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                Live Session
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight bg-gradient-to-b from-white via-gray-200 to-gray-500 bg-clip-text text-transparent leading-tight flex items-center gap-3">
                {room.name}
                {isRoomCreator && (
                  <div className="bg-yellow-500/10 border border-yellow-500/30 p-1.5 rounded-xl shadow-lg shadow-yellow-500/5">
                    <Crown size={20} className="text-yellow-500 fill-yellow-500/20" />
                  </div>
                )}
              </h1>
              {room.description && (
                <p className="text-lg text-gray-400 font-medium leading-relaxed max-w-xl">
                  {room.description}
                </p>
              )}
              <div className="flex items-center gap-6 pt-2">
                <div className="flex -space-x-3 overflow-hidden">
                  {room.members.slice(0, 5).map((member, i) => (
                    <div key={i} className="relative inline-block h-8 w-8 rounded-full ring-2 ring-black bg-gray-800 flex items-center justify-center text-[10px] font-bold border border-white/10">
                      {member.user.image ? (
                        <img
                          src={member.user.image}
                          alt={member.user.email}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        member.user.email[0].toUpperCase()
                      )}

                      {member.userId === room.creator.id && (
                        <div className="absolute -top-1 -right-1 z-20 bg-yellow-500 rounded-full p-0.5 border-2 border-black shadow-lg">
                          <Crown size={8} className="text-black fill-black" />
                        </div>
                      )}
                    </div>
                  ))}
                  {room._count.members > 5 && (
                    <div className="inline-block h-8 w-8 rounded-full ring-2 ring-black bg-gray-700 flex items-center justify-center text-[10px] font-bold border border-white/10">
                      +{room._count.members - 5}
                    </div>
                  )}
                </div>
                <div className="h-4 w-px bg-white/10" />
                <div className="flex items-center gap-2 text-sm text-gray-400 font-semibold">
                  <Users size={16} className="text-gray-500" />
                  <span>{room._count.members} Members</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400 font-semibold">
                  <Search size={16} className="text-gray-500" />
                  <span>{room._count.streams} Streams</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 lg:self-end">
              {!isRoomMember ? (
                <button
                  onClick={handleJoin}
                  disabled={isJoining || !session}
                  className="group relative px-8 py-4 bg-white text-black rounded-2xl overflow-hidden shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex items-center gap-2 text-lg">
                    {isJoining ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Joining...
                      </>
                    ) : (
                      <>
                        Join Room
                        <Plus size={20} />
                      </>
                    )}
                  </span>
                </button>
              ) : (
                <div className="flex flex-wrap items-center gap-3">
                  {/* <div className="flex items-center gap-1.5 p-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl">
                    {['❤️', '🔥', '👏', '😂', '😮', '💀'].map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => {
                          if (userId) {
                            publishReaction(emoji, userId);
                            setReactions(prev => [
                              ...prev,
                              {
                                id: `${Date.now()}-${Math.random()}`,
                                emoji,
                                x: 10 + Math.random() * 80
                              }
                            ]);
                          }
                        }}
                        className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 hover:scale-110 active:scale-95 transition-all text-xl grayscale-[0.5] hover:grayscale-0"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div> */}




                  <div className="flex items-center gap-2">

                    <button
                      onClick={handleLeave}
                      disabled={isLeaving}
                      className="p-3.5 bg-gray-800/50 hover:bg-gray-700/50 border border-white/10 text-gray-400 rounded-2xl font-bold transition-all hover:scale-105"
                      title="Leave room"
                    >
                      <LogOut size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.header>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 font-semibold"
          >
            <X size={18} />
            {error}
          </motion.div>
        )}

        {/* Player Section */}
        {room.currentStream && (isRoomMember || isRoomCreator) && (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="xl:col-span-8 flex flex-col gap-6"
            >
              {/* Player Container */}
              <div className="group relative">
                {/* Ambient Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-gray-500/20 via-white/5 to-gray-500/20 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

                <div className="relative aspect-video rounded-[2rem] overflow-hidden bg-black shadow-2xl border border-white/10">
                  {playerError ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-950 z-10 p-8 text-center">
                      <div className="space-y-6">
                        <div className="inline-flex p-4 bg-red-500/10 rounded-3xl">
                          <X size={48} className="text-red-500" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">Something went wrong</h3>
                          <p className="text-gray-400 max-w-md mx-auto">{playerError}</p>
                        </div>
                        <button
                          onClick={() => window.location.reload()}
                          className="px-8 py-3 bg-white text-black rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-white/5"
                        >
                          Reload Session
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`absolute inset-0 bg-gray-900 overflow-hidden flex items-center justify-center transition-opacity duration-500 z-10 ${!playerReady ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    >
                      <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-12 h-12 text-white/20 animate-spin" />
                        <p className="text-white/20 font-bold tracking-widest text-xs uppercase animate-pulse">Initializing Interface</p>
                      </div>
                    </div>
                  )}

                  <div
                    id="youtube-player"
                    className="absolute top-0 left-0 w-full h-full"
                  />

                  {/* Floating Reactions Overlay */}
                  {/* <div className="pointer-events-none absolute inset-0 z-50">
                    <FloatingReactions
                      reactions={reactions}
                      onComplete={(id) => setReactions(prev => prev.filter(r => r.id !== id))}
                    />
                  </div> */}
                </div>
              </div>

              {/* Player Info Card */}
              <div className="p-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] flex flex-col sm:flex-row justify-between items-start gap-6 shadow-xl">
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-white tracking-tight leading-snug">
                    {room.currentStream.stream.title}
                  </h2>
                  <div className="flex items-center gap-4">
                    {playerReady && (
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20 text-[10px] font-bold uppercase tracking-wider text-green-500">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                        Synchronized
                      </div>
                    )}
                    <div className="h-4 w-px bg-white/10" />
                    <button
                      onClick={() => handleUpvote(room.currentStream!.stream.id)}
                      disabled={isUpvoting === room.currentStream!.stream.id || !userId}
                      className={`group flex items-center gap-2.5 px-5 py-2 rounded-xl border transition-all font-bold ${upvotedStreams.has(room.currentStream!.stream.id)
                        ? 'bg-white/10 border-white/20 text-white'
                        : 'bg-white text-black border-transparent hover:scale-105 active:scale-95'
                        }`}
                    >
                      <ThumbsUp size={18} className={upvotedStreams.has(room.currentStream!.stream.id) ? 'fill-white' : ''} />
                      <span>{room.streams.find(rs => rs.streamId === room.currentStream!.stream.id)?.upvoteCount ?? 0}</span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3 w-full sm:w-auto self-end sm:self-center">
                  <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                    <span>Vote Skip Status</span>
                    <span className="text-white ml-auto">{skipInfo.votes.length} / {skipInfo.threshold}</span>
                  </div>
                  <div className="w-full sm:w-64 bg-white/5 rounded-full h-2 overflow-hidden border border-white/5 p-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(skipInfo.votes.length / skipInfo.threshold) * 100}%` }}
                      className="bg-red-500 h-full rounded-full shadow-[0_0_12px_rgba(239,68,68,0.4)]"
                    />
                  </div>
                  <button
                    onClick={handleSkipVote}
                    disabled={isVotingToSkip}
                    className={`group w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all ${skipInfo.votes.includes(userId || '')
                      ? 'bg-red-500/10 text-red-500 border border-red-500/20 cursor-default'
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20'
                      }`}
                  >
                    <LogOut size={16} className="rotate-90 group-hover:translate-x-1 transition-transform" />
                    {skipInfo.votes.includes(userId || '') ? 'Voted' : 'Skip Next'}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Sidebar / Recommended and Queue Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="xl:col-span-4 flex flex-col gap-8"
            >
              {/* Recommendations */}
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden flex flex-col h-full max-h-[460px] shadow-2xl">
                {/* Search Header */}
                <div className="p-6 border-b border-white/10 bg-white/[0.02] space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {searchQuery ? 'Search Results' : 'Smart Suggestions'}
                    </h3>
                    {!searchQuery && (
                      <div className="px-2 py-0.5 bg-gray-500/20 rounded-md text-[10px] font-bold text-gray-400">BETA</div>
                    )}
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={16} className="text-gray-500 group-focus-within:text-white transition-colors" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for videos..."
                      className="block w-full pl-10 pr-3 py-2.5 bg-black/20 border border-white/10 rounded-xl text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-white/20 transition-all font-medium"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSearchResults([]);
                        }}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        <X size={14} className="text-gray-500 hover:text-white transition-colors" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                  {isSearching ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-3 text-gray-500">
                      <Loader2 className="animate-spin" size={24} />
                      <span className="text-xs font-bold uppercase tracking-wider">Searching...</span>
                    </div>
                  ) : searchQuery ? (
                    searchResults.length > 0 ? (
                      searchResults.map((video) => (
                        <motion.div
                          key={video.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileHover={{ scale: 1.02, x: 4 }}
                          onClick={() => handleRecommendUpvote(video)}
                          className="group flex gap-4 p-3 bg-white/[0.02] hover:bg-white/[0.08] border border-white/[0.05] hover:border-white/10 rounded-2xl cursor-pointer transition-all active:scale-95"
                        >
                          <div className="relative w-28 h-16 shrink-0 rounded-xl overflow-hidden border border-white/5">
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Plus size={20} className="text-white transform scale-50 group-hover:scale-100 transition-transform" />
                            </div>

                            {/* Voting Overlay */}
                            {getUpvotersForVideo(video.id).length > 0 && (
                              <>
                                <div className="absolute top-1 right-1 z-10 flex -space-x-1.5">
                                  {getUpvotersForVideo(video.id).slice(0, 3).map((user: any, i: number) => (
                                    <div key={i} className="w-5 h-5 rounded-full ring-2 ring-black bg-gray-800 flex items-center justify-center text-[6px] font-bold border border-white/20 overflow-hidden shadow-lg">
                                      {user?.image ? (
                                        <img src={user.image} alt={user.email} className="w-full h-full object-cover" />
                                      ) : (
                                        <span className="text-white">{user?.email?.[0]?.toUpperCase()}</span>
                                      )}
                                    </div>
                                  ))}
                                  {getUpvotersForVideo(video.id).length > 3 && (
                                    <div className="w-5 h-5 rounded-full ring-2 ring-black bg-gray-700 flex items-center justify-center text-[6px] font-bold border border-white/20 shadow-lg text-white">
                                      +{getUpvotersForVideo(video.id).length - 3}
                                    </div>
                                  )}
                                </div>
                                <div className="absolute bottom-1 left-1 bg-white text-black text-[10px] font-black px-2 py-0.5 rounded-lg shadow-2xl flex items-center gap-1 z-20">
                                  <ThumbsUp size={10} className="fill-black" />
                                  {getUpvotersForVideo(video.id).length}
                                </div>
                              </>
                            )}
                          </div>
                          <div className="flex-1 min-w-0 py-1 flex flex-col justify-between">
                            <h4 className="text-sm font-bold text-gray-200 line-clamp-2 leading-tight group-hover:text-white transition-colors">
                              {video.title}
                            </h4>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider truncate">{video.channelTitle}</p>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center p-12 text-center text-gray-600 opacity-50">
                        <Search size={40} className="mb-4 stroke-[1.5]" />
                        <p className="text-xs font-bold uppercase tracking-widest">No results found</p>
                      </div>
                    )
                  ) : (
                    // Default Recommendations View
                    isLoadingRecommended ? (
                      Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex gap-4 p-3 bg-white/5 rounded-2xl animate-pulse">
                          <div className="w-24 h-14 bg-white/10 rounded-xl shrink-0" />
                          <div className="space-y-2 flex-1 pt-1">
                            <div className="h-4 bg-white/10 rounded-lg w-full" />
                            <div className="h-3 bg-white/10 rounded-lg w-2/3" />
                          </div>
                        </div>
                      ))
                    ) : displayedSuggestions.length > 0 ? (
                      displayedSuggestions.map((video) => (
                        <motion.div
                          key={video.id}
                          whileHover={{ scale: 1.02, x: 4 }}
                          onClick={() => handleRecommendUpvote(video)}
                          className={`group flex gap-4 p-3 border rounded-2xl cursor-pointer transition-all active:scale-95 ${(video as any).upvoteCount > 0
                            ? 'bg-white/[0.05] border-white/20 shadow-lg shadow-white/5'
                            : 'bg-white/[0.02] hover:bg-white/[0.08] border-white/[0.05] hover:border-white/10'
                            }`}
                        >
                          <div className="relative w-28 h-16 shrink-0 rounded-xl overflow-hidden border border-white/5">
                            <img
                              src={video.thumbnail?.url || (video.thumbnail as any)}
                              alt={video.title}
                              className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Plus size={20} className="text-white transform scale-50 group-hover:scale-100 transition-transform" />
                            </div>
                            {video.duration && (
                              <span className="absolute bottom-1 right-1 bg-black/80 text-[10px] px-1.5 py-0.5 rounded-lg text-white font-bold">
                                {video.duration}
                              </span>
                            )}

                            {(video as any).upvoteCount > 0 && (
                              <div className="absolute inset-0 ring-2 ring-white/20 rounded-xl pointer-events-none" />
                            )}

                            {/* Voting Overlay */}
                            {getUpvotersForVideo(video.id).length > 0 && (
                              <>
                                <div className="absolute top-1 right-1 z-10 flex -space-x-1.5">
                                  {getUpvotersForVideo(video.id).slice(0, 3).map((user: any, i: number) => (
                                    <div key={i} className="w-5 h-5 rounded-full ring-2 ring-black bg-gray-800 flex items-center justify-center text-[6px] font-bold border border-white/20 overflow-hidden shadow-lg">
                                      {user?.image ? (
                                        <img src={user.image} alt={user.email} className="w-full h-full object-cover" />
                                      ) : (
                                        <span className="text-white">{user?.email?.[0]?.toUpperCase()}</span>
                                      )}
                                    </div>
                                  ))}
                                  {getUpvotersForVideo(video.id).length > 3 && (
                                    <div className="w-5 h-5 rounded-full ring-2 ring-black bg-gray-700 flex items-center justify-center text-[6px] font-bold border border-white/20 shadow-lg text-white">
                                      +{getUpvotersForVideo(video.id).length - 3}
                                    </div>
                                  )}
                                </div>
                                <div className="absolute bottom-1 left-1 bg-white text-black text-[10px] font-black px-2 py-0.5 rounded-lg shadow-2xl flex items-center gap-1 z-20">
                                  <ThumbsUp size={10} className="fill-black" />
                                  {getUpvotersForVideo(video.id).length}
                                </div>
                              </>
                            )}
                          </div>
                          <div className="flex-1 min-w-0 py-1 flex flex-col justify-between">
                            <h4 className="text-sm font-bold text-gray-200 line-clamp-2 leading-tight group-hover:text-white transition-colors">
                              {video.title}
                            </h4>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider truncate">{video.channelTitle}</p>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center p-12 text-center text-gray-600 opacity-50 grayscale">
                        <Search size={40} className="mb-4 stroke-[3]" />
                        <p className="text-xs font-bold uppercase tracking-widest">No suggestions available</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}



        {!isRoomMember && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-20 text-center py-20 bg-white/[0.02] backdrop-blur-md border border-white/[0.05] rounded-[3rem]"
          >
            <div className="inline-flex p-6 bg-white/5 rounded-[2rem] mb-8 border border-white/5">
              <Users size={48} className="text-gray-500 stroke-[1.5]" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-widest uppercase mb-4">Awaiting Admission</h2>
            <p className="text-gray-500 font-bold max-w-md mx-auto mb-10 text-xs uppercase tracking-[0.3em]">Authorize session to synchronized playback and collective curation</p>
            <button
              onClick={handleJoin}
              disabled={isJoining || !session}
              className="group relative px-12 py-5 bg-white text-black rounded-[2rem] font-bold overflow-hidden hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-white/10"
            >
              <span className="relative z-10 text-xl tracking-tight">JOIN COLLECTIVE</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

