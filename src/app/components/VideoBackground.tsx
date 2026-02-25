import { useRef, useEffect } from 'react';


interface VideoBackgroundProps {
  videoUrl: string | null;
  enabled: boolean;
  overlayOpacity: number;
}

export function VideoBackground({ videoUrl, enabled, overlayOpacity }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && enabled && videoUrl) {
      videoRef.current.play().catch(() => {
        // Autoplay might be blocked
      });
    }
  }, [videoUrl, enabled]);

  if (!enabled) {
    return null;
  }

  const finalVideoUrl = videoUrl || "/coffee-shop.1920x1080.mp4";

  return (
    <div className="fixed inset-0 z-0">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={finalVideoUrl} type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 backdrop-blur-sm"
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
}
