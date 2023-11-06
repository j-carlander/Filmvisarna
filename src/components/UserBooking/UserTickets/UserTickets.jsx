export default function UserTickets({
  bookingData,
  setShowTickets,
  time,
  day,
}) {
  return (
    <dialog className="booking-confirmation-container">
      <h3>Biljetter:</h3>
      <div className="movie-info">
        <p>
          <strong>Titel</strong>: {bookingData.title}
        </p>
        <p>
          <strong>Tid</strong>: {time}
        </p>
        <p>
          <strong>Datum</strong>: {day}
        </p>
        <p>
          <strong>Valda platser</strong>: {bookingData.tickets}
        </p>
        <p>
          <strong>Att betala</strong>: {bookingData.price} kr
        </p>
      </div>
      <p>
        <strong>Bokningsnummer</strong>: {bookingData.bookingnumber}
      </p>
      <button className="close-btn" onClick={() => setShowTickets(false)}>
        Stäng
      </button>
    </dialog>
  );
}
