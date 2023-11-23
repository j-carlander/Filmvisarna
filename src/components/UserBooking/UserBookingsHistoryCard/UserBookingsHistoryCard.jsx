/**
 * Component for user bookings for historical bookings
 * takes a prop and renders the information in a card format
 */

export function UserBookingsHistoryCard({ bookingData }) {
  const dateArr = bookingData.date.split(". kl: ");

  const time = dateArr[1];

  const day = dateArr[0];

  return (
    <li className="user-history-li">
      <div className="booking-info-hist">
        <p>{bookingData.title},</p>
        <p>{time},</p>
        <p>{day}</p>
      </div>
    </li>
  );
}
