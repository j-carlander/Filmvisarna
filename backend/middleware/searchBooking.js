export function validateBookingSearch(req, res, next) {
  const { q } = req.query;

  if (!q) return res.status(400).json({ error: "Queryn q har inget värde!" });

  if (!q.includes("@")) {
    if (!q || q.length != 6) {
      return res.status(400).json({ error: "Ogiltigt bokningsnummer!" });
    }

    if (!isCharCapital(q[0]) || !isCharCapital(q[1]) || !isCharCapital(q[5])) {
      return res.status(400).json({ error: "Ogiltigt bokningsnummer!" });
    }

    if (isNaN(Number(q[2])) || isNaN(Number(q[3])) || isNaN(Number(q[4]))) {
      return res.status(400).json({ error: "Ogiltigt bokningsnummer!" });
    }
  }

  next();
}

function isCharCapital(char) {
  const charCode = char.charCodeAt(0);
  if (charCode < 65 || charCode > 90) {
    return false;
  }
  return true;
}
