import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";

import { ListingType } from "@/shared/contracts/enums";
import { getListings } from "@/shared/services/listing-service";
import { ViewingBookingRequest } from "@/shared/contracts/requests";
import { createViewingRequest } from "@/shared/services/viewing-service";

export function useGetListings({
  listingType,
  location,
  minimumPrice,
  maximumPrice,
  propertyType,
  pageNumber = 1,
  pageSize,
}: {
  listingType: ListingType;
  minimumPrice?: string | null;
  location: string | null;
  maximumPrice?: string | null;
  propertyType?: string | null;
  pageNumber?: number;
  pageSize: number;
}) {
  return useQuery({
    queryKey: [
      "listings",
      listingType,
      location,
      minimumPrice,
      maximumPrice,
      propertyType,
      pageNumber,
      pageSize,
    ],
    queryFn: () =>
      getListings({
        listingType,
        location,
        minimumPrice,
        maximumPrice,
        propertyType,
        pageNumber,
        pageSize,
      }),
  });
}

export function useCreateViewingRequest(request: ViewingBookingRequest) {
  return useMutation({
    mutationFn: () => createViewingRequest(request),
    onSuccess: () => {
      toast.success(
        `${request.bookingType} booking request on ${format(
          request.bookingDate,
          "PPP"
        )}`
      );
    },
  });
}
