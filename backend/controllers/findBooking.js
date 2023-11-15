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
