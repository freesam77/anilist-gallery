"use client";

type MediaCardProps = {
  title: string;
  description?: string | null;
};

export default function MediaCard({ title, description }: MediaCardProps) {
  return (
    <article style={{ border: "1px solid #e5e7eb", padding: "1rem" }}>
      <h3 style={{ margin: 0, fontWeight: 600 }}>{title}</h3>
      {description ? (
        <p style={{ marginTop: "0.5rem", color: "#475569", fontSize: "0.9rem" }}>
          {description.replace(/<[^>]+>/g, "")}
        </p>
      ) : null}
    </article>
  );
}
