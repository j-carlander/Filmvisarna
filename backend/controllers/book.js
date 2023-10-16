import { bookingNumberService } from "../service/bookingNumberService.js";
import { bookingTickets } from "../service/bookingTicketsService.js";
import { tickettypeService } from "../service/tickettypeService.js";
import {
  bookingservice,
  getBookingsByUserId,
} from "../service/bookingservice.js";

export async function addBooking(req, res) {
  const { seats, guestEmail, guestPhone } = req.body;
  const screeningid = req.params.screeningid;
  const bookingNumber = await bookingNumberService();

  const userid = res.locals.jwtPayload ? res.locals.jwtPayload.id : null;

  const ticketType = await tickettypeService();
  const bookResult = await bookingservice(
    bookingNumber,
    screeningid,
    guestEmail,
    guestPhone,
    userid
  );
  console.log(bookResult.insertId);

  const ticketPromises = seats.map((seat) =>
    bookingTickets(
      seat.seatRow,
      seat.seatNumber,
      ticketType.find(({ id }) => id === seat.ticketType).id,
      screeningid,
      bookResult.insertId
    )
  );

  await Promise.all(ticketPromises);

  let bookingDetails = {
    seats: seats,
    bookingNumber: bookingNumber,
  };

  if (guestEmail) {
    bookingDetails = {
      ...bookingDetails,
      guestEmail: guestEmail,
      guestPhone: guestPhone,
    };
  }

  res.status(201).json(bookingDetails);
}

export async function getBookings(req, res) {
  const payload = res.locals.jwtPayload;

  if (!payload) return res.status(400).send("Token not provided!");

  const bookings = await getBookingsByUserId(payload.id);

  res.send(bookings);
}
