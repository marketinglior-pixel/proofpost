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

function getContrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#1a1a2e" : "#FFFFFF";
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Stars component
function Stars() {
  return React.createElement(
    "div",
    { style: { display: "flex", gap: "8px" } },
    [1, 2, 3, 4, 5].map((i) =>
      React.createElement(
        "span",
        {
          key: i,
          style: { fontSize: 32, color: "#FBBF24" },
        },
        "\u2605"
      )
    )
  );
}

// Powered by footer
function PoweredBy() {
  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        paddingTop: "20px",
      },
    },
    React.createElement("span", { style: { fontSize: 16, color: "#10B981" } }, "\u2726"),
    React.createElement(
      "span",
      { style: { fontSize: 16, color: "#94a3b8", fontWeight: 500 } },
      "powered by proofpst.com"
    )
  );
}

// Slide dots
function SlideDots(current: number) {
  return React.createElement(
    "div",
    { style: { display: "flex", gap: "12px", alignItems: "center" } },
    [1, 2, 3].map((n) =>
      React.createElement("div", {
        key: n,
        style: {
          width: n === current ? "48px" : "12px",
          height: "12px",
          borderRadius: "6px",
          backgroundColor: n === current ? "#FBBF24" : "rgba(255,255,255,0.3)",
        },
      })
    )
  );
}

// Avatar (photo or initials)
function Avatar(reviewer: ReviewerData, size: number) {
  if (reviewer.photoUrl) {
    return React.createElement("img", {
      src: reviewer.photoUrl,
      width: size,
      height: size,
      style: {
        borderRadius: "50%",
        objectFit: "cover",
      },
    });
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
        backgroundColor: "#FBBF24",
        color: "#1a1a2e",
        fontSize: size * 0.4,
        fontWeight: 700,
      },
    },
    getInitials(reviewer.name)
  );
}

// ========== SLIDE 1: Hook Card ==========
function SlideOne(
  slide: SlideData,
  brand: BrandData,
  _reviewer: ReviewerData
) {
  const textColor = getContrastColor(brand.primaryColor);

  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: SLIDE_WIDTH,
        height: SLIDE_HEIGHT,
        backgroundColor: brand.primaryColor,
        padding: "80px",
        fontFamily: "Inter",
      },
    },
    // Top: Logo
    React.createElement(
      "div",
      { style: { display: "flex", alignItems: "center", gap: "16px" } },
      brand.logoUrl
        ? React.createElement("img", {
            src: brand.logoUrl,
            width: 48,
            height: 48,
            style: { borderRadius: "12px", objectFit: "contain" },
          })
        : null,
      React.createElement(
        "span",
        { style: { fontSize: 26, fontWeight: 700, color: textColor, opacity: 0.7 } },
        brand.companyName
      )
    ),
    // Center: Hook content
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "32px",
          flex: 1,
          justifyContent: "center",
        },
      },
      // Divider line
      React.createElement("div", {
        style: {
          width: "60px",
          height: "4px",
          backgroundColor: "#FBBF24",
          borderRadius: "2px",
        },
      }),
      React.createElement(
        "h1",
        {
          style: {
            fontSize: 64,
            fontWeight: 700,
            color: textColor,
            lineHeight: 1.15,
            margin: 0,
          },
        },
        slide.heading
      ),
      React.createElement(
        "p",
        {
          style: {
            fontSize: 32,
            color: textColor,
            opacity: 0.7,
            lineHeight: 1.5,
            margin: 0,
          },
        },
        slide.body
      ),
      // Swipe hint
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "16px",
          },
        },
        React.createElement(
          "span",
          { style: { fontSize: 22, color: "#FBBF24", fontWeight: 600 } },
          "Swipe to see the proof \u2192"
        )
      )
    ),
    // Bottom: Dots + Powered by
    React.createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: "12px" } },
      SlideDots(1),
      PoweredBy()
    )
  );
}

