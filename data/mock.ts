"use client";

import { useState } from 'react';
import type { Video } from '@/data/mock';

export function VideoCard({ video }: { video: Video }) {
  const [liked, setLiked] = useState(video.liked);
  const [likes, setLikes] = useState(video.likes);

  const handleLike = () => {
    setLiked((value) => !value);
    setLikes((value) => (liked ? value - 1 : value + 1));
  };

  return (
    <article className="overflow-hidden rounded-[32px] border border-white/10 bg-[#111217] shadow-glow">
      <div className="relative aspect-[9/16] max-h-[82vh] min-h-[560px] bg-black">
        <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <div className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs text-white backdrop-blur-md">
            {video.sound}
          </div>
          <div className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs text-white backdrop-blur-md">
            {video.views} Aufrufe
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 md:p-5">
          <div className="max-w-[77%]">
            <div className="mb-3 flex items-center gap-3">
              <img src={video.avatar} alt={video.creator} className="h-12 w-12 rounded-full border border-white/20 object-cover" />
              <div>
                <p className="font-medium text-white">{video.creator}</p>
                <p className="text-xs text-zinc-300">@{video.handle}</p>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-white md:text-2xl">{video.title}</h2>
            <p className="mt-2 text-sm text-zinc-200">{video.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {video.hashtags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-violet-200">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <button
              onClick={handleLike}
              className={`flex h-14 w-14 items-center justify-center rounded-full text-2xl backdrop-blur-xl transition ${liked ? 'bg-violet-500 text-white' : 'bg-white/10 text-white hover:bg-white/15'}`}
              aria-label="Video mögen"
            >
              {liked ? '♥' : '♡'}
            </button>
            <div className="text-center text-sm text-white">{likes}</div>
            <button className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-2xl backdrop-blur-xl transition hover:bg-white/15">
              💬
            </button>
            <button className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-2xl backdrop-blur-xl transition hover:bg-white/15">
              🔁
            </button>
            <button className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-2xl backdrop-blur-xl transition hover:bg-white/15">
              🔖
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export function VideoFeed() {
  const { videos } = require('@/data/mock');

  return (
    <div className="space-y-5">
      {videos.map((video: Video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
