import { getUserInfoDB } from "../service/getuserservice.js";

export async function getUserInfo(req, res) {
  const payload = res.locals.jwtPayload;

  if (!payload)
    return res.status(400).json({ error: "Token skickades inte med!" });

  const userinfo = await getUserInfoDB(payload.id);
  res.send(userinfo);
}
