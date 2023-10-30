export default function BookingConfirmation({ bookingData }) {
  //TODO: add a callback to the close button to close the modal, for example a state with true/false value or navigate to another page.
  const dateArr = bookingData.date.split(". kl: ");

  const time = dateArr[1];

  const date = dateArr[0];

  return (
    <dialog className="booking-confirmation-container">
      <h3>Du har bokat:</h3>
      <div className="movie-info">
        <p>
          <strong>Titel</strong>: {bookingData.title}
        </p>
        <p>
          <strong>Tid</strong>: {time}
        </p>
        <p>
          <strong>Datum</strong>: {date}
        </p>
        <p>
          <strong>Valda platser</strong>: {bookingData.seats}
        </p>
        <p>
          <strong>Att betala</strong>: {bookingData.totalPrice} kr
        </p>
      </div>
      <p>
        <strong>Bokningsnummer</strong>: {bookingData.bookingNumber}
      </p>
      <strong>En bekräftelse har skickats till din mail!</strong>
      <button className="close-btn">Stäng</button>
    </dialog>
  );
}
