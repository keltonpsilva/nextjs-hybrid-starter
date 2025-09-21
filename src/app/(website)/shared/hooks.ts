import { useQuery } from "@tanstack/react-query";

import { getListings } from "@/shared/services/listing-service";

export function useGetLatestProperties() {
  return useQuery({
    queryKey: ["lastest-properties"],
    queryFn: () => getListings({ pageSize: 8 }),
  });
}
