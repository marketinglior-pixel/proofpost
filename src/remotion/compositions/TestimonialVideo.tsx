import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface TestimonialVideoProps {
  reviewerName: string;
  reviewerTitle: string;
  reviewerCompany: string;
  reviewText: string;
  companyName: string;
  primaryColor: string;
  starRating: number;
}

export const TestimonialVideo: React.FC<TestimonialVideoProps> = ({
  reviewerName,
  reviewerTitle,
  reviewerCompany,
  reviewText,
  companyName,
  primaryColor,
  starRating,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation springs
  const backgroundScale = spring({ frame, fps, config: { damping: 100 } });

  const quoteOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateRight: "clamp",
  });
  const quoteY = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const starsDelay = 40;
  const starsOpacity = interpolate(frame, [starsDelay, starsDelay + 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const textDelay = 55;
  const textOpacity = interpolate(frame, [textDelay, textDelay + 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const textY = interpolate(frame, [textDelay, textDelay + 20], [30, 0], {
    extrapolateRight: "clamp",
  });

  const authorDelay = 85;
  const authorOpacity = interpolate(
    frame,
    [authorDelay, authorDelay + 15],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  const brandDelay = 110;
  const brandOpacity = interpolate(
    frame,
    [brandDelay, brandDelay + 15],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f0f0f",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Background accent */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${primaryColor}22, transparent 70%)`,
          transform: `translate(-50%, -50%) scale(${backgroundScale})`,
        }}
      />

      {/* Content container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0 80px",
          gap: 40,
          maxWidth: 900,
        }}
      >
        {/* Quote mark */}
        <div
          style={{
            fontSize: 120,
            color: primaryColor,
            opacity: quoteOpacity,
            transform: `translateY(${interpolate(quoteY, [0, 1], [40, 0])}px)`,
            lineHeight: 1,
          }}
        >
          &ldquo;
        </div>

        {/* Stars */}
        <div
          style={{
            display: "flex",
            gap: 8,
            opacity: starsOpacity,
          }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              style={{
                fontSize: 36,
                color: i < starRating ? "#facc15" : "#333",
              }}
            >
              ★
            </span>
          ))}
        </div>

        {/* Review text */}
        <div
          style={{
            fontSize: 42,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.4,
            fontWeight: 500,
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
          }}
        >
          {reviewText}
        </div>

        {/* Author info */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            opacity: authorOpacity,
          }}
        >
          <div style={{ fontSize: 28, color: "#ffffff", fontWeight: 700 }}>
            {reviewerName}
          </div>
          <div style={{ fontSize: 22, color: "#999" }}>
            {reviewerTitle} @ {reviewerCompany}
          </div>
        </div>

        {/* Brand */}
        <div
          style={{
            fontSize: 20,
            color: primaryColor,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: "uppercase",
            opacity: brandOpacity,
          }}
        >
          {companyName}
        </div>
      </div>
    </AbsoluteFill>
  );
};
