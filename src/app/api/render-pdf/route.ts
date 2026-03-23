import { NextRequest, NextResponse } from "next/server";
import { jsPDF } from "jspdf";

// LinkedIn carousel: 1080x1350px at 4:5 ratio
// jsPDF uses mm, so we convert: 1080px ≈ 285.75mm, 1350px ≈ 357.19mm at 96 DPI
// But we'll use px units directly with jsPDF
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

export async function POST(request: NextRequest) {
  try {
    const { slides, brand } = (await request.json()) as {
      slides: SlideData[];
      brand: BrandData;
    };

    if (!slides || slides.length === 0) {
      return NextResponse.json(
        { error: "No slides provided" },
        { status: 400 }
      );
    }

    // Render each slide to PNG by calling our existing render-slide API
    const pngBuffers: Buffer[] = [];

    for (let i = 0; i < slides.length; i++) {
      const origin = request.nextUrl.origin;
      const res = await fetch(`${origin}/api/render-slide`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slide: slides[i],
          brand,
          slideIndex: i,
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to render slide ${i + 1}`);
      }

      const arrayBuffer = await res.arrayBuffer();
      pngBuffers.push(Buffer.from(arrayBuffer));
    }

    // Create PDF with jsPDF
    // Use px units matching our slide dimensions
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [SLIDE_WIDTH, SLIDE_HEIGHT],
      compress: true,
    });

    for (let i = 0; i < pngBuffers.length; i++) {
      if (i > 0) {
        pdf.addPage([SLIDE_WIDTH, SLIDE_HEIGHT], "portrait");
      }

      // Convert PNG buffer to base64 data URL
      const base64 = pngBuffers[i].toString("base64");
      const dataUrl = `data:image/png;base64,${base64}`;

      // Add image filling the entire page
      pdf.addImage(dataUrl, "PNG", 0, 0, SLIDE_WIDTH, SLIDE_HEIGHT);
    }

    // Generate PDF buffer
    const pdfBuffer = Buffer.from(pdf.output("arraybuffer"));

    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="proofpost-carousel.pdf"',
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("PDF render error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
