import { runQuery } from "../db.js";

export async function screeninginfoService(movieid) {
    const sql = "SELECT * FROM screenings WHERE movieid = ?";
    const res = await runQuery(sql, [movieid]);
    return res;
}