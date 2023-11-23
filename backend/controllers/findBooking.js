/**
 * Controller for handling requests to search for a booking
 * To be used by Admin or Super role only, checked in corresponding middleware
 * sends response status 404 and a message in Swedish if the booking does not exist
 * sends response status 200 and the booking information on success
 */

import { findBookingByQuery } from "../service/bookingservice.js";

export async function findBooking(req, res) {
  const { q } = req.query;

  const result = await findBookingByQuery(q);
  if (result.length == 0) {
    res.status(404).json({ error: "Bokningen hittades inte!" });
  } else {
    res.send(result);
  }
}
