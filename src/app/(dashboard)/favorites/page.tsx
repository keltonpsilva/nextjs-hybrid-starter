"use client";

import { HeartOff } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PropertyCardItem } from "@/components/core/property-card-item";

import { useGetFavorites } from "./hooks";

export default function Favorites() {
  const { isLoading, data } = useGetFavorites(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Saved Properties</CardTitle>
        <CardDescription>View and manage your saved properties</CardDescription>
      </CardHeader>

      <CardContent>
        {data && data.length === 0 && (
          <div className=" text-center py-12">
            <HeartOff className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h2 className="text-xl font-medium text-gray-600">
              You haven&apos;t saved any properties yet
            </h2>
            <p className="text-gray-500 mt-2">
              Browse properties and click the heart icon to save them here.
            </p>
          </div>
        )}

        <div className="rounded-md grid grid-cols-4 gap-6">
          {isLoading && <Loading />}

          {data &&
            data.length > 0 &&
            data.map(({ id, listing, property }) => (
              <div className="col-span-4 md:col-span-2 lg:col-span-1" key={id}>
                <PropertyCardItem
                  item={{
                    listing: {
                      listingId: listing.id,
                      listingType: listing.listingType,
                      listingStatus: listing.status,
                      rentPricePerCalendarMonth:
                        listing.rentPricePerCalendarMonth,
                      salePrice: listing.salePrice,
                    },
                    property: {
                      numberOfBathRooms: property.numberOfBathRooms,
                      numberOfBedRooms: property.numberOfBedRooms,
                      area: property.area,
                      propertyType: property.propertyType,
                      address: property.address,
                      propertyThumbnailExternalId:
                        property.propertyThumbnailExternalId,
                    },
                  }}
                />
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}

function Loading() {
  return (
    <>
      {[...Array(4)].map((_, index) => (
        // <div key={index} className="w-[300px]">
        <div className="col-span-4 md:col-span-2 lg:col-span-1" key={index}>
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

      {/* {Array.from({ length: 12 }, (_, i) => i + 1).map((id) => (
        <div className="col-span-4 md:col-span-2 lg:col-span-1" key={id}>
          <Card>
            <Skeleton className="rounded-t-lg aspect-[2.17] w-full" />
            <div className="relative ">
              <CardHeader className={cn("pt-3 pb-3")}>
                <CardTitle className={cn("pt-0")}>
                  <div className="flex gap-0.5 whitespace-nowrap">
                    <Skeleton />
                  </div>
                </CardTitle>
                <CardTitle className={cn("text-base line-clamp-1")}>
                  <Skeleton className="h-6 w-1/2" />
                </CardTitle>
                <CardDescription>
                  <Skeleton className="h-6 w-10/12" />
                </CardDescription>
              </CardHeader>

              <div className="absolute inset-0 mr-5 mt-5 flex justify-end  ">
                <div className="flex items-center justify-center bg-transparent rounded-full border w-8 h-8">
                  <Skeleton />
                </div>
              </div>
            </div>

            <CardContent>
              <Separator />
              <Skeleton className="mt-2 h-6 w-full" />
            </CardContent>
          </Card>
        </div>
      ))} */}
    </>
  );
}
