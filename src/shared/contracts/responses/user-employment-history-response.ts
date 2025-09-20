import { EmploymentType } from "../enums";
import { Address } from "../types";

export type UserEmploymentHistoryResponse = {
  id: string;
  employerName: string;
  jobTitle: string;
  employmentType: EmploymentType;
  employmentStartDate: Date;
  employmentEndDate?: Date;
  annualIncome: number;
  hrContactName: string;
  hrContactEmail: string;
  hrContactPhone?: string;
  workAddress: Address;
};
