import jwtUtil from "../utils/jwtUtil.js";

export function checkToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.status(400).send("Token not provided!");

  try {
    const payload = jwtUtil.validateToken(token);

    if (payload) {
      res.locals.jwtPayload = payload;

      next();
    } else {
      res.status(401).send("Token is invalid!");
    }
  } catch (error) {
    console.log(error);
    if (error.message === "jwt malformed")
      return res.status(401).send("Malformed token!");

    if (error.message === "invalid token")
      return res.status(401).send("Invalid token!");

    res.status(500).send("Internal server error!");
  }
}
