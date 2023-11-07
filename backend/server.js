import "dotenv/config";
import router from "./routes/routes.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import serveLimit from "./rateLimiters/serveLimiter.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

import express from "express";
import { bookingConfirmationMailService } from "./service/bookingConfirmationMailService.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.send("Hello, Express!");
});

app.use("/api", router);

app.use(express.static(join(__dirname, "dist")));

app.use("*", serveLimit, (req, res) => {
  res.sendFile(join(__dirname, "/dist/index.html"));
});

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
