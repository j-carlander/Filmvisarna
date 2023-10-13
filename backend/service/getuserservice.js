import { runQuery } from "../db.js"

export async function getUserInfoDB(uid) {
    const sql = `SELECT fname, lname, email, phone
    FROM users
    WHERE id = ?;`
    const res = await runQuery(sql, [uid])
    return res;
}