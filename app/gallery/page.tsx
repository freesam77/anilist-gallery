"use client";

import { useEffect, Suspense } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useSearchParams, useRouter } from "next/navigation";
import MediaCard, { type MediaItem } from "../../components/MediaCard";
import Pagination from "../../components/pagination";
import { useUserContext } from "../../components/userContext";

type PageInfo = {
  total: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  perPage: number;
};

type MediaPageData = {
  Page: {
    pageInfo: PageInfo;
    media: MediaItem[];
  };
};

const MEDIA_PAGE_QUERY = gql`
  query MediaPage($page: Int!, $perPage: Int!) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, sort: POPULARITY_DESC) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          large
          medium
          color
        }
        format
        genres
        averageScore
        episodes
        description(asHtml: true)
      }
    }
  }
`;

export default function GalleryPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-6xl px-4 py-10">
          <div className="h-6 w-40 animate-pulse rounded bg-foreground/10" />
        </main>
      }
    >
      <GalleryPageContent />
    </Suspense>
  );
}

function GalleryPageContent() {
  const { user, loading: userLoading } = useUserContext();
  const search = useSearchParams();
  const router = useRouter();
  const page = Math.max(1, Number(search.get("page") || 1));
  const perPage = 24;

  useEffect(() => {
    if (!search.get("page")) router.replace(`?page=${page}`);
  }, [page, router, search]);

  useEffect(() => {
    if (!userLoading && !user) {
      router.replace("/");
    }
  }, [router, user, userLoading]);

  const { data, loading, error } = useQuery<MediaPageData>(MEDIA_PAGE_QUERY, {
    variables: { page, perPage },
    skip: !user,
    notifyOnNetworkStatusChange: true,
  });

  if (userLoading || !user) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-10">
        <p className="text-sm text-foreground/70">
          {userLoading
            ? "Loading your profile..."
            : "Redirecting you to the landing page..."}
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6">
      <h1 className="mb-4 text-2xl font-semibold">Popular Anime Gallery</h1>

      {loading && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: perPage }).map((_, i) => (
            <div
              key={i}
              className="aspect-3/4 animate-pulse rounded-lg bg-foreground/10"
            />
          ))}
        </div>
      )}

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          Failed to load data. Please try again.
        </div>
      )}

      {data?.Page?.media?.length ? (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {data.Page.media.map((m: MediaItem) => (
              <MediaCard key={m.id} item={m} />
            ))}
          </div>
          <Pagination
            currentPage={data.Page.pageInfo.currentPage}
            lastPage={data.Page.pageInfo.lastPage}
            basePath="/gallery"
          />
        </>
      ) : null}
    </main>
  );
}
