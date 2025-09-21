import { getViewings } from "@/shared/services/viewing-service";
import { useQuery } from "@tanstack/react-query";

export function useGetViewings() {
  return useQuery({
    queryKey: ["viewings"],
    queryFn: () => getViewings(),
  });
}
