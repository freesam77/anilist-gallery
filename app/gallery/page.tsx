"use client";

import { gql, useQuery } from "@apollo/client";
import { useSearchParams, useRouter } from "next/navigation";
import MediaCard from "../../components/media-card";
import { useMemo } from "react";

const MEDIA_PAGE_QUERY = gql`
  query MediaPage($page: Int!, $perPage: Int!) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
      }
      media(type: ANIME, sort: POPULARITY_DESC) {
        id
        title {
          romaji
          english
          native
        }
        description(asHtml: true)
      }
    }
  }
`;

export default function GalleryPage() {
  const search = useSearchParams();
  const router = useRouter();
  const page = Math.max(1, Number(search.get("page") || 1));
  const perPage = 24;

  const { data, loading, error } = useQuery(MEDIA_PAGE_QUERY, {
    variables: { page, perPage },
  });

  const items = useMemo(() => data?.Page?.media ?? [], [data]);

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Popular Anime</h1>
        <div className="flex gap-2 text-sm">
          <button
            className="rounded border px-3 py-1"
            disabled={page <= 1}
            onClick={() => router.push(`?page=${page - 1}`)}
          >
            Prev
          </button>
          <button
            className="rounded border px-3 py-1"
            disabled={!data?.Page?.pageInfo?.hasNextPage}
            onClick={() => router.push(`?page=${page + 1}`)}
          >
            Next
          </button>
        </div>
      </div>

      {loading && <p>Loading…</p>}
      {error && (
        <p className="text-sm text-red-600">
          Failed to load data. Please try again.
        </p>
      )}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {items.map((media: any) => (
          <MediaCard
            key={media.id}
            title={
              media.title?.english || media.title?.romaji || media.title?.native
            }
            description={media.description}
          />
        ))}
      </section>
    </main>
  );
}
