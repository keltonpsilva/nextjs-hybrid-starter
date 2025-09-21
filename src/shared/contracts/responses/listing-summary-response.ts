import { Area, Address, Price } from "../types";
import {
  ListingStatus,
  ListingType,
  PropertyStatus,
  PropertyType,
} from "../enums";

export type ListingSummaryResponse = {
  id: string;
  isFeatured: boolean;
  listingType: ListingType;
  status: ListingStatus;
  startDateUtc: Date;
  rentPricePerCalendarMonth: Price;
  rentPricePerCalendarWeek: Price;
  salePrice: Price;

  property: ListingSummaryPropertyResponse;
};

export type ListingSummaryPropertyResponse = {
  id: string;
  reference: number;
  numberOfBedRooms?: number;
  numberOfBathRooms?: number;
  propertyThumbnailExternalId: string;
  area: Area;
  propertyStatus: PropertyStatus;
  propertyType: PropertyType;
  address: Address;
};
