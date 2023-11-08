import { NavLink } from "react-router-dom";
import sessionService from "../../../utils/sessionService";

export function ControlledLinks() {
  const token = sessionService.getToken();
  let isadmin = 0;
  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    isadmin = payload.isadmin;
  }
  return (
    <>
      {!token ? (
        <li>
          <NavLink to={"/register"}>Bli medlem</NavLink>
        </li>
      ) : null}
      {isadmin === 1 ? (
        <li>
          <NavLink to={"/admin"}>Admin</NavLink>
        </li>
      ) : null}
    </>
  );
}
