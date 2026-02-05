'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { Realtime, RealtimeChannel } from 'ably';

interface PlaybackUpdate {
  playbackTime: number;
  isPlaying: boolean;
  timestamp: number; // Client timestamp (performance.now())
  serverTimestamp?: number; // Authoritative server timestamp (milliseconds since epoch)
  startTime?: number; // Video time when playback started
  startServerTime?: number; // Authoritative server time when playback started (milliseconds since epoch)
}

interface ReactionUpdate {
  emoji: string;
  userId: string;
}

interface SkipUpdate {
  streamId: string;
  votes: string[]; // List of user IDs who voted
  threshold: number;
}

interface MemberLeftUpdate {
  userId: string;
  isCreator: boolean;
}

interface CreatorTransferredUpdate {
  oldCreatorId: string;
  newCreatorId: string;
  newCreator: {
    id: string;
    email: string;
    image: string | null;
  };
}

interface RoomEndedUpdate {
  roomId: string;
  reason: string;
}

interface PresenceUpdate {
  action: 'enter' | 'leave' | 'update';
  clientId: string;
  data: any;
}

interface UseRoomAblyOptions {
  roomId: string | null;
  userId: string | null;
  userInfo?: {
    name: string;
    image: string | null;
  };
  isCreator: boolean;
  onPlaybackUpdate?: (data: PlaybackUpdate) => void;
  onStreamChange?: (streamId: string) => void;
  onReaction?: (data: ReactionUpdate) => void;
  onSkipUpdate?: (data: SkipUpdate) => void;
  onMemberLeft?: (data: MemberLeftUpdate) => void;
  onMemberJoined?: (data: { userId: string, user: any }) => void;
  onCreatorTransferred?: (data: CreatorTransferredUpdate) => void;
  onRoomEnded?: (data: RoomEndedUpdate) => void;
  onPresenceUpdate?: (data: PresenceUpdate) => void;
  debugLog?: (message: string, data?: any) => void;
}

/**
 * NTP-like clock synchronization
 * Calculates the offset between client clock and server clock
 */
const syncClockToServer = async (): Promise<number> => {
  const samples: number[] = [];
  const sampleCount = 5; // Take 5 samples for accuracy

  for (let i = 0; i < sampleCount; i++) {
    const t0 = performance.now(); // Client send time
    try {
      const response = await fetch('/api/time', {
        method: 'GET',
        cache: 'no-cache',
      });
      const t3 = performance.now(); // Client receive time

      if (response.ok) {
        const data = await response.json();
        const t1 = data.serverTime; // Server time
        const t2 = t1; // Server processes immediately, so t2 ≈ t1

        // Calculate round-trip time and offset
        // const rtt = t3 - t0; // Round-trip time (for reference)
        const offset = ((t1 - t0) + (t2 - t3)) / 2; // Simplified NTP offset calculation

        samples.push(offset);
      }
    } catch (error) {
      console.error('Error syncing clock:', error);
    }

    // Small delay between samples
    if (i < sampleCount - 1) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }

  // Return median offset for stability
  if (samples.length === 0) return 0;
  samples.sort((a, b) => a - b);
  return samples[Math.floor(samples.length / 2)];
};

