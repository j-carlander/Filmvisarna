import { getUserInfoDB } from "../service/getuserservice.js";

export async function getUserInfo(req, res) {
  const payload = res.locals.jwtPayload;

  if (!payload) return res.status(400).send("Token not provided!");

  const userinfo = await getUserInfoDB(payload.id);
  res.send(userinfo);
}
