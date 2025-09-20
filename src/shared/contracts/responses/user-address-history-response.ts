import { Address } from "../types";

export type UserAddressHistoryResponse = {
  id: string;
  address: Address;
  moveInDate: Date;
  moveOutDate?: Date;
};
