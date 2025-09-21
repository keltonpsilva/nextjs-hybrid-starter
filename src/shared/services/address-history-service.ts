import httpClient from "@/shared/http-client";
import {
  UserAddressHistoryCreateRequest,
  UserAddressHistoryUpdateRequest,
} from "../contracts/requests";
import {
  PaginatedResponse,
  UserAddressHistoryResponse,
} from "../contracts/responses";

const endpoint: string = "/user-addresses";

export async function getAddressHistory(): Promise<
  UserAddressHistoryResponse[]
> {
  const { data: response } = await httpClient.get<
    PaginatedResponse<UserAddressHistoryResponse[]>
  >(`${endpoint}`);

  return response.items;
}

export async function createAddressHistory(
  request: UserAddressHistoryCreateRequest
): Promise<UserAddressHistoryResponse> {
  const { data: response } = await httpClient.post<UserAddressHistoryResponse>(
    `${endpoint}`,
    request
  );

  return response;
}

export async function updateAddressHistory(
  id: string,
  request: UserAddressHistoryUpdateRequest
): Promise<UserAddressHistoryResponse> {
  const { data: response } = await httpClient.put<UserAddressHistoryResponse>(
    `${endpoint}/${id}`,
    request
  );

  return response;
}

export async function deleteAddressHistory(id: string) {
  const response = await httpClient.delete(`${endpoint}/${id}`);

  return response;
}
