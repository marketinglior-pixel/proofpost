import { EmbedCarousel } from "./embed-carousel";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EmbedPage({ params }: PageProps) {
  const { id } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    ? "https://proofpost-alpha.vercel.app"
    : "http://localhost:3000";

  // Fetch embed data server-side
  let data = null;
  try {
    const res = await fetch(`${baseUrl}/api/embed/${id}`, {
      cache: "no-store",
    });
    if (res.ok) {
      data = await res.json();
    }
  } catch {
    // Will show error state
  }

  if (!data) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "200px",
          fontFamily: "system-ui, sans-serif",
          color: "#999",
          fontSize: "14px",
        }}
      >
        Testimonial not found
      </div>
    );
  }

  return <EmbedCarousel data={data} embedId={id} />;
}
