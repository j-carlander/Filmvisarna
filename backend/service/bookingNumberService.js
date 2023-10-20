import { checkBookingNumberExist } from "../utils/checkBookingNumberExist.js";
import { generateBookingNumber } from "../utils/generateBookingNumber.js";

export async function bookingNumberService() {
  let bookingNumber = generateBookingNumber();

  if (await checkBookingNumberExist(bookingNumber))
    bookingNumber = bookingNumberService();
  return bookingNumber;
}