// ========== SLIDE 2: Testimonial Card ==========
function SlideTwo(
  slide: SlideData,
  brand: BrandData,
  reviewer: ReviewerData
) {
  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: SLIDE_WIDTH,
        height: SLIDE_HEIGHT,
        backgroundColor: "#FAFAF8",
        padding: "80px",
        fontFamily: "Inter",
      },
    },
    // Top: Stars
    Stars(),
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
        },
      },
      // Large quote mark
      React.createElement(
        "span",
        {
          style: {
            fontSize: 120,
            color: brand.primaryColor,
            opacity: 0.2,
            lineHeight: 0.5,
            marginBottom: "-20px",
          },
        },
        "\u201C"
      ),
      // Quote text
      React.createElement(
        "p",
        {
          style: {
            fontSize: 38,
            fontWeight: 400,
            color: "#1a1a2e",
            lineHeight: 1.5,
            margin: 0,
            fontStyle: "italic",
          },
        },
        slide.body
      ),
      // Reviewer info
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginTop: "16px",
          },
        },
        Avatar(reviewer, 64),
        React.createElement(
          "div",
          { style: { display: "flex", flexDirection: "column", gap: "4px" } },
          React.createElement(
            "span",
            { style: { fontSize: 24, fontWeight: 700, color: "#1a1a2e" } },
            reviewer.name
          ),
          React.createElement(
            "span",
            { style: { fontSize: 20, color: "#6b7094" } },
            `${reviewer.title}${reviewer.company ? `, ${reviewer.company}` : ""}`
          )
        )
      )
    ),
    // Bottom: Brand + dots
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        },
      },
      // Brand
      React.createElement(
        "div",
        { style: { display: "flex", alignItems: "center", gap: "12px" } },
        brand.logoUrl
          ? React.createElement("img", {
              src: brand.logoUrl,
              width: 36,
              height: 36,
              style: { borderRadius: "8px", objectFit: "contain" },
            })
          : null,
        React.createElement(
          "span",
          { style: { fontSize: 20, fontWeight: 600, color: "#6b7094" } },
          brand.companyName
        )
      ),
      // Dots
      React.createElement(
        "div",
        { style: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "12px" } },
        React.createElement(
          "div",
          { style: { display: "flex", gap: "10px", alignItems: "center" } },
          [1, 2, 3].map((n) =>
            React.createElement("div", {
              key: n,
              style: {
                width: n === 2 ? "40px" : "10px",
                height: "10px",
                borderRadius: "5px",
                backgroundColor:
                  n === 2 ? brand.primaryColor : "rgba(26,26,46,0.15)",
              },
            })
          )
        ),
        PoweredBy()
      )
    )
  );
}

// ========== SLIDE 3: CTA Card ==========
function SlideThree(
  slide: SlideData,
  brand: BrandData,
  _reviewer: ReviewerData
) {
  const textColor = getContrastColor(brand.secondaryColor);

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
        backgroundColor: brand.secondaryColor,
        padding: "80px",
        fontFamily: "Inter",
      },
    },
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
        },
      },
      brand.logoUrl
        ? React.createElement("img", {
            src: brand.logoUrl,
            width: 80,
            height: 80,
            style: { borderRadius: "16px", objectFit: "contain" },
          })
        : null,
      React.createElement(
        "h2",
        {
          style: {
            fontSize: 52,
            fontWeight: 700,
            color: textColor,
            margin: 0,
            lineHeight: 1.2,
          },
        },
        slide.heading
      ),
      React.createElement(
        "p",
        {
          style: {
            fontSize: 28,
            color: textColor,
            opacity: 0.6,
            margin: 0,
            lineHeight: 1.5,
          },
        },
        slide.body
      ),
      // CTA Button
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            backgroundColor: "#FBBF24",
            padding: "24px 56px",
            borderRadius: "14px",
            marginTop: "16px",
          },
        },
        React.createElement(
          "span",
          {
            style: {
              color: "#1a1a2e",
              fontSize: 28,
              fontWeight: 700,
            },
          },
          `Visit ${brand.companyName}`
        )
      )
    ),
    // Bottom: Dots + Powered by
    React.createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" } },
      React.createElement(
        "div",
        { style: { display: "flex", gap: "10px", alignItems: "center" } },
        [1, 2, 3].map((n) =>
          React.createElement("div", {
            key: n,
            style: {
              width: n === 3 ? "40px" : "10px",
              height: "10px",
              borderRadius: "5px",
              backgroundColor: n === 3 ? "#FBBF24" : "rgba(255,255,255,0.2)",
            },
          })
        )
      ),
      PoweredBy()
    )
  );
}

