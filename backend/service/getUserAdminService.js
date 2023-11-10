import { runQuery } from "../db.js";

export async function getUserWithName(fname, lname) {
    const sql = `SELECT * FROM users WHERE fname = ? and lname = ?`;
    const res = await runQuery(sql, [fname, lname]);
    return res;
}

export async function getUserWithMail(email) {
    const sql = `SELECT * FROM users WHERE email = ?`;
    const res = await runQuery(sql, email);
    return res;
}

export async function getUserWithBoth(fname, lname, email) {
    const sql = `SELECT * FROM users WHERE fname = ? and lname = ? and email = ?`;
    const res = await runQuery(sql, [fname, lname, email]);
    return res;
}