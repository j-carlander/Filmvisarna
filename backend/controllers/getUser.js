/**
 * Controller for handling requests to get information about a user
 * sends response status 400 and a message in Swedish if no token was sent
 * sends response status 200 and the user information on success
 */

import { getUserInfoDB } from "../service/getuserservice.js";

export async function getUserInfo(req, res) {
  const payload = res.locals.jwtPayload;

  if (!payload)
    return res.status(400).json({ error: "Token skickades inte med!" });

  const userinfo = await getUserInfoDB(payload.id);
  res.send(userinfo);
}
