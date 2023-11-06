import bcrypt from "bcrypt";
import { runQuery } from "../db.js";
import jwtUtil from "../utils/jwtUtil.js";

export async function loginhandler(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(403).json({ error: "Saknar email eller lösenord!" });
  }

  // Retrieve the user based on their email from our users table.
  const foundUser = await runQuery("SELECT * FROM users WHERE email = ?", [
    email,
  ]);

  if (foundUser.length === 0) {
    res.status(404).json({ error: "Fel email eller lösenord!" });
  } else {
    // Compare the provided password with the hashed password, if it matches send status code 200 else 401
    const hashedPasswordFromDB = foundUser[0].password;

    bcrypt.compare(password, hashedPasswordFromDB, (err, result) => {
      if (err) {
        console.error("Password comparison error: " + err.message);
        return res.status(500).json({ error: "Internt server fel!" });
      }

      if (result) {
        const token = jwtUtil.createToken({
          id: foundUser[0].id,
          email: foundUser[0].email,
          isadmin: foundUser[0].isadmin,
        });
        res.status(200).json({ message: "Inloggning", token });
      } else {
        res.status(401).json({ error: "Fel email eller lösenord!" });
      }
    });
  }
}
