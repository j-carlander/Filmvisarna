/**
 * A middleware for checking if a jwt token is provided with a request and that if it is provided that it is valid
 * if not, aborts the request and responds with a status 401 and a message in Swedish that it is either malformed or invalid
 * if valid, saves the payload in the response.locals variable to be retrieved in next step
 */

import jwtUtil from "../utils/jwtUtil.js";

export function checkToken(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    try {
      const payload = jwtUtil.validateToken(token.replace("Bearer ", ""));

      if (payload) {
        res.locals.jwtPayload = payload;
      }
    } catch (error) {
      if (error.message === "jwt malformed")
        return res.status(401).json({ error: "Missbildad token!" });

      if (error.message === "invalid token")
        return res.status(401).json({ error: "Ogiltig token!" });

      return res.status(500).json({ error: "Internt server fel!" });
    }
  }

  next();
}
