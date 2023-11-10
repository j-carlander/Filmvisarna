import { runQuery } from "../db.js";

export async function setUserRoleToAdmin(uid) {
    const sql = `
    UPDATE users
    SET role = "admin"
    WHERE id = ?
    `
    const res = await runQuery(sql, uid)
    return res;
}

export async function setUserRoleToUser(uid) {
    const sql = `
    UPDATE users
    SET role = "user"
    WHERE id = ?
    `
    const res = await runQuery(sql, uid)
    return res;
}