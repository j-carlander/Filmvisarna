import jwtUtil from "../utils/jwtUtil.js";

export function checkToken(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    try {
      const payload = jwtUtil.validateToken(token);

      if (payload) {
        req.user = payload;
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

  next();
}
