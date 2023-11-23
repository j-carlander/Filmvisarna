/**
 * Controller for handling requests to register user
 * sends response status 400 and a message in Swedish if the registration was not completed
 * sends response status 500 and an Internal server error message in Swedish on fail
 * sends response status 200 and rthe account was created with hashed password on success
 * sends response status 201 and the account was created on success
 */

import bcrypt from "bcrypt";
import { runQuery } from "../db.js";

export async function registerHandler(req, res) {
  const { fname, lname, phone, email, password } = req.body;

  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: "Internt serverfel!" });
    }

    const insertRegisterQuery =
      "INSERT INTO users (fname, lname, phone, email, password, role) VALUES (?, ?, ?, ?, ?, 'user')";

    try {
      const result = await runQuery(insertRegisterQuery, [
        fname,
        lname,
        phone,
        email,
        hashedPassword,
      ]);

      // Om användaren är successfully registrerad
      if (result.affectedRows === 1) {
        res.status(201).json({ message: "Ditt konto har skapats!" });
      } else {
        res.status(400).json({ error: "Ditt konto skapades inte!" });
      }
    } catch (error) {
      return res.status(400).json({ error: "Ditt konto skapades inte!" });
    }
  });
}
