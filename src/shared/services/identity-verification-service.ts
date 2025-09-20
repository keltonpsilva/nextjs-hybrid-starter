import httpClient from "@/shared/http-client";
import {
  IdentityVerificationResponse,
  PaginatedResponse,
} from "../contracts/responses";

const endpoint: string = "/identity-verification";

export async function createIdentityVerification(): Promise<string> {
  const { data: response } = await httpClient.post<string>(`${endpoint}`);

  return response;
}

export async function getIdentityVericationHistory(): Promise<
  IdentityVerificationResponse[]
> {
  const { data: response } = await httpClient.get<
    PaginatedResponse<IdentityVerificationResponse[]>
  >(`${endpoint}`);

  return response.items;
}
