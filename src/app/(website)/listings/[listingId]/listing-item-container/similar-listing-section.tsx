import { Container, Spinner } from "@/components/layout";
import { PropertyCardItem } from "@/components/core/property-card-item";
import { ListingSummaryResponse } from "@/shared/contracts/responses";
import { ListingType } from "@/shared/contracts/enums";

import { useGetListings } from "../../shared/listing-hooks";

export default function SimilarListingSection({
  listingType,
  location,
}: {
  listingType: ListingType;
  location: string;
}) {
  const { isLoading, data: { items: similarListings } = { items: [] } } =
    useGetListings({
      listingType,
      location,
      pageSize: 4,
    });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container>
      <div className="space-y-8">
        <h4 className="text-lg font-semibold">Similar listings</h4>

        <div className="rounded-md grid grid-cols-4 gap-6">
          {similarListings &&
            similarListings
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
      </div>
    </Container>
  );
}
