import { AppShell } from '@/components/AppShell';
import { creators, trendingTags, videos } from '@/data/mock';

export default function DiscoverPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <header className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.28em] text-violet-300">Entdecken</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Trending & Community</h1>
        </header>

        <section className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
          <div className="rounded-3xl border border-white/10 bg-panel p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Top Creators</h2>
              <button className="text-sm text-violet-300">Alle ansehen</button>
            </div>
            <div className="space-y-3">
              {creators.slice(0, 4).map((creator) => (
                <div key={creator.id} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-3">
                  <div className="flex items-center gap-3">
                    <img src={creator.avatar} alt={creator.name} className="h-12 w-12 rounded-full object-cover" />
                    <div>
                      <p className="font-medium text-white">{creator.name}</p>
                      <p className="text-sm text-zinc-400">@{creator.handle}</p>
                    </div>
                  </div>
                  <button className="rounded-full border border-violet-500/40 bg-violet-500/10 px-3 py-1.5 text-sm font-medium text-violet-200">
                    Folgen
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-panel p-5">
            <h2 className="text-lg font-semibold text-white">Trending Hashtags</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {trendingTags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {videos.slice(0, 6).map((video) => (
            <article key={video.id} className="overflow-hidden rounded-3xl border border-white/10 bg-panel">
              <div className="relative h-64">
                <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/5 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-sm text-white">
                  <span>{video.views} Aufrufe</span>
                  <span>{video.duration}</span>
                </div>
              </div>
              <div className="space-y-2 p-4">
                <h3 className="text-base font-medium text-white">{video.title}</h3>
                <p className="text-sm text-zinc-400">{video.creator}</p>
              </div>
            </article>
          ))}
        </section>
      </div>
    </AppShell>
  );
}
