export interface CsatBenchmark {
  industry: string;
  score: number;
}

export const csatBenchmarks: CsatBenchmark[] = [
  { industry: "E-commerce", score: 80 },
  { industry: "Education", score: 79 },
  { industry: "SaaS / Software", score: 78 },
  { industry: "Financial Services", score: 78 },
  { industry: "Retail", score: 77 },
  { industry: "Hospitality", score: 76 },
  { industry: "Insurance", score: 75 },
  { industry: "Healthcare", score: 74 },
  { industry: "Airlines", score: 73 },
  { industry: "Telecom", score: 68 },
];

export function getCsatLabel(score: number): string {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 50) return "Average";
  if (score >= 30) return "Below Average";
  return "Poor";
}

export function getCsatColor(score: number): string {
  if (score >= 85) return "text-emerald";
  if (score >= 70) return "text-green-500";
  if (score >= 50) return "text-yellow-500";
  return "text-red-500";
}

export function getCsatBgColor(score: number): string {
  if (score >= 85) return "bg-emerald";
  if (score >= 70) return "bg-green-500";
  if (score >= 50) return "bg-yellow-500";
  return "bg-red-500";
}
