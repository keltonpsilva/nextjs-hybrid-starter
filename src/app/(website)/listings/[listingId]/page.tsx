"use client";

import { useParams } from "next/navigation";

import ListingItemContainer from "./listing-item-container/listing-item-container";
import Loading from "./loading";
import { useGetListing } from "./hooks";

export default function Listing() {
  const { listingId } = useParams<{ listingId: string }>();

  const { isLoading, data: listing } = useGetListing(listingId!);

  if (isLoading) {
    return <Loading />;
  }

  return <ListingItemContainer listing={listing!} />;
}
