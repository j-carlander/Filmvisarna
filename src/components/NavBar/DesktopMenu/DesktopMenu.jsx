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
