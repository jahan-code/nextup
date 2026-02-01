'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { Realtime, RealtimeChannel } from 'ably';

interface RoomCreatedUpdate {
  roomId: string;
  room: any;
}

interface UseDashboardAblyOptions {
  onRoomCreated?: (data: RoomCreatedUpdate) => void;
}

export const useDashboardAbly = ({
  onRoomCreated,
}: UseDashboardAblyOptions) => {
  const ablyRef = useRef<Realtime | null>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const onRoomCreatedRef = useRef(onRoomCreated);

  // Update ref when callback changes
  useEffect(() => {
    onRoomCreatedRef.current = onRoomCreated;
  }, [onRoomCreated]);

  // Initialize Ably connection
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_ABLY_API_KEY;
    if (!apiKey) {
      console.error('NEXT_PUBLIC_ABLY_API_KEY is not set');
      return;
    }

    const ably = new Realtime({
      key: apiKey,
      clientId: `dashboard-${Date.now()}`,
    });

    const channel = ably.channels.get('dashboard:rooms');

    ablyRef.current = ably;
    channelRef.current = channel;

    // Connection events
    ably.connection.on('connected', () => {
      console.log('Dashboard Ably connected');
      setIsConnected(true);
    });

    ably.connection.on('disconnected', () => {
      console.log('Dashboard Ably disconnected');
      setIsConnected(false);
    });

    ably.connection.on('failed', () => {
      console.error('Dashboard Ably connection failed');
      setIsConnected(false);
    });

    // Subscribe to room creation events
    channel.subscribe('room:created', (message) => {
      const data = message.data as RoomCreatedUpdate;
      if (onRoomCreatedRef.current) {
        onRoomCreatedRef.current(data);
      }
    });

    return () => {
      channel.unsubscribe();
      ably.close();
      ablyRef.current = null;
      channelRef.current = null;
    };
  }, []);

  return {
    isConnected,
  };
};
