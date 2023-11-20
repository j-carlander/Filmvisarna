import { useState } from "react";
import { Navigate, useOutletContext } from "react-router-dom";
import { fetchHelper } from "../../utils/fetchHelper";
import { AdminDisplayUser } from "../../components/AdminDisplayUser/AdminDisplayUser.jsx";

export function AdminHandleUserPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [role] = useOutletContext();

  if (role !== "super") {
    return <Navigate to={"/admin"} />;
  }

  async function searchUser(e) {
    e.preventDefault();
    const res = await fetchHelper(`/users?q=${inputValue}`, "GET");
    if (res.status === 200) {
      const resJson = await res.json();
      setSearchResults(resJson);
    }
  }

  function resetForm() {
    setInputValue("");
  }

  return (
    <article className="admin-page-search-container">
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
            onChange={(e) => setInputValue(e.target.value)}
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
      <div className="admin-page-search-result">
        {searchResults.length > 0 && (
          <h3 className="admin-search-result-title">Resultat för sökning:</h3>
        )}
        {searchResults.map((userResult, index) => (
          <AdminDisplayUser key={index} userResult={userResult} />
        ))}
      </div>
    </article>
  );
}
