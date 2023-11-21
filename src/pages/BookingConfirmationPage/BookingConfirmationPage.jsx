import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import BookingConfirmation from "../../components/BookingConfirmation/BookingConfirmation";

import { useWindowInnerWidth } from "../../hooks/useWindowInnerWidth";
import { formatSeatsForBookingConf } from "../../utils/formatSeatsForBookingConf";
import { ConfirmBookingCTA } from "../../components/ConfirmBookingCTA/ConfirmBookingCTA";

export function BookingConfirmationPage() {
  const navigate = useNavigate();
  const [confirmationData, setConfirmationData] = useState();
  const [seats, setSeats] = useState([]);
  const [screeningData, setScreeningData] = useState();
  const [individual, setIndividual] = useState();

  const windowWidth = useWindowInnerWidth();

  const location = useLocation();
  const { screeningId } = useParams();

  useEffect(() => {
    if (location.state === null) {
      return navigate(`/bokning/${screeningId}`);
    }

    const { selectedSeats, selectedTickets, data, individual } = location.state;
    setIndividual(individual);
    const newScreeningData = {
      id: data.movieid,
      title: data.title,
      date: data.screeningDate,
      price: selectedTickets.reduce((acc, current) => current.price + acc, 0),
      seats: formatSeatsForBookingConf(individual, selectedSeats),
    };
    setScreeningData(newScreeningData);
    const newSeats = [];
    for (let i = 0; i < selectedSeats.length; i++) {
      newSeats.push({
        ...selectedSeats[i],
        seatRow: selectedSeats[i].rowNumber,
        ticketType: selectedTickets[i].id,
      });
    }
    setSeats(newSeats);
  }, [
    location,
    navigate,
    screeningId,
    setSeats,
    setScreeningData,
    setIndividual,
  ]);

  return (
    <div className="bookconfirm-wrapper">
      <h1>Bokningsöversikt</h1>
      <div className="bookconfirm-page">
        {screeningData !== undefined && (
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
        )}
        <ConfirmBookingCTA {...{ seats, screeningId, setConfirmationData }} />
      </div>
      {confirmationData ? (
        <BookingConfirmation bookingData={confirmationData} />
      ) : null}
    </div>
  );
}
