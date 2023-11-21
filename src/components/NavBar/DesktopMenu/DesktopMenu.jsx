/**
 * Component for desktopmenu (desktop view)
 * links for each page, and it includes additional links 
 * provided by the ControlledLinks component based on the 
 * user's authentication status and role.
 */

import { NavLink } from "react-router-dom";
import { ControlledLinks } from "../ControlledLinks/ControlledLinks";

export function DesktopMenu({ pages }) {
  return (
    <ul className="desktop-menu-list">
      {pages.map((page) => {
        if (!("label" in page)) return null;
        return (
          <li key={page.label}>
            <NavLink to={page.path}>{page.label}</NavLink>
          </li>
        );
      })}
      <ControlledLinks />
    </ul>
  );
}
