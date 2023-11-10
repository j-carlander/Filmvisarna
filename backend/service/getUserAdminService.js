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

export async function getUserWithBoth(q) {
  const query = `%${q}%`;
  const sql = `SELECT id, fname, lname, email,phone, role FROM users WHERE fname LIKE ? OR lname LIKE ? OR email LIKE ?`;
  const res = await runQuery(sql, [query, query, query]);
  return res;
}
