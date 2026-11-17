import { VideoCard } from '@/components/VideoCard';
import { videos } from '@/data/mock';

export function VideoFeed() {
  return (
    <div className="space-y-5">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
