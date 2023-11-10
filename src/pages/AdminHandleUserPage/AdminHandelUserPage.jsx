import { useState } from "react";
import { Navigate, useOutletContext } from "react-router-dom";

export function AdminHandleUserPage() {
  const [inputValue, setInputValue] = useState("");
  const [role] = useOutletContext();

  if (role !== "super") {
    return <Navigate to={"/admin"} />;
  }

  function searchUser(e) {
    e.preventDeafult();
    // TODO: fetch function for fetching user task 24.6
  }

  function resetForm() {
    setInputValue("");
  }
  return (
    <article>
      <h2 className="admin-page-search-title">Sök efter en användare</h2>
      <form className="admin-page-search-form" onSubmit={searchUser}>
        <div className="admin-page-relative-input">
          <label className="search-label" htmlFor="searchQuery">
            Sök på namn eller email
          </label>
          <input
            className="admin-page-search-input"
            id="searchQuery"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLocaleUpperCase())}
          />
          {inputValue ? (
            <button
              className="admin-page-reset-btn"
              type="button"
              onClick={resetForm}>
              &#x2715;
            </button>
          ) : null}
        </div>
        <button type="submit" className="admin-page-search-btn">
          Sök
        </button>
      </form>
      {/* TODO: add component for user info */}
    </article>
  );
}
