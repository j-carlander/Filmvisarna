import { useState } from "react";
import { NavLink } from "react-router-dom";

export function BurgerMenu({ pages }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      {showMenu ? (
        <div
          className="burger-menu-backdrop"
          onClick={() => setShowMenu(false)}></div>
      ) : null}
      <div className="burger-menu-container">
        <button
          onClick={() => {
            setShowMenu(true);
          }}>
          <img src="/hamburger_menu.svg" alt="open menu" />
        </button>

        {showMenu ? (
          <div className="burger-menu-modal">
            <button
              className="burger-menu-close"
              onClick={() => {
                setShowMenu(false);
              }}>
              <img src="/close.svg" alt="close menu" />
            </button>
            <ul className="burger-menu-list">
              <li>
                <NavLink to={"/"}>Hem</NavLink>
              </li>
              {pages.map((page) => {
                if (!("label" in page) || page.path === "/") return null;
                return (
                  <li key={page.label}>
                    <NavLink to={page.path}>{page.label}</NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </>
  );
}