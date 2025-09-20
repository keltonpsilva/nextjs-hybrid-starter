import httpClient from "@/shared/http-client";
import {
  PaginatedResponse,
  TenancyApplicationResponse,
  TenancyApplicationSummaryResponse,
} from "../contracts/responses";
import { TenancyApplicationUpdateRequest } from "../contracts/requests";

const endpoint: string = "/tenancy-application";

export async function getApplications(
  pageNumber: number = 1,
  pageSize: number = 25
): Promise<Array<TenancyApplicationSummaryResponse>> {
  const { data: response } = await httpClient.get<
    PaginatedResponse<Array<TenancyApplicationSummaryResponse>>
  >(`${endpoint}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  return response.items;
}

export async function getApplication(
  id: string
): Promise<TenancyApplicationResponse> {
  const { data: response } = await httpClient.get<TenancyApplicationResponse>(
    `${endpoint}/${id}`
  );
  return response;
}

export async function createTenancyApplication(
  propertyId: string
): Promise<TenancyApplicationResponse> {
  const { data } = await httpClient.post<TenancyApplicationResponse>(
    `${endpoint}`,
    {
      propertyId,
    }
  );

  return data;
}

export async function updateTenancyApplication(
  applicationId: string,
  request: TenancyApplicationUpdateRequest
): Promise<TenancyApplicationResponse> {
  const response = await httpClient.put<
    TenancyApplicationUpdateRequest,
    TenancyApplicationResponse
  >(`${endpoint}/${applicationId}`, request);

  return response;
}
