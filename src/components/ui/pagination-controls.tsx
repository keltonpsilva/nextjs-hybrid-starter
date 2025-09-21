"use client";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    } else {
      router.push(pathname + "?" + createQueryString("page", page.toString()));
    }
  };

  // const handlePageSizeChange = (size: number) => {
  //   if (onPageSizeChange) {
  //     onPageSizeChange(size);
  //     // Reset to page 1 when page size changes
  //     onPageChange?.(1);
  //   } else {
  //     const params = new URLSearchParams(searchParams.toString());
  //     params.set("pageSize", size.toString());
  //     params.set("page", "1"); // Reset to page 1
  //     router.push(pathname + "?" + params.toString());
  //   }
  // };

  // if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      {/* <div className="text-sm text-muted-foreground">
        Showing {(currentPage - 1) * pageSize + 1}-
        {Math.min(currentPage * pageSize, totalCount)} of {totalCount} items
      </div> */}

      <div className="flex items-center gap-4">
        {/* <div className="flex items-center gap-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => handlePageSizeChange(Number(value))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}

        <Pagination className="w-auto">
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeftIcon />
              </Button>
            </PaginationItem>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNumber: number;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }

              return (
                <PaginationItem key={pageNumber}>
                  <Button
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    className="rounded-full w-8 h-8 p-0"
                    size="sm"
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRightIcon />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
