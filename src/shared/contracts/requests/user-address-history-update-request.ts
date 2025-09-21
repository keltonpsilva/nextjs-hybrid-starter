import { Address } from "../types";

export type UserAddressHistoryUpdateRequest = {
  address: Address;
  moveInDate: Date;
  moveOutDate?: Date;
};
