import { NavLink } from "react-router-dom";
import sessionService from "../../utils/sessionService";

export function ControlledLinks() {
  const token = sessionService.getToken();
  let isadmin = false;
  if (token) {
    const payload = atob(token.split(".")[1]);
    isadmin = payload.isadmin;
  }
  return (
    <>
      {isadmin ? (
        <li>
          <NavLink to={"/admin"}></NavLink>
        </li>
      ) : null}
    </>
  );
}
