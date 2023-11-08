import { useState, useEffect } from "react";
import Seat from "./Seat/Seat";
import SeatRow from "./Seatrow/SeatRow";
import { fetchHelper } from "../../utils/fetchHelper";

export function Seats({
  theatreId,
  screeningId,
  totalTickets,
  selectedSeats,
  setSelectedSeats,
  individual,
  setIndividual,
}) {
  const [seats, setSeats] = useState([]);
  const [takenSeats, setTakenSeats] = useState([]);
  const [hoveredSeat, setHoveredSeat] = useState();

  useEffect(() => {
    async function fetchTakenSeats() {
      const response = await fetchHelper(`/takenseats/${screeningId}`, "get");
      const data = await response.json();
      setTakenSeats(data);
    }

    let abortSubscription = false;
    async function subscribe() {
      const response = await fetchHelper(
        `/subscribeScreenings/${screeningId}`,
        "get"
      );
      if (response.status == 200) {
        const newTakenSeats = await response.json();
        console.log(newTakenSeats);
        setTakenSeats((takenSeats) => [
          ...takenSeats,
          ...newTakenSeats.seatsArray,
        ]);
      }

      if (!abortSubscription) subscribe();
    }

    fetchTakenSeats();
    subscribe();

    return () => {
      abortSubscription = true;
    };
  }, [screeningId]);

  function getSeatRow(rowInfo, index) {
    const seatsArray = [];

    for (let i = 0; i < rowInfo.numberofseats; i++) {
      seatsArray.push(
        <Seat
          key={`row-${index}-seat-${i + 1}`}
          {...{
            takenSeats,
            rowNumber: rowInfo.rownumber,
            seatNumber: i + 1,
            setSelectedSeats,
            selectedSeats,
            totalTickets,
            seats,
            individual,
            hoveredSeat,
            setHoveredSeat,
          }}
        />
      );
    }

    seatsArray.reverse();

    return <SeatRow key={`row-${index}`} seats={seatsArray} />;
  }

  function onIndividualCheck(e) {
    setSelectedSeats([]);
    setIndividual(e.target.checked);
  }

  useEffect(() => {
    async function getThetreLayout() {
      const response = await fetchHelper(`/theatrerows/${theatreId}`, "get");
      const theatreData = await response.json();
      setSeats(theatreData);
    }

    getThetreLayout();
  }, [theatreId]);

  return (
    <>
      <section className="individual-container">
        <h4>Välj individuella platser:</h4>{" "}
        <label className="checkbox-label">
          <input
            type="checkbox"
            className="individual-checkbox"
            checked={individual}
            onChange={onIndividualCheck}
          />
          <span className="custom-checkbox"></span>
        </label>
      </section>
      <div className="theatre-container">
        <svg
          className="theatre-screen"
          fill="none"
          viewBox="0 0 50 10"
          preserveAspectRatio="xMinYMin meet">
          <path d="M0 0 L6 10 L44 10 L50 0 Z" strokeWidth={1} />
        </svg>
        <div className="theatre-wrapper">
          <div className="theatre-seats">{seats.map(getSeatRow)}</div>
        </div>
      </div>
    </>
  );
}
