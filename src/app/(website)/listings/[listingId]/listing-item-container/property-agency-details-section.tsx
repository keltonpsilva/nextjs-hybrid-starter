import { PhoneCall } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  ListingAgencyResponse,
  ListingAgentResponse,
} from "@/shared/contracts/responses/listing-response";

export default function PropertyAgencyDetailsSection({
  agency,
  agent,
}: {
  agency: ListingAgencyResponse;
  agent: ListingAgentResponse;
}) {
  return (
    <div className="p-4 mt-5 rounded-lg border-2 border-violet-200 border-solid bg-slate-50">
      <div className="text-gray-500">Listed by property owner</div>
      <div className=" grid grid-cols-2">
        <div id="owner-details" className="flex gap-4">
          <div className="flex items-center mt-3">
            <picture>
              <img
                src="https://cdn-icons-png.freepik.com/512/5973/5973800.png"
                alt="agency logo"
                className="w-12 h-12 rounded-full object-cover"
              />
            </picture>
            <div id="agency-details" className="flex flex-col ml-4">
              <div className=" text-base font-bold text-slate-950">
                {agent
                  ? `${agent.firstName} ${agent.lastName}`
                  : agency.businessName}
              </div>
              <div className="text-sm text-gray-500">{agency.businessName}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0 sm:justify-end">
          {/* <Button variant="light" className="flex gap-1 justify-center">
            <Phone className="shrink-0 my-auto w-4 aspect-square " />
            Ask a question
          </Button> */}
          <Button>
            <PhoneCall className="shrink-0 my-auto w-4 aspect-square " />
            <a href={`tel:${agency.phoneNumber}`}>{agency.phoneNumber}</a>
          </Button>
          {/* <Button className="max-w-[180px]">Ask a question</Button> */}
        </div>
      </div>
    </div>
  );
}
