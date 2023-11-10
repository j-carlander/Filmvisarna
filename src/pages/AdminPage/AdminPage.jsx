import sessionService from "../../utils/sessionService";
import { NavLink, Navigate } from "react-router-dom";
import { AdminSearchBookingPage } from "../AdminSearchBookingPage/AdminSearchBookingPage";

export function AdminPage() {
  const token = sessionService.getToken();
  let role = "user";
  if (token) {
    const payload = atob(token.split(".")[1]);
    role = payload.role;
  }
  if (role === "user") {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <header className="admin-page-header">
        <NavLink to={"/"}>Till hemsidan</NavLink>
        <h1 className="admin-page-title">Filmvisarna - Administrationssida</h1>
      </header>
      <AdminSearchBookingPage />
    </>
  );
}
