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
      console.log(error);
      if (error.message === "jwt malformed")
        return res.status(401).json({ error: "Missbildad token!" });

      if (error.message === "invalid token")
        return res.status(401).json({ error: "Ogiltig token!" });

      return res.status(500).json({ error: "Internt server fel!" });
    }
  }

  next();
}
