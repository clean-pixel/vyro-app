"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const MAX_FILE_SIZE = 100 * 1024 * 1024;
const MAX_DURATION_SECONDS = 180;
const ALLOWED_TYPES = ["video/mp4", "video/webm", "video/quicktime"];

async function readVideoDuration(file: File): Promise<number> {
  const objectUrl = URL.createObjectURL(file);
  try {
    return await new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => resolve(video.duration);
      video.onerror = () => reject(new Error("Die Videodatei konnte nicht gelesen werden."));
      video.src = objectUrl;
    });
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export function VideoUploader() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [rightsConfirmed, setRightsConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  async function chooseFile(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0] ?? null;
    setError("");
    setStatus("");

    if (!selected) {
      setFile(null);
      return;
    }

    if (!ALLOWED_TYPES.includes(selected.type)) {
      setError("Bitte wähle eine MP4-, WebM- oder MOV-Videodatei aus.");
      event.target.value = "";
      setFile(null);
      return;
    }

    if (selected.size > MAX_FILE_SIZE) {
      setError("Das Video darf höchstens 100 MB groß sein.");
      event.target.value = "";
      setFile(null);
      return;
    }

    try {
      const duration = await readVideoDuration(selected);
      if (!Number.isFinite(duration) || duration <= 0 || duration > MAX_DURATION_SECONDS) {
        setError("Das Video muss zwischen 1 Sekunde und 3 Minuten lang sein.");
        event.target.value = "";
        setFile(null);
        return;
      }
      setFile(selected);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Die Videodatei ist ungültig.");
      event.target.value = "";
      setFile(null);
    }
  }

  async function publishVideo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("");

    if (!file) {
      setError("Wähle zuerst ein Video aus.");
      return;
    }
    if (!rightsConfirmed) {
      setError("Bitte bestätige zuerst die Rechte und den Schutz privater Daten.");
      return;
    }

    setLoading(true);
    let uploadedPath = "";

    try {
      const supabase = createClient();
      const { data: authData, error: authError } = await supabase.auth.getUser();

      if (authError || !authData.user) {
        router.push("/login");
        return;
      }

      const duration = Math.round(await readVideoDuration(file));
      const extension = file.name.split(".").pop()?.toLowerCase() || "mp4";
      uploadedPath = `${authData.user.id}/${crypto.randomUUID()}.${extension}`;

      setStatus("Video wird sicher hochgeladen …");
      const { error: uploadError } = await supabase.storage
        .from("vyro-videos")
        .upload(uploadedPath, file, {
          cacheControl: "3600",
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("vyro-videos")
        .getPublicUrl(uploadedPath);

      const { error: insertError } = await supabase.from("vyro_videos").insert({
        user_id: authData.user.id,
        caption: caption.trim(),
        video_url: urlData.publicUrl,
        duration_seconds: duration,
        visibility,
        status: "published",
        published_at: new Date().toISOString(),
      });

      if (insertError) {
        await supabase.storage.from("vyro-videos").remove([uploadedPath]);
        uploadedPath = "";
        throw insertError;
      }

      setStatus(visibility === "public"
        ? "Dein Video wurde veröffentlicht und erscheint im öffentlichen Feed."
        : "Dein Video wurde privat veröffentlicht und ist nur für dich sichtbar.");
      setFile(null);
      setCaption("");
      setRightsConfirmed(false);
      router.push("/");
      router.refresh();
    } catch (cause) {
      if (uploadedPath) {
        try {
          const supabase = createClient();
          await supabase.storage.from("vyro-videos").remove([uploadedPath]);
        } catch {
          // The original error is more useful than a cleanup error.
        }
      }
      setError(cause instanceof Error ? cause.message : "Der Upload ist fehlgeschlagen.");
      setStatus("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={publishVideo} className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
      <section className="space-y-5 rounded-3xl border border-white/10 bg-panel p-5">
        <div className="rounded-3xl border-2 border-dashed border-violet-500/50 bg-violet-500/5 p-6 text-center sm:p-8">
          {previewUrl ? (
            <video src={previewUrl} controls playsInline className="mx-auto max-h-[480px] w-full rounded-2xl bg-black object-contain" />
          ) : (
            <>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-violet-500/40 bg-violet-500/10 text-3xl text-violet-200">+</div>
              <h2 className="text-xl font-medium text-white">Wähle dein Video aus</h2>
              <p className="mt-2 text-sm text-zinc-400">MP4, MOV oder WebM · maximal 100 MB · bis zu 3 Minuten</p>
            </>
          )}
          <label className="mt-5 inline-flex cursor-pointer rounded-full bg-violet-500 px-5 py-2.5 font-medium text-white transition hover:bg-violet-400">
            {file ? "Andere Datei auswählen" : "Datei auswählen"}
            <input
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              onChange={chooseFile}
              disabled={loading}
              className="sr-only"
            />
          </label>
          {file && <p className="mt-3 break-all text-xs text-zinc-400">{file.name} · {(file.size / (1024 * 1024)).toFixed(1)} MB</p>}
        </div>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-zinc-200">Beschreibung</span>
          <textarea
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
            rows={4}
            maxLength={2200}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-violet-400"
            placeholder="Teile deine Story, deinen Moment und was dich inspiriert …"
          />
          <span className="block text-right text-xs text-zinc-500">{caption.length}/2200</span>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-zinc-200">Sichtbarkeit</span>
          <select
            value={visibility}
            onChange={(event) => setVisibility(event.target.value as "public" | "private")}
            className="w-full rounded-2xl border border-white/10 bg-[#17171d] px-4 py-3 text-white outline-none focus:border-violet-400"
          >
            <option value="public">Öffentlich – im VYRO-Feed sichtbar</option>
            <option value="private">Privat – nur für mich</option>
          </select>
        </label>

        <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
          <input
            type="checkbox"
            checked={rightsConfirmed}
            onChange={(event) => setRightsConfirmed(event.target.checked)}
            className="mt-1 h-4 w-4 accent-violet-500"
          />
          <span>Ich habe die Rechte an diesem Video und teile keine privaten Daten oder Aufnahmen anderer Personen ohne deren Zustimmung.</span>
        </label>

        {error && <p role="alert" className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}
        {status && <p role="status" className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-3 text-sm text-violet-100">{status}</p>}
      </section>

      <aside className="space-y-5">
        <div className="rounded-3xl border border-white/10 bg-panel p-5">
          <h3 className="text-lg font-medium text-white">Upload-Check</h3>
          <div className="mt-4 space-y-3 text-sm text-zinc-300">
            <p>✓ MP4, MOV oder WebM</p>
            <p>✓ Maximal 100 MB</p>
            <p>✓ Maximal 3 Minuten</p>
            <p>✓ Sichtbarkeit selbst wählen</p>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading || !file}
          className="w-full rounded-full bg-violet-500 px-5 py-3 font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Wird hochgeladen …" : "Video veröffentlichen"}
        </button>
        <p className="text-xs leading-relaxed text-zinc-500">
          Öffentliche Videos können von anderen angesehen und geteilt werden. Prüfe vor dem Veröffentlichen, ob im Video persönliche Informationen zu sehen sind.
        </p>
      </aside>
    </form>
  );
}
