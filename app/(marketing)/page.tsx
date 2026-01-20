import { Appbar, Footer, Hero, Features, HowItWorks } from '@/src/components';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900">
      <Appbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  );
}
