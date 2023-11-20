import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";

import BookingConfirmation from "../../components/BookingConfirmation/BookingConfirmation";

import { useWindowInnerWidth } from "../../hooks/useWindowInnerWidth";
import { formatSeatsForBookingConf } from "../../utils/formatSeatsForBookingConf";
import { ConfirmBookingCTA } from "../../components/ConfirmBookingCTA/ConfirmBookingCTA";

export function BookingConfirmationPage() {
  const [confirmationData, setConfirmationData] = useState();

  const windowWidth = useWindowInnerWidth();

  const location = useLocation();
  const { selectedSeats, selectedTickets, data, individual } = location.state;

  const { screeningId } = useParams();

  const screeningData = {
    id: data.movieid,
    title: data.title,
    date: data.screeningDate,
    price: selectedTickets.reduce((acc, current) => current.price + acc, 0),
    seats: formatSeatsForBookingConf(individual, selectedSeats),
  };

  const seats = [];
  for (let i = 0; i < selectedSeats.length; i++) {
    seats.push({
      ...selectedSeats[i],
      seatRow: selectedSeats[i].rowNumber,
      ticketType: selectedTickets[i].id,
    });
  }

  return (
    <div className="bookconfirm-wrapper">
      <h1>Bokningsöversikt</h1>
      <div className="bookconfirm-page">
        <div className="bookconfirm-screenings">
          {windowWidth >= 850 && (
            <img
              className="bookconfirm-img"
              src={`/images/${screeningData.id}_w400.webp`}
              alt="movie-poster"
            />
          )}
          <p>
            <strong>Titel:</strong> {screeningData.title}
          </p>
          <p>
            <strong>Tid:</strong> {screeningData.date}
          </p>
          <p className={individual ? "individual-seats" : ""}>
            <strong>Valda Platser:</strong> {screeningData.seats}
          </p>
          <p>
            <strong>Att Betala:</strong> {screeningData.price} kr
          </p>
        </div>
        <ConfirmBookingCTA {...{ seats, screeningId, setConfirmationData }} />
      </div>
      {confirmationData ? (
        <BookingConfirmation bookingData={confirmationData} />
      ) : null}
    </div>
  );
}
