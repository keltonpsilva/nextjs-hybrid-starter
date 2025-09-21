import { EmploymentType } from "../enums";
import { Address } from "../types";

export type UserEmploymentHistoryUpdateRequest = {
  employerName: string;
  employmentType: EmploymentType;
  jobTitle: string;
  employmentStartDate: Date;
  employmentEndDate?: Date;
  annualIncome: number;
  hrContactName: string;
  hrContactEmail: string;
  hrContactPhone?: string;
  workAddress: Address;
};
