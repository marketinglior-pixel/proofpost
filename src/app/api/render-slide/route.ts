import { NextRequest, NextResponse } from "next/server";
import satori from "satori";
import sharp from "sharp";
import React from "react";

// LinkedIn carousel optimal size (1080x1350 for portrait, 4:5 ratio)
const SLIDE_WIDTH = 1080;
const SLIDE_HEIGHT = 1350;

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

// Fetch font at build/request time
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
  return luminance > 0.5 ? "#1E293B" : "#FFFFFF";
}

function SlideOne(slide: SlideData, brand: BrandData) {
  const textColor = getContrastColor(brand.primaryColor);
  const subtleColor = textColor === "#FFFFFF" ? "rgba(255,255,255,0.7)" : "rgba(30,41,59,0.6)";

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
    // Top: Logo area
    React.createElement(
      "div",
      { style: { display: "flex", alignItems: "center", gap: "16px" } },
      brand.logoUrl
        ? React.createElement("img", {
            src: brand.logoUrl,
            width: 48,
            height: 48,
            style: { borderRadius: "8px", objectFit: "contain" },
          })
        : null,
      React.createElement(
        "span",
        {
          style: {
            fontSize: 28,
            fontWeight: 700,
            color: textColor,
            opacity: 0.8,
          },
        },
        brand.companyName
      )
    ),
    // Center: Main content
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
      React.createElement(
        "h1",
        {
          style: {
            fontSize: 72,
            fontWeight: 700,
            color: textColor,
            lineHeight: 1.1,
            margin: 0,
          },
        },
        slide.heading
      ),
      React.createElement(
        "p",
        {
          style: {
            fontSize: 36,
            color: subtleColor,
            lineHeight: 1.5,
            margin: 0,
          },
        },
        slide.body
      )
    ),
    // Bottom: Slide indicator
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          gap: "12px",
          alignItems: "center",
        },
      },
      [1, 2, 3].map((n) =>
        React.createElement("div", {
          key: n,
          style: {
            width: n === slide.slideNumber ? "48px" : "12px",
            height: "12px",
            borderRadius: "6px",
            backgroundColor: textColor,
            opacity: n === slide.slideNumber ? 1 : 0.3,
          },
        })
      )
    )
  );
}

function SlideTwo(slide: SlideData, brand: BrandData) {
  const textColor = getContrastColor(brand.secondaryColor);
  const accentColor = brand.primaryColor;

  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: SLIDE_WIDTH,
        height: SLIDE_HEIGHT,
        backgroundColor: brand.secondaryColor,
        padding: "80px",
        fontFamily: "Inter",
      },
    },
    // Top accent bar
    React.createElement("div", {
      style: {
        width: "80px",
        height: "6px",
        backgroundColor: accentColor,
        borderRadius: "3px",
      },
    }),
    // Center content
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
      // Heading
      React.createElement(
        "h2",
        {
          style: {
            fontSize: 48,
            fontWeight: 700,
            color: accentColor,
            margin: 0,
          },
        },
        slide.heading
      ),
      // Quote mark + body
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          },
        },
        React.createElement(
          "span",
          {
            style: {
              fontSize: 120,
              color: accentColor,
              opacity: 0.3,
              lineHeight: 0.5,
              marginBottom: "-20px",
            },
          },
          "\u201C"
        ),
        React.createElement(
          "p",
          {
            style: {
              fontSize: 40,
              fontWeight: 400,
              color: textColor,
              lineHeight: 1.5,
              margin: 0,
              fontStyle: "italic",
            },
          },
          slide.body
        )
      ),
      // Footer (customer name)
      slide.footer
        ? React.createElement(
            "p",
            {
              style: {
                fontSize: 28,
                color: textColor,
                opacity: 0.6,
                margin: 0,
              },
            },
            slide.footer
          )
        : null
    ),
    // Bottom: Slide indicator
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          gap: "12px",
          alignItems: "center",
        },
      },
      [1, 2, 3].map((n) =>
        React.createElement("div", {
          key: n,
          style: {
            width: n === slide.slideNumber ? "48px" : "12px",
            height: "12px",
            borderRadius: "6px",
            backgroundColor: textColor,
            opacity: n === slide.slideNumber ? 1 : 0.3,
          },
        })
      )
    )
  );
}

function SlideThree(slide: SlideData, brand: BrandData) {
  const bgColor = "#FFFFFF";
  const textColor = "#1E293B";

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
        backgroundColor: bgColor,
        padding: "80px",
        fontFamily: "Inter",
      },
    },
    // Spacer
    React.createElement("div", { style: { display: "flex" } }),
    // Center content
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
            fontSize: 56,
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
            fontSize: 32,
            color: "#64748B",
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
            backgroundColor: brand.primaryColor,
            padding: "24px 64px",
            borderRadius: "16px",
            marginTop: "20px",
          },
        },
        React.createElement(
          "span",
          {
            style: {
              color: getContrastColor(brand.primaryColor),
              fontSize: 30,
              fontWeight: 700,
            },
          },
          `Visit ${brand.companyName}`
        )
      )
    ),
    // Bottom: Slide indicator
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          gap: "12px",
          alignItems: "center",
        },
      },
      [1, 2, 3].map((n) =>
        React.createElement("div", {
          key: n,
          style: {
            width: n === 3 ? "48px" : "12px",
            height: "12px",
            borderRadius: "6px",
            backgroundColor: brand.primaryColor,
            opacity: n === 3 ? 1 : 0.3,
          },
        })
      )
    )
  );
}

export async function POST(request: NextRequest) {
  try {
    const { slide, brand, slideIndex } = (await request.json()) as {
      slide: SlideData;
      brand: BrandData;
      slideIndex: number;
    };

    // Fetch fonts
    const [fontBold, fontRegular] = await Promise.all([
      getFont(),
      getFontRegular(),
    ]);

    // Pick the right slide layout
    let element: React.ReactNode;
    if (slideIndex === 0) {
      element = SlideOne(slide, brand);
    } else if (slideIndex === 1) {
      element = SlideTwo(slide, brand);
    } else {
      element = SlideThree(slide, brand);
    }

    // Render to SVG with Satori
    const svg = await satori(element as React.ReactNode, {
      width: SLIDE_WIDTH,
      height: SLIDE_HEIGHT,
      fonts: [
        {
          name: "Inter",
          data: fontBold,
          weight: 700,
          style: "normal",
        },
        {
          name: "Inter",
          data: fontRegular,
          weight: 400,
          style: "normal",
        },
      ],
    });

    // Convert SVG to PNG using sharp
    const pngBuffer = await sharp(Buffer.from(svg))
      .resize(SLIDE_WIDTH, SLIDE_HEIGHT)
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
