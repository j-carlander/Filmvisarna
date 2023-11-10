export function isAdmin(req, res, next) {
  const payload = res.locals.jwtPayload;

  if (!payload) return res.status(400).json({ error: "Du är inte inloggad!" });

  if (payload.role !== "admin" && payload.role !== "super")
    return res.status(401).json({ error: "Du har inte behörighet!" });

  next();
}
