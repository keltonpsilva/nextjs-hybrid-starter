import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getApplication,
  updateTenancyApplication,
} from "@/shared/services/tenancy-application-service";
import {
  TenancyApplicationUpdateRequest,
  UserEmploymentHistoryUpdateRequest,
} from "@/shared/contracts/requests";
import {
  getEmploymentsHistory,
  updateEmploymentHistory,
} from "@/shared/services/employment-history-service";
import { getAddressHistory } from "@/shared/services/address-history-service";

const queryKey = "tenacy-application";

export function useGetAddressHistory() {
  return useQuery({
    queryKey: ["user-address-history"],
    queryFn: getAddressHistory,
  });
}

export function useGetTenanacyApplication(id: string) {
  return useQuery({
    queryKey: [queryKey, { id }],
    queryFn: () => getApplication(id),
  });
}

export function useUpdateTenancyApplication(
  applicationId: string,
  request: TenancyApplicationUpdateRequest
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => updateTenancyApplication(applicationId, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });
}

export function useGetCurrentEmployment() {
  return useQuery({
    queryKey: ["current-employment"],
    queryFn: () => getEmploymentsHistory(1, 1),
  });
}

export function useUpdateEmployment(
  id: string,
  request: UserEmploymentHistoryUpdateRequest
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => updateEmploymentHistory(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-employment"] });
      // toast.info("User employment history updated successfully");
    },
  });
}
