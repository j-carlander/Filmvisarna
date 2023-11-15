import { useState } from "react";
import { AdminDisplayBooking } from "../../components/AdminDisplayBooking/AdminDisplayBooking";
import { fetchHelper } from "../../utils/fetchHelper";

export function AdminSearchBookingPage() {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState();
  async function searchBooking(e) {
    e.preventDefault();

    if (!inputValue) return;

    const res = await fetchHelper(`/bookinginfo?q=${inputValue}`, "GET");
    if (res.status === 200) {
      const resJson = await res.json();
      return setResult(resJson[0]);
    }

    setResult({
      error:
        "Ogiltigt bokingsnummer, kontrollera bokningsnumret och försök igen!",
    });
  }

  function resetForm() {
    setInputValue("");
    setResult(undefined);
  }
  return (
    <article>
      <h2 className="admin-page-search-title">Sök efter bokning</h2>
      <form className="admin-page-search-form" onSubmit={searchBooking}>
        <div className="admin-page-relative-input">
          <label className="search-label" htmlFor="searchQuery">
            Sök på bokningsnummer eller email
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
      <AdminDisplayBooking result={result} />
    </article>
  );
}
