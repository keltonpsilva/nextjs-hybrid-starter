/* eslint-disable react-hooks/rules-of-hooks */
"use client";

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
import { differenceInMonths, format } from "date-fns";
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
import { UserEmploymentHistoryResponse } from "@/shared/contracts/responses";
import { DeleteDialog } from "@/components/layout";

import { useDeleteEmploymentHistory } from "../hooks";
import { EmploymentCreateDialog } from "./employment-create-dialog";
import { EmploymentUpdateDialog } from "./employment-update-dialog";

function formatDateDifference(startDate: Date, endDate: Date): string {
  const totalMonths = differenceInMonths(endDate, startDate);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""} ${months} month${
      months !== 1 ? "s" : ""
    }`;
  } else {
    return `${months} month${months !== 1 ? "s" : ""}`;
  }
}

export const columns: ColumnDef<UserEmploymentHistoryResponse>[] = [
  {
    header: "Employer",
    cell: ({
      row: {
        original: { employerName },
      },
    }) => <div className="font-medium">{employerName}</div>,
  },

  {
    header: "Job Title",
    cell: ({
      row: {
        original: { jobTitle },
      },
    }) => <div> {jobTitle}</div>,
  },

  {
    header: "Type",
    cell: ({
      row: {
        original: { employmentType },
      },
    }) => <div> {employmentType.replace(/([A-Z])/g, " $1").trim()}</div>,
  },

  {
    header: "Period",
    cell: ({
      row: {
        original: { employmentStartDate, employmentEndDate },
      },
    }) => {
      return (
        <>
          <div>
            {format(employmentStartDate, "MMM yyyy")} -{" "}
            {employmentEndDate
              ? format(employmentEndDate, "MMM yyyy")
              : "Present"}
          </div>
          <div className="text-sm text-muted-foreground">
            {formatDateDifference(
              new Date(employmentStartDate),
              employmentEndDate ? new Date(employmentEndDate) : new Date()
            )}
          </div>
        </>
      );
    },
  },

  {
    header: "Annual Income",
    cell: ({
      row: {
        original: { annualIncome },
      },
    }) => <div> £{annualIncome.toLocaleString()}</div>,
  },

  // {
  //   header: "Status",
  //   cell: ({
  //     row: {
  //       original: { workAddress },
  //     },
  //   }) => {
  //     return (
  //       <>
  //         <div className="font-medium">{workAddress.streetAddress}</div>
  //         <div className="text-sm text-muted-foreground">
  //           {workAddress.city}, {workAddress.country}
  //         </div>
  //       </>
  //     );
  //   },
  // },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const employment = row.original;

      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
      const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

      const { mutateAsync: DeleteAddressHistoryAsync } =
        useDeleteEmploymentHistory(employment.id);

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
          <EmploymentUpdateDialog
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            defaultValues={employment}
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

export function EmploymentHistoryTable({
  data,
}: {
  data: UserEmploymentHistoryResponse[];
}) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

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
        <EmploymentCreateDialog
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
                  No employment records found yet. Please add your first
                  employment above.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
