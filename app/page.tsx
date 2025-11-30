import Navigation from '@/components/shared/Navigation';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <div className="bg-white">
        <Features />
      </div>
    </main>
  );
}
