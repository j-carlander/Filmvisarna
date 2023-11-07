import { NavLink } from "react-router-dom";
import sessionService from "../../utils/sessionService";

export function ControlledLinks() {
  const token = sessionService.getToken();
  let isadmin = 0;
  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log("payload", payload);
    isadmin = payload.isadmin;
  }
  return (
    <>
      {isadmin === 1 ? (
        <li>
          <NavLink to={"/admin"}>Admin</NavLink>
        </li>
      ) : null}
    </>
  );
}