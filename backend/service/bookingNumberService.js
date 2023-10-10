import { checkBookingNumberExist } from "../utils/checkBookingNumberExist";
import { generateBookingNumber } from "../utils/generateBookingNumber";

export function bookingNumberService() {
  let bookingNumber = generateBookingNumber();

  if (checkBookingNumberExist(bookingNumber))
    bookingNumber = bookingNumberService();

  return bookingNumber;
}
