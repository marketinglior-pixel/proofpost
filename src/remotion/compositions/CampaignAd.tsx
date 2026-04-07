import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

// ─── Scene Components ────────────────────────────────────────

const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 12 } });
  const zeroOpacity = interpolate(frame, [20, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const zeroScale = spring({
    frame: frame - 20,
    fps,
    config: { damping: 8, stiffness: 150 },
  });
  const subtitleOpacity = interpolate(frame, [45, 55], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 60px",
      }}
    >
      {/* Accent glow */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, #ef444430, transparent 70%)",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
          transform: `scale(${titleScale})`,
        }}
      >
        <div
          style={{
            fontSize: 38,
            color: "#737373",
            fontWeight: 500,
            fontFamily: "Inter, sans-serif",
            textAlign: "center",
          }}
        >
          Your reviews are converting at
        </div>

        <div
          style={{
            fontSize: 180,
            fontWeight: 900,
            color: "#ef4444",
            fontFamily: "Inter, sans-serif",
            lineHeight: 1,
            opacity: zeroOpacity,
            transform: `scale(${Math.max(zeroScale, 0.01)})`,
          }}
        >
          0%
        </div>

        <div
          style={{
            fontSize: 28,
            color: "#525252",
            fontFamily: "Inter, sans-serif",
            textAlign: "center",
            opacity: subtitleOpacity,
            lineHeight: 1.4,
          }}
        >
          They sit on G2.{"\n"}Nobody sees them.
        </div>
      </div>
    </AbsoluteFill>
  );
};

