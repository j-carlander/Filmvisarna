import { getUserInfoDB } from "../service/getuserservice.js";

export async function getUserInfo(req, res) {
    const payload = res.locals.jwtPayload;
    const userinfo = await getUserInfoDB(payload.id)
    res.send(userinfo)
}