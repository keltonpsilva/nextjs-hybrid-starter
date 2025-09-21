"use client";

import { MapPin, CalendarDays, Clock, Phone, Mail } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { generateListingTitle } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { ViewingStatus } from "@/shared/contracts/enums";

import { useCancelUpcomingViewing, useGetUpcomingViewing } from "./hooks";

export function UpcomingViewingsItemDialog({
  open,
  onOpenChange,
  viewingId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  viewingId: string;
}) {
  console.log("hello ", viewingId);

  const { isLoading, data: itemDetails } = useGetUpcomingViewing(viewingId);
  const { mutateAsync, isPending } = useCancelUpcomingViewing(viewingId);

  const handleCancelViewing = async () => {
    await mutateAsync();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Viewing Details</DialogTitle>
          <DialogDescription>
            Complete information about your scheduled viewing
          </DialogDescription>
        </DialogHeader>

        {isLoading && <Loading />}

        {itemDetails && (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarDays className="h-5 w-5" />
                  Property Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {generateListingTitle(
                        itemDetails.property.propertyType,
                        itemDetails.listing.listingType,
                        itemDetails.property.numberOfBedRooms
                      )}
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <p>{`${itemDetails.property.address.streetAddress}, ${itemDetails.property.address.city}, ${itemDetails.property.address.postCode}`}</p>
                    </div>
                  </div>

                  <div className="space-x-2">
                    <Link href={`./listings/${itemDetails.listing.id}`}>
                      <Button>View Listing</Button>
                    </Link>
                    <Link
                      target="_blank"
                      href={`https://www.google.com/maps/search/?api=1&query=${itemDetails.property.address.postCode}`}
                    >
                      <Button>Get Directions</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-5 w-5" />
                    Appointment Information
                  </div>

                  <Badge
                    variant={
                      itemDetails.status === ViewingStatus.Confirmed
                        ? "default"
                        : "secondary"
                    }
                    className="text-sm"
                  >
                    {itemDetails.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="font-medium">
                      {new Date(
                        itemDetails.viewingScheduleDate
                      ).toLocaleDateString("en-GB", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {format(itemDetails.viewingScheduleDate, "HH:MM")} (1H)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarDays className="h-5 w-5" />
                  Agent Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="font-medium">
                    {itemDetails.agency.businessName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {itemDetails.agency.address &&
                      `${itemDetails.agency.address?.city} Branch`}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 text-sm">
                  <Button variant="outline" size="sm" className="gap-1 h-8">
                    <a href={`tel:${itemDetails.agency.phoneNumber}`}>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5" />
                        {itemDetails.agency.phoneNumber}
                      </div>
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1 h-8">
                    <a href={`mailto:${itemDetails.agency.emailAddress}`}>
                      <div className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5" />
                        Email
                      </div>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <DialogFooter>
              {/* <Button className="flex-1" variant="outline">
                Reschedule
              </Button> */}

              {itemDetails.status !== ViewingStatus.Cancelled && (
                <Button
                  className="flex-1"
                  variant="outline"
                  isLoading={isPending}
                  onClick={handleCancelViewing}
                >
                  Cancel Viewing
                </Button>
              )}

              {/* <Button className="flex-1">Add to Calendar</Button> */}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Loading() {
  return (
    <>
      {/* Property Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            <Skeleton className="h-5 w-40" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <Skeleton className="h-6 w-48" />
              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                <MapPin className="h-4 w-4" />
                <Skeleton className="h-4 w-56" />
              </div>
            </div>
            <div className="space-x-2 mt-2">
              <Skeleton className="h-10 w-24 inline-block" />
              <Skeleton className="h-10 w-32 inline-block" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointment Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            <Skeleton className="h-5 w-52" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            <div>
              <Skeleton className="h-4 w-60 mb-2" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Skeleton className="h-5 w-24" />
          </div>
        </CardContent>
      </Card>

      {/* Agent Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            <Skeleton className="h-5 w-36" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <Skeleton className="h-4 w-44" />
            <Skeleton className="h-3 w-32 mt-1" />
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <Skeleton className="h-8 w-36" />
            <Skeleton className="h-8 w-28" />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
