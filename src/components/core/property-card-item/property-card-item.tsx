import { Bath, Bed, Ruler } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LISTING_PAGE_PATH } from "@/shared/router/router-paths";
import {
  ListingStatus,
  ListingType,
  PropertyType,
} from "@/shared/contracts/enums";
import { Address, Area, Price } from "@/shared/contracts/types";
import { generateListingTitle } from "@/lib/utils";
import environment from "@/lib/environment";

import PriceSection from "./price-section";

interface PropertyCardItemProps {
  listing: {
    listingId: string;
    listingType: ListingType;
    listingStatus?: ListingStatus;
    rentPricePerCalendarMonth: Price;
    salePrice: Price;
  };
  property: {
    numberOfBathRooms?: number;
    numberOfBedRooms?: number;
    area: Area;
    propertyType: PropertyType;
    address: Address;
    propertyThumbnailExternalId: string;
  };
}

export function PropertyCardItem({
  item: {
    listing: {
      listingId,
      listingType,
      listingStatus,
      rentPricePerCalendarMonth,
      salePrice,
    },
    property: {
      numberOfBathRooms,
      numberOfBedRooms,
      area,
      propertyType,
      address,
      propertyThumbnailExternalId,
    },
  },
}: {
  item: PropertyCardItemProps;
}) {
  return (
    <>
      <div key={listingId} className="w-[280px]">
        {/* Fixed width */}

        <Link href={`${LISTING_PAGE_PATH}/${listingId}`}>
          <Card
            id={listingId}
            className={`pt-0 gap-0 h-full hover:shadow-lg transition-shadow duration-300 relative overflow-hidden ${
              listingStatus === ListingStatus.Expired ? "opacity-70" : ""
            }`}
          >
            {listingStatus === ListingStatus.Expired && (
              <div className="absolute inset-0 bg-gray-100/80 flex items-center justify-center z-10">
                <Badge variant="secondary" className="px-4 py-2 text-lg">
                  Listing Expired
                </Badge>
              </div>
            )}

            <CardHeader className="p-0">
              <div className="relative h-48 w-full">
                <Image
                  src={
                    propertyThumbnailExternalId
                      ? `${environment.BlobStorageUrl}/properties/${propertyThumbnailExternalId}`
                      : `https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg`
                  }
                  alt={`listing-img` + listingId}
                  fill
                  className="rounded-t-lg object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4 pb-0">
              <CardTitle className="text-lg font-semibold lowercase truncate">
                {generateListingTitle(
                  propertyType,
                  listingType,
                  numberOfBedRooms
                )}
              </CardTitle>
              <CardDescription className="mt-0.5">
                {address.streetAddress}
              </CardDescription>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-medium">
                  <PriceSection
                    rentPricePerCalendarMonth={rentPricePerCalendarMonth}
                    salePrice={salePrice}
                  />
                </span>
              </div>
            </CardContent>
            <CardFooter className="px-0">
              <div className="w-full p-4 pb-0">
                <div className="flex justify-between border-t border-gray-200 pt-2">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Bed className="text-indigo-500 shrink-0 w-5 aspect-square" />
                    <span>{numberOfBedRooms}</span>
                  </div>

                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Bath className="text-indigo-500 shrink-0 w-5 aspect-square" />
                    <span>{numberOfBathRooms}</span>
                  </div>

                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Ruler className="text-indigo-500 shrink-0 w-5 aspect-square" />
                    <span>{area.value.toLocaleString()} sqft</span>
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </Link>
      </div>
    </>
    // <div
    //   className="col-span-4 md:col-span-2 lg:col-span-1 relative"
    //   key={item.id}
    // >
    //   <Link href={`${LISTING_PAGE_PATH}/${item.id}`}>
    //     <Card>
    //       <div className="relative">
    //         <picture>
    //           <img
    //             id="property-image"
    //             loading="lazy"
    //             alt={item.id}
    //             // src={`https://picsum.photos/500/300?random=${item.id}`}
    //             src={`https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg`}
    //             className="rounded-t-lg aspect-[2.17] w-full"
    //           />
    //         </picture>
    //         {item.isFeatured && <FeaturedSection />}
    //       </div>

    //       <div id="property-details" className="relative mt-2">
    //         <CardHeader className={cn("pt-3 pb-3")}>
    //           <CardTitle className={cn("pt-0")}>
    //             <div className="flex gap-0.5 whitespace-nowrap">
    //               <PriceSection
    //                 rentPricePerCalendarMonth={item.rentPricePerCalendarMonth}
    //                 salePrice={item.salePrice}
    //               />
    //             </div>
    //           </CardTitle>
    //           <CardTitle className={cn("text-base line-clamp-1")}>
    //             Cozy Apartment in Downtown
    //           </CardTitle>
    //           <CardDescription>
    //             <div className={cn("text-sm mb-0 line-clamp-1")}>
    //               {property.address.streetAddress}
    //             </div>
    //           </CardDescription>
    //         </CardHeader>

    //         {/* ToDo:
    //         - The code below is to support the Heart Button to perform Save to users favorite,
    //           it's removed for now because is overlay the back layer and prevent using <a> tag on the area
    //           incluing Text selection
    //      */}

    //         {/* {user && (
    //         <div className="absolute inset-0 mr-5 mt-3 flex justify-end">
    //           <div className="flex items-center justify-center bg-transparent rounded-full border w-8 h-8">
    //             <Button variant="link" onClick={onFavoriteSubmithandle}>
    //               <HeartIcon className="text-red-400 w-5" />
    //             </Button>
    //           </div>
    //         </div>
    //       )} */}
    //       </div>

    //       <CardContent>
    //         <Separator />
    //         <div className="flex gap-5 justify-start mt-4 text-sm text-gray-500">
    //           <div className="flex gap-1 justify-center text-sm text-gray-500 items-center">
    //             <BedSingle className="text-indigo-500 shrink-0 w-5 aspect-square" />
    //             <div>{property.numberOfBedRooms}</div>
    //           </div>

    //           <div className="flex gap-1 justify-center text-sm text-gray-500 items-center">
    //             <Bath className="text-indigo-500 shrink-0 w-5 aspect-square" />
    //             <div>{property.numberOfBathRooms}</div>
    //           </div>

    //           <div className="flex gap-1 justify-center text-sm text-gray-500 items-center">
    //             <Frame className="text-indigo-500 shrink-0 w-5 aspect-square" />
    //             <div>{property.area.value} m²</div>
    //           </div>
    //         </div>
    //       </CardContent>
    //     </Card>
    //   </Link>
    // </div>
  );
}
