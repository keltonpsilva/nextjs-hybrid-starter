import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  deleteAddressHistory,
  getAddressHistory,
} from "@/shared/services/address-history-service";

export function useGetAddressHistory() {
  return useQuery({
    queryKey: ["user-address-history"],
    queryFn: getAddressHistory,
  });
}

export function useDeleteAddressHistory(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteAddressHistory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-address-history"] });
      toast.info("User address history removed successfully");
    },
  });
}
