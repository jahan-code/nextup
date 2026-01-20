'use client';

import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { Appbar } from '@/src/components';
import { ThumbsUp, Loader2, Plus, Users, LogOut, Search, X, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import type { YouTubePlayer } from '@/src/types';
import { PlayerState, type YouTubeVideo } from '@/src/types/youtube';
import { useRoomAbly } from '@/src/hooks';
import FloatingReactions from '@/src/components/rooms/FloatingReactions';
import { loadYouTubeAPI, getPlayerStateName } from '@/src/lib/youtube/youtube-api.utils';
import {
  subscribeToDebugInfo,
  generateDiagnosticReport
} from '@/src/lib/youtube/youtube-debug.utils';
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
  };
  members: Array<{
    id: string;
    userId: string;
    user: {
      id: string;
      email: string;
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
  const [showAddStream, setShowAddStream] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{
    id: string;
    title: string;
    url: string;
    thumbnail: string;
    channelTitle: string;
  }>>([]);
  const [reactions, setReactions] = useState<Array<{ id: string; emoji: string; x: number }>>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isAddingStream, setIsAddingStream] = useState(false);
  const [skipInfo, setSkipInfo] = useState<{ streamId: string | null, votes: string[], threshold: number }>({
    streamId: null,
    votes: [],
    threshold: 0
  });
  const [isVotingToSkip, setIsVotingToSkip] = useState(false);
  const [recommendedVideos, setRecommendedVideos] = useState<YouTubeVideo[]>([]);
  const [isLoadingRecommended, setIsLoadingRecommended] = useState(false);

  // YouTube Player API ref (replaces iframe ref)
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [playerReady, setPlayerReady] = useState(false);
  const [playerError, setPlayerError] = useState<string | null>(null);
  const [debugReport, setDebugReport] = useState<string>('');

  // Debug subscription
  useEffect(() => {
    // Only subscribe if we're hitting errors or issues
    if (playerError || !playerReady) {
      const updateReport = () => setDebugReport(generateDiagnosticReport());
      const unsubscribe = subscribeToDebugInfo(updateReport);
      return unsubscribe;
    }
  }, [playerError, playerReady]);

  const lastSyncRef = useRef<{ time: number; timestamp: number; isPlaying: boolean } | null>(null);
  const isSyncingRef = useRef(false);
  const lastUpdateTimeRef = useRef<number>(0);

  // UI Debug Logs
  const [syncLogs, setSyncLogs] = useState<string[]>([]);
  const addLog = useCallback((msg: string, data?: any) => {
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    const logEntry = data ? `${timestamp} ${msg} ${JSON.stringify(data)}` : `${timestamp} ${msg}`;
    setSyncLogs(prev => [logEntry, ...prev].slice(0, 50)); // Keep last 50 logs
  }, []);

  // Store latest playback data from Ably messages to avoid stale state
  const latestPlaybackDataRef = useRef<{ playbackTime: number; isPlaying: boolean; timestamp: number; serverTimestamp?: number } | null>(null);

  // Determine if user is creator or member
  const isRoomCreator = useMemo(() => room?.creator.id === userId, [room?.creator.id, userId]);
  const isRoomMember = useMemo(() => room?.members.some((m) => m.userId === userId) || false, [room?.members, userId]);

  // TEMP: Report sync metrics to server for debugging
  useEffect(() => {
    if (!roomId || !userId || !room || !playerReady) return;

    const reportInterval = setInterval(() => {
      const role = isRoomCreator ? 'CREATOR' : 'MEMBER';
      let currentTime = 0;
      let isPlayingStr = 'unknown';

      if (isRoomCreator && playerRef.current) {
        try {
          currentTime = playerRef.current.getCurrentTime();
          const state = playerRef.current.getPlayerState();
          isPlayingStr = getPlayerStateName(state);
        } catch (err) {
          console.error('[SyncDebug] Error getting player state:', err);
        }
      } else {
        // Member: Use dead reckoning from latest Ably update
        if (latestPlaybackDataRef.current) {
          const now = Date.now();
          const state = latestPlaybackDataRef.current;
          const elapsed = (now - state.timestamp) / 1000;
          currentTime = state.isPlaying ? (state.playbackTime + elapsed) : state.playbackTime;
          isPlayingStr = state.isPlaying ? 'PLAYING' : 'PAUSED';
        }
      }

      // Send to server (fire and forget)
      fetch('/api/log-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          role: isRoomCreator ? 'CREATOR' : 'MEMBER',
          time: currentTime,
          state: isPlayingStr,
          debug: {
            isMember: isRoomMember,
            isCreator: isRoomCreator,
            hasPlayerRef: !!playerRef.current,
            playerReady,
            hasRoom: !!room,
            hasStream: !!room?.currentStream,
          }
        })
      }).catch(() => { });

    }, 2000);

    return () => clearInterval(reportInterval);
  }, [roomId, userId, isRoomCreator, isRoomMember, room?.currentStream, playerReady]);

  // Helper to log to server from browser
  const serverLog = useCallback((msg: string) => {
    if (!userId) {
      console.log(`[SyncDebug] (No User) ${msg}`);
      return;
    }
    fetch('/api/log-sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, message: msg })
    }).catch(() => { });
    console.log(`[SyncDebug] ${msg}`);
  }, [userId]);

  // Initialize YouTube Player API
  useEffect(() => {
    if (!room?.currentStream) return;

    let player: YouTubePlayer | null = null;
    let mounted = true;

    const initPlayer = async () => {
      try {
        serverLog('Loading YouTube API...');
        const YT = await loadYouTubeAPI();

        if (!mounted) return;

        serverLog('YouTube API loaded, creating player...');

        // Create player
        player = new YT.Player('youtube-player', {
          videoId: room.currentStream!.stream.extractedId,
          playerVars: {
            autoplay: 0,
            controls: 1,
            enablejsapi: 1,
            origin: window.location.origin,
            rel: 0, // Don't show related videos from other channels
            modestbranding: 1,
          },
          events: {
            onReady: (event) => {
              if (!mounted) return;
              serverLog('Player ready!');
              playerRef.current = event.target;
              setPlayerReady(true);
              setPlayerError(null);
            },
            onStateChange: (event) => {
              if (!mounted) return;
              const stateName = getPlayerStateName(event.data);
              serverLog(`Player state changed: ${stateName} (${event.data})`);
            },
            onError: (event) => {
              if (!mounted) return;
              const errorMsg = `Player error: ${event.data}`;
              serverLog(errorMsg);
              setPlayerError(errorMsg);
            }
          }
        });
      } catch (error) {
        if (!mounted) return;
        const errorMsg = `Failed to initialize YouTube player: ${error}`;
        serverLog(errorMsg);
        setPlayerError(errorMsg);
      }
    };

    initPlayer();

    return () => {
      mounted = false;
      serverLog('Cleaning up player...');
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
  }, [room?.currentStream?.stream.extractedId, serverLog]);

  // Ref for handlePlayStream to avoid circular dependency
  const handlePlayStreamRef = useRef<((streamId: string) => Promise<void>) | null>(null);

  // Ably real-time hook
  console.log('[SYNC_DEBUG] RoomPage: Calling useRoomAbly', { roomId, isCreator: isRoomCreator || false, hasRoom: !!room, hasUserId: !!userId });
  const { isConnected, publishPlaybackUpdate, publishStreamChange, publishReaction, publishSkipUpdate } = useRoomAbly({
    roomId,
    isCreator: isRoomCreator || false,
    debugLog: addLog,
    onSkipUpdate: (data) => {
      setSkipInfo(data);
      if (data.threshold > 0 && data.votes.length >= data.threshold) {
        addLog(`[Sync] Skip threshold reached! (${data.votes.length}/${data.threshold})`);
        // If it's for current stream, it will be handled by stream:change or just wait for DB sync
      }
    },
    onReaction: (data) => {
      setReactions(prev => [
        ...prev,
        {
          id: `${Date.now()}-${Math.random()}`,
          emoji: data.emoji,
          x: 10 + Math.random() * 80 // random horizontal position 10% to 90%
        }
      ]);
    },
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

          console.log('[SyncDebug] Ably Update:', {
            targetTime,
            actualTime,
            drift: drift.toFixed(3),
            latency: (latency / 1000).toFixed(3),
            isPlaying: data.isPlaying
          });

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

          // Update room state
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

        console.log(`[SyncDebug] RoomPage skipping update. Reason: ${reason.join(', ')} | Creator: ${isRoomCreator} | PlayerRef: ${!!playerRef.current} | Ready: ${playerReady}`);
      }
    },
    onStreamChange: (streamId) => {
      // Handle stream change via Ably
      if (handlePlayStreamRef.current) {
        handlePlayStreamRef.current(streamId);
      }
    },
  });



  // Sync Health Stats
  const [syncStats, setSyncStats] = useState({
    role: 'UNKNOWN',
    isConnected: false,
    playerState: 'UNKNOWN',
    currentTime: 0,
    lastUpdateAge: 0,
    drift: 0,
    latency: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const player = playerRef.current;
      const getPlayerStateString = (state: number | undefined): string => {
        if (state === undefined) return 'NO_PLAYER';
        switch (state) {
          case -1: return 'UNSTARTED';
          case 0: return 'ENDED';
          case 1: return 'PLAYING';
          case 2: return 'PAUSED';
          case 3: return 'BUFFERING';
          case 5: return 'CUED';
          default: return `UNKNOWN(${state})`;
        }
      };

      const stats = {
        role: isRoomCreator ? 'CREATOR' : 'MEMBER',
        isConnected,
        playerState: player && typeof player.getPlayerState === 'function' ? getPlayerStateString(player.getPlayerState()) : 'NO_PLAYER',
        currentTime: player && typeof player.getCurrentTime === 'function' ? player.getCurrentTime() : 0,
        lastUpdateAge: 0,
        drift: 0,
        latency: 0
      };

      const now = Date.now();
      if (isRoomCreator) {
        stats.lastUpdateAge = now - lastUpdateTimeRef.current;
      } else if (latestPlaybackDataRef.current) {
        stats.lastUpdateAge = now - latestPlaybackDataRef.current.timestamp;

        // Calculate current drift estimate
        if (player && typeof player.getCurrentTime === 'function') {
          const targetTime = latestPlaybackDataRef.current.isPlaying
            ? latestPlaybackDataRef.current.playbackTime + ((now - latestPlaybackDataRef.current.serverTimestamp!) / 1000)
            : latestPlaybackDataRef.current.playbackTime;
          stats.drift = Math.abs(player.getCurrentTime() - targetTime);
          stats.latency = now - (latestPlaybackDataRef.current.serverTimestamp || now);
        }
      }

      setSyncStats(stats);
    }, 500);
    return () => clearInterval(interval);
  }, [isConnected, isRoomCreator, playerReady]);

  // Fetch room function (defined early for use in useEffects)
  const fetchRoom = useCallback(async () => {
    if (!roomId) return;
    try {
      const response = await fetch(`/api/rooms/${roomId}`, {
        credentials: 'include',
      });
      if (!response.ok) {
        if (response.status === 404) {
          setError('Room not found');
        } else {
          throw new Error('Failed to fetch room');
        }
        return;
      }

      const data = await response.json();
      setRoom(data);
      serverLog(`Room Loaded: ${data.id} | Creator: ${data.creator.id} | MyId: ${userId} | isCreator: ${data.creator.id === userId}`);
      setError(null);
    } catch (error) {
      console.error('Error fetching room:', error);
      if (!room) {
        setError('Failed to load room. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [roomId, userId, serverLog]); // DO NOT include room here, it causes infinite loops

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

    const fetchRecommended = async () => {
      try {
        setIsLoadingRecommended(true);
        const response = await fetch(`/api/youtube/related?videoId=${currentVideoId}`);
        if (response.ok) {
          const data = await response.json();
          const result = data.data || data;
          setRecommendedVideos(result.videos || []);
        }
      } catch (error) {
        console.error('Error fetching recommended videos:', error);
      } finally {
        setIsLoadingRecommended(false);
      }
    };

    fetchRecommended();
  }, [room?.currentStream?.stream.extractedId]);

  // Update playback state (creator only) - no debouncing when playing for ultra-tight sync
  const updatePlaybackState = async (playbackTime: number, isPlaying: boolean, immediate = false) => {
    const isRoomCreatorCheck = room?.creator.id === userId;

    if (!roomId || !isRoomCreatorCheck) {
      if (Math.random() < 0.05) { // Sample logs to avoid spamming
        addLog(`[SyncDebug] updatePlaybackState ignored: RoomId=${!!roomId}, isCreator=${isRoomCreatorCheck} (UserId=${userId}, CreatorId=${room?.creator.id})`);
      }
      return;
    }

    // No debouncing when playing - send updates every frame for ultra-tight sync
    const now = performance.now();

    // Throttle updates:
    // - Immediate if requested
    // - CREATOR_BROADCAST interval if playing (2s)
    // - 1s if paused
    const throttleInterval = isPlaying ? SYNC_INTERVALS.CREATOR_BROADCAST : 1000;
    if (!immediate && (now - lastUpdateTimeRef.current) < throttleInterval) {
      return;
    }
    lastUpdateTimeRef.current = now;

    // Parallel updates: Send to Ably immediately (fire and forget), update DB in background
    // Parallel updates: Send to Ably immediately (fire and forget), update DB in background

    // Send to Ably immediately
    publishPlaybackUpdate(playbackTime, isPlaying);

    // Update DB in parallel (don't block on it)
    try {// Fire and forget DB update - don't wait for response
      fetch(`/api/rooms/${roomId}/playback`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ playbackTime, isPlaying }),
      }).then((response) => {
        if (!response.ok) {
          console.error('Failed to update playback state in DB');
        } else {
          // Update last sync ref on success
          lastSyncRef.current = { time: playbackTime, timestamp: now, isPlaying };
        }
      }).catch((error) => {
        console.error('Error updating playback state in DB:', error);
      });
    } catch (error) {
      console.error('Error updating playback state:', error);
    }
  };

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
    if (isRoomCreator && (!playerReady || !playerRef.current)) {
      addLog(`[SyncDebug] Creator loop waiting: Ready=${playerReady}, Ref=${!!playerRef.current}`);
    }

    if (!roomId || !room?.currentStream || !isRoomCreator || !playerReady || !playerRef.current) {
      return;
    }

    addLog('[SyncDebug] Creator sync loop starting');

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

          const shouldUpdate =
            (isPlaying !== lastSyncRef.current?.isPlaying) ||
            !lastSyncRef.current ||
            (timeSinceLastUpdate >= SYNC_INTERVALS.CREATOR_BROADCAST) ||
            (timeDrift > 1.5); // Broadcast immediately if time jumps significantly (Seek)

          if (shouldUpdate) {
            // Log only on explicit events (seek/pause/play) or very rarely
            if (timeDrift > 1.5 || isPlaying !== lastSyncRef.current?.isPlaying) {
              addLog(`[SyncDebug] Broadcast: ${isPlaying ? 'PLAY' : 'PAUSE'} @ ${currentTime.toFixed(2)}s (Drift: ${timeDrift.toFixed(3)}s)`);
            } else if (Math.random() < 0.01) {
              // Sample 1% of tick logs
              console.log('[SyncDebug] Creator Broadcasting (Sampled):', { currentTime, isPlaying });
            }

            updatePlaybackState(currentTime, isPlaying, false);
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
      const response = await fetch(`/api/rooms/${roomId}/leave`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        router.push('/rooms');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to leave room');
      }
    } catch (error) {
      console.error('Error leaving room:', error);
      setError('Failed to leave room. Please try again.');
    } finally {
      setIsLeaving(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    try {
      setIsSearching(true);
      const response = await fetch(`/api/youtube/search?q=${encodeURIComponent(searchQuery.trim())}`, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.videos || []);
      }
    } catch (error) {
      console.error('Error searching YouTube:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddStream = async (video: {
    id: string;
    title: string;
    url: string;
    thumbnail: string;
    channelTitle: string;
  }) => {
    if (!roomId) return;

    try {
      setIsAddingStream(true);
      const response = await fetch(`/api/rooms/${roomId}/streams`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ url: video.url }),
      });

      if (response.ok) {
        const data = await response.json();
        const result = data.data || data;
        // The API returns RoomStream with stream.id, we need stream.id for handlePlayStream
        const addedStreamId = result.stream?.id || result.streamId;

        setSearchQuery('');
        setSearchResults([]);
        setShowAddStream(false);

        // Refresh room data first
        await fetchRoom();

        // If there's no current stream, automatically set the newly added stream as current
        if (addedStreamId && !room?.currentStream && handlePlayStreamRef.current) {
          // Wait a bit for the room to update, then set as current
          setTimeout(() => {
            try {
              handlePlayStreamRef.current?.(addedStreamId);
            } catch (error) {
              console.error('Error setting stream as current:', error);
            }
          }, 500);
        }
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to add stream');
      }
    } catch (error) {
      console.error('Error adding stream:', error);
      setError('Failed to add stream. Please try again.');
    } finally {
      setIsAddingStream(false);
    }
  };

  const handleRecommendUpvote = async (video: YouTubeVideo) => {
    if (!roomId || !userId || isAddingStream) return;

    try {
      setIsAddingStream(true);

      // Check if video is already in the room
      const existingRoomStream = room?.streams.find(rs => rs.stream.extractedId === video.id);

      if (existingRoomStream) {
        // Just upvote it
        await handleUpvote(existingRoomStream.streamId);
      } else {
        // Add it - the backend should handle the initial upvote
        const response = await fetch(`/api/rooms/${roomId}/streams`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ url: video.url }),
        });

        if (response.ok) {
          await fetchRoom();
        } else {
          const data = await response.json();
          setError(data.error || 'Failed to add recommended video');
        }
      }
    } catch (error) {
      console.error('Error handling recommended upvote:', error);
    } finally {
      setIsAddingStream(false);
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

    try {
      const response = await fetch(`/api/rooms/${roomId}/streams/${streamId}/play`, {
        method: 'PUT',
        credentials: 'include',
      });
      if (response.ok) {
        // Publish stream change via Ably for real-time notification
        publishStreamChange(streamId);
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
          addLog('[Sync] Vote skip successful - switching streams');
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

  const playNextStream = async () => {
    if (!room || !room.streams.length) {
      return;
    }

    // Sort streams by upvote count
    const sortedStreams = [...room.streams].sort((a, b) => b.upvoteCount - a.upvoteCount);
    const nextStream = sortedStreams.find((rs) => rs.streamId !== room.currentStream?.stream.id) || sortedStreams[0]; if (nextStream) {
      await handlePlayStream(nextStream.streamId);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="text-indigo-400 animate-spin" size={48} />
      </div>
    );
  }

  if (error && !room) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Appbar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-6 text-center">
            <p className="text-red-400">{error}</p>
            <button
              onClick={() => router.push('/rooms')}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
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

  console.log('[SyncDebug] RoomPage Rendering', {
    userId,
    isCreator: isRoomCreator,
    isMember: isRoomMember,
    currentStream: room.currentStream?.stream.id,
    hasPlayerRef: !!playerRef.current
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1c2e] to-gray-900 pb-20 md:pb-0 md:pl-64">

      {/* Connection status indicator */}
      {isConnected ? (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm z-50 flex items-center gap-2">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          Connected
        </div>
      ) : (
        <div className="fixed top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm z-50 flex items-center gap-2">
          <span className="w-2 h-2 bg-white rounded-full"></span>
          Connecting...
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                {room.name}
              </h1>
              {room.description && (
                <p className="text-gray-400">{room.description}</p>
              )}
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Users size={16} />
                  {room._count.members} members
                </span>
                <span>{room._count.streams} streams</span>
              </div>
            </div>
            <div className="flex gap-2">
              {!isRoomMember ? (
                <button
                  onClick={handleJoin}
                  disabled={isJoining || !session}
                  className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold"
                >
                  {isJoining ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Joining...
                    </>
                  ) : (
                    'Join Room'
                  )}
                </button>
              ) : (
                <>
                  {isRoomMember && (
                    <div className="flex items-center gap-2">
                      <div className="flex bg-gray-800/80 backdrop-blur rounded-full px-4 py-1 border border-white/10 shadow-lg">
                        {['❤️', '🔥', '👏', '😂', '😮', '💀'].map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => {
                              if (userId) {
                                publishReaction(emoji, userId);
                                // Also add locally immediately for better UX
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
                            className="hover:scale-125 transition-transform px-1 text-xl"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setShowAddStream(true)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all flex items-center gap-2 font-semibold"
                      >
                        <Plus size={16} />
                        Add Stream
                      </button>
                    </div>
                  )}
                  <button
                    onClick={handleLeave}
                    disabled={isLeaving || isRoomCreator}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold"
                    title={isRoomCreator ? "Creator cannot leave. Delete room instead." : "Leave room"}
                  >
                    <LogOut size={16} />
                    Leave
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {error && (
          <div className="mb-4 bg-red-900/20 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Player Section */}
        {room.currentStream && (isRoomMember || isRoomCreator) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="bg-gray-800/60 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden">
              {/* YouTube Player Container */}
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                {playerError ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
                    <div className="text-center p-6 max-w-2xl">
                      <p className="text-red-400 mb-2 font-bold text-lg">Player Error</p>
                      <p className="text-gray-300 mb-4">{playerError}</p>

                      <button
                        onClick={() => window.location.reload()}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md mb-4 transition-colors"
                      >
                        Reload Page
                      </button>

                      {/* Diagnostic Info */}
                      <details className="text-left bg-gray-950 p-4 rounded-lg border border-gray-800 text-xs overflow-auto max-h-60 w-full">
                        <summary className="cursor-pointer text-gray-400 font-mono mb-2 hover:text-white">
                          Show Diagnostic Report
                        </summary>
                        <pre className="text-gray-500 whitespace-pre-wrap font-mono">
                          {debugReport || 'Loading diagnostics...'}
                        </pre>
                      </details>
                    </div>
                  </div>
                ) : !playerReady ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                    <div className="text-center">
                      <Loader2 className="text-indigo-400 animate-spin mx-auto mb-2" size={32} />
                      <p className="text-gray-400 text-sm">Loading player...</p>
                    </div>
                  </div>
                ) : null}
                {/* Div that will be replaced by YT.Player */}
                <div
                  id="youtube-player"
                  className="absolute top-0 left-0 w-full h-full"
                />

                {/* Floating Reactions Overlay */}
                <FloatingReactions
                  reactions={reactions}
                  onComplete={(id) => setReactions(prev => prev.filter(r => r.id !== id))}
                />
              </div>

              <div className="p-6 flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">
                    {room.currentStream.stream.title}
                  </h2>
                  {playerReady && (
                    <p className="text-green-400 text-sm flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      Player Ready
                    </p>
                  )}
                </div>

                {isRoomMember && (
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={handleSkipVote}
                      disabled={isVotingToSkip}
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all font-semibold ${skipInfo.votes.includes(userId || '')
                        ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                        }`}
                    >
                      <LogOut size={16} className="rotate-90" />
                      {skipInfo.votes.includes(userId || '') ? 'Voted to Skip' : 'Vote to Skip'}
                    </button>
                    {skipInfo.votes.length > 0 && (
                      <div className="w-full bg-gray-900 rounded-full h-1.5 overflow-hidden border border-gray-800">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(skipInfo.votes.length / skipInfo.threshold) * 100}%` }}
                          className="bg-red-500 h-full"
                        />
                      </div>
                    )}
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">
                      {skipInfo.votes.length} / {skipInfo.threshold} votes to skip
                    </span>
                  </div>
                )}
              </div>

              {/* Recommended Videos Section */}
              {recommendedVideos.length > 0 && (
                <div className="border-t border-purple-500/10 p-6 bg-gray-900/40">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Recommended for You</h3>
                  </div>
                  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2">
                    {recommendedVideos.map((video) => (
                      <motion.div
                        key={video.id}
                        whileHover={{ y: -4 }}
                        className="flex-shrink-0 w-48 group cursor-pointer"
                        onClick={() => handleRecommendUpvote(video)}
                      >
                        <div className="relative aspect-video rounded-lg overflow-hidden mb-2 border border-gray-700 group-hover:border-indigo-500/50 transition-colors">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="bg-indigo-600 p-2 rounded-full transform scale-90 group-hover:scale-100 transition-transform">
                              <ThumbsUp size={16} className="text-white fill-white" />
                            </div>
                          </div>
                          {video.duration && (
                            <span className="absolute bottom-1 right-1 bg-black/80 text-[10px] px-1 rounded text-white font-mono">
                              {video.duration}
                            </span>
                          )}
                        </div>
                        <h4 className="text-xs font-medium text-gray-200 line-clamp-2 leading-tight group-hover:text-indigo-400 transition-colors">
                          {video.title}
                        </h4>
                        <p className="text-[10px] text-gray-500 mt-1 line-clamp-1">{video.channelTitle}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Add Stream Modal */}
        {/* Sync Debug logs - Visible for dev/testing */}
        <div className="mb-8 p-4 bg-gray-900 border border-gray-800 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-400 text-sm font-semibold">Sync Debug Logs</h3>
            <button
              onClick={() => setSyncLogs([])}
              className="text-xs text-red-400 hover:text-red-300 pointer-events-auto"
            >
              Clear Logs
            </button>
          </div>

          {/* Sync Health Dashboard */}
          <div className="mb-4 grid grid-cols-4 gap-2 text-xs font-mono bg-black/40 p-2 rounded border border-gray-800">
            <div className="flex flex-col">
              <span className="text-gray-500">ROLE</span>
              <span className={isRoomCreator ? "text-purple-400" : "text-blue-400"}>
                {syncStats.role}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500">CONNECTION</span>
              <span className={syncStats.isConnected ? "text-green-400" : "text-red-400"}>
                {syncStats.isConnected ? 'ONLINE' : 'OFFLINE'}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500">PLAYER</span>
              <span className="text-white">{syncStats.playerState}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500">TIME</span>
              <span className="text-white">{typeof syncStats.currentTime === 'number' ? syncStats.currentTime.toFixed(2) : '0.00'}s</span>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-500">{isRoomCreator ? 'LAST SENT' : 'LAST RECV'}</span>
              <span className={syncStats.lastUpdateAge < 2000 ? "text-green-400" : "text-red-400"}>
                {syncStats.lastUpdateAge > 0 ? `${(syncStats.lastUpdateAge / 1000).toFixed(1)}s ago` : 'NEVER'}
              </span>
            </div>
            {!isRoomCreator && (
              <>
                <div className="flex flex-col">
                  <span className="text-gray-500">DRIFT</span>
                  <span className={syncStats.drift < 0.2 ? "text-green-400" : syncStats.drift < 1.0 ? "text-yellow-400" : "text-red-400"}>
                    {syncStats.drift.toFixed(3)}s
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500">LATENCY</span>
                  <span className="text-gray-300">
                    {(syncStats.latency).toFixed(0)}ms
                  </span>
                </div>
              </>
            )}
          </div>
          <div className="h-48 overflow-y-auto font-mono text-xs text-gray-400 bg-black/50 p-2 rounded">
            {syncLogs.length === 0 ? (
              <div className="text-gray-600 italic">No sync logs captured yet...</div>
            ) : (
              syncLogs.map((log, i) => (
                <div key={i} className="mb-0.5 border-b border-gray-800/50 pb-0.5">
                  <span className="text-blue-500 mr-2">{log.split(' ')[0]}</span>
                  <span className={log.includes('skipping') ? 'text-yellow-500' : log.includes('publishPlaybackUpdate') ? 'text-green-500' : 'text-gray-300'}>
                    {log.substring(log.indexOf(' '))}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {showAddStream && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddStream(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-800 border border-purple-500/20 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-white">Add Stream to Room</h3>
                <button
                  onClick={() => setShowAddStream(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSearch} className="mb-4">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search YouTube videos..."
                      className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                      disabled={isSearching}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSearching || !searchQuery.trim()}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {isSearching ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
                  </button>
                </div>
              </form>

              {searchResults.length > 0 && (
                <div className="space-y-2">
                  {searchResults.map((video) => (
                    <div
                      key={video.id}
                      className="flex items-center gap-4 p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 cursor-pointer"
                      onClick={() => handleAddStream(video)}
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-24 h-16 object-cover rounded flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium text-sm line-clamp-2">{video.title}</h4>
                        <p className="text-gray-400 text-xs">{video.channelTitle}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddStream(video);
                        }}
                        disabled={isAddingStream}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2"
                      >
                        {isAddingStream ? (
                          <Loader2 className="animate-spin" size={16} />
                        ) : (
                          <>
                            <Plus size={16} />
                            Add
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* Stream Queue */}
        {(isRoomMember || isRoomCreator) && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Stream Queue</h2>
            {sortedStreams.length === 0 ? (
              <div className="text-center py-12 bg-gray-800/30 rounded-xl border border-purple-500/20">
                <p className="text-gray-400">No streams in queue. Add some to get started!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedStreams.map((roomStream, index) => (
                  <motion.div
                    key={roomStream.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`bg-gray-800/60 backdrop-blur-sm border rounded-xl overflow-hidden transition-all ${room.currentStream?.stream.id === roomStream.stream.id
                      ? 'border-green-500/50 shadow-lg shadow-green-500/20'
                      : 'border-purple-500/20 hover:border-purple-500/40'
                      }`}
                  >
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={roomStream.stream.bigImg || roomStream.stream.smallImg || '/placeholder.jpg'}
                        alt={roomStream.stream.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${roomStream.stream.extractedId}/maxresdefault.jpg`;
                        }}
                      />
                      {room.currentStream?.stream.id === roomStream.stream.id && (
                        <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                          <span className="text-green-400 font-semibold">Now Playing</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">
                        {roomStream.stream.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => handleUpvote(roomStream.streamId)}
                          disabled={isUpvoting === roomStream.streamId || !userId}
                          className={`px-3 py-1 rounded-full flex items-center gap-2 transition-all disabled:opacity-50 ${upvotedStreams.has(roomStream.streamId)
                            ? 'bg-pink-500/20 border border-pink-500/50'
                            : 'bg-gray-900/80'
                            }`}
                        >
                          <ThumbsUp
                            size={14}
                            className={upvotedStreams.has(roomStream.streamId) ? 'text-pink-400 fill-pink-400' : 'text-pink-400'}
                          />
                          <span className="text-white text-xs font-semibold">
                            {roomStream.upvoteCount}
                          </span>
                        </button>
                        {room.currentStream?.stream.id !== roomStream.stream.id && (
                          <button
                            onClick={() => handlePlayStream(roomStream.streamId)}
                            className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-1 text-xs"
                          >
                            <Play size={12} />
                            Play
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {!isRoomMember && (
          <div className="text-center py-12 bg-gray-800/30 rounded-xl border border-purple-500/20">
            <p className="text-gray-400 mb-4">Join this room to watch and add streams!</p>
            <button
              onClick={handleJoin}
              disabled={isJoining || !session}
              className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50"
            >
              {isJoining ? 'Joining...' : 'Join Room'}
            </button>
          </div>
        )}
      </div>
    </div >
  );
}

