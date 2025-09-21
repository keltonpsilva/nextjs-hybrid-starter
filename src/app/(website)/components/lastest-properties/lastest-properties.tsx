"use client";

import { useGetLatestProperties } from "../../shared/hooks";

import { PropertyListing } from "@/app/(website)/components/lastest-properties/property-listing";
export default function LatestProperties() {
  const { isLoading, data: { items: listings } = { items: [] } } =
    useGetLatestProperties();

  return (
    <div className="bg-gradient-to-t from-[#F0EFFB] to-white">
      <section className="pb-10">
        <div className="max-w-[85rem] mx-auto px-4 max-sm:py-8 sm:px-6 lg:px-8">
          {/* Add the same padding to the text container as the PropertyListing */}
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="text-4xl font-bold tracking-tight leading-[56px] max-md:max-w-full">
              Based on your location
            </div>
            <div className="text-base text-gray-500 leading-6 max-md:max-w-full">
              Some of our picked properties near you location.
            </div>
          </div>

          <div className="mt-4">
            <PropertyListing properties={listings} isLoading={isLoading} />
          </div>
        </div>
      </section>
    </div>
  );
}
