import { useState } from "react";
import { fetchHelper } from "../../utils/fetchHelper";

export function AdminPromoteDemoteUserBtn({ role, id }) {
  const [roleState, setRoleState] = useState(role);
  async function handleClick() {
    const result = await fetchHelper("/users", "PUT", { role: roleState, id });
    if (result.status === 200) {
      setRoleState((role) => (role === "user" ? "admin" : "user"));
    } else {
      const json = result.json();
      alert(json.error);
    }
  }
  return (
    <button
      onClick={handleClick}
      className={
        roleState === "user" ? "admin-promote-btn" : "admin-demote-btn"
      }>
      {roleState === "user" ? "Gör till admin" : "Gör till användare"}
    </button>
  );
}
