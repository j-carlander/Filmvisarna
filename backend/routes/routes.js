import express from "express";
import { getTakenseats } from "../controllers/getTakenseats.js";
import { getScreeningInfo } from "../controllers/getScreeningInfo.js";
import { checkScreeningId } from "../middleware/checkScreeningId.js";
import { checkMovieDetails } from "../middleware/checkMovieDetails.js";
import { getMovies } from "../controllers/movieController.js";
import { checkBookingDetails } from "../middleware/checkBooking.js";
import { addBooking, getBookings } from "../controllers/book.js";
import { getMovieDetailsController } from "../controllers/moviedetailsController.js";
import { validateBookingSearch } from "../middleware/searchbooking.js";
import { findBooking } from "../controllers/findBooking.js";
import { checkMovieFilterQueries } from "../middleware/checkMoviesFilter.js";
import { checkToken } from "../middleware/checkToken.js";
import { deleteBooking } from "../controllers/deleteBooking.js";

import { loginhandler } from "../controllers/loginUser.js";
import { registerHandler } from "../controllers/registerUser.js";
import { checkSeatsTaken } from "../middleware/checkTakenSeats.js";
import { getUserInfo } from "../controllers/getUser.js";
import { checkSeatExists } from "../middleware/checkSeatExists.js";

const router = express.Router();

// Route to check which seats are taken on a specific screening
router.get("/takenseats/:screeningid", checkScreeningId, getTakenseats);

// Route to get all screening for a specific movie
router.get("/moviescreenings/:movieid", getScreeningInfo);

// Route to search for a booking by query
router.get("/bookinginfo", validateBookingSearch, findBooking);

// Route to get a list of all movies
router.get("/movies", checkMovieFilterQueries, getMovies);

// Route to get the details about a movie
router.get(
  "/moviedetails/:movieid",
  checkMovieDetails,
  getMovieDetailsController
);

//Login route
router.post("/login", loginhandler);

//Register route
router.post("/register", registerHandler);

// All routes below uses the middleware checkToken
router.use(checkToken);

// Route to get info about current user
router.get("/currentUser", getUserInfo);

// Route to post a booking
router.post(
  "/booking/:screeningid",
  checkScreeningId,
  checkSeatsTaken,
  checkSeatExists,
  checkBookingDetails,
  addBooking
);

// Route to delete a booking
router.delete("/booking", deleteBooking);

// Route to get current logged in users bookings
router.get("/currentUser/bookings", getBookings);

export default router;
