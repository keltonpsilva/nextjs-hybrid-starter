import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createIdentityVerification,
  getIdentityVericationHistory,
} from "@/shared/services/identity-verification-service";

export function useGetAddressHistory() {
  return useQuery({
    queryKey: ["user-identity-verification-history"],
    queryFn: getIdentityVericationHistory,
  });
}

export function useStartIdentityVerification() {
  return useMutation({
    mutationFn: createIdentityVerification,
  });
}
