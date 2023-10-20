import Jwt from "jsonwebtoken";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const keysDir = path.join(__dirname, "../config/keys/");

const privateKey = fs.readFileSync(keysDir + "private.pem");
const publicKey = fs.readFileSync(keysDir + "public.pem");

function createToken(payload) {
  return Jwt.sign(payload, privateKey, { algorithm: "RS256" });
}

function validateToken(token) {
  return Jwt.verify(token, publicKey);
}

export default { createToken, validateToken };
