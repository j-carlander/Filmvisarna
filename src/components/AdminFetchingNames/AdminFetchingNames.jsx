import { useState } from "react";
import { fetchHelper } from "../../utils/fetchHelper";

export function AdminFetchingNames({ onSetName }) {
  const [inputValue, setInputValue] = useState("");
  const [names, setNames] = useState([]);
  const [newName, setNewName] = useState("");
  const [selectedName, setSelectedName] = useState("");
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

  function handleNameSelect(name) {
    setSelectedName(name);
    setInputValue("");
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
                    handleNameSelect(nameVal.name);
                    onSetName(nameVal);
                  }}>
                  {nameVal.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* <div>{selectedName && <p>Valt namn: {selectedName}</p>}</div> */}
    </div>
  );
}
