import { Address } from "../types";

export type UserAddressHistoryCreateRequest = {
  address: Address;
  moveInDate: Date;
  moveOutDate?: Date;
};
