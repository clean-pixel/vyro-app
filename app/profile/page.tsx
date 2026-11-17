import { AppShell } from '@/components/AppShell';
import { creators, videos } from '@/data/mock';

const thumbnails = [
  'https://images.unsplash.com/photo-1521572267360?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1517849845537?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1493246507139?auto=format&fit=crop&w=900&q=80',
];
const titles = ['Night Run', 'City Lights', 'Summer Edit', 'Beach Walk', 'Room Tone', 'Open Road'];

export default function ProfilePage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <section className="overflow-hidden rounded-[32px] border border-white/10 bg-panel">
          <div className="h-44 bg-gradient-to-r from-violet-500/30 via-purple-500/20 to-black" />
          <div className="p-5">
            <div className="-mt-14 flex items-end justify-between gap-4">
              <img src={creators[0].avatar} alt={creators[0].name} className="h-24 w-24 rounded-full border-4 border-panel object-cover" />
              <button className="rounded-full border border-violet-500/40 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-200">Profil bearbeiten</button>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <h1 className="text-3xl font-semibold text-white">{creators[0].name}</h1>
              <span className="rounded-full bg-violet-500/25 px-2 py-0.5 text-xs font-medium text-violet-200">Verifiziert</span>
            </div>
            <p className="mt-2 text-zinc-400">@{creators[0].handle} · Film & Mood</p>
            <p className="mt-4 max-w-2xl text-sm text-zinc-300">Visuelle Geschichten, urbane Momente und kleine impulsive Abenteuer. Ich dokumentiere die Welt mit Licht, Bewegung und Sound.</p>
            <div className="mt-5 flex flex-wrap gap-6 text-sm text-zinc-300">
              <div><span className="font-semibold text-white">24.8K</span> Follower</div>
              <div><span className="font-semibold text-white">437</span> Following</div>
              <div><span className="font-semibold text-white">{videos.length}</span> Videos</div>
              <div><span className="font-semibold text-white">9.2K</span> Likes</div>
            </div>
          </div>
        </section>
        <section className="grid gap-5 md:grid-cols-3">
          {titles.map((item, index) => (
            <article key={item} className="overflow-hidden rounded-3xl border border-white/10 bg-panel">
              <img src={thumbnails[index % thumbnails.length]} alt={item} className="h-52 w-full object-cover" />
              <div className="p-4"><h3 className="font-medium text-white">{item}</h3><p className="mt-1 text-sm text-zinc-400">{(index + 2) * 182} Aufrufe</p></div>
            </article>
          ))}
        </section>
      </div>
    </AppShell>
  );
}
