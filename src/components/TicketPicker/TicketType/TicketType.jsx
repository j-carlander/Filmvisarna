export default function TicketType({ ticketType, setTicketTypes }) {
  function alterTicketTypesQuantity(change) {
    console.log(`alter Call(${change})`);
    setTicketTypes((oldValue) => {
      oldValue[oldValue.indexOf(ticketType)].quantity += change;

      return JSON.parse(JSON.stringify(oldValue));
    });
  }

  function increaseQuantity() {
    alterTicketTypesQuantity(1);
  }

  function decreaseQuantity() {
    alterTicketTypesQuantity(-1);
  }

  return (
    <li>
      <p>{ticketType.name}</p>
      <div>
        <button onClick={decreaseQuantity}>-</button>{" "}
        <span>{ticketType.quantity}</span>{" "}
        <button onClick={increaseQuantity}>+</button>
      </div>
    </li>
  );
}
