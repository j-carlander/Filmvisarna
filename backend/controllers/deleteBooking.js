import {
  deleteBookingGuestService,
  deleteBookingUserService,
} from "../service/deleteBookingService.js";

export async function deleteBooking(req, res) {
  const payload = res.locals.jwtPayload;
  const { bookingnumber, guestemail } = req.body;

  if (!bookingnumber) {
    return res.status(400).json({ err: "Bookingnumber not provided" });
  }
  if (payload) {
    const deleteRes = await deleteBookingUserService(bookingnumber, payload.id);
    if (deleteRes.affectedRows === 0) {
      return res.status(404).json({ err: "Bookingnumber does not exist" });
    }
    return res.status(200).json({ message: "Booking has been removed" });
  }

  if (guestemail) {
    const deleteRes = await deleteBookingGuestService(
      bookingnumber,
      guestemail
    );
    if (deleteRes.affectedRows === 0) {
      return res
        .status(404)
        .json({ err: "Bookingnumber or email is not valid" });
    }
    return res.status(200).json({ message: "Booking has been removed" });
  }
  return res.status(400).json({ err: "Email not provided" });
}
