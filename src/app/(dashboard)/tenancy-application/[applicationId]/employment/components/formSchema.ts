import { EmploymentType } from "@/shared/contracts/enums";
import * as z from "zod";

const employmentReferenceSchema = z.object({
  fullname: z.string().min(2, {
    message: "This field is required",
  }),
  position: z.string().optional(),
  emailAddress: z
    .string()
    .min(2, {
      message: "The email address is required",
    })
    .email({ message: "The email prodived is invaid" }),
  phoneNumber: z.string().min(2, {
    message: "This field is required",
  }),
  refereeAuthority: z.literal(true, {
    errorMap: () => ({ message: "This field is required" }),
  }),
});

export const formSchema = z.object({
  employerName: z.string({ message: "This field is required" }).min(2, {}),
  employmentType: z.enum(
    [
      EmploymentType.FullTime,
      EmploymentType.PartTime,
      EmploymentType.Contract,
      EmploymentType.Temporary,
      EmploymentType.SelfEmployed,
      EmploymentType.Student,
      EmploymentType.Unemployed,
    ],
    {
      message: "This field is required",
    }
  ),
  jobTitle: z.string({ message: "This field is required" }).min(2, {}),
  employmentStartDate: z
    .date({ message: "This field is required" })
    .refine((date) => date < new Date(), {
      message: "Date cannot be in the future",
    }),
  employmentEndDate: z
    .date({ message: "This field is required" })
    .refine((date) => date < new Date(), {
      message: "Date cannot be in the future",
    })
    .optional(),
  annualIncome: z.coerce
    .number({ message: "This field is required" })
    .positive(),
  workAddress: z.object({
    streetAddress: z.string({ message: "This field is required" }).min(2, {}),
    city: z.string({ message: "This field is required" }).min(2, {}),
    postCode: z.string({ message: "This field is required" }).min(2, {}),
    country: z.string({ message: "This field is required" }).min(2, {}),
  }),
  isCurrentEmployment: z.boolean(),
  employmentReference: employmentReferenceSchema,
});
