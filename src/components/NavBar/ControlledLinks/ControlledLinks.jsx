/**
 * Component for controlled links 
 * If there is no token, it renders a "Bli medlem" link (Become a member). 
 * If the user has an "admin" or "super" role, it also renders an "Admin" link.
 */

import { NavLink } from "react-router-dom";
import sessionService from "../../../utils/sessionService";

export function ControlledLinks() {
  const token = sessionService.getToken();
  let role = 0;
  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    role = payload.role;
  }
  return (
    <>
      {!token ? (
        <li>
          <NavLink to={"/registrera"}>Bli medlem</NavLink>
        </li>
      ) : null}
      {role === "admin"|| role === "super" ? (
        <li>
          <NavLink to={"/admin"}>Admin</NavLink>
        </li>
      ) : null}
    </>
  );
}
