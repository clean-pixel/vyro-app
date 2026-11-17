import { AppShell } from '@/components/AppShell';
import { VideoFeed } from '@/components/VideoFeed';

export default function HomePage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-violet-300">Für dich</p>
            <h1 className="mt-2 text-2xl font-semibold text-white">Empfohlen</h1>
          </div>
          <button className="rounded-full border border-violet-500/40 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-200">
            Live jetzt
          </button>
        </header>

        <VideoFeed />
      </div>
    </AppShell>
  );
}
