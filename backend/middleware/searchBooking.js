/**
 * A middleware for checking that the booking number provided as a query with a request to get a booking, is of expected format
 * if not, aborts the request and responds with a status 400 and a message in Swedish that data was in the wrong format
 */

export function validateBookingSearch(req, res, next) {
  const { q } = req.query;

  if (!q) return res.status(400).json({ error: "Queryn q har inget värde!" });

  if (typeof q !== "string")
    return res.status(400).json({ error: "q är inte en sträng!" });

  if (!q.includes("@")) {
    if (!q || q.length != 6) {
      return res.status(400).json({ error: "Ogiltigt bokningsnummer!" });
    }

    if (!isChar(q[0]) || !isChar(q[1]) || !isChar(q[5])) {
      return res.status(400).json({ error: "Ogiltigt bokningsnummer!" });
    }

    if (isNaN(Number(q[2])) || isNaN(Number(q[3])) || isNaN(Number(q[4]))) {
      return res.status(400).json({ error: "Ogiltigt bokningsnummer!" });
    }
  }

  next();
}

function isChar(char) {
  return /[a-zA-Z]/.test(char);
}
