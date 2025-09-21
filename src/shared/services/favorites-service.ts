import httpClient from "@/shared/http-client";
import { FavoritedResponse, PaginatedResponse } from "../contracts/responses";

const endpoint: string = "/favorites";

export async function getFavoritedProperties(): Promise<
  Array<FavoritedResponse>
> {
  const { data: response } = await httpClient.get<
    PaginatedResponse<Array<FavoritedResponse>>
  >(endpoint);

  return response.items;
}

export async function addFavorite(listingId: string): Promise<unknown> {
  const response = await httpClient.post<Promise<unknown>>(`${endpoint}`, {
    listingId,
  });

  return response;
}

export async function removeFavorite(listingId: string) {
  const response = await httpClient.delete<Promise<unknown>>(`${endpoint}`, {
    data: { listingId },
  });

  return response;
}
