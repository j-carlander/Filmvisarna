/*
These JavaScript functions modify user roles in a database. The setUserRoleToAdmin function updates the role of a user with a specified ID to "admin," while the setUserRoleToUser function sets the role to "user." Both functions use SQL UPDATE queries and the runQuery function to execute the database updates, returning the result.
*/

import { runQuery } from "../db.js";

export async function setUserRoleToAdmin(uid) {
  const sql = `
    UPDATE users
    SET role = "admin"
    WHERE id = ?
    `;
  const res = await runQuery(sql, uid);
  return res;
}

export async function setUserRoleToUser(uid) {
  const sql = `
    UPDATE users
    SET role = "user"
    WHERE id = ?
    `;
  const res = await runQuery(sql, uid);
  return res;
}
