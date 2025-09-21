import { IdentityVerificationStatus } from "../enums";

export type IdentityVerificationResponse = {
  id: string;
  provider: string;
  status: IdentityVerificationStatus;
  documentType: string;
  userId: string;
  createdDateUtc: Date;
};
