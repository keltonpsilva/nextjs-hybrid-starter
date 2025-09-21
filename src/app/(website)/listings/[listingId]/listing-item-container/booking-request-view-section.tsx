import { useState } from "react";
import { FileText } from "lucide-react";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ListingType } from "@/shared/contracts/enums";
import { Price } from "@/shared/contracts/types";
import formatCurrency from "@/lib/formatCurrency";
import environment from "@/lib/environment";

import BookingRequestViewFormContainer from "./booking-request-view-form-container/booking-request-view-form-container";
import { useCreateTenancyApplication } from "../hooks";

export default function BookingRequestViewSection({
  listingId,
  listingType,
  propertyId,
  rentPricePerCalendarMonth,
  salePrice,
}: {
  listingId: string;
  listingType: ListingType;
  propertyId: string;
  rentPricePerCalendarMonth?: Price;
  salePrice?: Price;
}) {
  const { data: session } = useSession();
  const user = session?.user;

  const { mutateAsync } = useCreateTenancyApplication(propertyId);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    FeatureFlags: { TenancyApplicationEnabled },
  } = environment;

  const price = rentPricePerCalendarMonth ?? salePrice;

  const handleApplication = async () => {
    try {
      setIsSubmitting(true);
      await mutateAsync();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Booking Request */}
      <div className="flex flex-col p-4 w-full bg-white rounded-lg border-2 border-violet-200 border-solid">
        <div className="text-sm leading-5 text-slate-950">
          {listingType === ListingType.Rent ? "Rent price" : "Sale price"}
        </div>
        <div className="flex  items-end">
          <div className="text-2xl font-extrabold leading-9 text-indigo-500">
            {formatCurrency(price!.amount, { currency: price!.currency })}
          </div>
          {listingType === ListingType.Rent && (
            <div className=" text-slate-950 transform -translate-y-1">
              /month
            </div>
          )}
        </div>

        {user &&
          TenancyApplicationEnabled &&
          listingType === ListingType.Rent && (
            <Button
              className="gap-2 mt-6 w-full text-base"
              onClick={handleApplication}
              isLoading={isSubmitting}
            >
              {!isSubmitting && <FileText />}
              Apply now
            </Button>
          )}

        {user && (
          <>
            <Separator className="shrink-0 mt-6 h-px bg-indigo-50 border-2 border-indigo-50 border-solid" />
            <div className="mt-6 text-lg font-bold tracking-normal leading-7 text-slate-950">
              Request a home tour
            </div>
            <BookingRequestViewFormContainer listingId={listingId!} />
          </>
        )}
      </div>
    </div>
  );
}
