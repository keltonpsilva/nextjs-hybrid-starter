import { Area, Address, Price } from "../types";
import {
  AvailabilityStatus,
  FurnitureType,
  ListingType,
  PropertyType,
} from "../enums";

export type ListingResponse = {
  id: string;
  startDateUtc: Date;
  listingType: ListingType;
  rentPricePerCalendarMonth?: Price;
  rentPricePerCalendarWeek?: Price;
  salePrice?: Price;

  agent: ListingAgentResponse;

  property: ListingPropertyResponse;
};

export type ListingPropertyResponse = {
  id: string;
  reference: number;
  description: string;
  numberOfBedRooms?: number;
  numberOfBathRooms?: number;
  dateAvailable?: Date;
  furnitureType: FurnitureType;
  area: Area;
  availabilityStatus: AvailabilityStatus;
  propertyType: PropertyType;
  deposit: Price;
  adminFee: Price;
  address: Address;

  agency: ListingAgencyResponse;

  files: Array<ListingPropertyFile>;
};

export type ListingPropertyFile = {
  id: string;
  fileType: string;
  fileName: string;
  contentType: string;
  externalId: string;
};

export type ListingAgencyResponse = {
  id: string;
  businessName: string;
  phoneNumber: string;
};

export type ListingAgentResponse = {
  id: string;
  firstName: string;
  lastName: string;
};
