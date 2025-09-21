import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  UserEmploymentHistoryCreateRequest,
  UserEmploymentHistoryUpdateRequest,
} from "@/shared/contracts/requests";
import {
  getEmploymentsHistory,
  createEmploymentHistory,
  updateEmploymentHistory,
  deleteEmploymentHistory,
} from "@/shared/services/employment-history-service";

export function useGetEmploymentsHistory() {
  return useQuery({
    queryKey: ["user-employment-history"],
    queryFn: () => getEmploymentsHistory(),
  });
}

export function useCreateEmploymentHistory(
  request: UserEmploymentHistoryCreateRequest
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createEmploymentHistory(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-employment-history"] });
      toast.info("User employment history added successfully");
    },
  });
}

export function useUpdateEmploymentHistory(
  id: string,
  request: UserEmploymentHistoryUpdateRequest
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => updateEmploymentHistory(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-employment-history"] });
      toast.info("User employment history updated successfully");
    },
  });
}

export function useDeleteEmploymentHistory(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteEmploymentHistory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-employment-history"] });
      toast.info("User employment history removed successfully");
    },
  });
}
