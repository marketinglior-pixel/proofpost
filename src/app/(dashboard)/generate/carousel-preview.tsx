"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Download,
  Loader2,
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

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

interface CarouselPreviewProps {
  slides: SlideData[];
  brand: BrandData;
  reviewer?: ReviewerData;
  plan?: "free" | "pro";
}

export function CarouselPreview({ slides, brand, reviewer, plan = "free" }: CarouselPreviewProps) {
  const [slideImages, setSlideImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  useEffect(() => {
    async function renderSlides() {
      setLoading(true);
      const images: string[] = [];

      for (let i = 0; i < slides.length; i++) {
        try {
          const res = await fetch("/api/render-slide", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              slide: slides[i],
              brand,
              slideIndex: i,
              reviewer,
            }),
          });

          if (!res.ok) throw new Error("Failed to render slide");

          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          images.push(url);
        } catch {
          images.push("");
          console.error(`Failed to render slide ${i + 1}`);
        }
      }

      setSlideImages(images);
      setLoading(false);
    }

    renderSlides();

    return () => {
      slideImages.forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides, brand]);

  async function handleDownloadAll() {
    setDownloading(true);
    try {
      for (let i = 0; i < slideImages.length; i++) {
        if (!slideImages[i]) continue;

        const res = await fetch(slideImages[i]);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `proofpost-slide-${i + 1}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        if (i < slideImages.length - 1) {
          await new Promise((r) => setTimeout(r, 300));
        }
      }
      toast.success("All slides downloaded!");
    } catch {
      toast.error("Failed to download slides");
    } finally {
      setDownloading(false);
    }
  }

  async function handleDownloadPdf() {
    if (plan !== "pro") {
      toast.error("PDF download is a Pro feature. Upgrade to unlock.", {
        action: { label: "Upgrade", onClick: () => window.location.href = "/pricing" },
      });
      return;
    }
    setDownloadingPdf(true);
    try {
      const res = await fetch("/api/render-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slides, brand, reviewer }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate PDF");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "proofpost-carousel.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("PDF carousel downloaded!");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to generate PDF"
      );
    } finally {
      setDownloadingPdf(false);
    }
  }

  function handleDownloadSingle(index: number) {
    if (!slideImages[index]) return;

    const a = document.createElement("a");
    a.href = slideImages[index];
    a.download = `proofpost-slide-${index + 1}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-amber" />
        <p className="text-sm text-ink-muted">
          Rendering your branded slides...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Slide Viewer */}
      <div className="relative">
        <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-lg border border-cream-dark">
          {slideImages[currentSlide] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={slideImages[currentSlide]}
              alt={`Slide ${currentSlide + 1}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-cream flex items-center justify-center">
              <p className="text-ink-muted">Failed to render</p>
            </div>
          )}

          {currentSlide > 0 && (
            <button
              onClick={() => setCurrentSlide((p) => p - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-ink" />
            </button>
          )}
          {currentSlide < slides.length - 1 && (
            <button
              onClick={() => setCurrentSlide((p) => p + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-ink" />
            </button>
          )}

          <button
            onClick={() => handleDownloadSingle(currentSlide)}
            className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-white/90 shadow flex items-center justify-center hover:bg-white transition-colors"
            title="Download this slide"
          >
            <Download className="w-4 h-4 text-ink" />
          </button>
        </div>

        {/* Slide Indicator Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2.5 rounded-full transition-colors ${
                i === currentSlide
                  ? "w-8 bg-amber"
                  : "w-2.5 bg-cream-dark hover:bg-ink-muted/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Slide Thumbnails */}
      <div className="grid grid-cols-3 gap-3">
        {slideImages.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`aspect-[4/5] rounded-lg overflow-hidden border-2 transition-colors ${
              i === currentSlide
                ? "border-amber shadow-md"
                : "border-cream-dark hover:border-ink-muted/30"
            }`}
          >
            {img ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={img}
                alt={`Thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-cream" />
            )}
          </button>
        ))}
      </div>

      {/* Download Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={handleDownloadPdf}
          disabled={downloadingPdf}
          className="h-11 bg-ink hover:bg-ink-light text-cream font-medium shadow-none transition-colors duration-200"
        >
          {downloadingPdf ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <FileText className="w-4 h-4 mr-2" />
          )}
          Download PDF
        </Button>
        <Button
          onClick={handleDownloadAll}
          disabled={downloading}
          variant="outline"
          className="h-11 border-cream-dark text-ink hover:bg-cream-dark/50 font-medium shadow-none transition-colors duration-200"
        >
          {downloading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Download className="w-4 h-4 mr-2" />
          )}
          Download PNGs
        </Button>
      </div>
    </div>
  );
}
