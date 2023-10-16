import "dotenv/config";
import router from "./routes/routes.js";

import express from "express";
import { bookingConfirmationMailService } from "./service/bookingConfirmationMailService.js";
// test of send mail.
// TODO: Remove when testing is done!!
import { screeningsService } from "./service/screeningsService.js";
import { getMovieDetails } from "./service/moviedetailsService.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.send("Hello, Express!");
});

app.use("/api", router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

// test of send mail.
// TODO: Remove when testing is done!!
app.post("/testmail", async (req, res) => {
  const { email, screeningid, seats, bookingnumber } = req.body;

  const screening = await screeningsService(screeningid);
  const { date, movieid } = screening[0];
  console.log("screening: ", date);

  const movie = await getMovieDetails(movieid);
  const { title } = movie[0];
  console.log("movie: ", title);

  const mailSent = await bookingConfirmationMailService(
    email,
    title,
    date,
    seats,
    bookingnumber
  );

  console.log("mailSent: ", mailSent);

  res.status(200).send("Tror det gick");
});
