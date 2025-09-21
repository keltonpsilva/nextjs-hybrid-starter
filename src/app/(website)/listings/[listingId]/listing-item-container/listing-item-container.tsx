import { useEffect, useState } from "react";
import { Heart, Share2 } from "lucide-react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

import { cn } from "@/lib/utils";
import SimilarListingSections from "./similar-listing-section";
import BookingRequestViewSection from "./booking-request-view-section";
import PropertyDetailsSection from "./property-details-section";
import { ListingResponse } from "@/shared/contracts/responses";
import { Container } from "@/components/layout";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  useAddFavorites,
  useGetFavorites,
  useRemoveFavorites,
} from "@/app/(dashboard)/favorites/hooks";
import { ListingType } from "@/shared/contracts/enums";
import PropertyGallerySection from "./property-gallery-section";

export default function ListingItemContainer({
  listing,
}: {
  listing: ListingResponse;
}) {
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { data: session } = useSession();
  const user = session?.user;

  const { data: userFavoritedListings } = useGetFavorites(!!user);
  const { mutateAsync: addFavorite } = useAddFavorites(listing.id);
  const { mutateAsync: removeFavorite } = useRemoveFavorites(listing.id);

  const { property } = listing;
  const { address, files } = property;

  useEffect(() => {
    if (user && Array.isArray(userFavoritedListings)) {
      const favorited = userFavoritedListings.some(
        (f) => f.listing.id === listing.id
      );

      setIsFavorited(favorited);
    }
  }, [user, userFavoritedListings, listing.id]);

  // const handlerOnclick = () => {
  //   toast('Event has been created', {
  //     description: 'Sunday, December 03, 2023 at 9:00 AM',
  //     action: {
  //       label: 'Undo',
  //       onClick: () => {},
  //     },
  //   })
  // }

  const handlerFavoriteOnclick = async () => {
    try {
      setIsSubmitting(true);

      if (isFavorited) {
        await removeFavorite();
        setIsFavorited(false);
      } else {
        await addFavorite();
        setIsFavorited(true);
      }
    } catch {
      toast.error("An error occurred while updating the favorite status");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Container>
        <div className="flex gap-1 justify-start text-lg font-bold">
          <ChevronLeftIcon className="shrink-0 my-auto w-5 aspect-square" />
          {/* <Link href=".." relative="path" className="text-indigo-500"> */}
          <Link
            href={`./${
              listing.listingType === ListingType.Rent ? "rent" : "buy"
            }`}
            className="text-indigo-500"
          >
            Back to map
          </Link>
        </div>
        <div className="flex justify-between mt-4 w-full max-md:flex-wrap max-md:max-w-full">
          <div className="flex flex-col text-slate-950">
            <h1 className="mt-4 w-full text-4xl font-bold tracking-tight">
              {address.streetAddress}
            </h1>
            <span>
              {address.city}, {address.postCode}
            </span>
          </div>
          <div className="flex gap-4 self-end text-base text-center max-md:flex-wrap max-md:mt-10">
            <div className="flex flex-auto gap-4 whitespace-nowrap ">
              <Button
                variant="light"
                className={cn(
                  "flex items-center justify-center max-md:px-5 ",
                  user && "max-md:w-1/2"
                )}
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.info("Listing property copied to clipboard");
                }}
              >
                <Share2 className="shrink-0 w-4 h-4" />
                Share
              </Button>

              {user && (
                <Button
                  variant="light"
                  className="flex items-center justify-center max-md:px-5 max-md:w-1/2"
                  onClick={handlerFavoriteOnclick}
                  isLoading={isSubmitting}
                >
                  {!isSubmitting && (
                    <Heart
                      fill={`${isFavorited ? "#7167F0" : "transparent"}`}
                      className="shrink-0 w-4 h-4"
                    />
                  )}
                  Favorite
                </Button>
              )}
            </div>

            {/* <Button
              variant="light"
              className="flex flex-auto gap-2 justify-centerrounded-lg  max-md:px-5 "
              onClick={handlerOnclick}
            >
              <Search className="shrink-0 my-auto w-4 aspect-square " />
              Browse nearby listings
            </Button> */}
          </div>
        </div>

        {/* Pictures */}
        <PropertyGallerySection propertyImages={files} />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5 ">
          <PropertyDetailsSection listing={listing} />
          <BookingRequestViewSection
            listingId={listing.id}
            listingType={listing.listingType}
            propertyId={property.id}
            rentPricePerCalendarMonth={listing.rentPricePerCalendarMonth}
            salePrice={listing.salePrice}
          />
        </div>
      </Container>

      <div className="bg-[#f7f7fe]">
        <SimilarListingSections
          listingType={listing.listingType}
          location={address.city}
        />
      </div>
    </>
  );
}
