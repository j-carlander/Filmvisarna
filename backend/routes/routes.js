import express from "express";
import { getTakenseats } from "../controllers/getTakenseats.js";
import { checkScreeningId } from "../middleware/checkScreeningId.js";
import { checkBookingDetails } from "../middleware/checkBooking.js";
import { addBooking } from "../controllers/book.js";

const router = express.Router();

router.get("/takenseats/:screeningid", checkScreeningId, getTakenseats);


router.post ("/book/:screeningid", checkScreeningId, checkBookingDetails, addBooking);
    
    export default router;