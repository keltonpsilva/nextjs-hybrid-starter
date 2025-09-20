import { Price } from "@/shared/contracts/types";
import formatCurrency from "@/lib/formatCurrency";

export default function PriceSection({
  rentPricePerCalendarMonth,
  salePrice,
}: {
  rentPricePerCalendarMonth: Price | undefined;
  salePrice: Price | undefined;
}) {
  const price = rentPricePerCalendarMonth ?? salePrice;

  return (
    <>
      <div className="text-2xl font-extrabold   text-indigo-500">
        {formatCurrency(price!.amount, { currency: price!.currency })}
        {rentPricePerCalendarMonth && (
          // <span className="text-lg font-normal text-gray-500 ">/month</span>
          <span className="text-lg font-normal text-gray-500 ">/month</span>

          // <div className="mt-2 text-base leading-6 text-slate-950 max-sm:mt-2">
          //   /month
          // </div>
        )}
      </div>
    </>
  );
}
