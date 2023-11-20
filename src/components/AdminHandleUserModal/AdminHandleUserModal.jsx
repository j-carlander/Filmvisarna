export function AdminHandleUserModal({ setModalOpen, confirmRoleChange }) {
    return (
      <div className="handleuser-modal">
        <div className="modal">
          <div className="modal-content">
            <h2>Är du säker att du vill ändra användarens roll?</h2>
            <button className="confirm-btn" onClick={confirmRoleChange}>
              Bekräfta
            </button>
            <div className="handleuserclose-btn" onClick={() => setModalOpen(false)}>
              Stäng
            </div>
          </div>
        </div>
      </div>
    );
  }
  