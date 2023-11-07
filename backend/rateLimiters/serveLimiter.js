import rateLimit from "express-rate-limit";

const serveLimit = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
});

export default serveLimit;
