/**
 * A middleware for checking that the token provided with the request is from
 * a user with a role of "super" for super admin or "admin"
 * if not provided, aborts the request and responds with a status 400 and a message in Swedish that
 * you are not logged in
 * if provided but the user is not "super" or "admin", aborts the request and responds with a status 401 and a message in Swedish that
 * you are not authorized
 */

export function isAdmin(req, res, next) {
  const payload = res.locals.jwtPayload;

  if (!payload) return res.status(400).json({ error: "Du är inte inloggad!" });

  if (payload.role !== "admin" && payload.role !== "super")
    return res.status(401).json({ error: "Du har inte behörighet!" });

  next();
}
