import { useMutation, useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";

import { getListing } from "@/shared/services/listing-service";
import { APPLICATIONS_PAGE_PATH } from "@/shared/router/router-paths";
import { createTenancyApplication } from "@/shared/services/tenancy-application-service";

export function useGetListing(listingId: string) {
  return useQuery({
    queryKey: ["listing", listingId],
    queryFn: () => getListing(listingId),
  });
}

export function useCreateTenancyApplication(propertyId: string) {
  return useMutation({
    mutationFn: () => createTenancyApplication(propertyId),
    onSuccess: (data) => {
      const { id } = data;

      redirect(`${APPLICATIONS_PAGE_PATH}/${id}`);
    },
  });
}
