import { format, formatDistance } from "date-fns";
import { enGB } from "date-fns/locale";

import formatCurrency from "@/lib/formatCurrency";
import { ListingPropertyResponse } from "@/shared/contracts/responses/listing-response";

export default function PropertyFeaturesSection({
  listingDate,
  property,
}: {
  listingDate: Date;
  property: ListingPropertyResponse;
}) {
  const {
    address,
    area,
    adminFee,
    dateAvailable,
    deposit,
    furnitureType,
    propertyType,
  } = property;

  return (
    <div className="space-y-4">
      <div className="font-bold text-2xl">Rental features</div>
      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-12">
        <div>
          <table className="table-auto w-full">
            <tbody className="text-base">
              <tr>
                <td className="text-gray-500 py-2 flex gap-2">
                  Listed on
                  <div className="flex gap-1 font-bold whitespace-nowrap text-indigo-950">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <g clipPath="url(#clip0_358_11109)">
                        <path
                          d="M12.6665 5.80684L9.11119 3.0415C8.79918 2.79878 8.41516 2.66699 8.01986 2.66699C7.62455 2.66699 7.24053 2.79878 6.92852 3.0415L3.37252 5.80684C3.15882 5.97303 2.98592 6.18586 2.86703 6.42907C2.74814 6.67229 2.6864 6.93945 2.68652 7.21017V12.0102C2.68652 12.3638 2.827 12.7029 3.07705 12.953C3.3271 13.203 3.66624 13.3435 4.01986 13.3435H12.0199C12.3735 13.3435 12.7126 13.203 12.9627 12.953C13.2127 12.7029 13.3532 12.3638 13.3532 12.0102V7.21017C13.3532 6.6615 13.0999 6.1435 12.6665 5.80684Z"
                          fill="#7065F0"
                          stroke="#7065F0"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.6668 10C9.1935 10.8887 6.8055 10.8887 5.3335 10"
                          stroke="#F7F7FD"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <g clipPath="url(#clip0_358_11109)">
                            <path
                              d="M12.6665 5.80684L9.11119 3.0415C8.79918 2.79878 8.41516 2.66699 8.01986 2.66699C7.62455 2.66699 7.24053 2.79878 6.92852 3.0415L3.37252 5.80684C3.15882 5.97303 2.98592 6.18586 2.86703 6.42907C2.74814 6.67229 2.6864 6.93945 2.68652 7.21017V12.0102C2.68652 12.3638 2.827 12.7029 3.07705 12.953C3.3271 13.203 3.66624 13.3435 4.01986 13.3435H12.0199C12.3735 13.3435 12.7126 13.203 12.9627 12.953C13.2127 12.7029 13.3532 12.3638 13.3532 12.0102V7.21017C13.3532 6.6615 13.0999 6.1435 12.6665 5.80684Z"
                              fill="#7065F0"
                              stroke="#7065F0"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M10.6668 10C9.1935 10.8887 6.8055 10.8887 5.3335 10"
                              stroke="#F7F7FD"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_358_11109">
                              <rect width="16" height="16" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </defs>
                    </svg> */}
                    <picture>
                      <img
                        className="h-5 w-auto "
                        src="/assets/house-motto-logo.svg"
                        alt="housemotto-logo"
                      />
                    </picture>
                    <div>HouseMotto</div>
                  </div>
                </td>
                <td className="text-end font-semibold">
                  {formatDistance(listingDate, new Date(), { addSuffix: true })}
                </td>
              </tr>
              <tr>
                <td className="text-gray-500 py-4">Property Reference</td>
                <td className="text-end font-semibold">
                  REF-{property.reference}
                </td>
              </tr>
              <tr>
                <td className="text-gray-500 py-4">Date available</td>
                <td className="text-end font-semibold">
                  {dateAvailable
                    ? format(dateAvailable, "PPP", { locale: enGB })
                    : "Available now"}
                </td>
              </tr>
              <tr>
                <td className="text-gray-500 py-4">Type</td>
                <td className="text-end font-semibold">{propertyType}</td>
              </tr>
              <tr>
                <td className="text-gray-500 py-4">Furniture Type</td>
                <td className="text-end font-semibold ">{furnitureType}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <table className="table-auto w-full">
            <tbody className="text-base">
              <tr>
                <td className="text-gray-500 py-2 flex gap-2">City</td>
                <td className="text-end font-semibold">{address.city}</td>
              </tr>
              {/* <tr>
                <td className="text-gray-500 py-4">Year Built</td>
                <td className="text-end font-semibold bg-violet-300">2018</td>
              </tr> */}
              <tr>
                <td className="text-gray-500 py-4">Size</td>
                <td className="text-end font-semibold">
                  {area.value ? `${area.value} sqft` : "Ask agent"}
                </td>
              </tr>
              <tr>
                <td className="text-gray-500 py-4">Parking Area</td>
                <td className="text-end font-semibold ">{`Ask agent`}</td>
              </tr>
              <tr>
                <td className="text-gray-500 py-4">Deposit</td>
                <td className="text-end font-semibold ">
                  {deposit?.amount
                    ? formatCurrency(deposit.amount)
                    : `Ask agent`}
                </td>
              </tr>
              <tr>
                <td className="text-gray-500 py-4">Admin Fees</td>
                <td className="text-end font-semibold">
                  {adminFee?.amount
                    ? formatCurrency(adminFee.amount)
                    : ` Ask agent`}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
