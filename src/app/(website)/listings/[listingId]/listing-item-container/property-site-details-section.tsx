import { BedSingle, Bath, Frame, CircleCheck } from "lucide-react";

import { AvailabilityStatus } from "@/shared/contracts/enums";
import { Area } from "@/shared/contracts/types";
import { camelCaseToSeparated } from "@/lib/utils";

export default function PropertySiteDetailsSection({
  numberOfBathRooms,
  numberOfBedRooms,
  area,
  availabilityStatus,
}: {
  numberOfBathRooms?: number;
  numberOfBedRooms?: number;
  area: Area;
  availabilityStatus: AvailabilityStatus;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-lg border-2 border-violet-200 border-solid">
      <div className="space-y-2">
        <div className="text-gray-500">Bedrooms</div>
        <div className="flex space-x-2">
          <BedSingle className="text-gray-500" />
          <div className="font-bold">{numberOfBedRooms ?? "N/A"}</div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-gray-500">Bathrooms</div>
        <div className="flex space-x-2">
          <Bath className="text-gray-500" />
          <div className="font-bold">{numberOfBathRooms ?? "N/A"}</div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-gray-500">Square Area</div>
        <div className="flex space-x-2">
          <Frame className="text-gray-500" />
          <div className="font-bold">
            {area.value ? `${area.value} m²` : "N/A"}
          </div>
        </div>
      </div>
      {/* <div>
        <div className="text-gray-500">Repair Quality</div>
        <div className="flex space-x-2  bg-violet-300">
          <Paintbrush className="text-gray-500" />
          <div className="font-bold">New House</div>
        </div>
      </div> */}
      <div className="space-y-2">
        <div className="text-gray-500">Status</div>
        <div className="flex space-x-2 ">
          <CircleCheck className="text-gray-500" />
          <div className="font-bold">
            {camelCaseToSeparated(availabilityStatus)}
          </div>
        </div>
      </div>
    </div>
  );
}
