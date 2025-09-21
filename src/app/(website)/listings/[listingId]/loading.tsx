import { Container } from "@/components/layout";

import { Skeleton } from "@/components/ui/skeleton";

import { ChevronLeftIcon } from "lucide-react";
import { BedSingle, Bath, Frame, CircleCheck } from "lucide-react";

import Link from "next/link";

export default function Loading() {
  return (
    <>
      <Container>
        <div className="flex gap-1 justify-start text-lg font-bold">
          <ChevronLeftIcon className="shrink-0 my-auto w-5 aspect-square" />
          {/* <Link href=".." relative="path" className="text-indigo-500"> */}
          <Link href=".." className="text-indigo-500">
            Back to map
          </Link>
        </div>
        <div className="flex justify-between mt-4 w-full max-md:flex-wrap max-md:max-w-full">
          <div className="flex flex-col text-slate-950">
            <h1 className="mt-4 w-full text-4xl font-bold tracking-tight">
              <Skeleton className="w-64 h-10" />
            </h1>
          </div>
          <div className="flex gap-4 self-end text-base text-center max-md:flex-wrap max-md:mt-10">
            <div className="flex flex-auto gap-4 whitespace-nowrap ">
              <Skeleton className="w-32 h-10 flex" />
              <Skeleton className="w-32 h-10 flex" />
            </div>
          </div>
        </div>

        {/* Pictures */}
        <div className="mt-4">
          <Skeleton className="w-full h-[500px] " />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5 ">
          <div className="col-span-1 md:col-span-3">
            <div className="flex flex-col">
              {/* Property Site Details */}

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-lg border-2 border-violet-200 border-solid">
                <div className="space-y-2">
                  <div className="text-gray-500">Bedrooms</div>
                  <div className="flex space-x-2">
                    <BedSingle className="text-gray-500" />
                    <Skeleton className="w-32 h-7 flex" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-gray-500">Bathrooms</div>
                  <div className="flex space-x-2">
                    <Bath className="text-gray-500" />
                    <Skeleton className="w-32 h-7 flex" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-gray-500">Square Area</div>
                  <div className="flex space-x-2">
                    <Frame className="text-gray-500" />
                    <Skeleton className="w-32 h-7 flex" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-gray-500">Status</div>
                  <div className="flex space-x-2 ">
                    <CircleCheck className="text-gray-500" />
                    <div className="font-bold">
                      <Skeleton className="w-32 h-7 flex" />
                    </div>
                  </div>
                </div>
              </div>

              {/* About the Property */}
              <div className="mt-8 text-2xl font-bold tracking-tight leading-9 text-slate-950 max-md:mt-10 max-md:max-w-full">
                About this home
              </div>

              <div
                className="mt-8 text-base leading-7 text-slate-950 max-md:max-w-full"
                style={{ whiteSpace: "pre-line" }}
              >
                <Skeleton className="w-full h-[200px] flex" />
              </div>

              {/* Agency Details */}
              {/* <PropertyAgencyDetailsSection agency={agency} agent={agent} /> */}

              {/* <Separator className="my-10" /> */}

              {/* Rental Feature */}
              {/* <PropertyFeaturesSection
                listingDate={listingDate}
                property={property}
              /> */}

              {/* <Separator className="my-10" /> */}
            </div>
          </div>
          {/* <BookingRequestViewSection
            listingId={listing.id}
            property={property}
          /> */}
        </div>
      </Container>

      {/* <div className="bg-[#f7f7fe]">
    <SimilarListingSections
      propertyStatus={property.propertyStatus}
      location={address.city}
    />

  </div> */}
    </>
  );
}
