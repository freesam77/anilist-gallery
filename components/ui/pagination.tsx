"use client";

import React from "react";
import Link from "next/link";
import { cn } from "./utils";

type PaginationNavProps = React.HTMLAttributes<HTMLElement>;
export function Pagination({ className, ...props }: PaginationNavProps) {
  return (
    <nav
      aria-label="Pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

type PaginationListProps = React.HTMLAttributes<HTMLOListElement>;
export function PaginationContent({ className, ...props }: PaginationListProps) {
  return (
    <ol
      className={cn("flex flex-row flex-wrap items-center justify-center gap-2", className)}
      {...props}
    />
  );
}

type PaginationItemProps = React.LiHTMLAttributes<HTMLLIElement>;
export function PaginationItem({ className, ...props }: PaginationItemProps) {
  return <li className={cn("", className)} {...props} />;
}

type PaginationLinkProps = {
  href?: string;
  isActive?: boolean;
  disabled?: boolean;
} & Omit<React.ComponentProps<typeof Link>, "href"> & {
    children?: React.ReactNode;
  };

export function PaginationLink({
  href,
  className,
  isActive,
  disabled,
  children,
  prefetch = false,
  ...props
}: PaginationLinkProps) {
  const base = cn(
    "inline-flex h-9 min-w-9 items-center justify-center rounded-md border px-3 text-sm",
    isActive ? "bg-foreground text-background" : "bg-background hover:bg-foreground/5",
    disabled && "pointer-events-none opacity-50",
    className
  );

  if (disabled) return <span className={base}>{children}</span>;
  if (!href) return <span className={base}>{children}</span>;

  return (
    <Link className={base} href={href} prefetch={prefetch} {...props}>
      {children}
    </Link>
  );
}

type PrevNextProps = Omit<PaginationLinkProps, "children"> & { children?: React.ReactNode };

export function PaginationPrevious({ children = "Prev", ...props }: PrevNextProps) {
  return <PaginationLink {...props}>{children}</PaginationLink>;
}

export function PaginationNext({ children = "Next", ...props }: PrevNextProps) {
  return <PaginationLink {...props}>{children}</PaginationLink>;
}

export function PaginationEllipsis({ className }: { className?: string }) {
  return (
    <span className={cn("px-2 text-foreground/50", className)} aria-hidden>
      …
    </span>
  );
}
