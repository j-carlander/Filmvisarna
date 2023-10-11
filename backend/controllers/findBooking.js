import { findBookingByBookingNumber } from "../service/bookingservice.js";

export async function findBooking(req, res) {
  const { bookingNumber } = req.query;

  const result = await findBookingByBookingNumber(bookingNumber);
  if (result.length == 0) {
    res.status(404).send("booking not found");
  } else {
    res.send(result);
  }
}
