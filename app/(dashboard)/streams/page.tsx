'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Streams page redirects to Rooms.
 * Stream upvote/downvote is available inside each room on the queue and on the now-playing stream.
 */
export default function StreamsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/rooms');
  }, [router]);

  return null;
}
