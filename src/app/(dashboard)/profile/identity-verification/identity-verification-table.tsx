"use client";

import * as React from "react";
import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { BadgeCheckIcon, CircleX, Loader } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IdentityVerificationResponse } from "@/shared/contracts/responses";

import { IdentityVerificationStatus } from "@/shared/contracts/enums";
import { Badge } from "@/components/ui/badge";
import { camelCaseToSeparated } from "@/lib/utils";

const formatDate = (dateString: Date) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const columns: ColumnDef<IdentityVerificationResponse>[] = [
  {
    header: "Provider",
    cell: ({ row: { original } }) => original.provider,
  },
  {
    header: "Date",
    cell: ({ row: { original } }) => formatDate(original.createdDateUtc),
  },
  {
    header: "Document",
    cell: ({ row: { original } }) =>
      original.documentType ? camelCaseToSeparated(original.documentType) : "-",
  },

  {
    header: "Status",
    cell: ({
      row: {
        original: { status },
      },
    }) => {
      return (
        <Badge
          variant="neutral"
          className="px-1.5 text-purple-500 dark:text-purple-400"
        >
          {status === IdentityVerificationStatus.Completed && (
            <BadgeCheckIcon />
          )}
          {status === IdentityVerificationStatus.Pending && <Loader />}
          {status === IdentityVerificationStatus.Rejected ||
            (status === IdentityVerificationStatus.Cancelled && <CircleX />)}
          {status}
        </Badge>
      );
    },
  },
];

export function IdentityVerificationTable({
  data,
}: {
  data: IdentityVerificationResponse[];
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Your identity has not been verified. Please complete the
                  verification steps outlined above.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
