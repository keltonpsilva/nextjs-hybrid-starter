import httpClient from "@/shared/http-client";

import {
  PaginatedResponse,
  UserEmploymentHistoryResponse,
} from "../contracts/responses";
import {
  UserEmploymentHistoryCreateRequest,
  UserEmploymentHistoryUpdateRequest,
} from "../contracts/requests";

const endpoint: string = "/user-employments";

export async function getEmploymentsHistory(
  pageNumber: number = 1,
  pageSize: number = 25
): Promise<UserEmploymentHistoryResponse[]> {
  const { data: response } = await httpClient.get<
    PaginatedResponse<UserEmploymentHistoryResponse[]>
  >(`${endpoint}?pageNumber=${pageNumber}&pageSize=${pageSize}`);

  return response.items;
}

export async function createEmploymentHistory(
  request: UserEmploymentHistoryCreateRequest
): Promise<UserEmploymentHistoryResponse> {
  const { data: response } =
    await httpClient.post<UserEmploymentHistoryResponse>(
      `${endpoint}`,
      request
    );

  return response;
}

export async function updateEmploymentHistory(
  id: string,
  request: UserEmploymentHistoryUpdateRequest
): Promise<UserEmploymentHistoryResponse> {
  const { data: response } =
    await httpClient.put<UserEmploymentHistoryResponse>(
      `${endpoint}/${id}`,
      request
    );

  return response;
}

export async function deleteEmploymentHistory(id: string) {
  const response = await httpClient.delete(`${endpoint}/${id}`);

  return response;
}
