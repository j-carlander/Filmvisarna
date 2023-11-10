import { fetchHelper } from "../../utils/fetchHelper";

export function AdminPromoteDemoteUserBtn({ role, id }) {
  async function handleClick() {
    const result = await fetchHelper("/users", "PUT", { role, id });
    console.log(result);
  }
  return (
    <button
      onClick={handleClick}
      className={role === "user" ? "admin-promote-btn" : "admin-demote-btn"}>
      {role === "user" ? "Gör till admin" : "Gör till användare"}
    </button>
  );
}
