export function removeScreeningCheck(req, res, next) {
    const { screeningId } = req.params;
  
    if (!screeningId || isNaN(Number(screeningId))) {
      return res.status(400).json({ error: "Ogiltigt visnings ID!" });
    }
  
    next();
  }