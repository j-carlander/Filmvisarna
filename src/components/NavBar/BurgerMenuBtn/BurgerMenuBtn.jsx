export function BurgerMenuBtn({ showMenu, setShowMenu }) {
  return (
    // <button>menu</button>
    <button
      onClick={() => {
        setShowMenu((prev) => !prev);
      }}>
      {showMenu ? <img src="/close.svg" /> : <img src="/hamburger_menu.svg" />}
    </button>
  );
}
