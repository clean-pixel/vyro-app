import { VideoCard } from "@/components/VideoCard";
import { videos as demoVideos, type Video } from "@/data/mock";
import { createClient } from "@/lib/supabase/server";

type VideoRow = {
  id: string;
  user_id: string;
  caption: string;
  video_url: string;
  thumbnail_url: string | null;
  duration_seconds: number | null;
  created_at: string;
};

type ProfileRow = {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
};

function formatDuration(seconds: number | null) {
  if (!seconds) return "–:–";
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
}

async function loadPublishedVideos(): Promise<Video[] | null> {
  try {
    const supabase = await createClient();
    const { data: rows, error } = await supabase
      .from("vyro_videos")
      .select("id,user_id,caption,video_url,thumbnail_url,duration_seconds,created_at")
      .eq("status", "published")
      .eq("visibility", "public")
      .order("created_at", { ascending: false })
      .limit(20);

    if (error || !rows?.length) return null;

    const videoRows = rows as VideoRow[];
    const ids = videoRows.map((video) => video.id);
    const userIds = Array.from(new Set(videoRows.map((video) => video.user_id)));

    const [{ data: profiles }, { data: likes }] = await Promise.all([
      supabase
        .from("vyro_profiles")
        .select("id,username,display_name,avatar_url")
        .in("id", userIds),
      supabase.from("vyro_likes").select("video_id").in("video_id", ids),
    ]);

    const profileById = new Map(
      ((profiles ?? []) as ProfileRow[]).map((profile) => [profile.id, profile] as const)
    );
    const likeCounts = new Map<string, number>();
    for (const like of likes ?? []) {
      likeCounts.set(like.video_id, (likeCounts.get(like.video_id) ?? 0) + 1);
    }

    return videoRows.map((row) => {
      const profile = profileById.get(row.user_id);
      const description = row.caption || "Neues Video auf VYRO";
      return {
        id: row.id,
        title: description.length > 52 ? `${description.slice(0, 49)}…` : description,
        description,
        creator: profile?.display_name || profile?.username || "VYRO Creator",
        handle: profile?.username || "creator",
        avatar: profile?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        thumbnail: row.thumbnail_url || "",
        videoUrl: row.video_url,
        sound: "Original Sound",
        views: "Neu",
        duration: formatDuration(row.duration_seconds),
        likes: likeCounts.get(row.id) ?? 0,
        liked: false,
        hashtags: [],
        creatorId: row.user_id,
        isDatabaseVideo: true,
      };
    });
  } catch {
    return null;
  }
}

export async function VideoFeed() {
  const publishedVideos = await loadPublishedVideos();
  const feed = publishedVideos?.length ? publishedVideos : demoVideos;

  return (
    <div className="space-y-5">
      {feed.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
      {!publishedVideos?.length && (
        <p className="mx-auto max-w-[520px] text-center text-xs text-zinc-500">
          Demo-Videos werden angezeigt, bis die ersten öffentlichen VYRO-Videos hochgeladen wurden.
        </p>
      )}
    </div>
  );
}
