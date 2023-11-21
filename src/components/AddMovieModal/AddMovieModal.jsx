/**
 * Component for a modal that confirms movie has been created
 */

export function AddMovieModal({ modalOpen, setModalOpen }) {
  return (
    <>
      {modalOpen && (
        <div className="Moviemodal-wrapper">
          <div className="modal">
            <div className="modal-content">
              <h2>Din film har skapats!</h2>
              <button className="close-btn" onClick={() => setModalOpen(false)}>
                Stäng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
