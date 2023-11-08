import {
  deleteBookingGuestService,
  deleteBookingUserService,
  getSeatsForDeletionService,
} from "../service/deleteBookingService.js";
import { updateSubscribers } from "./polling.js";

export async function deleteBooking(req, res) {
  const payload = res.locals.jwtPayload;
  const { bookingnumber, guestemail } = req.body;

  if (!bookingnumber) {
    return res.status(400).json({ error: "Bokningsnummer ej angivet!" });
  }

  const [seats, screeningId] = await getSeatsForDeletionService(bookingnumber);

  if (payload) {
    const deleteRes = await deleteBookingUserService(bookingnumber, payload.id);
    if (deleteRes.affectedRows === 0) {
      return res.status(404).json({ error: "Bokningsnummret existerar inte!" });
    }
    updateSubscribers(screeningId, seats, "cancel");
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
    return res.status(200).json({ message: "Bokningen har tagits bort!" });
  }
  return res.status(400).json({ error: "Email ej angedd!" });
}
