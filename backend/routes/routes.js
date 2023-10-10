import express from "express";
import { getTakenseats } from "../controllers/getTakenseats.js";
import { getScreeningInfo } from "../controllers/getScreeningInfo.js";
import { checkScreeningId } from "../middleware/checkScreeningId.js";

const router = express.Router();

router.get("/takenseats/:screeningid", checkScreeningId, getTakenseats);
router.get("/moviescreenings/:movieid", getScreeningInfo)
export default router;