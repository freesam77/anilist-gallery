"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import MediaCardTrigger from "./MediaCardTrigger";
import MediaDetailsView from "./MediaDetailsView";
import MediaPreviewView from "./MediaPreviewView";
import { stripHtml } from "./utils";

export type MediaItem = {
  id: number;
  title: {
    romaji?: string | null;
    english?: string | null;
    native?: string | null;
  };
  coverImage: {
    large?: string | null;
    medium?: string | null;
    color?: string | null;
  };
  format?: string | null;
  genres?: string[] | null;
  averageScore?: number | null;
  episodes?: number | null;
  description?: string | null;
};

export default function MediaCard({ item }: { item: MediaItem }) {
  const title =
    item.title?.english ||
    item.title?.romaji ||
    item.title?.native ||
    "Untitled";
  const img = item.coverImage?.large || item.coverImage?.medium || "";
  const description = item.description ? stripHtml(item.description) : "";
  const formatLabel = item.format || "Anime";
  const episodesLabel = item.episodes
    ? `${item.episodes} ${item.episodes === 1 ? "ep" : "eps"}`
    : "";
  const subtitle = episodesLabel
    ? `${formatLabel} . ${episodesLabel}`
    : formatLabel;
  const genresText =
    Array.isArray(item.genres) && item.genres.length > 0
      ? item.genres.join(", ")
      : "";

  const [infoOpen, setInfoOpen] = useState(false);
  const [view, setView] = useState<"details" | "preview">("details");

  return (
    <Dialog
      open={infoOpen}
      onOpenChange={(open) => {
        setInfoOpen(open);
        if (!open) setView("details");
      }}
    >
      <DialogTrigger>
        <MediaCardTrigger
          title={title}
          img={img}
          score={item.averageScore}
        />
      </DialogTrigger>
      <DialogContent>
        {view === "details" ? (
          <MediaDetailsView
            title={title}
            subtitle={subtitle}
            genresText={genresText}
            img={img}
            description={description}
            onPreview={() => setView("preview")}
            itemId={item.id}
          />
        ) : (
          <MediaPreviewView
            title={title}
            subtitle={subtitle}
            genresText={genresText}
            img={img}
            onBack={() => setView("details")}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