export const useRoomAbly = ({
  roomId,
  userId,
  userInfo,
  isCreator,
  onPlaybackUpdate,
  onStreamChange,
  onReaction,
  onSkipUpdate,
  onMemberLeft,
  onMemberJoined,
  onCreatorTransferred,
  onRoomEnded,
  onPresenceUpdate,
  debugLog,
}: UseRoomAblyOptions) => {
  const log = useCallback((msg: string, data?: any) => {
    // Console log for devtools
    if (data) console.log(msg, data);
    else console.log(msg);

    // UI log if provided
    if (debugLog) {
      debugLog(msg, data);
    }
  }, [debugLog]);

  // Removed log from render body to prevent infinite re-renders with state updates
  // log('[SYNC_DEBUG] useRoomAbly hook called', { roomId, isCreator, hasRoomId: !!roomId, roomIdType: typeof roomId });

  const ablyRef = useRef<Realtime | null>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  // Clock offset: difference between client time and server time (serverTime = clientTime + offset)
  const clockOffsetRef = useRef<number>(0);
  // CRITICAL FIX: Store callbacks in refs to prevent useEffect from re-running
  // when callbacks are recreated (which happens on every render)
  const onPlaybackUpdateRef = useRef(onPlaybackUpdate);
  const onStreamChangeRef = useRef(onStreamChange);
  const onReactionRef = useRef(onReaction);
  const onSkipUpdateRef = useRef(onSkipUpdate);
  const onMemberLeftRef = useRef(onMemberLeft);
  const onMemberJoinedRef = useRef(onMemberJoined);
  const onCreatorTransferredRef = useRef(onCreatorTransferred);
  const onRoomEndedRef = useRef(onRoomEnded);
  const onPresenceUpdateRef = useRef(onPresenceUpdate);

  // Update refs when callbacks change (without triggering useEffect)

  useEffect(() => {
    onPlaybackUpdateRef.current = onPlaybackUpdate;
    onStreamChangeRef.current = onStreamChange;
    onReactionRef.current = onReaction;
    onSkipUpdateRef.current = onSkipUpdate;
    onMemberLeftRef.current = onMemberLeft;
    onMemberJoinedRef.current = onMemberJoined;
    onCreatorTransferredRef.current = onCreatorTransferred;
    onRoomEndedRef.current = onRoomEnded;
    onPresenceUpdateRef.current = onPresenceUpdate;
  }, [onPlaybackUpdate, onStreamChange, onReaction, onSkipUpdate, onMemberLeft, onMemberJoined, onCreatorTransferred, onRoomEnded, onPresenceUpdate]);

  // Initialize Ably connection
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      console.log('[SYNC_DEBUG] useEffect skipped - server side');
      return;
    }

    console.log('[SYNC_DEBUG] useEffect for Ably initialization started', { roomId, isCreator, hasRoomId: !!roomId, roomIdType: typeof roomId, roomIdValue: String(roomId || 'null') });

    if (!roomId) {
      console.log('[SYNC_DEBUG] useEffect early return - no roomId', { roomId, roomIdType: typeof roomId });
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_ABLY_API_KEY;
    if (!apiKey) {
      console.error('[SYNC_DEBUG] NEXT_PUBLIC_ABLY_API_KEY is not set');
      return;
    }

    console.log('[SYNC_DEBUG] Creating Ably Realtime instance', { roomId, isCreator, hasApiKey: !!apiKey });

    const clientOptions: any = {
      key: apiKey,
    };

    // Use userId as clientId if available, otherwise fallback to random
    if (userId) {
      clientOptions.clientId = userId;
    } else {
      clientOptions.clientId = `anon-${Date.now()}`;
    }

    const ably = new Realtime(clientOptions);

    const channel = ably.channels.get(`room:${roomId}`);

    // CRITICAL FIX: Set refs immediately to prevent race conditions
    // This ensures channelRef.current is available even if publishPlaybackUpdate
    // is called before the connection is fully established
    ablyRef.current = ably;
    channelRef.current = channel;

    console.log('[SYNC_DEBUG] Channel refs set', { roomId, isCreator, hasAblyRef: !!ablyRef.current, hasChannelRef: !!channelRef.current });

    // Connection events
    ably.connection.on('connected', async () => {
      console.log('[SYNC_DEBUG] Ably connected', { roomId, isCreator, channelName: `room:${roomId}` });
      setIsConnected(true);

      // Enter presence if we have user info
      if (userId && userInfo) {
        try {
          await channel.presence.enter(userInfo);
          console.log('[SYNC_DEBUG] Entered presence', { userId, userInfo });
        } catch (err) {
          console.error('[SYNC_DEBUG] Failed to enter presence:', err);
        }
      }

      // RAVE-STYLE: Sync client clock to server time on connection
      // Optimization: Start with a quick single sample for immediate use, then refine if needed
      try {
        // Initial fast sync
        const start = performance.now();
        const res = await fetch('/api/time', { method: 'GET', cache: 'no-cache' });
        if (res.ok) {
          const data = await res.json();
          const t1 = data.serverTime;
          const end = performance.now();
          clockOffsetRef.current = (t1 - (start + end) / 2);
          log('Fast clock sync complete, offset: ' + clockOffsetRef.current + ' ms');

          // Refine in background if needed
          syncClockToServer().then(offset => {
            clockOffsetRef.current = offset;
            log('Refined clock sync complete, offset: ' + offset + ' ms');
          }).catch(console.error);
        }
      } catch (error) {
        console.error('Failed to sync clock to server:', error);
        clockOffsetRef.current = 0;
      }
    });

    // Periodic Clock Sync to maintain accuracy over time
    const clockSyncInterval = setInterval(() => {
      if (ably.connection.state === 'connected') {
        syncClockToServer().then(offset => {
          clockOffsetRef.current = offset;
          log('Periodic clock re-sync complete, offset: ' + offset + ' ms');
        }).catch(err => console.warn('Periodic clock sync failed:', err));
      }
    }, 60000); // Every 60 seconds

    ably.connection.on('disconnected', () => {
      console.log('Ably disconnected');
      setIsConnected(false);
    });

    ably.connection.on('failed', () => {
      console.error('Ably connection failed');
      setIsConnected(false);
    });

    // Subscribe to presence changes
    channel.presence.subscribe('enter', (member) => {
      if (onPresenceUpdateRef.current) {
        onPresenceUpdateRef.current({
          action: 'enter',
          clientId: member.clientId,
          data: member.data
        });
      }
    });

    channel.presence.subscribe('leave', (member) => {
      if (onPresenceUpdateRef.current) {
        onPresenceUpdateRef.current({
          action: 'leave',
          clientId: member.clientId,
          data: member.data
        });
      }
    });

    channel.presence.subscribe('update', (member) => {
      if (onPresenceUpdateRef.current) {
        onPresenceUpdateRef.current({
          action: 'update',
          clientId: member.clientId,
          data: member.data
        });
      }
    });

    channel.subscribe('playback:update', (message) => {
      log('[SyncDebug] Raw Ably message received:', { name: message.name, data: message.data });
      const data = message.data as PlaybackUpdate;

      // RAVE-STYLE: Use Ably's message.timestamp directly as authoritative server time
      // No conversion needed - server timestamps are the source of truth
      // message.timestamp is in milliseconds since epoch (server time)
      const serverTimestamp = message.timestamp || Date.now();

      const updateData: PlaybackUpdate = {
        ...data,
        serverTimestamp, // Authoritative server timestamp
      };
      if (!isCreator && onPlaybackUpdateRef.current) {
        onPlaybackUpdateRef.current(updateData);
      } else {
        console.log('[SyncDebug] Skipping onPlaybackUpdate:', { isCreator, hasCallback: !!onPlaybackUpdateRef.current });
      }
    });

    // Subscribe to stream changes
    channel.subscribe('stream:change', (message) => {
      const data = message.data as { streamId: string };
      if (onStreamChangeRef.current) {
        onStreamChangeRef.current(data.streamId);
      }
    });

    // Subscribe to reactions
    channel.subscribe('reaction', (message) => {
      const data = message.data as ReactionUpdate;
      if (onReactionRef.current) {
        onReactionRef.current(data);
      }
    });

    // Subscribe to skip votes
    channel.subscribe('skip:update', (message) => {
      const data = message.data as SkipUpdate;
      if (onSkipUpdateRef.current) {
        onSkipUpdateRef.current(data);
      }
    });

    // Subscribe to member left
    channel.subscribe('member:left', (message) => {
      const data = message.data as MemberLeftUpdate;
      if (onMemberLeftRef.current) {
        onMemberLeftRef.current(data);
      }
    });

    // Subscribe to member joined
    channel.subscribe('member:joined', (message) => {
      const data = message.data as { userId: string, user: any };
      if (onMemberJoinedRef.current) {
        onMemberJoinedRef.current(data);
      }
    });

    // Subscribe to creator transferred
    channel.subscribe('creator:transferred', (message) => {
      const data = message.data as CreatorTransferredUpdate;
      if (onCreatorTransferredRef.current) {
        onCreatorTransferredRef.current(data);
      }
    });

    // Subscribe to room ended
    channel.subscribe('room:ended', (message) => {
      const data = message.data as RoomEndedUpdate;
      if (onRoomEndedRef.current) {
        onRoomEndedRef.current(data);
      }
    });

    return () => {
      console.log('[SYNC_DEBUG] useEffect cleanup running', { roomId, isCreator, hasChannel: !!channelRef.current });
      channel.unsubscribe();
      ably.close();
      clearInterval(clockSyncInterval);
      ablyRef.current = null;
      channelRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, isCreator]); // CRITICAL FIX: Removed callbacks from dependencies to prevent constant re-runs

  // Publish playback update (creator only)
  const publishPlaybackUpdate = useCallback(
    async (playbackTime: number, isPlaying: boolean, startTime?: number, startServerTime?: number) => {
      // log('[SYNC_DEBUG] publishPlaybackUpdate called', { playbackTime, isPlaying, isCreator, hasChannel: !!channelRef.current, isConnected });

      // CRITICAL FIX: Only check for channel existence, not connection status
      // Ably will queue messages even if not fully connected yet
      if (!isCreator) {
        log('[SYNC_DEBUG] publishPlaybackUpdate blocked - not creator', { isCreator });
        return;
      }

      // If channel not available yet, wait briefly for initialization (max 2 seconds)
      if (!channelRef.current && roomId) {
        log('[SYNC_DEBUG] publishPlaybackUpdate - channel not ready, waiting...', { hasChannel: !!channelRef.current, roomId, hasAbly: !!ablyRef.current });

        // Wait up to 2 seconds for channel to be initialized
        const startWait = Date.now();
        while (!channelRef.current && (Date.now() - startWait) < 2000) {
          await new Promise(resolve => setTimeout(resolve, 50));
        }

        if (!channelRef.current) {
          console.error('[SYNC_DEBUG] publishPlaybackUpdate - channel still not available after wait', { hasChannel: !!channelRef.current, roomId, hasAbly: !!ablyRef.current });
          return;
        }
      } else if (!channelRef.current) {
        console.warn('[SYNC_DEBUG] publishPlaybackUpdate blocked - no channel and no roomId', { hasChannel: !!channelRef.current, roomId });
        return;
      }

      // RAVE-STYLE: Get current server time for authoritative timestamp
      // Ably will add its own timestamp, but we also include server time for consistency
      // Use cached offset to avoid blocking fetch calls during playback
      const serverTime = Date.now() + clockOffsetRef.current;

      const data: PlaybackUpdate = {
        playbackTime,
        isPlaying,
        timestamp: performance.now(), // Keep for backward compatibility
        serverTimestamp: serverTime, // Authoritative server time
        startTime,
        startServerTime, // Should already be server time
      };

      channelRef.current.publish('playback:update', data).then(() => {
        console.log('[SYNC_DEBUG] Creator successfully published playback update', { playbackTime, isPlaying });
      }).catch((err) => {
        console.error('[SYNC_DEBUG] Error publishing playback update:', err);
      });
    },
    [isCreator, isConnected, roomId] // Added roomId to dependencies since it's used in the callback
  );

  // Publish stream change
  const publishStreamChange = useCallback(
    (streamId: string) => {
      if (!channelRef.current || !isConnected) {
        return;
      }

      channelRef.current.publish('stream:change', { streamId }).catch((err) => {
        console.error('Error publishing stream change:', err);
      });
    },
    [isConnected]
  );

  // Publish reaction
  const publishReaction = useCallback(
    (emoji: string, userId: string) => {
      if (!channelRef.current || !isConnected) {
        return;
      }

      channelRef.current.publish('reaction', { emoji, userId }).catch((err) => {
        console.error('Error publishing reaction:', err);
      });
    },
    [isConnected]
  );

  // Publish skip update
  const publishSkipUpdate = useCallback(
    (data: SkipUpdate) => {
      if (!channelRef.current || !isConnected) {
        return;
      }

      channelRef.current.publish('skip:update', data).catch((err) => {
        console.error('Error publishing skip update:', err);
      });
    },
    [isConnected]
  );

  return {
    isConnected,
    publishPlaybackUpdate,
    publishStreamChange,
    publishReaction,
    publishSkipUpdate,
  };
};


