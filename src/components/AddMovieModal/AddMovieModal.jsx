import { useState } from "react";

export function AddMovieModal() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="Moviemodal-wrapper">
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Din film har skapats!</h2>
            <button className="close-btn" onClick={() => setModalOpen(false)}>
              Stäng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
