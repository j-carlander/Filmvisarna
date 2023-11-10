import { useState } from "react";
import { adminPages } from "../../main";
import sessionService from "../../utils/sessionService";
import { NavLink, Navigate, Outlet } from "react-router-dom";

export function AdminPage() {
  const [showMenu, setShowMenu] = useState(false);
  const token = sessionService.getToken();
  let role = "user";
  if (token) {
    const payload = atob(token.split(".")[1]);
    role = payload.role;
  }
  if (role === "user") {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <header className="admin-page-header">
        <h1 className="admin-page-title">Filmvisarna - Administrationssida</h1>
      </header>
      <div className="admin-page-wrapper">
        <aside className="admin-page-aside">
          <button
            className="admin-page-show-mobile-menu"
            onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? (
              <img src="/close.svg" alt="close menu" />
            ) : (
              <img src="/hamburger_menu.svg" alt="open menu" />
            )}
          </button>
          <nav
            className={
              showMenu ? "admin-page-nav-open " : "admin-page-nav-close"
            }>
            <ul className="admin-page-nav-list">
              <li>
                {" "}
                <NavLink to={"/"} end className={"admin-navlink"}>
                  Till start
                </NavLink>
              </li>
              {adminPages.map((page) => {
                if (!("label" in page)) return null;
                return (
                  <li key={page.label}>
                    <NavLink
                      to={page.path}
                      className={(isActive) =>
                        isActive ? "active-admin-navlink" : "admin-navlink"
                      }>
                      {page.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
        <main className="admin-page-main">
          <Outlet />
        </main>
      </div>
    </>
  );
}
