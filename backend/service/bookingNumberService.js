/**
 * Service recursion function for generating booking number
 * If booking number already exists calls itself repeatedly until unique number
 */

import { checkBookingNumberExist } from "../utils/checkBookingNumberExist.js";
import { generateBookingNumber } from "../utils/generateBookingNumber.js";

export async function bookingNumberService() {
  let bookingNumber = generateBookingNumber();

  if (await checkBookingNumberExist(bookingNumber))
    bookingNumber = bookingNumberService();
  return bookingNumber;
}
