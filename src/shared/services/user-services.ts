import formatToUtc from "@/lib/formatDate";
import httpClient from "@/shared/http-client";

import { UserSummaryResponse } from "../contracts/responses";
import { UserUpdateRequest } from "../contracts/requests";

const endpoint: string = "/users";

export async function getLoggedin(): Promise<UserSummaryResponse> {
  const { data: response } = await httpClient.get<UserSummaryResponse>(
    `identity/info`
  );

  return response;
}

export async function updateUser(
  userId: string,
  request: UserUpdateRequest
): Promise<UserSummaryResponse> {
  request.dateOfBirth = formatToUtc(request.dateOfBirth.toString());

  const response = await httpClient.put<UserUpdateRequest, UserSummaryResponse>(
    `${endpoint}/${userId}`,
    request
  );

  return response;
}
