"use client";

import { useState } from "react";
import type { Video } from "@/data/mock";

export function VideoCard({ video }: { video: Video }) {
  const [liked, setLiked] = useState(video.liked);
  const [likes, setLikes] = useState(video.likes);
  const [saved, setSaved] = useState(false);

  function toggleLike() {
    setLiked((current) => !current);
    setLikes((current) => current + (liked ? -1 : 1));
  }

  return (
    <article className="mx-auto w-full max-w-[520px] overflow-hidden rounded-[28px] border border-white/10 bg-[#111217] shadow-glow">
      <div className="relative aspect-[9/16] max-h-[76vh] min-h-[440px] bg-black sm:min-h-[520px]">
        <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-black/25" />

        <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-2 p-3 sm:p-4">
          <span className="max-w-[70%] truncate rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-xs text-white backdrop-blur-md">
            ♪ {video.sound}
          </span>
          <span className="shrink-0 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-xs text-white backdrop-blur-md">
            {video.views} Aufrufe
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 sm:p-5">
          <div className="min-w-0 flex-1">
            <div className="mb-3 flex items-center gap-3">
              <img src={video.avatar} alt="" className="h-11 w-11 rounded-full border border-white/25 object-cover" loading="lazy" />
              <div className="min-w-0">
                <p className="truncate font-semibold text-white">{video.creator}</p>
                <p className="text-xs text-zinc-300">@{video.handle}</p>
              </div>
              <button
                type="button"
                className="rounded-full border border-violet-300/50 bg-violet-500/20 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-violet-500/40"
                title="Folgen wird nach dem Login aktiviert"
                onClick={(event) => {
                  const button = event.currentTarget;
                  const followed = button.dataset.followed === "true";
                  button.dataset.followed = String(!followed);
                  button.textContent = followed ? "Folgen" : "Gefolgt";
                }}
              >
                Folgen
              </button>
            </div>

            <h2 className="text-lg font-bold text-white sm:text-2xl">{video.title}</h2>
            <p className="mt-2 line-clamp-3 text-sm text-zinc-100">{video.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {video.hashtags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-xs text-violet-100">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-center gap-3 pb-1">
            <div className="flex flex-col items-center gap-1">
              <button
                type="button"
                onClick={toggleLike}
                aria-label={liked ? "Like entfernen" : "Video liken"}
                aria-pressed={liked}
                className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl text-white backdrop-blur-xl transition sm:h-14 sm:w-14 ${liked ? "bg-violet-500" : "bg-white/15 hover:bg-white/25"}`}
              >
                {liked ? "♥" : "♡"}
              </button>
              <span className="text-xs font-medium text-white">{likes.toLocaleString("de-DE")}</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <button
                type="button"
                onClick={() => setSaved((current) => !current)}
                aria-label={saved ? "Video nicht mehr merken" : "Video merken"}
                aria-pressed={saved}
                className={`flex h-12 w-12 items-center justify-center rounded-full text-xl text-white backdrop-blur-xl transition sm:h-14 sm:w-14 ${saved ? "bg-violet-500" : "bg-white/15 hover:bg-white/25"}`}
              >
                {saved ? "★" : "☆"}
              </button>
              <span className="text-[11px] text-white">{saved ? "Gemerkt" : "Merken"}</span>
            </div>

            <button
              type="button"
              onClick={async () => {
                try {
                  const url = new URL(window.location.href);
                  url.searchParams.set("video", video.id);
                  await navigator.clipboard.writeText(url.toString());
                } catch {
                  // Clipboard access can be unavailable in some browser contexts.
                }
              }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-xl text-white backdrop-blur-xl transition hover:bg-white/25 sm:h-14 sm:w-14"
              aria-label="Video teilen"
              title="Link zum Video kopieren"
            >
              ↗
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
