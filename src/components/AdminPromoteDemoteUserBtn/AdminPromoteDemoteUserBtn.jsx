export function AdminPromoteDemoteUserBtn({ role, id }) {
  function handleClick() {
    console.log(id);
  }
  return (
    <>
      {role === "user" ? (
        <button onClick={handleClick}>Gör till admin</button>
      ) : (
        <button>Gör till användare</button>
      )}
    </>
  );
}
