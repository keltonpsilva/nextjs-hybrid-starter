"use client";

import { useSearchParams } from "next/navigation";

import { Container } from "@/components/layout";

import { PaginationControls } from "@/components/ui/pagination-controls";

import { ListingSummaryResponse } from "@/shared/contracts/responses";
import { ListingType, PropertyStatus } from "@/shared/contracts/enums";

import { useGetListings } from "../shared/listing-hooks";
import Loading from "../loading";
import { SearchFiltersContainer } from "../../components";
import { PropertyCardItem } from "@/components/core/property-card-item";

export default function RentPage() {
  const searchParams = useSearchParams();

  const location = searchParams.get("location");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const propertyType = searchParams.get("propertyType");

  const filteredPageNumber = parseInt(searchParams.get("page") || "1");
  const filteredPageSize = parseInt(searchParams.get("pageSize") || "20");

  const {
    isLoading,
    data: {
      items: listings,
      pageNumber,
      pageSize,
      totalPages,
      totalRecords,
    } = { items: [] },
  } = useGetListings({
    listingType: ListingType.Rent,
    location,
    minimumPrice: minPrice,
    maximumPrice: maxPrice,
    propertyType,
    pageNumber: filteredPageNumber,
    pageSize: filteredPageSize,
  });

  return (
    <Container>
      <div className="space-y-6 ">
        <div className="text-4xl font-bold tracking-tight text-slate-950 text-center md:text-left lg:text-left">
          Search properties for Rent
        </div>

        <SearchFiltersContainer propertyStatus={PropertyStatus.Rent} />

        {isLoading && <Loading />}

        <div className="rounded-md grid grid-cols-4 gap-6">
          {listings &&
            listings
              .slice()
              .sort(
                (
                  current: ListingSummaryResponse,
                  next: ListingSummaryResponse
                ) => (current.isFeatured && !next.isFeatured ? -1 : 0)
              )
              .map(
                ({
                  id,
                  listingType,
                  rentPricePerCalendarMonth,
                  salePrice,
                  property,
                }) => (
                  <div
                    className="col-span-4 md:col-span-2 lg:col-span-1"
                    key={id}
                  >
                    <PropertyCardItem
                      item={{
                        listing: {
                          listingId: id,
                          listingType: listingType,
                          rentPricePerCalendarMonth: rentPricePerCalendarMonth,
                          salePrice: salePrice,
                        },
                        property,
                      }}
                    />
                  </div>
                )
              )}
        </div>

        {listings && (
          <PaginationControls
            currentPage={pageNumber!}
            totalPages={totalPages!}
            pageSize={pageSize ?? filteredPageSize}
            totalCount={totalRecords!}
          />
        )}
      </div>
    </Container>
  );
}
