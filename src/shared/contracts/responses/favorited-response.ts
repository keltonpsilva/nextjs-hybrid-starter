import { Address, Area, Price } from "../types";
import { ListingStatus, ListingType, PropertyType } from "../enums";

export type FavoritedResponse = {
  id: string;
  userId: string;
  listing: FavoritedListingResponse;
  property: FavoritedPropertyResponse;
};

type FavoritedListingResponse = {
  id: string;
  listingType: ListingType;
  status: ListingStatus;
  rentPricePerCalendarMonth: Price;
  rentPricePerCalendarWeek: Price;
  salePrice: Price;
  startDateUtc: Date;
  endDateUtc: Date;
};

type FavoritedPropertyResponse = {
  id: string;
  reference: number;
  numberOfBedRooms?: number;
  numberOfBathRooms?: number;
  area: Area;
  propertyType: PropertyType;
  address: Address;
  propertyThumbnailExternalId: string;
};
