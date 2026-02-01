'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import MarketingSkeleton from '@/src/components/features/MarketingSkeleton';

const MarketingContent = dynamic(
  () => import('@/src/components/features/MarketingContent'),
  {
    loading: () => <MarketingSkeleton />,
    ssr: false,
  }
);

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  return (
    <main className="min-h-screen bg-black">
      <MarketingContent />
    </main>
  );
}
