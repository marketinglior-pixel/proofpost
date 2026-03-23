export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        background: "transparent",
        overflow: "hidden",
        minHeight: "100%",
      }}
    >
      {children}
    </div>
  );
}
