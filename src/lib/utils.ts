import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { differenceInMonths } from "date-fns";

import { ListingType, PropertyType } from "@/shared/contracts/enums";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function camelCaseToSeparated(
  camelCaseString: string,
  delimiter: string = " "
): string {
  const characters = camelCaseString.split("");

  const result = characters.reduce((accumulatedString, currentChar) => {
    if (currentChar === currentChar.toUpperCase() && accumulatedString !== "") {
      return `${accumulatedString}${delimiter}${currentChar}`;
    }

    return accumulatedString + currentChar;
  }, "");

  return result.trim();
}

export function generateListingTitle(
  propertyType: PropertyType,
  listingType: ListingType,
  numberOfBedRooms?: number
): string {
  const listingText = `${
    listingType === ListingType.Rent ? `for` : `to`
  } ${listingType}`;

  if (!numberOfBedRooms) {
    return listingText;
  }

  if (numberOfBedRooms === 1) {
    return `Studio ${listingText}`;
  }
  return `${numberOfBedRooms} bedroom ${propertyType} ${listingText}`;
}

export function formatDateDifference(startDate: Date, endDate: Date): string {
  const totalMonths = differenceInMonths(endDate, startDate);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""} ${months} month${
      months !== 1 ? "s" : ""
    }`;
  } else {
    return `${months} month${months !== 1 ? "s" : ""}`;
  }
}
