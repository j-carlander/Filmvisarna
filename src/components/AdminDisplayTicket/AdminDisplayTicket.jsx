/**
 * Component for displaying a ticket
 */

export function AdminDisplayTicket({ ticket }) {
  return (
    <section className="admin-display-ticket">
      <p>Rad: {ticket.row}</p>
      <p>Plats: {ticket.seat}</p>
      <p>Biljettyp: {ticket.type}</p>
    </section>
  );
}
