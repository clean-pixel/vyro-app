import { AppShell } from '@/components/AppShell';

export default function UploadPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.28em] text-violet-300">Upload</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Neues Video veröffentlichen</h1>
        </header>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <section className="rounded-3xl border border-white/10 bg-panel p-5">
            <div className="rounded-3xl border-2 border-dashed border-violet-500/50 bg-violet-500/5 p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-violet-500/40 bg-violet-500/10 text-3xl text-violet-200">
                +
              </div>
              <h2 className="text-xl font-medium text-white">Video hier ablegen</h2>
              <p className="mt-2 text-sm text-zinc-400">MP4, MOV oder WebM · bis zu 2 GB</p>
              <button className="mt-6 rounded-full bg-violet-500 px-5 py-2.5 font-medium text-white">Datei auswählen</button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-zinc-200">Titel</span>
                <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-zinc-500" placeholder="Die perfekte Nacht" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-zinc-200">Sound</span>
                <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-zinc-500" placeholder="Moonlight Drift" />
              </label>
            </div>

            <label className="mt-4 block space-y-2">
              <span className="text-sm font-medium text-zinc-200">Beschreibung</span>
              <textarea rows={4} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-zinc-500" placeholder="Teile deine Story, deinen Moment und was dich inspiriert..." />
            </label>

            <label className="mt-4 block space-y-2">
              <span className="text-sm font-medium text-zinc-200">Hashtags</span>
              <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-zinc-500" placeholder="#travel #nightmode #vyro" />
            </label>
          </section>

          <aside className="space-y-5">
            <div className="rounded-3xl border border-white/10 bg-panel p-5">
              <h3 className="text-lg font-medium text-white">Upload-Fortschritt</h3>
              <div className="mt-4 h-2 rounded-full bg-white/10">
                <div className="h-full w-[74%] rounded-full bg-violet-500" />
              </div>
              <div className="mt-3 flex items-center justify-between text-sm text-zinc-400">
                <span>Verarbeiten</span>
                <span>74%</span>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-panel p-5">
              <h3 className="text-lg font-medium text-white">Meine Uploads</h3>
              <div className="mt-4 space-y-3">
                {['Sunset Session', 'City Pulse', 'Night Walk'].map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-2xl bg-white/5 p-3">
                    <span className="text-sm text-zinc-200">{item}</span>
                    <span className="text-xs text-violet-300">Veröffentlicht</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full rounded-full bg-violet-500 px-5 py-3 font-medium text-white">Video veröffentlichen</button>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
