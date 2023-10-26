import { NavLink } from "react-router-dom";

export function DesktopMenu({ pages }) {
  return (
    <ul>
      {pages.map((page) => {
        if (!("label" in page)) return null;
        return (
          <li key={page.label}>
            <NavLink to={page.path}>{page.label}</NavLink>
          </li>
        );
      })}
    </ul>
  );
}