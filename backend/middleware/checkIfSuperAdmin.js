export function checkIfSuperAdmin(req, res, next) {
    const payload = res.locals.jwtPayload;
  
    console.log(payload)
    if (!payload) {
      return res.status(400).json({ error: "Du är inte inloggad!" });
    }
  
    if (payload.role !== "super") {
      return res.status(401).json({ error: "Du har inte behörighet!" });
    }
  
    next();
  }
  