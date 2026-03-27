export interface WidgetStyle {
  // Colors
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  quoteColor: string;
  // Typography
  fontFamily: string;
  // Layout
  borderRadius: number; // px
  shadowStyle: "none" | "subtle" | "elevated";
  // Elements visibility
  showStars: boolean;
  showTitle: boolean;
  showCompany: boolean;
  showSource: boolean;
  showAvatar: boolean;
  // Animation
  autoPlay: boolean;
  animationSpeed: number; // seconds between slides
  // Direction
  direction: "ltr" | "rtl" | "auto";
  // Background
  backgroundStyle: "solid" | "gradient";
  gradientTo: string;
}

export const DEFAULT_STYLE: WidgetStyle = {
  backgroundColor: "#ffffff",
  textColor: "#334155",
  accentColor: "#10B981",
  quoteColor: "#334155",
  fontFamily: "system-ui, sans-serif",
  borderRadius: 16,
  shadowStyle: "subtle",
  showStars: true,
  showTitle: true,
  showCompany: true,
  showSource: false,
  showAvatar: true,
  autoPlay: true,
  animationSpeed: 3.5,
  direction: "auto",
  backgroundStyle: "solid",
  gradientTo: "#f8fafc",
};

export interface WidgetPreset {
  id: string;
  name: string;
  description: string;
  style: Partial<WidgetStyle>;
}

export const WIDGET_PRESETS: WidgetPreset[] = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and rounded with subtle gradients",
    style: {
      backgroundColor: "#ffffff",
      textColor: "#334155",
      accentColor: "#6366f1",
      quoteColor: "#334155",
      fontFamily: "'Inter', system-ui, sans-serif",
      borderRadius: 20,
      shadowStyle: "elevated",
      backgroundStyle: "solid",
    },
  },
  {
    id: "classic",
    name: "Classic",
    description: "Professional with clean borders",
    style: {
      backgroundColor: "#ffffff",
      textColor: "#1e293b",
      accentColor: "#0ea5e9",
      quoteColor: "#475569",
      fontFamily: "'Georgia', serif",
      borderRadius: 8,
      shadowStyle: "subtle",
      backgroundStyle: "solid",
    },
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Ultra-clean with lots of whitespace",
    style: {
      backgroundColor: "#ffffff",
      textColor: "#64748b",
      accentColor: "#94a3b8",
      quoteColor: "#475569",
      fontFamily: "system-ui, sans-serif",
      borderRadius: 0,
      shadowStyle: "none",
      showStars: false,
      showAvatar: false,
      backgroundStyle: "solid",
    },
  },
  {
    id: "bold",
    name: "Bold",
    description: "Dark background with dramatic contrast",
    style: {
      backgroundColor: "#0f172a",
      textColor: "#e2e8f0",
      accentColor: "#f59e0b",
      quoteColor: "#f1f5f9",
      fontFamily: "system-ui, sans-serif",
      borderRadius: 16,
      shadowStyle: "elevated",
      backgroundStyle: "solid",
    },
  },
];

export const FONT_OPTIONS = [
  { value: "system-ui, sans-serif", label: "System Default" },
  { value: "'Inter', system-ui, sans-serif", label: "Inter" },
  { value: "'Georgia', serif", label: "Georgia" },
  { value: "'DM Sans', sans-serif", label: "DM Sans" },
  { value: "'Poppins', sans-serif", label: "Poppins" },
  { value: "'Playfair Display', serif", label: "Playfair Display" },
  { value: "'Space Grotesk', sans-serif", label: "Space Grotesk" },
  { value: "'Outfit', sans-serif", label: "Outfit" },
];

export function mergeStyle(base: WidgetStyle, overrides: Partial<WidgetStyle>): WidgetStyle {
  return { ...base, ...overrides };
}

export function getShadowCSS(style: WidgetStyle["shadowStyle"]): string {
  switch (style) {
    case "none": return "none";
    case "subtle": return "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)";
    case "elevated": return "0 25px 50px -12px rgba(148,163,184,0.15)";
  }
}
