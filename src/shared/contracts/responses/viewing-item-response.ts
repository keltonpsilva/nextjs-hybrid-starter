import {
  BookingType,
  ListingType,
  PropertyType,
  ViewingStatus,
} from "../enums";
import { Address } from "../types";

export type ViewingItemResponse = {
  id: string;
  viewingBookingType: BookingType;
  status: ViewingStatus;
  viewingScheduleDate: Date;
  listing: ViewingItemListingResponse;
  property: ViewingItemPropertyResponse;
  agency: ViewingItemAgencyResponse;
};

type ViewingItemPropertyResponse = {
  id: string;
  address: Address;
  propertyType: PropertyType;
  numberOfBedRooms?: number;
};

type ViewingItemListingResponse = {
  id: string;
  listingType: ListingType;
};

type ViewingItemAgencyResponse = {
  id: string;
  businessName: string;
  phoneNumber: string;
  emailAddress: string;
  address: Address;
};
