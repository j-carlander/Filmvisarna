import express from "express";
import { getTakenseats } from "../controllers/getTakenseats.js";
import { checkScreeningId } from "../middleware/checkScreeningId.js";

const router = express.Router();

router.get("/takenseats/:screeningid", checkScreeningId, getTakenseats);
export default router;
