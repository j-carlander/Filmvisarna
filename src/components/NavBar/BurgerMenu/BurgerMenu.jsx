/**
 * Component for burgermenu (mobile view)
 * Toggled open and close
 * Changes in the location to automatically close the 
 * menu when navigating to a new page
 * links for each page, and it includes additional links 
 * provided by the ControlledLinks component based on the 
 * user's authentication status and role.
 */

import { useEffect } from "react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ControlledLinks } from "../ControlledLinks/ControlledLinks";

export function BurgerMenu({ pages }) {
  const [showMenu, setShowMenu] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setShowMenu(false);
  }, [location, setShowMenu]);

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
              <ControlledLinks />
            </ul>
          </div>
        ) : null}
      </div>
    </>
  );
}
