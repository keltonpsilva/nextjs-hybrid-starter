import { BookingType } from "@/shared/contracts/enums";
import * as z from "zod";

const FormSchema = z.object({
  bookingType: z.enum([BookingType.InPerson, BookingType.Virtual], {
    message: "This field is required",
  }),
  bookingDate: z
    .date({ message: "This field is required" })
    .refine((date) => date >= new Date(), {
      message: "Booking date cannot be in the past",
    }),
});

export default FormSchema;
