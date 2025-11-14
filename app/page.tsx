"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-4xl font-semibold">AniList Gallery</h1>
      <p className="text-lg text-gray-600">
        Browse the most popular anime pulled directly from the AniList GraphQL
        API.
      </p>
      <Link
        className="rounded bg-black px-6 py-3 text-white"
        href="/gallery?page=1"
      >
        View Gallery
      </Link>
    </main>
  );
}
