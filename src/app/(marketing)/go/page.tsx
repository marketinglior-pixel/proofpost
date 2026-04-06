import { redirect } from "next/navigation";

// LTD offer page is deprecated — redirect to pricing section
export default function GoPage() {
  redirect("/#pricing");
}
