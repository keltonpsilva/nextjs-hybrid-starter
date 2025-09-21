import { PropertyCardItem } from "@/components/core/property-card-item";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ListingSummaryResponse } from "@/shared/contracts/responses";

interface PropertyListingProps {
  isLoading?: boolean;
  properties: ListingSummaryResponse[];
}

export function PropertyListing({
  properties,
  isLoading = false,
}: PropertyListingProps) {
  if (isLoading) {
    return (
      <div className="flex flex-wrap justify-center gap-6 ">
        {/* <div className="flex flex-wrap justify-center gap-6"> */}
        {[...Array(8)].map((_, index) => (
          <div key={index} className="w-[300px]">
            <Card className="h-full">
              <CardHeader>
                <Skeleton className="h-48 w-full rounded-t-lg" />
              </CardHeader>
              <CardContent className="space-y-2 pt-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 px-4 ">
      {properties
        .sort((current: ListingSummaryResponse, next: ListingSummaryResponse) =>
          current.isFeatured && !next.isFeatured ? -1 : 0
        )
        .map(
          ({
            id,
            listingType,
            rentPricePerCalendarMonth,
            salePrice,
            property,
          }) => (
            <div className="col-span-4 md:col-span-2 lg:col-span-1" key={id}>
              <PropertyCardItem
                item={{
                  listing: {
                    listingId: id,
                    listingType: listingType,
                    rentPricePerCalendarMonth: rentPricePerCalendarMonth,
                    salePrice: salePrice,
                  },
                  property,
                }}
              />
            </div>
          )
        )}
    </div>
  );
}
