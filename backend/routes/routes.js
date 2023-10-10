import express from "express";
import { getTakenseats } from "../controllers/getTakenseats.js";
import { getScreeningInfo } from "../controllers/getScreeningInfo.js";
import { checkScreeningId } from "../middleware/checkScreeningId.js";
import { getMovies } from "../controllers/movieController.js";

const router = express.Router();

router.get("/takenseats/:screeningid", checkScreeningId, getTakenseats);
export default router;

router.get("/moviescreenings/:movieid", getScreeningInfo)
export default router;

router.get("/movies", getMovies);
export default router;
