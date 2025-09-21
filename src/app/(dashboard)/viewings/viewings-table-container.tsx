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
  Loader,
  MonitorPlay,
  User,
} from "lucide-react";
import { format } from "date-fns";

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
import { ViewingSummaryResponse } from "@/shared/contracts/responses";
import { BookingType, ViewingStatus } from "@/shared/contracts/enums";
import { camelCaseToSeparated, generateListingTitle } from "@/lib/utils";

import { useGetViewings } from "./hooks";

export const columns: ColumnDef<ViewingSummaryResponse>[] = [
  {
    accessorKey: "viewingBookingType",
    header: "Viewing Type",
    cell: ({
      row: {
        original: { viewingBookingType },
      },
    }) => (
      <Badge
        variant="neutral"
        className="px-1.5 text-purple-500 dark:text-purple-400"
      >
        {viewingBookingType === BookingType.InPerson && <User />}
        {viewingBookingType === BookingType.Virtual && <MonitorPlay />}
        {camelCaseToSeparated(viewingBookingType, "-")}
      </Badge>
    ),
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
        {status === ViewingStatus.Completed && <CircleCheck />}
        {status === ViewingStatus.Confirmed && <Check />}
        {status === ViewingStatus.Pending && <Loader />}
        {status === ViewingStatus.Cancelled && <CircleX />}
        {status}
      </Badge>
    ),
  },
  {
    id: "property",
    header: "Property",
    cell: ({
      row: {
        original: { property, listing },
      },
    }) => (
      <div>
        {`${generateListingTitle(
          property.propertyType,
          listing.listingType,
          property.numberOfBedRooms
        )}, ${property.address.city}`}
      </div>
    ),
  },
  {
    id: "viewingScheduleDate",
    header: "Date",
    cell: ({ row: { original } }) => (
      <div>{format(original.viewingScheduleDate, "PPPP")}</div>
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
  // {
  //   id: "agent",
  //   header: "Agent",
  //   cell: ({ row: { original } }) => (
  //     <div>{format(original.viewingScheduleDate, "PPPP")}</div>
  //   ),
  // },

  // {
  //   id: "user",
  //   header: "User",
  //   cell: ({
  //     row: {
  //       original: { user },
  //     },
  //   }) => (
  //     <div>
  //       {user.firstName} {user.lastName}
  //     </div>
  //   ),
  //   filterFn: (row, _, filterValue) => {
  //     const user = row.original.user;
  //     const searchTerms = String(filterValue).toLowerCase();
  //     return (
  //       user.firstName.toLowerCase().includes(searchTerms) ||
  //       user.lastName.toLowerCase().includes(searchTerms)
  //     );
  //   },
  // },

  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: () => {
  //     return (
  //       <div className="flex items-center gap-2">
  //         <Button variant="outline" size="icon" aria-label="View">
  //           <Eye className="h-4 w-4" />
  //         </Button>

  //         <Button variant="outline" size="icon" aria-label="View">
  //           <Calendar1 className="h-4 w-4" />
  //         </Button>
  //         <Button variant="outline" size="icon" aria-label="View">
  //           <CircleCheck className="h-4 w-4" />
  //         </Button>
  //       </div>
  //     );
  //   },
  // },

  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: ({ row }) => (
  //     <div className="capitalize">{row.getValue("status")}</div>
  //   ),
  // },
  // {
  //   accessorKey: "email",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Email
  //         <ArrowUpDown />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  // },
  // {
  //   accessorKey: "amount",
  //   header: () => <div className="text-right">Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue("amount"));
  //     // Format the amount as a dollar amount
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(amount);
  //     return <div className="text-right font-medium">{formatted}</div>;
  //   },
  // },
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

export function ViewingsTableContainer() {
  const { isLoading, data } = useGetViewings();
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
          <p className="text-muted-foreground">
            You have no viewing bookings yet.
          </p>
          <Button className="mt-4">Book a Viewing</Button>
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
