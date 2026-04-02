export interface HeroReview {
  quote: string;
  name: string;
  title: string;
  photo: string;
}

/**
 * Demo reviews shown inside the widget showcase to demonstrate
 * what ProofPost widgets look like when embedded on a site.
 * These are example reviews — not real customer testimonials about ProofPost.
 */
export const heroReviews: HeroReview[] = [
  {
    quote: "Uploaded a screenshot from G2, had 8 animated widgets in under a minute. No typing, no copy-pasting.",
    name: "Jamie R.",
    title: "Head of Growth",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote: "Matched our brand perfectly. Changed colors, fonts, and borders in the visual editor. Looks like we built it in-house.",
    name: "Alex M.",
    title: "VP Marketing",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote: "Sent collection links to 20 clients Monday morning. By Friday we had 14 live testimonials on our site — zero manual work.",
    name: "Taylor K.",
    title: "CEO",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote: "The AI pulled the exact sentence that closes deals. Our pricing page conversion jumped 22%.",
    name: "Sam P.",
    title: "Growth Lead",
    photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face",
  },
];
