import { useState } from "react";
import { fetchHelper } from "../../utils/fetchHelper";
import { AdminHandleUserModal } from "../AdminHandleUserModal/AdminHandleUserModal"; // Import the modal component

export function AdminPromoteDemoteUserBtn({ role, id, updateUserRole }) {
  const [roleState, setRoleState] = useState(role);
  const [showModal, setShowModal] = useState(false);

  async function handleClick() {
    setShowModal(true);
  }

  async function confirmRoleChange() {
    const result = await fetchHelper("/users", "PUT", { role: roleState, id });
    if (result.status === 200) {
      setRoleState((role) => (role === "user" ? "admin" : "user"));
      updateUserRole(roleState === "user" ? "admin" : "user");
      setShowModal(false);
    } else {
      const json = await result.json();
      alert(json.error);
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={roleState === "user" ? "admin-promote-btn" : "admin-demote-btn"}
      >
        {roleState === "user" ? "Gör till admin" : "Gör till användare"}
      </button>
      {showModal && (
        <AdminHandleUserModal
          setModalOpen={setShowModal}
          confirmRoleChange={confirmRoleChange}
        />
      )}
    </>
  );
}
