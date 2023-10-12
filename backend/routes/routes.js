import express from "express";
import { getTakenseats } from "../controllers/getTakenseats.js";
import { getScreeningInfo } from "../controllers/getScreeningInfo.js";
import { checkScreeningId } from "../middleware/checkScreeningId.js";
import { checkMovieDetails } from "../middleware/checkMovieDetails.js";
import { getMovies } from "../controllers/movieController.js";
import { checkBookingDetails } from "../middleware/checkBooking.js";
import { addBooking } from "../controllers/book.js";
import { getMovieDetailsController } from "../controllers/moviedetailsController.js";
import { checkMovieFilterQueries } from "../middleware/checkMoviesFilter.js";
// import { runQuery } from "../db.js";
import { loginhandler } from "../controllers/loginUser.js";
import { registerHandler } from "../controllers/registerUser.js";

const router = express.Router();

router.get("/takenseats/:screeningid", checkScreeningId, getTakenseats);

router.get("/moviescreenings/:movieid", getScreeningInfo);

router.get("/movies", checkMovieFilterQueries, getMovies);

router.post(
  "/booking/:screeningid",
  checkScreeningId,
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