// ========== BANNER: Website Social Proof Banner (1200x628) ==========
function BannerSlide(
  slide: SlideData,
  brand: BrandData,
  reviewer: ReviewerData
) {
  const textColor = getContrastColor(brand.primaryColor);

  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        width: BANNER_WIDTH,
        height: BANNER_HEIGHT,
        fontFamily: "Inter",
      },
    },
    // Left side: Quote + Reviewer (~60%)
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "60%",
          padding: "48px 56px",
          backgroundColor: "#FAFAF8",
          gap: "24px",
        },
      },
      // Stars
      React.createElement(
        "div",
        { style: { display: "flex", gap: "4px" } },
        [1, 2, 3, 4, 5].map((i) =>
          React.createElement(
            "span",
            { key: i, style: { fontSize: 20, color: "#FBBF24" } },
            "\u2605"
          )
        )
      ),
      // Quote mark + text
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          },
        },
        React.createElement(
          "span",
          {
            style: {
              fontSize: 72,
              color: brand.primaryColor,
              opacity: 0.15,
              lineHeight: 0.5,
              marginBottom: "-4px",
            },
          },
          "\u201C"
        ),
        React.createElement(
          "p",
          {
            style: {
              fontSize: 24,
              fontWeight: 400,
              color: "#1a1a2e",
              lineHeight: 1.5,
              margin: 0,
              fontStyle: "italic",
            },
          },
          slide.body
        )
      ),
      // Reviewer info
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
        Avatar(reviewer, 44),
        React.createElement(
          "div",
          { style: { display: "flex", flexDirection: "column", gap: "2px" } },
          React.createElement(
            "span",
            { style: { fontSize: 16, fontWeight: 700, color: "#1a1a2e" } },
            reviewer.name
          ),
          React.createElement(
            "span",
            { style: { fontSize: 14, color: "#6b7094" } },
            `${reviewer.title}${reviewer.company ? `, ${reviewer.company}` : ""}`
          )
        )
      )
    ),
    // Right side: Brand panel (~40%)
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "40%",
          backgroundColor: brand.primaryColor,
          padding: "48px 40px",
          gap: "24px",
        },
      },
      brand.logoUrl
        ? React.createElement("img", {
            src: brand.logoUrl,
            width: 64,
            height: 64,
            style: { borderRadius: "14px", objectFit: "contain" },
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
          },
        },
        brand.companyName
      ),
      // Divider
      React.createElement("div", {
        style: {
          width: "40px",
          height: "3px",
          backgroundColor: "#FBBF24",
          borderRadius: "2px",
        },
      }),
      React.createElement(
        "span",
        {
          style: {
            fontSize: 16,
            color: textColor,
            opacity: 0.7,
            textAlign: "center",
          },
        },
        "Trusted by real customers"
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

    const [fontBold, fontRegular] = await Promise.all([
      getFont(),
      getFontRegular(),
    ]);

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

    const svg = await satori(element as React.ReactNode, {
      width: renderWidth,
      height: renderHeight,
      fonts: [
        { name: "Inter", data: fontBold, weight: 700, style: "normal" },
        { name: "Inter", data: fontRegular, weight: 400, style: "normal" },
      ],
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
