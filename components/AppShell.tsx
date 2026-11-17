import Link from 'next/link';
import type { ReactNode } from 'react';

const navItems = [
  { href: '/', label: 'Für dich', icon: '🏠' },
  { href: '/discover', label: 'Entdecken', icon: '✨' },
  { href: '/upload', label: 'Upload', icon: '⬆️' },
  { href: '/messages', label: 'Nachrichten', icon: '💬' },
  { href: '/notifications', label: 'Benachrichtigungen', icon: '🔔' },
  { href: '/profile', label: 'Profil', icon: '👤' },
  { href: '/admin', label: 'Admin', icon: '⚙️' },
  { href: '/login', label: 'Anmelden', icon: '↗️' },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <div className="mx-auto flex max-w-[1600px] gap-5 px-4 py-5 lg:px-6">
        <aside className="hidden min-h-[calc(100vh-2rem)] w-72 shrink-0 rounded-[32px] border border-white/10 bg-[#111217]/90 p-5 shadow-glow lg:flex lg:flex-col">
          <Link href="/" className="mb-8 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xl font-black text-white">
              V
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-violet-300">VYRO</p>
              <p className="text-sm text-zinc-400">Social Studio</p>
            </div>
          </Link>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-2xl px-3 py-3 text-base font-medium text-zinc-200 transition hover:bg-white/5 hover:text-white"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-sm">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto rounded-3xl border border-violet-500/30 bg-violet-500/10 p-4">
            <p className="text-sm text-zinc-200">Creator Boost</p>
            <p className="mt-2 text-2xl font-semibold text-white">+48%</p>
            <p className="mt-1 text-xs text-violet-200">Engagement in den letzten 7 Tagen</p>
          </div>
        </aside>

        <main className="flex-1 pb-24 lg:pb-6">
          <div className="mb-6 flex items-center justify-between rounded-[28px] border border-white/10 bg-[#111217]/70 px-4 py-3 backdrop-blur-xl lg:hidden">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-lg font-black text-white">
                V
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-violet-300">VYRO</p>
              </div>
            </Link>
            <Link href="/login" className="rounded-full bg-violet-500 px-3 py-1.5 text-sm font-medium text-white">Anmelden</Link>
          </div>

          {children}
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-white/10 bg-[#111217]/95 px-3 py-3 backdrop-blur-xl lg:hidden">
        {navItems.slice(0, 5).map((item) => (
          <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1 text-[11px] text-zinc-400">
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
