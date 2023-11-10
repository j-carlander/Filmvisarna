import { AdminPromoteDemoteUserBtn } from "../AdminPromoteDemoteUserBtn/AdminPromoteDemoteUserBtn";

export function AdminDisplayUser({ userResult }) {
  if (!userResult) return;

  if ("error" in userResult) {
    return (
      <article>
        <p>{userResult.error}</p>
      </article>
    );
  }
  return (
    <article className="admin-display-userinfo">
      <p>Förnamn: {userResult.fname}</p>
      <p>Efternamn: {userResult.lname}</p>
      <p>E-post: {userResult.email}</p>
      <p>Telefon: {userResult.phone}</p>
      <p>Roll: {userResult.role}</p>
      <AdminPromoteDemoteUserBtn role={userResult.role} id={userResult.id} />
    </article>
  );
}
