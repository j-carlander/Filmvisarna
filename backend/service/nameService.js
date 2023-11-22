/*
  This JavaScript file contains a function called addNameService that adds a new name to a database. When you provide a name as input, the function uses a SQL query to insert that name into the "names" table in the database. After the operation is completed, the result is returned.
*/

import { runQuery } from "../db.js";

export async function addNameService(name) {
  const sql = `INSERT INTO names (name) VALUES (?);`;

  const result = await runQuery(sql, [name]);

  return result;
}
