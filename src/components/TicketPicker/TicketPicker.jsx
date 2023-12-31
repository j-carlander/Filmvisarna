/**
 * Component for tickets and different types of tickets
 * fetching available ticket types from the server
 * "Ordinarie" is automatically selected as ticket type
 * calculates and displays the total cost of selected tickets
 */

import { useState, useEffect } from "react";
import TicketType from "./TicketType/TicketType";
import { fetchHelper } from "../../utils/fetchHelper";

export function TicketPicker({ selectedTickets, setSelectedTickets, data }) {
  const [ticketTypes, setTicketTypes] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [selectedOrdinarie, setSelectedOrdinarie] = useState(false);
  const [isHidden] = useState(false);


  function getTicketComp(ticketType, index) {
    if (!isHidden && ticketType.name === "Barn" && data.agelimit >= 15){
      return null; 
    }

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
      const ordinarieTicketType = ticketTypes.find(
        (type) => type.name === "Ordinarie"
      );
      if (ordinarieTicketType) {
        setSelectedTickets([
          ...selectedTickets,
          { ...ordinarieTicketType },
          { ...ordinarieTicketType },
        ]);
        setSelectedOrdinarie(true);
      }
    }
  }, [
    initialized,
    selectedTickets,
    setSelectedTickets,
    ticketTypes,
    selectedOrdinarie,
  ]);

  function formattedNumber() {
    const total = selectedTickets.reduce((acc, current) => current.price + acc, 0);
    const formattedTotal = total >= 1000 ? `${total.toString().slice(0, 1)} ${total.toString().slice(1)} kr` : `${total} kr`;
    return formattedTotal;
  }

  return (
    <section className="ticket-picker">
      <h2 className="picker-title">Välj antal biljetter</h2>
      <ul className="ticket-list">{ticketTypes.map(getTicketComp)}</ul>
      <strong className="total-cost-container">
        <span>Total kostnad:</span>
        <span>
          {formattedNumber()}
        </span>
      </strong>
    </section>
  );
}