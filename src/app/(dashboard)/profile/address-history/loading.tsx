import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";

export default function Loading() {
  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Your Address History</h3>
            <p className="text-sm text-muted-foreground">
              Please provide your current and previous addresses
            </p>
          </div>

          <Separator />

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Skeleton className="h-4 w-[100px]" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-[100px]" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(3)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-3 w-[150px] mt-2" />
                    <Skeleton className="h-3 w-[150px] mt-2" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-3 w-[100px] mt-2" />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Skeleton className="h-10 w-10 rounded-md" />
                      <Skeleton className="h-10 w-10 rounded-md" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
