import * as z from "zod";

const personalReferenceSchema = z.object({
  fullName: z.string().min(2, {
    message: "This field is required",
  }),
  relationship: z.string().min(2, {
    message: "This field is required",
  }),
  relationshipYears: z.coerce
    .number({
      required_error: "This field is required",
      invalid_type_error: "Must be a valid number",
    })
    .min(0, "Relationship month must be a non-negative integer")
    .int("Must be an integer"),
  relationshipMonths: z.coerce
    .number({
      required_error: "This field is required",
      invalid_type_error: "Must be a valid number",
    })
    .min(0, "Relationship month must be a non-negative integer")
    .int("Must be an integer"),
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

const userSchema = z.object({
  firstName: z.string().min(2, {
    message: "This field is required",
  }),
  lastName: z.string().min(2, {
    message: "This field is required",
  }),
  dateOfBirth: z.date().refine((date) => date <= new Date(), {
    message: "Date of birth cannot be in the future",
  }),
  emailAddress: z
    .string()
    .min(2, {
      message: "The email address is required",
    })
    .email({ message: "The email prodived is invaid" }),
  phoneNumber: z.string().min(2, {
    message: "This field is required",
  }),
});

export const formSchema = z.object({
  user: userSchema,

  personalReference: personalReferenceSchema,
});
