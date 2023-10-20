import mysql from "mysql2";

const options = {
  host: process.env.MYSQL_IP,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DB,
};

const connection = mysql.createConnection(options);

export async function runQuery(query, values) {
  return (await connection.promise().query(query, values))[0];
}
