import { bookingNumberService } from "../service/bookingNumberService.js";
import { bookingTickets } from "../service/bookingTicketsService.js";
import { tickettypeService } from "../service/tickettypeService.js";
import {
  bookingservice,
  getBookingsByUserId,
} from "../service/bookingservice.js";
import { bookingConfirmationMailService } from "../service/bookingConfirmationMailService.js";
import { screeningsService } from "../service/screeningsService.js";
import { getMovieDetails } from "../service/moviedetailsService.js";
import { formatDateTimeSwe } from "../utils/formatDateTime.js";
import { formatSeatInfo } from "../utils/formatSeatsInfoForEmail.js";
import { calculateCost } from "../utils/calculateCost.js";
import { updateSubscribers } from "../controllers/polling.js";

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

  const screening = await screeningsService(screeningid);
  const { date, movieid } = screening[0];

  const movie = await getMovieDetails(movieid);
  const { title } = movie[0];

  let bookingDetails = {
    title,
    date: formatDateTimeSwe(date),
    seats: formatSeatInfo(seats),
    bookingNumber: bookingNumber,
    totalPrice: calculateCost(seats, ticketType),
  };

  if (guestEmail) {
    bookingDetails = {
      ...bookingDetails,
      guestEmail: guestEmail,
      guestPhone: guestPhone,
    };
  }

  const email = guestEmail ? guestEmail : res.locals.jwtPayload.email;

  await bookingConfirmationMailService(
    email,
    title,
    date,
    seats,
    bookingNumber,
    calculateCost(seats, ticketType)
  );

  res.status(201).json(bookingDetails);
  updateSubscribers(screeningid, seats);
}

export async function getBookings(req, res) {
  const payload = res.locals.jwtPayload;

  if (!payload) return res.status(400).send("Token not provided!");

  const bookings = await getBookingsByUserId(payload.id);

  for (let booking of bookings) {
    booking.date = formatDateTimeSwe(booking.date);
  }

  res.send(bookings);
}
