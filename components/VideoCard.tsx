"use client";

import { useEffect, useState } from "react";
import type { Video } from "@/data/mock";
import { createClient } from "@/lib/supabase/client";

export function VideoCard({ video }: { video: Video }) {
  const [liked, setLiked] = useState(video.liked);
  const [likes, setLikes] = useState(video.likes);
  const [saved, setSaved] = useState(false);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    if (!video.isDatabaseVideo) return;

    let cancelled = false;

    async function loadUserActions() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user || cancelled) return;

        const [likeResult, bookmarkResult, followResult] = await Promise.all([
          supabase
            .from("vyro_likes")
            .select("video_id")
            .eq("video_id", video.id)
            .eq("user_id", user.id)
            .maybeSingle(),
          supabase
            .from("vyro_bookmarks")
            .select("video_id")
            .eq("video_id", video.id)
            .eq("user_id", user.id)
            .maybeSingle(),
          video.creatorId
            ? supabase
                .from("vyro_follows")
                .select("following_id")
                .eq("follower_id", user.id)
                .eq("following_id", video.creatorId)
                .maybeSingle()
            : Promise.resolve({ data: null, error: null }),
        ]);

        if (cancelled) return;
        setLiked(Boolean(likeResult.data));
        setSaved(Boolean(bookmarkResult.data));
        setFollowed(Boolean(followResult.data));
      } catch {
        // The feed stays usable even when the session is not available.
      }
    }

    void loadUserActions();
    return () => {
      cancelled = true;
    };
  }, [video.id, video.isDatabaseVideo, video.creatorId]);

  async function getAuthContext() {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.assign("/login");
        return null;
      }
      return { supabase, user };
    } catch {
      window.location.assign("/login");
      return null;
    }
  }

  async function toggleLike() {
    if (!video.isDatabaseVideo) {
      setLiked((current) => !current);
      setLikes((current) => Math.max(0, current + (liked ? -1 : 1)));
      return;
    }

    const context = await getAuthContext();
    if (!context) return;

    const { data: existing, error: lookupError } = await context.supabase
      .from("vyro_likes")
      .select("video_id")
      .eq("video_id", video.id)
      .eq("user_id", context.user.id)
      .maybeSingle();

    if (lookupError) return;

    if (existing) {
      const { error } = await context.supabase
        .from("vyro_likes")
        .delete()
        .eq("video_id", video.id)
        .eq("user_id", context.user.id);

      if (!error) {
        setLiked(false);
        setLikes((current) => Math.max(0, current - 1));
      }
    } else {
      const { error } = await context.supabase.from("vyro_likes").insert({
        video_id: video.id,
        user_id: context.user.id,
      });

      if (!error) {
        setLiked(true);
        setLikes((current) => current + 1);
      }
    }
  }

  async function toggleSaved() {
    if (!video.isDatabaseVideo) {
      setSaved((current) => !current);
      return;
    }

    const context = await getAuthContext();
    if (!context) return;

    const { data: existing, error: lookupError } = await context.supabase
      .from("vyro_bookmarks")
      .select("video_id")
      .eq("video_id", video.id)
      .eq("user_id", context.user.id)
      .maybeSingle();

    if (lookupError) return;

    if (existing) {
      const { error } = await context.supabase
        .from("vyro_bookmarks")
        .delete()
        .eq("video_id", video.id)
        .eq("user_id", context.user.id);

      if (!error) setSaved(false);
    } else {
      const { error } = await context.supabase.from("vyro_bookmarks").insert({
        video_id: video.id,
        user_id: context.user.id,
      });

      if (!error) setSaved(true);
    }
  }

  async function toggleFollow() {
    if (!video.isDatabaseVideo || !video.creatorId) {
      setFollowed((current) => !current);
      return;
    }

    const context = await getAuthContext();
    if (!context || context.user.id === video.creatorId) return;

    const { data: existing, error: lookupError } = await context.supabase
      .from("vyro_follows")
      .select("following_id")
      .eq("follower_id", context.user.id)
      .eq("following_id", video.creatorId)
      .maybeSingle();

    if (lookupError) return;

    if (existing) {
      const { error } = await context.supabase
        .from("vyro_follows")
        .delete()
        .eq("follower_id", context.user.id)
        .eq("following_id", video.creatorId);

      if (!error) setFollowed(false);
    } else {
      const { error } = await context.supabase.from("vyro_follows").insert({
        follower_id: context.user.id,
        following_id: video.creatorId,
      });

      if (!error) setFollowed(true);
    }
  }

  return (
    <article className="mx-auto w-full max-w-[520px] overflow-hidden rounded-[28px] border border-white/10 bg-[#111217] shadow-glow">
      <div className="relative aspect-[9/16] max-h-[76vh] min-h-[440px] bg-black sm:min-h-[520px]">
        {video.videoUrl ? (
          <video
            src={video.videoUrl}
            poster={video.thumbnail || undefined}
            controls
            playsInline
            preload="metadata"
            className="h-full w-full object-contain"
          />
        ) : (
          <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover" loading="lazy" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-black/25" />

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
                onClick={toggleFollow}
              >
                {followed ? "Gefolgt" : "Folgen"}
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
                onClick={toggleSaved}
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
