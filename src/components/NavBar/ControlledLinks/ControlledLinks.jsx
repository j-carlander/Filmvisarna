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
