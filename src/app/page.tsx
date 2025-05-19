import { HomeComponent, MobileBlocker } from '@/components';

export default function Home() {
  return (
    <main className="flex h-[100dvh]">
      <HomeComponent />
      <MobileBlocker />
    </main>
  );
}
