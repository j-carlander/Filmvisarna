import { useParams } from "react-router-dom";
import { Seats } from "../../components/Seats/Seats";
import TicketPicker from "../../components/TicketPicker/TicketPicker";
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

  const navigate = useNavigate();

  useEffect(() => {
    async function fectchScreening(screeningid) {
      const res = await fetchHelper(`/screening/${screeningid}`, "get");
      const data = await res.json();
      console.log(data);
      setData(data);
      // fetchHelper()
    }
    fectchScreening(screeningid);
  }, [screeningid]);
  console.log(selectedSeats);

  const goBackToPreviousPage = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="Bookingpage-container">
        <button className="imgbox" onClick={goBackToPreviousPage}>
          <img className="back-to-previous" src="/back-left-arrow.png" />
        </button>
        {/* <div className="header-content"> */}
        <div className="seaction-header">
          {/* Image */}
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
          <TicketPicker {...{ selectedTickets, setSelectedTickets }} />
        </div>
        {/* </div> */}

        {/* <div className="seat-section"> */}
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
              }}
            />
          ) : null}
          <p className="bookingpage-scroll-note">
            Använd fingret för att scrolla salongen i sidled
          </p>
        </div>
        <div className="section-2">
          {selectedSeats.length > 0 && (
            <p>
              Vald plats: rad {selectedSeats[0].rowNumber} plats{" "}
              {selectedSeats.length === 1
                ? selectedSeats[0].seatNumber
                : `${selectedSeats[selectedSeats.length - 1].seatNumber} - ${
                    selectedSeats[0].seatNumber
                  }`}
            </p>
          )}
          <button
            onClick={() => {
              navigate(`/bookingconfirmation/${screeningid}`, {
                state: { selectedSeats, selectedTickets, data },
              });
            }}
            disabled={selectedSeats.length === 0}>
            Boka biljett
          </button>
        </div>
        {/* </div> */}
      </div>
    </>
  );
}

// ${selectedSeats[0].seatNumber}
// selectedSeats[selectedSeats.length -1].seatNumber
