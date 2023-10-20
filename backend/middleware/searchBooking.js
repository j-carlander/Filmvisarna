export function validateBookingSearch(req, res, next) {
    const { bookingNumber } = req.query;
  
    if (!bookingNumber || bookingNumber.length != 6) {
      return res.status(400).json({ error: 'Invalid booking number' });
    }

    if (!isCharCapital(bookingNumber[0]) || !isCharCapital(bookingNumber[1]) || !isCharCapital(bookingNumber[5])) {
        return res.status(400).json({ error: 'Invalid booking number' });
    }
  
    if (isNaN(Number(bookingNumber[2])) || isNaN(Number(bookingNumber[3])) || isNaN(Number(bookingNumber[4]))) {
        return res.status(400).json({ error: 'Invalid booking number' });
    }
    next();
  }
  
  function isCharCapital (char) {
    const charCode = char.charCodeAt(0);
    if (charCode < 65 || charCode > 90) {
        return false;
    }
    return true;
  }