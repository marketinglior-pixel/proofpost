import { NextRequest, NextResponse } from "next/server";
import satori from "satori";
import sharp from "sharp";
import React from "react";

const SLIDE_WIDTH = 1080;
const SLIDE_HEIGHT = 1350;
const BANNER_WIDTH = 1200;
const BANNER_HEIGHT = 628;

interface SlideData {
  slideNumber: number;
  heading: string;
  body: string;
  footer?: string;
}

interface BrandData {
  companyName: string;
  logoUrl: string | null;
  primaryColor: string;
  secondaryColor: string;
}

interface ReviewerData {
  name: string;
  title: string;
  company: string;
  photoUrl?: string | null;
}

async function getFont(): Promise<ArrayBuffer> {
  const res = await fetch(
    "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.woff"
  );
  return res.arrayBuffer();
}

async function getFontRegular(): Promise<ArrayBuffer> {
  const res = await fetch(
    "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.woff"
  );
  return res.arrayBuffer();
}

// Hebrew font (Noto Sans Hebrew) for RTL support
async function getHebrewFont(): Promise<ArrayBuffer> {
  const res = await fetch(
    "https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-hebrew@latest/hebrew-700-normal.woff"
  );
  return res.arrayBuffer();
}

async function getHebrewFontRegular(): Promise<ArrayBuffer> {
  const res = await fetch(
    "https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-hebrew@latest/hebrew-400-normal.woff"
  );
  return res.arrayBuffer();
}

// Detect if text contains RTL characters (Hebrew, Arabic)
function isRTL(text: string): boolean {
  return /[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);
}

function getContrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#0f172a" : "#FFFFFF";
}

function lightenColor(hex: string, amount: number): string {
  const r = Math.min(255, parseInt(hex.slice(1, 3), 16) + amount);
  const g = Math.min(255, parseInt(hex.slice(3, 5), 16) + amount);
  const b = Math.min(255, parseInt(hex.slice(5, 7), 16) + amount);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function getInitials(name: string): string {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

// Powered by footer
function PoweredBy(textColor: string) {
  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
      },
    },
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "8px 16px",
          borderRadius: "20px",
          backgroundColor: "rgba(255,255,255,0.1)",
        },
      },
      React.createElement("span", { style: { fontSize: 14, color: "#10B981" } }, "\u2726"),
      React.createElement(
        "span",
        { style: { fontSize: 14, color: textColor, opacity: 0.5, fontWeight: 500 } },
        "proofpst.com"
      )
    )
  );
}

// Stars component
function Stars(size: number) {
  return React.createElement(
    "div",
    { style: { display: "flex", gap: "6px" } },
    [1, 2, 3, 4, 5].map((i) =>
      React.createElement(
        "span",
        { key: i, style: { fontSize: size, color: "#FBBF24" } },
        "\u2605"
      )
    )
  );
}

