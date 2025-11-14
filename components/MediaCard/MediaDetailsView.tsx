"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";

type MediaDetailsViewProps = {
  title: string;
  subtitle: string;
  genresText: string;
  img: string;
  description: string;
  onPreview: () => void;
  itemId: number;
};

export default function MediaDetailsView({
  title,
  subtitle,
  genresText,
  img,
  description,
  onPreview,
  itemId,
}: MediaDetailsViewProps) {
  return (
    <>
      <DialogHeader className="space-y-2">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{subtitle}</DialogDescription>
        {genresText ? (
          <p className="text-xs text-foreground/70">{genresText}</p>
        ) : null}
      </DialogHeader>
      <div className="flex flex-col gap-4 sm:flex-row">
        {img ? (
          <button
            type="button"
            onClick={onPreview}
            className="relative h-52 w-full overflow-hidden rounded-md border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 sm:h-40 sm:w-28 sm:shrink-0"
          >
            <Image
              src={img}
              alt={title}
              fill
              sizes="112px"
              className="object-cover"
            />
            <span className="sr-only">View cover in full screen</span>
          </button>
        ) : null}
        <div className="custom-scroll max-h-64 space-y-2 overflow-y-auto pr-1 sm:max-h-72">
          {description ? (
            <blockquote className="whitespace-pre-line border-l-0 border-foreground/20 pl-0 text-sm leading-relaxed text-foreground/80 md:border-l-2 md:pl-3">
              {description}
            </blockquote>
          ) : (
            <p className="text-sm text-foreground/60">
              No description available.
            </p>
          )}
        </div>
      </div>
      <Button className="w-full" variant="secondary">
        <a
          href={`https://anilist.co/anime/${itemId}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          See more details
        </a>
      </Button>
    </>
  );
}
