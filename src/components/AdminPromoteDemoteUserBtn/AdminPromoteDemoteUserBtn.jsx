import { fetchHelper } from "../../utils/fetchHelper";

export function AdminPromoteDemoteUserBtn({ role, id }) {
  async function handleClick() {
    const result = await fetchHelper("/users", "PUT", { role, id });
    console.log(id);
  }
  return (
    <button onClick={handleClick}>
      {role === "user" ? "Gör till admin" : "Gör till användare"}
    </button>
  );
}
