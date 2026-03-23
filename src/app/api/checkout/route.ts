import { Checkout } from "@polar-sh/nextjs";

export const GET = Checkout({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  successUrl: "https://proofpost-alpha.vercel.app/dashboard?upgraded=true",
  server: "production",
});
