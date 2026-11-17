import { AppShell } from '@/components/AppShell';
import { messages } from '@/data/mock';

export default function MessagesPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.28em] text-violet-300">Nachrichten</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Direktnachrichten</h1>
        </header>

        <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
          <aside className="rounded-3xl border border-white/10 bg-panel p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-medium text-white">Chats</h2>
              <button className="text-sm text-violet-300">Neu</button>
            </div>
            <div className="space-y-3">
              {messages.map((message) => (
                <div key={message.id} className="flex items-center gap-3 rounded-2xl bg-white/5 p-3">
                  <img src={message.avatar} alt={message.name} className="h-11 w-11 rounded-full object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate font-medium text-white">{message.name}</p>
                      <span className="text-[10px] text-zinc-500">{message.time}</span>
                    </div>
                    <p className="truncate text-sm text-zinc-400">{message.preview}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <section className="rounded-3xl border border-white/10 bg-panel p-5">
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" alt="Ava" className="h-11 w-11 rounded-full object-cover" />
                <div>
                  <p className="font-medium text-white">Ava Stone</p>
                  <p className="text-sm text-violet-300">Online</p>
                </div>
              </div>
              <button className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-200">Blockieren</button>
            </div>

            <div className="space-y-4">
              <div className="max-w-[75%] rounded-2xl rounded-bl-md bg-white/5 px-4 py-3 text-sm text-zinc-200">
                Hey! Ich habe viel über deine neue Serie gelesen – total cool.
              </div>
              <div className="ml-auto max-w-[75%] rounded-2xl rounded-br-md bg-violet-500 px-4 py-3 text-sm text-white">
                Danke! Ich habe morgen endlich eine neue Upload-Session geplant.
              </div>
              <div className="max-w-[75%] rounded-2xl rounded-bl-md bg-white/5 px-4 py-3 text-sm text-zinc-200">
                Perfekt – ich bin dabei. Das wird richtig gut.
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <input className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-zinc-500" placeholder="Nachricht senden..." />
              <button className="rounded-full bg-violet-500 px-5 py-3 font-medium text-white">Senden</button>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
