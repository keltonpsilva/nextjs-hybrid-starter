import { ListingType } from "../contracts/enums";
import {
  ListingResponse,
  ListingSummaryResponse,
  PaginatedResponse,
} from "../contracts/responses";

import httpClient from "../http-client";

const endpoint: string = "/listings";

export async function getListings({
  listingType,
  location,
  minimumPrice,
  maximumPrice,
  propertyType,
  pageNumber,
  pageSize,
}: {
  listingType?: ListingType;
  location?: string | null;
  minimumPrice?: string | null;
  maximumPrice?: string | null;
  propertyType?: string | null;
  pageNumber?: number | null;
  pageSize?: number | null;
}): Promise<PaginatedResponse<Array<ListingSummaryResponse>>> {
  const options = {
    listingType,
    location,
    minimumPrice,
    maximumPrice,
    propertyType,
    pageNumber,
    pageSize,
  };

  const { data: response } = await httpClient.get<
    PaginatedResponse<Array<ListingSummaryResponse>>
  >(endpoint, {
    params: options || {},
  });

  return response;
}

export async function getListing(listingId: string): Promise<ListingResponse> {
  const { data: response } = await httpClient.get<ListingResponse>(
    `${endpoint}/${listingId}`
  );

  return response;
}
