"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";

type MediaPreviewViewProps = {
  title: string;
  subtitle: string;
  genresText: string;
  img: string;
  onBack: () => void;
};

export default function MediaPreviewView({
  title,
  subtitle,
  genresText,
  img,
  onBack,
}: MediaPreviewViewProps) {
  return (
    <>
      <DialogHeader className="space-y-1">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>Cover preview</DialogDescription>
      </DialogHeader>
      {img ? (
        <div className="relative h-[70vh] w-full overflow-hidden rounded-lg border bg-black">
          <Image
            src={img}
            alt={title}
            fill
            sizes="(max-width: 768px) 90vw, 70vw"
            className="object-contain"
            priority
          />
        </div>
      ) : null}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-foreground/70">{subtitle}</p>
          {genresText ? (
            <p className="text-xs text-foreground/60">{genresText}</p>
          ) : null}
        </div>
        <Button type="button" variant="secondary" onClick={onBack}>
          Back to details
        </Button>
      </div>
    </>
  );
}
