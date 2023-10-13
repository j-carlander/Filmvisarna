import express from "express";
import { getTakenseats } from "../controllers/getTakenseats.js";
import { getScreeningInfo } from "../controllers/getScreeningInfo.js";
import { checkScreeningId } from "../middleware/checkScreeningId.js";
import { checkMovieDetails } from "../middleware/checkMovieDetails.js";
import { getMovies } from "../controllers/movieController.js";
import { checkBookingDetails } from "../middleware/checkBooking.js";
import { addBooking } from "../controllers/book.js";
import { getMovieDetailsController } from "../controllers/moviedetailsController.js";
import { validateBookingSearch } from "../middleware/searchbooking.js";
import { findBooking } from "../controllers/findBooking.js";
import { checkMovieFilterQueries } from "../middleware/checkMoviesFilter.js";
import { checkToken } from "../middleware/checkToken.js";


import { loginhandler } from "../controllers/loginUser.js";
import { registerHandler } from "../controllers/registerUser.js";

import { checkSeatsTaken } from "../middleware/checkTakenSeats.js";


const router = express.Router();

router.get("/takenseats/:screeningid", checkScreeningId, getTakenseats);

router.get("/moviescreenings/:movieid", getScreeningInfo);

router.get("/bookinginfo", validateBookingSearch, findBooking);

router.get("/movies", checkMovieFilterQueries, getMovies);

router.get("/currentUser", checkToken, (req, res) => {
  const currentUserInfo = res.locals.jwtPayLoad;
  res.status(200).json(currentUserInfo)
})

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

//Login route
router.post("/login", loginhandler);

//Register route
router.post("/regiser", registerHandler);

export default router;
