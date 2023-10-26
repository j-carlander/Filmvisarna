import { useState } from "react";
import TicketType from "./TicketType/TicketType";

const ticketsMock = [
  {
    id: 1,
    name: "Ordinarie",
    price: 140,
    quantity: 0,
  },
  {
    id: 2,
    name: "Pensionär",
    price: 120,
    quantity: 0,
  },
  {
    id: 3,
    name: "Barn",
    price: 80,
    quantity: 0,
  },
];

export default function TicketPicker() {
  const [ticketTypes, setTicketTypes] = useState(ticketsMock);

  function getTicketComp(ticketType, index) {
    return (
      <TicketType
        key={`ticket-type-${index}`}
        ticketType={ticketType}
        setTicketTypes={setTicketTypes}
      />
    );
  }

  return (
    <section>
      <h2>Välj antal biljetter</h2>
      <ul>{ticketTypes.map(getTicketComp)}</ul>
    </section>
  );
}
