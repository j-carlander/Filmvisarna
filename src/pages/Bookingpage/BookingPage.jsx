import { useParams } from "react-router-dom";
import { Seats } from "../../components/Seats/Seats";
import { TicketPicker } from "../../components/TicketPicker/TicketPicker";
import { useEffect } from "react";
import { fetchHelper } from "../../utils/fetchHelper";
import { useState } from "react";
import { movieLengthFormatter } from "../../utils/movieLengthFormatter";
import { ageLimitFormatter } from "../../utils/ageLimitFormatter";
import { useNavigate } from "react-router-dom";

export function BookingPage() {
  const [data, setData] = useState({});
  const { screeningid } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [individual, setIndividual] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedTickets.length < selectedSeats.length) {
      setSelectedSeats(() => {
        if (individual) {
          return selectedSeats.slice(0, selectedSeats.length - 1);
        } else {
          const newSeats = selectedSeats.sort(
            (a, b) => b.seatNumber - a.seatNumber
          );
          return newSeats.slice(0, newSeats.length - 1);
        }
      });
    }
  }, [selectedTickets, setSelectedSeats, selectedSeats, individual]);

  useEffect(() => {
    async function fectchScreening(screeningid) {
      const res = await fetchHelper(`/screening/${screeningid}`, "get");
      const data = await res.json();
      setData(data);
    }
    fectchScreening(screeningid);
  }, [screeningid]);

  const goBackToPreviousPage = () => {
    navigate(-1);
  };

  function getNonIndividualP() {
    return (
      <p>
        Vald plats: rad {selectedSeats[0].rowNumber} plats{" "}
        {selectedSeats.length === 1
          ? selectedSeats[0].seatNumber
          : `${selectedSeats[selectedSeats.length - 1].seatNumber} - ${
              selectedSeats[0].seatNumber
            }`}
      </p>
    );
  }

  function getIndividualP() {
    return (
      <p className="individual-seats">
        Valda platser:
        {selectedSeats.map((seat, index) => (
          <span key={`seat-${index}`}>
            Rad: {seat.rowNumber} plats: {seat.seatNumber}
          </span>
        ))}
      </p>
    );
  }

  return (
    <>
      <div className="Bookingpage-container">
        <button className="imgbox" onClick={goBackToPreviousPage}>
          <img className="back-to-previous" src="/back-left-arrow.png" />
        </button>
        <div className="seaction-header">
          <p>
            <span className="bookingpage-movie-title">{data.title}</span>{" "}
            {movieLengthFormatter(data.durationinminutes)} -{" "}
            <span>{ageLimitFormatter(data.agelimit)}</span>
          </p>
          <p>
            <span className="bookingpage-screening-date">
              {data.screeningDate}
            </span>
            , <span>{data.theatre}</span>
          </p>
          <p> Slutar ca: {data.endTime}</p>
        </div>
        <div className="seaction-header2">
          <TicketPicker {...{ selectedTickets, setSelectedTickets, data }} />
        </div>
        <div className="section-1">
          <h2>Välj platser</h2>
          {data.theatreId ? (
            <Seats
              {...{
                theatreId: data.theatreId,
                screeningId: screeningid,
                selectedSeats,
                setSelectedSeats,
                totalTickets: selectedTickets.length,
                individual,
                setIndividual,
              }}
            />
          ) : null}
          <p className="bookingpage-scroll-note">
            Använd fingret för att scrolla salongen i sidled
          </p>
        </div>
        <div className="section-2">
          {selectedSeats.length > 0 &&
            (!individual ? getNonIndividualP() : getIndividualP())}
          <button
            onClick={() => {
              navigate(`/bokningsbekraftelse/${screeningid}`, {
                state: { selectedSeats, selectedTickets, data, individual },
              });
            }}
            disabled={
              selectedTickets.length === 0 ||
              selectedSeats.length !== selectedTickets.length ||
              selectedTickets.length > 8
            }>
            Boka biljett
          </button>
          {selectedTickets.length > 8 && (
            <p className="ticketlimit-notis">Du kan boka högst 8 biljetter.</p>
          )}
        </div>
      </div>
    </>
  );
}
