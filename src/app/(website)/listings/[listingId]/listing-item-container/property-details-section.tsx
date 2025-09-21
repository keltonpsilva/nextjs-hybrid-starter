import { ListingResponse } from "@/shared/contracts/responses/listing-response";
import { Separator } from "@/components/ui/separator";

import PropertyFeaturesSection from "./property-features-section";
import PropertySiteDetailsSection from "./property-site-details-section";
import PropertyAgencyDetailsSection from "./property-agency-details-section";

export default function PropertyDetailsSection({
  listing: { property, agent, startDateUtc },
}: {
  listing: ListingResponse;
}) {
  const {
    agency,
    availabilityStatus,
    area,
    description,
    numberOfBathRooms,
    numberOfBedRooms,
  } = property;

  return (
    <div className="col-span-1 md:col-span-3">
      <div className="flex flex-col">
        {/* Property Site Details */}
        <PropertySiteDetailsSection
          numberOfBathRooms={numberOfBathRooms}
          numberOfBedRooms={numberOfBedRooms}
          area={area}
          availabilityStatus={availabilityStatus}
        />

        {/* About the Property */}
        <div className="mt-8 text-2xl font-bold tracking-tight leading-9 text-slate-950 max-md:mt-10 max-md:max-w-full">
          About this home
        </div>

        <div
          className="mt-8 text-base leading-7 text-slate-950 max-md:max-w-full"
          style={{ whiteSpace: "pre-line" }}
        >
          {description}
        </div>

        {/* Agency Details */}
        <PropertyAgencyDetailsSection agency={agency} agent={agent} />

        <Separator className="my-10" />

        {/* Rental Feature */}
        <PropertyFeaturesSection
          listingDate={startDateUtc}
          property={property}
        />

        <Separator className="my-10" />
      </div>
    </div>
  );
}
