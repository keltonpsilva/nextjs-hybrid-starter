import {
  addFavorite,
  getFavoritedProperties,
  removeFavorite,
} from "@/shared/services/favorites-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useGetFavorites(enabled: boolean) {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: getFavoritedProperties,
    enabled: !!enabled,
  });
}

export function useAddFavorites(listingId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => addFavorite(listingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      toast.info("Property added to favorited");
    },
  });
}

export function useRemoveFavorites(listingId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => removeFavorite(listingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      toast.info("Property remove from favorited");
    },
  });
}
