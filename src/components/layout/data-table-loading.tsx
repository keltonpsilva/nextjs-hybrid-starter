import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export function DataTableLoading({ totalOfItems, title }: { totalOfItems: number; title?: string }) {
  return (
    <div className="space-y-4">
      {/* Header Loading */}
      {title && <h1 className="text-3xl font-bold">{title}</h1>}

      {/* Table Loading */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {[...Array(totalOfItems)].map((header) => (
                <TableHead key={header}>
                  <Skeleton className="h-5 w-24" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full" />

                  {/* <Skeleton className="h-8 w-16 rounded-md" /> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Loading */}
      {/* <div className="flex items-center justify-between px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-16" />
          </div>
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </div> */}
    </div>
  )
}
