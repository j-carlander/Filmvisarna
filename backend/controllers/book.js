/**
 * Controller for handling requests to book seats on a screening of a movie
 * sends response status 400 and a message in Swedish if the screening date is older than today
 * sends response status 201 and the booking information on success
 * 
 * Controller for handling requests to get all bookings for a signed in user
 * sends response status 400 and a message in Swedish if no jwt token is sent with the request
 * sends response status 200 and all bookings for that user on success
 */

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
  const { seats, guestEmail } = req.body;
  const screeningid = req.params.screeningid;
  const bookingNumber = await bookingNumberService();

  const userid = res.locals.jwtPayload ? res.locals.jwtPayload.id : null;

  const screening = await screeningsService(screeningid);
  const { date, movieid } = screening[0];

  const screeningTime = new Date(date);
  const currentTime = new Date();

  if (screeningTime < currentTime) {
    return res.status(400).json({ error: "Visningen är utdaterad!" });
  }

  const ticketType = await tickettypeService();
  const bookResult = await bookingservice(
    bookingNumber,
    screeningid,
    guestEmail,
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
  updateSubscribers(screeningid, seats, "book");
}

export async function getBookings(req, res) {
  const payload = res.locals.jwtPayload;

  if (!payload)
    return res.status(400).json({ error: "Token skickades inte med!" });

  const bookings = await getBookingsByUserId(payload.id);

  const today = new Date();
  today.setTime(today.getTime() - 15 * 60 * 1000);

  const oldBookings = bookings.filter((booking) => booking.date <= today);
  const currentBookings = bookings.filter((booking) => booking.date > today);

  for (let booking of bookings) {
    booking.date = formatDateTimeSwe(booking.date);
  }

  const result = {
    oldBookings,
    currentBookings,
  };

  res.send(result);
}
