interface YouTubeEmbedProps {
  url: string;
  title?: string;
}

function extractVideoId(url: string): string | null {
  // Handles: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID
  const patterns = [
    /[?&]v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /embed\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export default function YouTubeEmbed({ url, title = 'YouTube video' }: YouTubeEmbedProps) {
  const videoId = extractVideoId(url);
  if (!videoId) return null;

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-void-700/50 bg-void-800">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