const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({ frame, fps, config: { damping: 14 } });
  const slideX = interpolate(slideIn, [0, 1], [80, 0]);

  const strikeOpacity = interpolate(frame, [40, 50], [0, 1], {
    extrapolateRight: "clamp",
  });
  const strikeWidth = interpolate(frame, [40, 55], [0, 100], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  const problems = [
    "Screenshot reviews manually",
    "File a Jira ticket for dev",
    "Wait 2 weeks for a static block",
    '"Trusted by 500+ companies"',
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        justifyContent: "center",
        padding: "0 60px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          transform: `translateX(${slideX}px)`,
        }}
      >
        <div
          style={{
            fontSize: 32,
            color: "#10b981",
            fontWeight: 700,
            fontFamily: "Inter, sans-serif",
            marginBottom: 20,
          }}
        >
          The old way:
        </div>

        {problems.map((problem, i) => {
          const itemDelay = i * 12;
          const itemOpacity = interpolate(
            frame,
            [itemDelay + 10, itemDelay + 20],
            [0, 1],
            { extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                opacity: itemOpacity,
                position: "relative",
              }}
            >
              <span style={{ fontSize: 28, color: "#ef4444" }}>✗</span>
              <span
                style={{
                  fontSize: 30,
                  color: "#a3a3a3",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                }}
              >
                {problem}
              </span>

              {/* Strike-through line */}
              <div
                style={{
                  position: "absolute",
                  left: 44,
                  top: "50%",
                  height: 3,
                  backgroundColor: "#ef4444",
                  width: `${strikeWidth}%`,
                  opacity: strikeOpacity,
                  transform: "translateY(-50%)",
                }}
              />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const SolutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleY = spring({ frame, fps, config: { damping: 12 } });

  const cardScale = spring({
    frame: frame - 25,
    fps,
    config: { damping: 10, stiffness: 80 },
  });

  const glowPulse = interpolate(frame, [30, 60, 90], [0.3, 0.8, 0.3], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 50px",
      }}
    >
      {/* Glow behind card */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 400,
          borderRadius: 30,
          background: `radial-gradient(ellipse, #10b98140, transparent 70%)`,
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: glowPulse,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            opacity: titleOpacity,
            transform: `translateY(${interpolate(titleY, [0, 1], [30, 0])}px)`,
          }}
        >
          <div
            style={{
              fontSize: 24,
              color: "#10b981",
              fontWeight: 600,
              fontFamily: "Inter, sans-serif",
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            ProofPost
          </div>
          <div
            style={{
              fontSize: 38,
              color: "#ffffff",
              fontWeight: 700,
              fontFamily: "Inter, sans-serif",
              textAlign: "center",
              lineHeight: 1.3,
            }}
          >
            AI finds the one line{"\n"}that sells.
          </div>
        </div>

        {/* Demo card */}
        <div
          style={{
            width: 850,
            background: "linear-gradient(145deg, #1a1a2e, #16213e)",
            borderRadius: 24,
            padding: "48px 44px",
            border: "1px solid #10b98130",
            transform: `scale(${Math.max(cardScale, 0.01)})`,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {/* Extracted hook label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                background: "#10b981",
                borderRadius: 6,
                padding: "4px 12px",
                fontSize: 16,
                fontWeight: 700,
                color: "#000",
                fontFamily: "Inter, sans-serif",
              }}
            >
              AI HOOK
            </div>
            <div
              style={{
                fontSize: 16,
                color: "#737373",
                fontFamily: "Inter, sans-serif",
              }}
            >
              extracted from G2 review
            </div>
          </div>

          {/* The quote */}
          <div
            style={{
              fontSize: 34,
              color: "#ffffff",
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              lineHeight: 1.4,
            }}
          >
            "Cut our onboarding time by 60%. The team actually uses it."
          </div>

          {/* Author */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #10b981, #059669)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                color: "#fff",
                fontWeight: 700,
                fontFamily: "Inter, sans-serif",
              }}
            >
              M
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <div
                style={{
                  fontSize: 20,
                  color: "#ffffff",
                  fontWeight: 600,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Mike Reynolds
              </div>
              <div
                style={{
                  fontSize: 16,
                  color: "#737373",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                VP Product @ CloudStack
              </div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} style={{ fontSize: 20, color: "#facc15" }}>
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const StatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stats = [
    { number: "3x", label: "more attention than\nstatic testimonials" },
    { number: "60s", label: "to go live.\nNo developer needed." },
    { number: "$9", label: "per month.\nNot $50." },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 60px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 60,
          alignItems: "center",
        }}
      >
        {stats.map((stat, i) => {
          const delay = i * 20;
          const statScale = spring({
            frame: frame - delay,
            fps,
            config: { damping: 10, stiffness: 120 },
          });
          const statOpacity = interpolate(
            frame,
            [delay, delay + 10],
            [0, 1],
            { extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 30,
                opacity: statOpacity,
                transform: `scale(${Math.max(statScale, 0.01)})`,
              }}
            >
              <div
                style={{
                  fontSize: 80,
                  fontWeight: 900,
                  color: "#10b981",
                  fontFamily: "Inter, sans-serif",
                  lineHeight: 1,
                  minWidth: 200,
                  textAlign: "right",
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  fontSize: 26,
                  color: "#a3a3a3",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  lineHeight: 1.3,
                  whiteSpace: "pre-line",
                }}
              >
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 10 } });
  const headlineOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const headlineY = interpolate(frame, [15, 30], [40, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });
  const buttonOpacity = interpolate(frame, [40, 55], [0, 1], {
    extrapolateRight: "clamp",
  });
  const buttonScale = spring({
    frame: frame - 40,
    fps,
    config: { damping: 8, stiffness: 100 },
  });
  const subtextOpacity = interpolate(frame, [60, 75], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Pulsing glow on button
  const pulsePhase = interpolate(frame, [55, 90], [0, Math.PI * 2], {
    extrapolateRight: "extend",
  });
  const pulseGlow = 0.4 + 0.3 * Math.sin(pulsePhase);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 60px",
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 60%, #10b98115, transparent 70%)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontSize: 28,
            color: "#10b981",
            fontWeight: 700,
            fontFamily: "Inter, sans-serif",
            letterSpacing: 4,
            textTransform: "uppercase",
            transform: `scale(${logoScale})`,
          }}
        >
          ProofPost
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 48,
            color: "#ffffff",
            fontWeight: 800,
            fontFamily: "Inter, sans-serif",
            textAlign: "center",
            lineHeight: 1.2,
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
          }}
        >
          Stop screenshotting{"\n"}reviews like{"\n"}it&apos;s 2019.
        </div>

        {/* CTA Button */}
        <div
          style={{
            opacity: buttonOpacity,
            transform: `scale(${Math.max(buttonScale, 0.01)})`,
          }}
        >
          <div
            style={{
              background: "#10b981",
              borderRadius: 16,
              padding: "24px 64px",
              fontSize: 30,
              fontWeight: 700,
              color: "#000000",
              fontFamily: "Inter, sans-serif",
              boxShadow: `0 0 ${60 * pulseGlow}px ${20 * pulseGlow}px #10b98140`,
            }}
          >
            Try Free. No Card Required.
          </div>
        </div>

        {/* Subtext */}
        <div
          style={{
            fontSize: 22,
            color: "#525252",
            fontFamily: "Inter, sans-serif",
            opacity: subtextOpacity,
            textAlign: "center",
          }}
        >
          proofpost.io
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Main Composition ────────────────────────────────────────

export const CampaignAd: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Scene 1: Hook (0–3s) */}
      <Sequence from={0} durationInFrames={90}>
        <HookScene />
      </Sequence>

      {/* Scene 2: Problem (3–6s) */}
      <Sequence from={90} durationInFrames={90}>
        <ProblemScene />
      </Sequence>

      {/* Scene 3: Solution (6–11s) */}
      <Sequence from={180} durationInFrames={150}>
        <SolutionScene />
      </Sequence>

      {/* Scene 4: Stats (11–15s) */}
      <Sequence from={330} durationInFrames={120}>
        <StatsScene />
      </Sequence>

      {/* Scene 5: CTA (15–20s) */}
      <Sequence from={450} durationInFrames={150}>
        <CTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};
