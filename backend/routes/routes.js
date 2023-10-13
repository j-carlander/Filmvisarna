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


import { loginhandler } from "../controllers/loginUser.js";
import { registerHandler } from "../controllers/registerUser.js";
import { checkToken } from "../middleware/checkToken.js";
import { checkSeatsTaken } from "../middleware/checkTakenSeats.js";
import { getUserInfo } from "../controllers/getUser.js";


const router = express.Router();

router.get("/takenseats/:screeningid", checkScreeningId, getTakenseats);

router.get("/moviescreenings/:movieid", getScreeningInfo);

router.get("/bookinginfo", validateBookingSearch, findBooking);

router.get("/movies", checkMovieFilterQueries, getMovies);

router.get("/currentUser", checkToken, getUserInfo)

router.post(
  "/booking/:screeningid",
  checkScreeningId,
  checkSeatsTaken,
  checkBookingDetails,
  addBooking
);

router.get(
  "/moviedetails/:movieid",
  checkMovieDetails,
  getMovieDetailsController
);

router.get("/currentUser/bookings", checkToken, getBookings);

//Login route
router.post("/login", loginhandler);

//Register route
router.post("/register", registerHandler);

export default router;
