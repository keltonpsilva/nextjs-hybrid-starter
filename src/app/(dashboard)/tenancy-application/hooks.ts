import { useMutation, useQuery } from "@tanstack/react-query";

import {
  getApplications,
  updateTenancyApplication,
} from "@/shared/services/tenancy-application-service";
import { TenancyApplicationUpdateRequest } from "@/shared/contracts/requests";

export function useGetApplications() {
  return useQuery({
    queryKey: ["tenancy-applications"],
    queryFn: () => getApplications(),
  });
}

export function useUpdateTenancyApplication(
  applicationId: string,
  request: TenancyApplicationUpdateRequest
) {
  return useMutation({
    mutationFn: () => updateTenancyApplication(applicationId, request),
  });
}
