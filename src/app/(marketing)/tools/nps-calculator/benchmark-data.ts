export interface Benchmark {
  industry: string;
  score: number;
}

export const benchmarks: Benchmark[] = [
  { industry: "E-commerce", score: 62 },
  { industry: "Education", score: 58 },
  { industry: "Technology", score: 57 },
  { industry: "Retail", score: 54 },
  { industry: "Hospitality", score: 53 },
  { industry: "Consulting", score: 51 },
  { industry: "Financial Services", score: 44 },
  { industry: "Insurance", score: 42 },
  { industry: "SaaS / Software", score: 41 },
  { industry: "Healthcare", score: 38 },
  { industry: "Airlines", score: 37 },
  { industry: "Telecom", score: 24 },
];

export function getNpsLabel(score: number): string {
  if (score >= 70) return "World-Class";
  if (score >= 50) return "Excellent";
  if (score >= 30) return "Great";
  if (score >= 0) return "Good";
  return "Needs Improvement";
}

export function getNpsColor(score: number): string {
  if (score >= 70) return "text-emerald";
  if (score >= 50) return "text-green-500";
  if (score >= 30) return "text-yellow-500";
  if (score >= 0) return "text-orange-500";
  return "text-red-500";
}

export function getNpsBgColor(score: number): string {
  if (score >= 70) return "bg-emerald";
  if (score >= 50) return "bg-green-500";
  if (score >= 30) return "bg-yellow-500";
  if (score >= 0) return "bg-orange-500";
  return "bg-red-500";
}
