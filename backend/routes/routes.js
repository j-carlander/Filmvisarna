import express from "express";
import { getTakenseats } from "../controllers/getTakenseats.js";
import { getScreeningInfo } from "../controllers/getScreeningInfo.js";
import { checkScreeningId } from "../middleware/checkScreeningId.js";
import { checkMovieDetails } from "../middleware/checkMovieDetails.js";
import { getMovies } from "../controllers/movieController.js";

import { checkBookingDetails } from "../middleware/checkBooking.js";
import { addBooking } from "../controllers/book.js";

import { getMovieDetailsController } from "../controllers/moviedetailsController.js";


const router = express.Router();

router.get("/takenseats/:screeningid", checkScreeningId, getTakenseats);

router.get("/moviescreenings/:movieid", getScreeningInfo)

router.get("/movies", getMovies);

router.post("/booking/:screeningid", checkScreeningId, checkBookingDetails, addBooking);


router.get(
  "/moviedetails/:movieid",
  checkMovieDetails,
  getMovieDetailsController
);

export default router;
