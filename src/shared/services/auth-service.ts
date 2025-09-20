import httpClient from "@/shared/http-client";
import { SignUpRequest } from "../contracts/requests";
import { IdentityInfoResponse } from "../contracts/responses";

const endpoint: string = "/identity";

export async function registerUserWithEmailAndPassword(
  request: SignUpRequest
): Promise<object> {
  const response = await httpClient.post<SignUpRequest>(
    `${endpoint}/register`,
    request
  );
  return response;
}

export async function getIdentityInfo(): Promise<IdentityInfoResponse> {
  const { data: response } = await httpClient.get<IdentityInfoResponse>(
    `${endpoint}/info`
  );

  return response;
}
