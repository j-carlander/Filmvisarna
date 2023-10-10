import express from "express";
import { getTakenseats } from "../controllers/getTakenseats.js";
import { checkScreeningId } from "../middleware/checkScreeningId.js";
import { checkMovieDetails } from "../middleware/checkMovieDetails.js";
import { getMovies } from "../controllers/movieController.js";
import { getMovieDetailsController } from "../controllers/moviedetailsController.js";

const router = express.Router();

router.get("/takenseats/:screeningid", checkScreeningId, getTakenseats);

router.get("/movies", getMovies);

router.get(
  "/moviedetails/:movieid",
  checkMovieDetails,
  getMovieDetailsController
);

export default router;
