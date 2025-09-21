/* eslint-disable react-hooks/rules-of-hooks */

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
import { format } from "date-fns";
import { Edit, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AddressCreateDialog,
  AddressUpdateDialog,
} from "@/components/core/user-address";
import { UserAddressHistoryResponse } from "@/shared/contracts/responses";
import { DeleteDialog } from "@/components/layout";
import { formatDateDifference } from "@/lib/utils";
import { useDeleteAddressHistory } from "../hooks";

export const columns: ColumnDef<UserAddressHistoryResponse>[] = [
  {
    header: "Address",
    cell: ({
      row: {
        original: { address },
      },
    }) => {
      return (
        <>
          <div className="font-medium">{address.streetAddress}</div>
          <div className="text-sm text-muted-foreground">
            {address.city}, {address.country}
          </div>
        </>
      );
    },
  },

  {
    header: "Dates",
    cell: ({
      row: {
        original: { moveInDate, moveOutDate },
      },
    }) => {
      return (
        <>
          <div>
            {format(moveInDate, "MMM yyyy")} -{" "}
            {moveOutDate ? format(moveOutDate, "MMM yyyy") : "Present"}
          </div>
          <div className="text-sm text-muted-foreground">
            {formatDateDifference(
              new Date(moveInDate),
              moveOutDate ? new Date(moveOutDate) : new Date()
            )}
          </div>
        </>
      );
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const address = row.original;

      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
      const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

      const { mutateAsync: DeleteAddressHistoryAsync } =
        useDeleteAddressHistory(address.id);

      return (
        <>
          <Button
            variant="ghost"
            size="icon"
            aria-label="edit"
            onClick={() => setIsEditDialogOpen(true)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <AddressUpdateDialog
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            defaultValues={address}
          />

          <Button
            variant="ghost"
            size="icon"
            aria-label="delete"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
          <DeleteDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            onConfirm={async () => {
              await DeleteAddressHistoryAsync();
              setIsDeleteDialogOpen(false);
            }}
          />
        </>
      );
    },
  },
];

export function UserHistoryTable({
  data,
}: {
  data: UserAddressHistoryResponse[];
}) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
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
      <div className="flex items-end">
        <Button
          variant="outline"
          className="ml-auto"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          Add
        </Button>
        <AddressCreateDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
        />
      </div>
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
                  No addresses added yet. Please add your first address above.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
