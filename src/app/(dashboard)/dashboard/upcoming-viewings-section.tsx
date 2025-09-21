"use client";

import { format } from "date-fns";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ViewingStatus } from "@/shared/contracts/enums";
import { cn, generateListingTitle } from "@/lib/utils";

import { useGetUpcomingViewings } from "./hooks";
import { UpcomingViewingsItemDialog } from "./upcoming-viewings-item-dialog";

export function UpcomingViewingsSection() {
  const { isLoading, data: viewings } = useGetUpcomingViewings();
  const [isOpen, setIsOpen] = useState(false);
  const [viewId, setViewingId] = useState<string | null>(null);

  return (
    <>
      {isOpen && (
        <UpcomingViewingsItemDialog
          open={isOpen}
          onOpenChange={setIsOpen}
          viewingId={viewId!}
        />
      )}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Viewings</CardTitle>
          <CardDescription>Your upcoming property viewings</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="space-y-4">
              {[...Array(1)].map((_, i) => (
                <div key={i} className="border-b pb-3 last:border-0 last:pb-0">
                  <Skeleton className="h-5 w-[200px]" />
                  <Skeleton className="h-4 w-[150px] mt-2" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-[80px]" />
                    <Skeleton className="h-9 w-[80px]" />
                  </div>
                </div>
              ))}
            </div>
          )}
          {viewings && viewings.length > 0 && (
            <div className="space-y-4">
              {viewings.map(
                ({ id, viewingScheduleDate, status, property, listing }) => (
                  <div
                    key={id}
                    className="border-b pb-3 last:border-0 last:pb-0"
                  >
                    <h3 className="font-medium">
                      {generateListingTitle(
                        property.propertyType,
                        listing.listingType,
                        property.numberOfBedRooms
                      )}
                      , {property.address.postCode}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {format(viewingScheduleDate, "dd-MMM-yyy")} at{" "}
                      {format(viewingScheduleDate, "HH:MM")}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span
                        className={cn(
                          "text-xs px-2 py-1 rounded",
                          status === ViewingStatus.Confirmed &&
                            "bg-green-100 text-green-800",
                          status === ViewingStatus.Cancelled
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        )}
                      >
                        {status}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setViewingId(id);
                          setIsOpen(true);
                        }}
                      >
                        {/* {viewing.status === "confirmed" ? "Details" : "Confirm"} */}
                        Details
                      </Button>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
          {viewings?.length == 0 && (
            <p className="text-muted-foreground text-sm">
              No upcoming viewings scheduled
            </p>
          )}

          {/* <Button
            variant="outline"
            className="mt-4 w-full"
            disabled={isLoading}
          >
            Book a Viewing
          </Button> */}
        </CardContent>
      </Card>
    </>
  );
}
