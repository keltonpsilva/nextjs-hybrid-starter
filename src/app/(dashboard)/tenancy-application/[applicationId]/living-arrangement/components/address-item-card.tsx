import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, formatDateDifference } from "@/lib/utils";
import { Address } from "@/shared/contracts/types";
import { format } from "date-fns";
import React from "react";

// type VerificationStatus = "verified" | "pending";

interface AddressItemCardProps {
  item: {
    id: string;
    // verificationStatus: VerificationStatus;
    moveInDate: Date;
    moveOutDate?: Date;
    address: Address;
  };
}

export function AddressItemCard({
  item: { moveInDate, moveOutDate, address },
}: AddressItemCardProps) {
  return (
    <Card
      className={cn(
        "hover:shadow-lg hover:ring-2 hover:ring-offset-2 hover:ring-primary/40 hover:bg-white"
      )}
    >
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div>
            <CardTitle>{address.streetAddress}</CardTitle>
            <CardDescription>
              {address.city} • {address.postCode}
            </CardDescription>
          </div>

          <div className="text-right">
            <div className="text-xs">
              {format(moveInDate, "MMM yyyy")} -{" "}
              {moveOutDate ? format(moveOutDate, "MMM yyyy") : "Present"}
            </div>
            <span className="text-xs">
              {" "}
              {formatDateDifference(
                new Date(moveInDate),
                moveOutDate ? new Date(moveOutDate) : new Date()
              )}
            </span>
            {/* <div className="mt-1">
              {verificationStatus === "verified" ? (
                <Badge>Verified</Badge>
              ) : verificationStatus === "pending" ? (
                <Badge variant="secondary">Pending</Badge>
              ) : (
                <Badge variant="outline">Unverified</Badge>
              )}
            </div> */}
          </div>
        </div>
        <div className="text-left mt-2 text-sm text-muted-foreground">
          {address.country}
        </div>
      </CardHeader>
      {/* <CardContent className="flex gap-2">
        <Button variant="outline">
          <SquarePen />
        </Button>

        <Button variant="outline">
          <Trash />
        </Button>
      </CardContent> */}
    </Card>
  );
}
