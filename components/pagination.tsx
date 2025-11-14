"use client";

import { useMemo } from "react";
import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "./ui/pagination";

type Props = {
  currentPage: number;
  lastPage: number;
  basePath?: string; // default to current path
};

export default function Pagination({ currentPage, lastPage, basePath }: Props) {
  const pageWindow = useMemo(() => {
    const pages: number[] = [];

    const addRange = (from: number, to: number) => {
      for (let i = from; i <= to; i++) {
        pages.push(i);
      }
    };

    // If the total page count is small, show all pages directly.
    if (lastPage <= 7) {
      addRange(1, lastPage);
      return pages;
    }

    // Calculate the middle window around the current page.
    const windowStart = Math.max(2, currentPage - 1);
    const windowEnd = Math.min(lastPage - 1, currentPage + 1);

    // Always show the first page
    pages.push(1);

    // Add leading ellipsis if needed
    if (windowStart > 2) {
      pages.push(-1); // -1 represents an ellipsis
    }

    // Add the window around the current page
    addRange(windowStart, windowEnd);

    // Add trailing ellipsis if needed
    if (windowEnd < lastPage - 1) {
      pages.push(-1);
    }

    // Always show the last page
    pages.push(lastPage);

    return pages;
  }, [currentPage, lastPage]);

  if (lastPage <= 1) return null;

  const path = basePath || "/gallery";

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === lastPage;

  const getPageHref = (page: number) => `${path}?page=${page}`;

  return (
    <UIPagination className="mt-6">
      <PaginationContent>
        {/* Previous button */}
        <PaginationItem>
          <PaginationPrevious
            href={getPageHref(Math.max(1, currentPage - 1))}
            disabled={isFirstPage}
          />
        </PaginationItem>

        {/* Page numbers + ellipses */}
        {pageWindow.map((page, index) => {
          const isEllipsis = page === -1;
          const key = isEllipsis ? `gap-${index}` : page;

          return (
            <PaginationItem key={key}>
              {isEllipsis ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href={getPageHref(page)}
                  isActive={page === currentPage}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          );
        })}

        {/* Next button */}
        <PaginationItem>
          <PaginationNext
            href={getPageHref(Math.min(lastPage, currentPage + 1))}
            disabled={isLastPage}
          />
        </PaginationItem>
      </PaginationContent>
    </UIPagination>
  );
}
