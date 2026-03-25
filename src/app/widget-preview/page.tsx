"use client";

import { useState } from "react";
import { EmbedCarousel } from "../embed/[id]/embed-carousel";
import { EmbedMarquee } from "../embed/[id]/embed-marquee";
import { EmbedGrid } from "../embed/[id]/embed-grid";
import { EmbedStack } from "../embed/[id]/embed-stack";

const sampleReviews = [
  {
    id: "1",
    hookLine: "Game-changer for our conversion rates",
    quote: "We saw a 34% increase in conversions after adding ProofPost widgets to our landing page. The AI-generated hooks are incredibly compelling and our visitors actually stop to read them.",
    reviewer: { name: "Sarah Chen", title: "Head of Growth", company: "Lemonade" },
    reviewerPhotoUrl: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    hookLine: "Finally, social proof that actually converts",
    quote: "We tried every testimonial plugin out there. ProofPost is the only one that turns boring reviews into scroll-stopping content. Our bounce rate dropped by 18% in the first week.",
    reviewer: { name: "David Levy", title: "CEO", company: "Wix Studio" },
    reviewerPhotoUrl: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: "3",
    hookLine: "The ROI speaks for itself",
    quote: "In 60 seconds I had a beautifully designed testimonial widget with a hook line that our marketing team couldn't come up with in hours. This is AI done right.",
    reviewer: { name: "Maya Goldstein", title: "VP Marketing", company: "Monday.com" },
    reviewerPhotoUrl: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: "4",
    hookLine: "Our best marketing investment this year",
    quote: "ProofPost paid for itself within the first day. The testimonials look premium, load fast, and the A/B testing on hook lines is pure genius. Every SaaS needs this.",
    reviewer: { name: "Tom Even", title: "Founder", company: "AgentsAndMe" },
    reviewerPhotoUrl: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: "5",
    hookLine: "Like having a copywriter on demand",
    quote: "I paste a LinkedIn review, and 60 seconds later I have a conversion-optimized widget ready to embed. The quality of the AI-generated hooks is consistently impressive.",
    reviewer: { name: "Noa Kirel", title: "Marketing Lead", company: "Fiverr" },
    reviewerPhotoUrl: "https://i.pravatar.cc/150?img=9",
  },
];

const sampleData = {
  type: "widget" as const,
  id: "demo",
  reviews: sampleReviews,
  brandKit: {
    companyName: "ProofPost",
    logoUrl: null,
    primaryColor: "#10B981",
    secondaryColor: "#0F172A",
  },
  showWatermark: true,
  limitReached: false,
};

type WidgetStyle = "carousel" | "marquee" | "grid" | "stack";

export default function WidgetPreviewPage() {
  const [activeStyle, setActiveStyle] = useState<WidgetStyle>("stack");

  const styles: { value: WidgetStyle; label: string; desc: string }[] = [
    { value: "carousel", label: "Carousel", desc: "Classic rotating cards" },
    { value: "marquee", label: "Marquee", desc: "Infinite scrolling rows" },
    { value: "grid", label: "Grid", desc: "Masonry grid layout" },
    { value: "stack", label: "Stack", desc: "Animated card stack" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#0f172a", padding: "24px 0", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: "20px", fontWeight: 600, margin: 0 }}>
          Widget Style Preview
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "14px", margin: "6px 0 0" }}>
          Choose a style to preview
        </p>
      </div>

      {/* Style selector */}
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", padding: "24px 16px 8px", flexWrap: "wrap" }}>
        {styles.map((s) => (
          <button
            key={s.value}
            onClick={() => setActiveStyle(s.value)}
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              border: activeStyle === s.value ? "2px solid #10B981" : "2px solid #e2e8f0",
              background: activeStyle === s.value ? "#ecfdf5" : "#fff",
              cursor: "pointer",
              textAlign: "center",
              minWidth: "120px",
              transition: "all 0.2s ease",
            }}
          >
            <div style={{ fontSize: "14px", fontWeight: 600, color: activeStyle === s.value ? "#059669" : "#0f172a" }}>
              {s.label}
            </div>
            <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>
              {s.desc}
            </div>
          </button>
        ))}
      </div>

      {/* Widget preview */}
      <div style={{
        maxWidth: activeStyle === "marquee" || activeStyle === "grid" ? "1000px" : "500px",
        margin: "24px auto",
        padding: "0 16px",
        transition: "max-width 0.3s ease",
      }}>
        {activeStyle === "carousel" && <EmbedCarousel data={sampleData} embedId="demo" />}
        {activeStyle === "marquee" && <EmbedMarquee data={sampleData} embedId="demo" />}
        {activeStyle === "grid" && <EmbedGrid data={sampleData} embedId="demo" />}
        {activeStyle === "stack" && <EmbedStack data={sampleData} embedId="demo" />}
      </div>
    </div>
  );
}
