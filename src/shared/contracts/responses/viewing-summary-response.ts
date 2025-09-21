import {
  BookingType,
  ListingType,
  PropertyType,
  ViewingStatus,
} from "../enums";
import { Address } from "../types";

export type ViewingSummaryResponse = {
  id: string;
  viewingBookingType: BookingType;
  status: ViewingStatus;
  viewingScheduleDate: Date;
  property: ViewingSummaryPropertyResponse;
  listing: ViewingSummaryListingResponse;
};

type ViewingSummaryPropertyResponse = {
  id: string;
  address: Address;
  propertyType: PropertyType;
  numberOfBedRooms?: number;
  agency: ViewingScheduleSummaryAgencyResponse;
};

type ViewingScheduleSummaryAgencyResponse = {
  id: string;
  businessName: string;
  phoneNumber: string;
  emailAddress: string;
};

type ViewingSummaryListingResponse = {
  id: string;
  listingType: ListingType;
};
