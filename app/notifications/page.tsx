import { AppShell } from '@/components/AppShell';
import { notifications } from '@/data/mock';

export default function NotificationsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.28em] text-violet-300">Benachrichtigungen</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Letzte Aktivitäten</h1>
        </header>

        <div className="rounded-3xl border border-white/10 bg-panel p-5">
          <div className="space-y-4">
            {notifications.map((item) => (
              <div key={item.id} className="flex items-start gap-3 rounded-2xl bg-white/5 p-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-500/15 text-lg text-violet-200">
                  {item.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-zinc-400">{item.description}</p>
                </div>
                <span className="text-xs text-zinc-500">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
