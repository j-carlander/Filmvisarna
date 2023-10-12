import bcrypt from "bcrypt";
import { runQuery } from "../db";

export async function loginhandler(req, res) {
  const { email, password } = req.body;

  // Retrieve the user based on their email from our users table.
  const foundUser = await runQuery("SELECT * FROM users WHERE email = ?", [
    email,
  ]);

  if (foundUser.length === 0) {
    res.status(404).json({ message: "User not found" });
  } else {
    // Compare the provided password with the hashed password, if it matches send status code 200 else 401
    const hashedPasswordFromDB = foundUser[0].password;

    bcrypt.compare(password, hashedPasswordFromDB, (err, result) => {
      if (err) {
        console.error("Password comparison error: " + err.message);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (result) {
        res.status(200).json({ message: "Login successful" });
      } else {
        res.status(401).json({ message: "Incorrect password" });
      }
    });
  }
}
