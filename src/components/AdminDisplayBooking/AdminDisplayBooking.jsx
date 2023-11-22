/**
 * Component for displaying a booking and its tickets
 * formatTickets formats a ticket
 */

import { AdminDisplayTicket } from "../AdminDisplayTicket/AdminDisplayTicket";

export function AdminDisplayBooking({ result }) {
  if (!result) return;

  if ("error" in result) {
    return (
      <article>
        <p>{result.error}</p>
      </article>
    );
  }

  function formatTickets(tickets) {
    const splitted = tickets.split(",");
    const numOfTickets = splitted.length;

    const formatted = splitted.map((ticket) => {
      const row = ticket.split(":")[0];
      const seat = ticket.split(":")[1].split(" ")[0];
      const type = ticket.split(":")[1].split(" ")[1];

      return { row, seat, type };
    });

    return [formatted, numOfTickets];
  }

  return (
    <article className="admin-display-flex-container">
      <h2>Resultat för bokingsnummer: {result.bookingNumber}</h2>
      <p>Antal biljetter: {formatTickets(result.tickets)[1]}</p>
      <div>
        {formatTickets(result.tickets)[0].map((ticket) => (
          <AdminDisplayTicket
            ticket={ticket}
            key={`${ticket.row}:${ticket.seat}`}
          />
        ))}
      </div>
    </article>
  );
}
