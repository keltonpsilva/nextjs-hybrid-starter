import { UserUpdateRequest } from "@/shared/contracts/requests";
import { getLoggedin, updateUser } from "@/shared/services/user-services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useGetLoggedin() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getLoggedin,
  });
}

export function useUpdateUser(userId: string, request: UserUpdateRequest) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => updateUser(userId, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.info("User profile updated successfully");
    },
  });
}
