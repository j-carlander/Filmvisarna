import { useState } from "react";

export function AdminPage() {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <header className="admin-page-header">
        <h1 className="admin-page-title">Filmvisarna - Administrationssida</h1>
        <form className="admin-page-search-form">
          <h2 className="admin-page-search-title">Sök efter bokningsnummer</h2>
          <input
            className="admin-page-search-input"
            type="text"
            placeholder="Sök bokningsnummer..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="admin-page-search-btn">Sök</button>
        </form>
      </header>
      <article>Display the result here</article>
    </>
  );
}
