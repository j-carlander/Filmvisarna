/**
 * Controller for handling requests to delete a booking by bookingnumber and guestmail or jwt
 * sends response status 400 and a message in Swedish if no bookingnumber was provided with the request or no email in the case of guestmail
 * sends response status 404 and a message in Swedish if the booking does not exist
 * sends response status 200 and the booking information on success
 */

import {
  deleteBookingGuestService,
  deleteBookingUserService,
} from "../service/deleteBookingService.js";
import { updateSubscribers } from "./polling.js";

import { unBookMailService } from "../service/unBookMailService.js";

export async function deleteBooking(req, res) {
  const payload = res.locals.jwtPayload;
  const { bookingnumber, guestemail } = req.body;
  const { screeningId, seats } = res.locals;
  if (!bookingnumber) {
    return res.status(400).json({ error: "Bokningsnummer ej angivet!" });
  }

  if (payload) {
    const deleteRes = await deleteBookingUserService(bookingnumber, payload.id);
    if (deleteRes.affectedRows === 0) {
      return res.status(404).json({ error: "Bokningsnummret existerar inte!" });
    }
    updateSubscribers(screeningId, seats, "cancel");
    unBookMailService(payload.email);
    return res.status(200).json({ message: "Bokningen har tagits bort!" });
  }

  if (guestemail) {
    const deleteRes = await deleteBookingGuestService(
      bookingnumber,
      guestemail
    );
    if (deleteRes.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Ogiltigt bokningsnummer eller ogiltig email!" });
    }
    updateSubscribers(screeningId, seats, "cancel");
    unBookMailService(guestemail);
    return res.status(200).json({ message: "Bokningen har tagits bort!" });
  }
  return res.status(400).json({ error: "Email ej angedd!" });
}
