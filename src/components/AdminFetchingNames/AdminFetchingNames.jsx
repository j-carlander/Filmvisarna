/**
 * Component for fetching or adding names
 * searchName searches for names using input
 * addNewName sends a fetch request to add a new name into the database
 */

import { useState } from "react";
import { fetchHelper } from "../../utils/fetchHelper";

export function AdminFetchingNames({ onSetName }) {
  const [inputValue, setInputValue] = useState("");
  const [names, setNames] = useState([]);
  const [newName, setNewName] = useState("");
  const [foundNames, setFoundNames] = useState(true);

  async function searchName() {
    if (!inputValue) return;

    const response = await fetchHelper(`/namesearch?q=${inputValue}`, "get");
    if (response.status === 200) {
      const resJson = await response.json();
      setNames(resJson);
      setFoundNames(resJson.length > 0);
    }
  }

  async function addNewName() {
    if (!newName) return;

    if (names.some((name) => name === newName)) {
      return;
    }

    const response = await fetchHelper(`/addname?name=${newName}`, "POST", {
      name: newName,
    });
    const resJson = await response.json();
    if (response.status < 400) {
      setNames([...names, resJson]);
      setNewName("");
    } else {
      setNewName(resJson.error);
    }
  }

  function handleNameSelect() {
    setInputValue("");
  }

  function onKeyDown(key, callback) {
    if (key === "Enter") {
      callback();
    }
  }

  return (
    <div className="name-search-container">
      <div className="name-container">
        <label>
          <span>Sök efter namn:</span>
          <input
            type="text"
            value={inputValue}
            placeholder="Skriv ett namn..."
            onKeyDown={(e) => onKeyDown(e.key, searchName)}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </label>
        <button type="button" onClick={searchName}>
          Sök
        </button>
      </div>

      <div className="name-container">
        <label>
          <span>Lägg till nytt namn:</span>
          <input
            type="text"
            value={newName}
            placeholder="Skriv ett namn..."
            onKeyDown={(e) => onKeyDown(e.key, addNewName)}
            onChange={(e) => setNewName(e.target.value)}
          />
        </label>
        <button type="button" onClick={addNewName}>
          Lägg till
        </button>
      </div>

      {!foundNames && (
        <span className="not-found-text">
          Vi hittade inga namn på den sökningen
        </span>
      )}
      {names.length > 0 && (
        <div className="name-container">
          <h4>Resultat - Välj i listan:</h4>
          <ul>
            {names.map((nameVal, index) => (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => {
                    handleNameSelect();
                    onSetName(nameVal);
                  }}>
                  {nameVal.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