// Avatar with brand border
function Avatar(reviewer: ReviewerData, size: number, borderColor: string) {
  if (reviewer.photoUrl) {
    return React.createElement(
      "div",
      {
        style: {
          display: "flex",
          width: size + 8,
          height: size + 8,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${borderColor}, #FBBF24)`,
          alignItems: "center",
          justifyContent: "center",
        },
      },
      React.createElement("img", {
        src: reviewer.photoUrl,
        width: size,
        height: size,
        style: { borderRadius: "50%", objectFit: "cover" },
      })
    );
  }

  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${borderColor}, ${lightenColor(borderColor, 40)})`,
        color: "#fff",
        fontSize: size * 0.38,
        fontWeight: 700,
      },
    },
    getInitials(reviewer.name)
  );
}

// Slide dots
function SlideDots(current: number, activeColor: string, inactiveColor: string) {
  return React.createElement(
    "div",
    { style: { display: "flex", gap: "10px", alignItems: "center" } },
    [1, 2, 3].map((n) =>
      React.createElement("div", {
        key: n,
        style: {
          width: n === current ? "44px" : "12px",
          height: "12px",
          borderRadius: "6px",
          backgroundColor: n === current ? activeColor : inactiveColor,
        },
      })
    )
  );
}

// ========== SLIDE 1: Hook Card (LinkedIn-inspired) ==========
function SlideOne(slide: SlideData, brand: BrandData, _reviewer: ReviewerData) {
  const textColor = getContrastColor(brand.primaryColor);
  const gradientEnd = lightenColor(brand.primaryColor, -30);

  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: SLIDE_WIDTH,
        height: SLIDE_HEIGHT,
        background: `linear-gradient(145deg, ${brand.primaryColor} 0%, ${gradientEnd} 100%)`,
        padding: "80px",
        fontFamily: "Inter",
        position: "relative",
        overflow: "hidden",
      },
    },
    // Decorative circle top-right
    React.createElement("div", {
      style: {
        position: "absolute",
        top: "-120px",
        right: "-120px",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        backgroundColor: "rgba(255,255,255,0.06)",
      },
    }),
    // Decorative circle bottom-left
    React.createElement("div", {
      style: {
        position: "absolute",
        bottom: "-80px",
        left: "-80px",
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        backgroundColor: "rgba(255,255,255,0.04)",
      },
    }),
    // Center: Hook content
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "36px",
          flex: 1,
          justifyContent: "center",
          position: "relative",
        },
      },
      // Accent line
      React.createElement("div", {
        style: {
          width: "64px",
          height: "5px",
          borderRadius: "3px",
          background: "linear-gradient(90deg, #FBBF24, #F59E0B)",
        },
      }),
      // Heading
      React.createElement(
        "h1",
        {
          style: {
            fontSize: 68,
            fontWeight: 700,
            color: textColor,
            lineHeight: 1.12,
            margin: 0,
            letterSpacing: "-0.02em",
          },
        },
        slide.heading
      ),
      // Body
      React.createElement(
        "p",
        {
          style: {
            fontSize: 30,
            color: textColor,
            opacity: 0.7,
            lineHeight: 1.5,
            margin: 0,
            maxWidth: "85%",
          },
        },
        slide.body
      ),
      // Swipe hint with arrow
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "8px",
          },
        },
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              borderRadius: "30px",
              backgroundColor: "rgba(251,191,36,0.15)",
              border: "1px solid rgba(251,191,36,0.3)",
            },
          },
          React.createElement(
            "span",
            { style: { fontSize: 20, color: "#FBBF24", fontWeight: 600 } },
            "Swipe to see the proof \u2192"
          )
        )
      )
    ),
    // Bottom: Dots + Powered by
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        },
      },
      SlideDots(1, "#FBBF24", "rgba(255,255,255,0.2)"),
      PoweredBy(textColor)
    )
  );
}

// ========== SLIDE 2: Testimonial Card (Instagram-inspired) ==========
function SlideTwo(slide: SlideData, brand: BrandData, reviewer: ReviewerData) {
  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: SLIDE_WIDTH,
        height: SLIDE_HEIGHT,
        backgroundColor: "#FAFBFC",
        padding: "80px",
        fontFamily: "Inter",
        position: "relative",
        overflow: "hidden",
      },
    },
    // Subtle decorative gradient corner
    React.createElement("div", {
      style: {
        position: "absolute",
        top: "0",
        right: "0",
        width: "500px",
        height: "500px",
        background: `radial-gradient(circle at top right, ${brand.primaryColor}10 0%, transparent 70%)`,
      },
    }),
    // Top spacer
    React.createElement("div", { style: { display: "flex" } }),
    // Placeholder to maintain structure
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          position: "relative",
        },
      },
      React.createElement(
        "div",
        { style: { display: "flex", alignItems: "center", gap: "10px" } },
        brand.logoUrl
          ? React.createElement("img", {
              src: brand.logoUrl,
              width: 32,
              height: 32,
              style: { borderRadius: "8px", objectFit: "contain" },
            })
          : null,
        React.createElement(
          "span",
          { style: { fontSize: 18, fontWeight: 600, color: "#94a3b8" } },
          brand.companyName
        )
      )
    ),
    // Center: Quote
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          flex: 1,
          justifyContent: "center",
          position: "relative",
        },
      },
      // Large decorative quote mark
      React.createElement(
        "span",
        {
          style: {
            fontSize: 160,
            color: brand.primaryColor,
            opacity: 0.1,
            lineHeight: 0.4,
            fontFamily: "Georgia, serif",
            marginBottom: "-30px",
          },
        },
        "\u201C"
      ),
      // Quote text - hero sized
      React.createElement(
        "p",
        {
          style: {
            fontSize: 42,
            fontWeight: 400,
            color: "#0f172a",
            lineHeight: 1.45,
            margin: 0,
            fontStyle: "italic",
            letterSpacing: "-0.01em",
          },
        },
        slide.body
      ),
      // Reviewer info with bordered avatar
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginTop: "20px",
          },
        },
        Avatar(reviewer, 72, brand.primaryColor),
        React.createElement(
          "div",
          { style: { display: "flex", flexDirection: "column", gap: "4px" } },
          React.createElement(
            "span",
            { style: { fontSize: 26, fontWeight: 700, color: "#0f172a" } },
            reviewer.name
          ),
          React.createElement(
            "span",
            { style: { fontSize: 20, color: "#64748b" } },
            `${reviewer.title}${reviewer.company ? `, ${reviewer.company}` : ""}`
          )
        )
      )
    ),
    // Bottom: Dots + Powered by
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        },
      },
      SlideDots(2, brand.primaryColor, "rgba(15,23,42,0.1)"),
      PoweredBy("#0f172a")
    )
  );
}

// ========== SLIDE 3: CTA Card (Premium) ==========
function SlideThree(slide: SlideData, brand: BrandData, _reviewer: ReviewerData) {
  const textColor = getContrastColor(brand.secondaryColor);
  const gradientEnd = lightenColor(brand.secondaryColor, -25);

  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: SLIDE_WIDTH,
        height: SLIDE_HEIGHT,
        background: `linear-gradient(160deg, ${brand.secondaryColor} 0%, ${gradientEnd} 100%)`,
        padding: "80px",
        fontFamily: "Inter",
        position: "relative",
        overflow: "hidden",
      },
    },
    // Decorative elements
    React.createElement("div", {
      style: {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        backgroundColor: "rgba(255,255,255,0.04)",
        transform: "translate(-50%, -50%)",
      },
    }),
    React.createElement("div", {
      style: {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        backgroundColor: "rgba(255,255,255,0.03)",
        transform: "translate(-50%, -50%)",
      },
    }),
    // Top spacer
    React.createElement("div", { style: { display: "flex" } }),
    // Center: CTA content
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "40px",
          textAlign: "center",
          position: "relative",
        },
      },
      // Logo
      brand.logoUrl
        ? React.createElement("img", {
            src: brand.logoUrl,
            width: 88,
            height: 88,
            style: { borderRadius: "20px", objectFit: "contain" },
          })
        : null,
      // Heading
      React.createElement(
        "h2",
        {
          style: {
            fontSize: 56,
            fontWeight: 700,
            color: textColor,
            margin: 0,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          },
        },
        slide.heading
      ),
      // Body
      React.createElement(
        "p",
        {
          style: {
            fontSize: 26,
            color: textColor,
            opacity: 0.6,
            margin: 0,
            lineHeight: 1.5,
            maxWidth: "80%",
          },
        },
        slide.body
      ),
      // CTA Button - premium style
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            background: "linear-gradient(135deg, #FBBF24, #F59E0B)",
            padding: "26px 64px",
            borderRadius: "16px",
            marginTop: "12px",
            boxShadow: "0 8px 32px rgba(251,191,36,0.3)",
          },
        },
        React.createElement(
          "span",
          {
            style: {
              color: "#0f172a",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.01em",
            },
          },
          `Visit ${brand.companyName}`
        )
      )
    ),
    // Bottom: Dots + Powered by
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          position: "relative",
        },
      },
      SlideDots(3, "#FBBF24", "rgba(255,255,255,0.2)"),
      PoweredBy(textColor)
    )
  );
}

// ========== BANNER: Social Proof Banner (1200x628) ==========
function BannerSlide(slide: SlideData, brand: BrandData, reviewer: ReviewerData) {
  const textColor = getContrastColor(brand.primaryColor);

  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        width: BANNER_WIDTH,
        height: BANNER_HEIGHT,
        fontFamily: "Inter",
        overflow: "hidden",
      },
    },
    // Left: Quote + Reviewer (~58%)
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "58%",
          padding: "48px 52px",
          backgroundColor: "#FAFBFC",
          gap: "24px",
          position: "relative",
        },
      },
      // Decorative quote mark
      React.createElement(
        "span",
        {
          style: {
            position: "absolute",
            top: "20px",
            left: "40px",
            fontSize: 100,
            color: brand.primaryColor,
            opacity: 0.08,
            fontFamily: "Georgia, serif",
            lineHeight: 0.5,
          },
        },
        "\u201C"
      ),
      Stars(22),
      React.createElement(
        "p",
        {
          style: {
            fontSize: 24,
            fontWeight: 400,
            color: "#0f172a",
            lineHeight: 1.5,
            margin: 0,
            fontStyle: "italic",
            position: "relative",
          },
        },
        slide.body
      ),
      // Reviewer
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginTop: "8px",
          },
        },
        Avatar(reviewer, 48, brand.primaryColor),
        React.createElement(
          "div",
          { style: { display: "flex", flexDirection: "column", gap: "2px" } },
          React.createElement(
            "span",
            { style: { fontSize: 17, fontWeight: 700, color: "#0f172a" } },
            reviewer.name
          ),
          React.createElement(
            "span",
            { style: { fontSize: 14, color: "#64748b" } },
            `${reviewer.title}${reviewer.company ? `, ${reviewer.company}` : ""}`
          )
        )
      )
    ),
    // Right: Brand panel (~42%)
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "42%",
          background: `linear-gradient(145deg, ${brand.primaryColor}, ${lightenColor(brand.primaryColor, -25)})`,
          padding: "48px 40px",
          gap: "24px",
          position: "relative",
          overflow: "hidden",
        },
      },
      React.createElement("div", {
        style: {
          position: "absolute",
          top: "-60px",
          right: "-60px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.06)",
        },
      }),
      brand.logoUrl
        ? React.createElement("img", {
            src: brand.logoUrl,
            width: 64,
            height: 64,
            style: { borderRadius: "14px", objectFit: "contain", position: "relative" },
          })
        : null,
      React.createElement(
        "span",
        {
          style: {
            fontSize: 28,
            fontWeight: 700,
            color: textColor,
            textAlign: "center",
            position: "relative",
          },
        },
        brand.companyName
      ),
      React.createElement("div", {
        style: {
          width: "40px",
          height: "3px",
          borderRadius: "2px",
          background: "linear-gradient(90deg, #FBBF24, #F59E0B)",
          position: "relative",
        },
      }),
      React.createElement(
        "span",
        {
          style: {
            fontSize: 15,
            color: textColor,
            opacity: 0.6,
            textAlign: "center",
            position: "relative",
          },
        },
        "Trusted by real customers"
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "6px",
            position: "relative",
            marginTop: "8px",
          },
        },
        React.createElement("span", { style: { fontSize: 12, color: "#10B981" } }, "\u2726"),
        React.createElement(
          "span",
          { style: { fontSize: 12, color: textColor, opacity: 0.4 } },
          "proofpst.com"
        )
      )
    )
  );
}

export async function POST(request: NextRequest) {
  try {
    const { slide, brand, slideIndex, reviewer, type } = (await request.json()) as {
      slide: SlideData;
      brand: BrandData;
      slideIndex: number;
      reviewer?: ReviewerData;
      type?: "banner";
    };

    const reviewerData: ReviewerData = reviewer || {
      name: "Customer",
      title: "",
      company: "",
    };

    // Detect RTL from slide content
    const textToCheck = `${slide.heading} ${slide.body} ${slide.footer || ""} ${reviewerData.name}`;
    const rtl = isRTL(textToCheck);

    // Load fonts (including Hebrew if RTL detected)
    const fontPromises: Promise<ArrayBuffer>[] = [getFont(), getFontRegular()];
    if (rtl) {
      fontPromises.push(getHebrewFont(), getHebrewFontRegular());
    }
    const fontBuffers = await Promise.all(fontPromises);
    const fontBold = fontBuffers[0];
    const fontRegular = fontBuffers[1];
    const hebrewBold = fontBuffers[2];
    const hebrewRegular = fontBuffers[3];

    let element: React.ReactNode;
    let renderWidth = SLIDE_WIDTH;
    let renderHeight = SLIDE_HEIGHT;

    if (type === "banner") {
      element = BannerSlide(slide, brand, reviewerData);
      renderWidth = BANNER_WIDTH;
      renderHeight = BANNER_HEIGHT;
    } else if (slideIndex === 0) {
      element = SlideOne(slide, brand, reviewerData);
    } else if (slideIndex === 1) {
      element = SlideTwo(slide, brand, reviewerData);
    } else {
      element = SlideThree(slide, brand, reviewerData);
    }

    // Wrap in RTL container if needed (sets font-family fallback to Hebrew font)
    if (rtl) {
      element = React.createElement(
        "div",
        {
          style: {
            display: "flex",
            width: renderWidth,
            height: renderHeight,
            fontFamily: "Noto Sans Hebrew, Inter",
          },
        },
        element
      );
    }

    // Build font list
    const fonts: Array<{ name: string; data: ArrayBuffer; weight: 400 | 700; style: "normal" }> = [
      { name: "Inter", data: fontBold, weight: 700, style: "normal" },
      { name: "Inter", data: fontRegular, weight: 400, style: "normal" },
    ];
    if (rtl && hebrewBold && hebrewRegular) {
      fonts.push(
        { name: "Noto Sans Hebrew", data: hebrewBold, weight: 700, style: "normal" },
        { name: "Noto Sans Hebrew", data: hebrewRegular, weight: 400, style: "normal" }
      );
    }

    const svg = await satori(element as React.ReactNode, {
      width: renderWidth,
      height: renderHeight,
      fonts,
    });

    const pngBuffer = await sharp(Buffer.from(svg))
      .resize(renderWidth, renderHeight)
      .png()
      .toBuffer();

    return new NextResponse(new Uint8Array(pngBuffer), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Render error:", error);
    return NextResponse.json(
      { error: "Failed to render slide" },
      { status: 500 }
    );
  }
}
