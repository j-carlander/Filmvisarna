import { useState } from "react";
import TicketType from "./TicketType/TicketType";

const ticketsMock = [
  {
    id: 1,
    name: "Ordinarie",
    price: 140,
  },
  {
    id: 2,
    name: "Pensionär",
    price: 120,
  },
  {
    id: 3,
    name: "Barn",
    price: 80,
  },
];

export function TicketPicker() {
  const [ticketTypes, setTicketTypes] = useState(ticketsMock);
  const [selectedTickets, setSelectedTickets] = useState([]);

  function getTicketComp(ticketType, index) {
    return (
      <TicketType
        {...{
          key: `ticket-type-${index}`,
          ticketType,
          selectedTickets,
          setSelectedTickets,
        }}
      />
    );
  }

  return (
    <section className="ticket-picker">
      <h2 className="picker-title">Välj antal biljetter</h2>
      <ul className="ticket-list">{ticketTypes.map(getTicketComp)}</ul>
      <strong className="total-cost-container">
        <span>Total kostnad:</span>
        <span>
          {selectedTickets.reduce((acc, current) => current.price + acc, 0)} kr
        </span>
      </strong>
    </section>
  );
}
