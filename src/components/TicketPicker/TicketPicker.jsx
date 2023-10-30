import { useState, useEffect } from "react";
import TicketType from "./TicketType/TicketType";
import { fetchHelper } from "../../utils/fetchHelper";

export function TicketPicker() {
  const [ticketTypes, setTicketTypes] = useState([]);
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

  useEffect(() => {
    async function fetchTicketTypes() {
      const response = await fetchHelper("/tickettypes", "get");

      const json = await response.json();

      setTicketTypes(json);
    }

    fetchTicketTypes();
  }, [setTicketTypes]);

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
