import { AppShell } from "@/components/AppShell";
import { VideoUploader } from "@/components/VideoUploader";

export default function UploadPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.28em] text-violet-300">Upload</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Neues Video veröffentlichen</h1>
          <p className="mt-2 text-sm text-zinc-400">Lade ein Video hoch, ergänze eine Beschreibung und entscheide selbst über die Sichtbarkeit.</p>
        </header>
        <VideoUploader />
      </div>
    </AppShell>
  );
}
