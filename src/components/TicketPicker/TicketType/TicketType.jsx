/**
 * Component for ticket type
 * Users can increase or decrease the quantity 
 * of this ticket type
 */

export default function TicketType({
  ticketType,
  selectedTickets,
  setSelectedTickets,
}) {
  function increaseQuantity() {
    setSelectedTickets((oldValue) => [...oldValue, { ...ticketType }]);
  }

  function decreaseQuantity() {
    setSelectedTickets((oldValue) => {
      const el = oldValue.find((type) => type.name === ticketType.name);

      return oldValue.filter((type) => type !== el);
    });
  }

  return (
    <li className="ticket-list-item">
      <p>
        {ticketType.name} ({ticketType.price} kr)
      </p>
      <div className="button-container">
        <button onClick={decreaseQuantity}>-</button>{" "}
        <span>
          {selectedTickets.filter((el) => el.name === ticketType.name).length}
        </span>{" "}
        <button onClick={increaseQuantity}>+</button>
      </div>
    </li>
  );
}
