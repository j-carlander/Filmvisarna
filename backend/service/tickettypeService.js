/*
This file provides a function called tickettypeService that fetches details about ticket types from the database. Using a simple SQL query to select all records from the "tickettypes" table
*/
import { runQuery } from "../db.js";

export async function tickettypeService() {
  const sql = "SELECT * FROM tickettypes";
  const res = await runQuery(sql);
  return res;
}
