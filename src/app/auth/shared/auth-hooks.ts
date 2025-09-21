import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { SignUpRequest } from "@/shared/contracts/requests";
import { registerUserWithEmailAndPassword } from "@/shared/services/auth-service";

export function useSignUp(request: SignUpRequest) {
  return useMutation({
    mutationFn: () => registerUserWithEmailAndPassword(request),
    onSuccess: () => {
      toast.success("New user account created successfully");
    },
  });
}
