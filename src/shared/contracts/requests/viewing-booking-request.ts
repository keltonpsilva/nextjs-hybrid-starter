import { BookingType } from '../enums'

export type ViewingBookingRequest = {
  listingId: string
  bookingType: BookingType
  bookingDate: Date | string
  notes: string | null
}
