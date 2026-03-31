"use client";

import { useState, useRef } from "react";

interface EmbedVideoPlayerProps {
  videoUrl: string;
  accentColor?: string;
}

export function EmbedVideoPlayer({ videoUrl, accentColor = "#10B981" }: EmbedVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
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
      onClick={togglePlay}
      style={{
        position: "relative",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "#000",
        aspectRatio: "16/9",
        cursor: "pointer",
        marginBottom: "8px",
      }}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        muted={isMuted}
        playsInline
        preload="metadata"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Play overlay */}
      {!isPlaying && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: accentColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white" style={{ marginLeft: "2px" }}>
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </div>
      )}

      {/* Video badge */}
      <div
        style={{
          position: "absolute",
          top: "6px",
          left: "6px",
          backgroundColor: "rgba(0,0,0,0.6)",
          color: "white",
          fontSize: "9px",
          fontWeight: 600,
          padding: "2px 6px",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          gap: "3px",
        }}
      >
        <svg width="8" height="8" viewBox="0 0 24 24" fill="white">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
        VIDEO
      </div>

      {/* Mute button (visible when playing) */}
      {isPlaying && (
        <button
          onClick={toggleMute}
          style={{
            position: "absolute",
            bottom: "6px",
            right: "6px",
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "28px",
            height: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            padding: 0,
          }}
        >
          {isMuted ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}
