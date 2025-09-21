import httpClient from "@/shared/http-client";

import { ViewingBookingRequest } from "../contracts/requests";
import {
  PaginatedResponse,
  ViewingItemResponse,
  ViewingSummaryResponse,
} from "../contracts/responses";
import formatToUtc from "@/lib/formatDate";

const endpoint: string = "/viewings";

export async function createViewingRequest(
  request: ViewingBookingRequest
): Promise<unknown> {
  const response = await httpClient.post(endpoint, {
    ...request,
    bookingDate: formatToUtc(request.bookingDate.toString()),
  });
  return response;
}

export async function getUpcomingViewings(): Promise<
  Array<ViewingSummaryResponse>
> {
  const { data: response } = await httpClient.get<
    PaginatedResponse<Array<ViewingSummaryResponse>>
  >(`${endpoint}/upcoming`);
  return response.items;
}

export async function getViewings(
  pageNumber: number = 1,
  pageSize: number = 25
): Promise<Array<ViewingSummaryResponse>> {
  const { data: response } = await httpClient.get<
    PaginatedResponse<Array<ViewingSummaryResponse>>
  >(`${endpoint}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  return response.items;
}

export async function getViewing(id: string): Promise<ViewingItemResponse> {
  const { data: response } = await httpClient.get<ViewingItemResponse>(
    `${endpoint}/${id}`
  );
  return response;
}

export async function cancelViewing(viewingId: string) {
  const response = await httpClient.put(`${endpoint}/${viewingId}/cancel`);

  return response;
}
