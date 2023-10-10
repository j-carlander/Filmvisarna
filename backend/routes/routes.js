import express from "express";
import { getTakenseats } from "../controllers/getTakenseats.js";
import { checkScreeningId } from "../middleware/checkScreeningId.js";
import { getMovies } from "../controllers/movieController.js";

const router = express.Router();

router.get("/takenseats/:screeningid", checkScreeningId, getTakenseats);

router.get("/movies", getMovies);
export default router;
