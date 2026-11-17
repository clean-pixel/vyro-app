import { AppShell } from '@/components/AppShell';
import { adminStats, recentActivity } from '@/data/mock';

export default function AdminPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.28em] text-violet-300">Admin</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Dashboard</h1>
        </header>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {adminStats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-white/10 bg-panel p-5">
              <p className="text-sm text-zinc-400">{stat.label}</p>
              <div className="mt-3 flex items-end justify-between">
                <span className="text-3xl font-semibold text-white">{stat.value}</span>
                <span className="text-sm text-violet-300">{stat.delta}</span>
              </div>
            </div>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-panel p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-medium text-white">Aktivitätsübersicht</h2>
              <button className="text-sm text-violet-300">Export</button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-2xl bg-white/5 p-3">
                  <div>
                    <p className="font-medium text-white">{item.title}</p>
                    <p className="text-sm text-zinc-400">{item.meta}</p>
                  </div>
                  <span className="rounded-full bg-violet-500/10 px-2 py-1 text-xs text-violet-200">{item.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-panel p-5">
            <h2 className="text-lg font-medium text-white">Moderationsaktionen</h2>
            <div className="mt-5 space-y-3">
              {['3 Benutzer gesperrt', '7 Videos geprüft', '11 Kommentare moderiert', '2 Warnungen versendet'].map((entry) => (
                <div key={entry} className="flex items-center justify-between rounded-2xl bg-white/5 p-3 text-sm text-zinc-300">
                  <span>{entry}</span>
                  <button className="text-violet-300">Ansehen</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
