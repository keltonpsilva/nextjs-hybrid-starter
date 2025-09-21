"use client";

import * as React from "react";
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
import {
  Check,
  ChevronDown,
  CircleCheck,
  CircleX,
  Eye,
  Loader,
  NotepadText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableLoading } from "@/components/layout/data-table-loading";
import { Badge } from "@/components/ui/badge";
import { TenancyApplicationSummaryResponse } from "@/shared/contracts/responses";
import {
  ListingType,
  TenancyApplicationStatus,
} from "@/shared/contracts/enums";
import { generateListingTitle } from "@/lib/utils";
import { useGetApplications } from "../hooks";
import { format } from "date-fns";
import formatCurrency from "@/lib/formatCurrency";
import Link from "next/link";
import { APPLICATIONS_PAGE_PATH } from "@/shared/router/router-paths";

export const columns: ColumnDef<TenancyApplicationSummaryResponse>[] = [
  // {
  //   id: "reference",
  //   header: "Reference",
  //   cell: ({ row }) => <div>{row.original.id}</div>,
  // },
  {
    id: "property",
    header: "Property",
    cell: ({
      row: {
        original: { property },
      },
    }) => (
      <div>
        {`${generateListingTitle(
          property.propertyType,
          ListingType.Rent,
          property.numberOfBedRooms
        )}, ${property.address.city}`}
      </div>
    ),
  },
  {
    id: "agency",
    header: "Agency",
    cell: ({
      row: {
        original: {
          property: { agency },
        },
      },
    }) => <div>{agency.businessName}</div>,
  },
  {
    id: "submitted",
    header: "Submitted",
    cell: ({
      row: {
        original: { submittedDateUtc },
      },
    }) => <div>{submittedDateUtc ? format(submittedDateUtc, "PPP") : "-"}</div>,
  },
  {
    id: "rent",
    header: "Rent",
    cell: ({ row }) => (
      <div>{formatCurrency(row.original.tenancyRent?.amount)}</div>
    ),
  },
  {
    id: "term",
    header: "Term",
    cell: ({ row }) => <div>{row.original.tenancyTerm || "-"}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({
      row: {
        original: { status },
      },
    }) => (
      <Badge
        variant="neutral"
        className="px-1.5 text-purple-500 dark:text-purple-400"
      >
        {status === TenancyApplicationStatus.Draft && <NotepadText />}
        {status === TenancyApplicationStatus.Pending && <Loader />}
        {status === TenancyApplicationStatus.Submitted && <Check />}
        {status === TenancyApplicationStatus.Approved && <CircleCheck />}
        {status === TenancyApplicationStatus.Rejected && <CircleX />}
        {status}
      </Badge>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({
      row: {
        original: { id },
      },
    }) => {
      return (
        <div className="flex items-center gap-2">
          <Link href={`${APPLICATIONS_PAGE_PATH}/${id}`}>
            <Button variant="outline" size="icon" aria-label="View">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="outline" size="icon" aria-label="Cancel">
            <CircleX className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },

  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const payment = row.original;
  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(payment.id)}
  //           >
  //             Copy payment ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];

export function TenancyApplicationContainer() {
  const { isLoading, data } = useGetApplications();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: data || [],
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
    <div className="w-full">
      <div className="flex items-center py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isLoading && <DataTableLoading totalOfItems={5} />}

      {data && data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">You have no applications yet.</p>
          <Button className="mt-4">Apply for tentancy</Button>
        </div>
      )}

      {data && data.length > 0 && (
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
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <>
        {/* <div className="flex items-center justify-end space-x-2 py-4">
            <div className="text-muted-foreground flex-1 text-sm">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div> */}
      </>
    </div>
  );
}
