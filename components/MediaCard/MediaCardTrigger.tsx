"use client";

import Image from "next/image";
import { cn } from "../ui/utils";

type MediaCardTriggerProps = {
  title: string;
  img: string;
  score?: number | null;
};

const MediaCardTrigger = ({ title, img, score }: MediaCardTriggerProps) => {
  return (
    <div
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-lg border border-foreground/10 bg-background text-left shadow transition hover:border-cyan-300",
        !img && "p-4"
      )}
      aria-label={`Open details for ${title}`}
    >
      {img ? (
        <div className="relative aspect-3/4 w-full">
          <Image
            src={img}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="p-6 text-sm text-foreground/60">No image</div>
      )}
      <div className="p-3">
        <div className="line-clamp-1 font-medium">{title}</div>
        {score ? (
          <div className="text-xs text-foreground/60">Score: {score}</div>
        ) : null}
      </div>
    </div>
  );
};

MediaCardTrigger.displayName = "MediaCardTrigger";

export default MediaCardTrigger;
