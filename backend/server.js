import "dotenv/config";
import router from "./routes/routes.js";

import express from "express";
import { bookingConfirmationMailService } from "./service/bookingConfirmationMailService.js";

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

// test route för mail
app.post("/testmail", async (req, res) => {
  const { email, title, screeningDate, seats, bookingNumber, cost } = req.body;
  const result = await bookingConfirmationMailService(
    email,
    title,
    screeningDate,
    seats,
    bookingNumber,
    cost
  );
  res.send(result);
});
