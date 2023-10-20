import bcrypt from "bcrypt";
import { runQuery } from "../db.js";

export async function registerHandler(req, res) {
  const { fname, lname, phone, email, password, repassword } = req.body;

  if (!fname || !lname) {
    return res
      .status(403)
      .json({ err: "Firstname and/or Lastname is missing" });
  }
  if (!phone || !email) {
    return res.status(403).json({ err: "Phone and/or email is missing" });
  }
  if (!password || !repassword) {
    return res.status(403).json({ err: "Password is missing" });
  }

  //Om lösen1 inte matchar med lösen2
  if (password !== repassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) {
      console.error("Password hashing error: " + err.message);
      return res.status(500).json({ message: "Internal server error" });
    }

    const insertRegisterQuery =
      "INSERT INTO users (fname, lname, phone, email, password) VALUES (?, ?, ?, ?, ?)";

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
        res.status(201).json({ message: "User registered successfully" });
      } else {
        res.status(401).json({ message: "User registration failed" });
      }
    } catch (error) {
      console.error("Error: " + error.message);
      return res
        .status(401)
        .json({ message: "User registered unsuccessfully" });
    }
  });
}
