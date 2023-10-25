import { useState } from "react";
import { fetchHelper } from "../../utils/fetchHelper";
import { AdminDisplayBooking } from "../../components/AdminDisplayBooking/AdminDisplayBooking";

export function AdminPage() {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState();

  async function searchBooking(e) {
    e.preventDefault();

    if (!inputValue) return;

    const res = await fetchHelper(
      `/bookinginfo?bookingNumber=${inputValue}`,
      "GET"
    );
    if (res.status === 200) {
      const resJson = await res.json();
      console.log(resJson);
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
    <>
      <header className="admin-page-header">
        <h1 className="admin-page-title">Filmvisarna - Administrationssida</h1>
        <form className="admin-page-search-form" onSubmit={searchBooking}>
          <h2 className="admin-page-search-title">Sök efter bokningsnummer</h2>
          <div className="admin-page-relative-input">
            <input
              className="admin-page-search-input"
              type="text"
              placeholder="Sök bokningsnummer..."
              value={inputValue}
              onChange={(e) =>
                setInputValue(e.target.value.toLocaleUpperCase())
              }
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
      </header>
      <AdminDisplayBooking result={result} />
    </>
  );
}
