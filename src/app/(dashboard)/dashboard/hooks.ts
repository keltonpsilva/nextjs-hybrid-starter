import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  cancelViewing,
  getUpcomingViewings,
  getViewing,
} from "@/shared/services/viewing-service";
import { getIdentityInfo } from "@/shared/services/auth-service";

export function useGetUserIdentityInfo() {
  return useQuery({
    queryKey: ["identity-info"],
    queryFn: getIdentityInfo,
  });
}

export function useGetUpcomingViewings() {
  return useQuery({
    queryKey: ["upcoming-viewings"],
    queryFn: getUpcomingViewings,
  });
}

export function useGetUpcomingViewing(id: string) {
  return useQuery({
    queryKey: ["upcoming-viewings", { id }],
    queryFn: () => getViewing(id),
  });
}

export function useCancelUpcomingViewing(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cancelViewing(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["upcoming-viewings"] });
      toast.info("Viewing cancelled successfully");
    },
  });
}
