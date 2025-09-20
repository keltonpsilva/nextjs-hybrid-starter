import { PropertyType, TenancyApplicationStatus } from "../enums";
import { Address, Price } from "../types";

export type TenancyApplicationSummaryResponse = {
  id: string;
  userId: string;
  status: TenancyApplicationStatus;
  submittedDateUtc?: Date;
  tenancyTerm?: number;
  tenancyRent?: Price;
  property: TenancyApplicationSummaryPropertyResponse;
};

type TenancyApplicationSummaryPropertyResponse = {
  id: string;
  address: Address;
  numberOfBedRooms?: number;
  propertyType: PropertyType;
  agency: TenancyApplicationSummaryAgencyResponse;
};

type TenancyApplicationSummaryAgencyResponse = {
  id: string;
  businessName: string;
  phoneNumber: string;
  emailAddress: string;
};
