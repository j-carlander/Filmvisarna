import { useState } from "react";
import { AdminPromoteDemoteUserBtn } from "../AdminPromoteDemoteUserBtn/AdminPromoteDemoteUserBtn";

export function AdminDisplayUser({ userResult }) {
  const [currentUser, setCurrentUser] = useState(userResult);
  if (!userResult) return;

  if ("error" in userResult) {
    return (
      <article>
        <p>{userResult.error}</p>
      </article>
    );
  }

  function updateUserRole(newRole) {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      role: newRole,
    }));
  };

  return (
    <article className="admin-display-userinfo">
      <p>Förnamn: {currentUser.fname}</p>
      <p>Efternamn: {currentUser.lname}</p>
      <p>E-post: {currentUser.email}</p>
      <p>Telefon: {currentUser.phone}</p>
      <p>Roll: {currentUser.role}</p>
      <AdminPromoteDemoteUserBtn role={userResult.role} id={userResult.id} updateUserRole={updateUserRole} />
    </article>
  );
}
