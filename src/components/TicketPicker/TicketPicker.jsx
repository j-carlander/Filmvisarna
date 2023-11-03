import { useState, useEffect } from "react";
import TicketType from "./TicketType/TicketType";
import { fetchHelper } from "../../utils/fetchHelper";

export function TicketPicker({ selectedTickets, setSelectedTickets }) {
  const [ticketTypes, setTicketTypes] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [selectedOrdinarie, setSelectedOrdinarie] = useState(false);

  function getTicketComp(ticketType, index) {
    return (
      <TicketType
        key={`ticket-type-${index}`}
        ticketType={ticketType}
        selectedTickets={selectedTickets}
        setSelectedTickets={setSelectedTickets}
      />
    );
  }

  useEffect(() => {
    async function fetchTicketTypes() {
      const response = await fetchHelper("/tickettypes", "get");
      const json = await response.json();
      setTicketTypes(json);
    }

    if (!initialized) {
      fetchTicketTypes();
      setInitialized(true);
    }
  }, [initialized]);

  useEffect(() => {
    if (initialized && !selectedOrdinarie) {
      const ordinarieTicketType = ticketTypes.find((type) => type.name === "Ordinarie");
      if (ordinarieTicketType) {
        setSelectedTickets([...selectedTickets, ordinarieTicketType, ordinarieTicketType]);
        setSelectedOrdinarie(true);
      }
    }
  }, [initialized, selectedTickets, setSelectedTickets, ticketTypes, selectedOrdinarie]);

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
