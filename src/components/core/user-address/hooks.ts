import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  UserAddressHistoryCreateRequest,
  UserAddressHistoryUpdateRequest,
} from "@/shared/contracts/requests";
import {
  createAddressHistory,
  updateAddressHistory,
} from "@/shared/services/address-history-service";

export function useCreateAddressHistory(
  request: UserAddressHistoryCreateRequest
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createAddressHistory(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-address-history"] });
      toast.info("User address history added successfully");
    },
  });
}

export function useUpdateAddressHistory(
  id: string,
  request: UserAddressHistoryUpdateRequest
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => updateAddressHistory(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-address-history"] });
      toast.info("User address history updated successfully");
    },
  });
}
