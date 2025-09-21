"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/layout";

import { EmploymentHistoryTable } from "./components/employment-history-table";
import { useGetEmploymentsHistory } from "./hooks";

export default function EmploymentVerificationPage() {
  const { data: employments, isLoading } = useGetEmploymentsHistory();

  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Employment History</h3>
            <p className="text-sm text-muted-foreground">
              Your previously submitted employment history
            </p>
          </div>

          <Separator />

          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <Spinner />
            </div>
          ) : (
            <EmploymentHistoryTable data={employments!} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
