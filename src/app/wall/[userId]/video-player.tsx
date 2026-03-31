"use client";

import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface VideoTestimonialPlayerProps {
  videoUrl: string;
  accentColor?: string;
}

export function VideoTestimonialPlayer({ videoUrl, accentColor = "#10B981" }: VideoTestimonialPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowOverlay(true);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
      setShowOverlay(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  };

  return (
    <div
      className="relative rounded-lg overflow-hidden bg-black aspect-video cursor-pointer group"
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        muted={isMuted}
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
        onEnded={() => { setIsPlaying(false); setShowOverlay(true); }}
      />

      {/* Play overlay */}
      {showOverlay && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"
            style={{ backgroundColor: accentColor }}
          >
            <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
          </div>
        </div>
      )}

      {/* Controls bar (visible when playing/hovering) */}
      {isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => { e.stopPropagation(); togglePlay(); }}
            className="text-white hover:text-white/80"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button onClick={toggleMute} className="text-white hover:text-white/80">
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      )}

      {/* Video badge */}
      <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-medium px-1.5 py-0.5 rounded flex items-center gap-1">
        <Play className="w-2.5 h-2.5" fill="white" />
        VIDEO
      </div>
    </div>
  );
}
