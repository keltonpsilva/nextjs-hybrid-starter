"use client";

import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { UserHistoryTable } from "./components/address-history-table";
import { Spinner } from "@/components/layout";

import { useGetAddressHistory } from "./hooks";

export default function AddressHistoryPage() {
  const { data: addresses, isLoading } = useGetAddressHistory();

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

          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <Spinner />
            </div>
          ) : (
            <UserHistoryTable data={addresses!} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
