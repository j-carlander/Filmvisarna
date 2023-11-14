import { useState } from "react";
import { fetchHelper } from "../../utils/fetchHelper";

export function AdminFetchingNames({ onSetName }) {
  const [inputValue, setInputValue] = useState("");
  const [names, setNames] = useState([]);
  const [newName, setNewName] = useState("");
  const [selectedName, setSelectedName] = useState("");

  async function searchName() {
    if (!inputValue) return;

    const response = await fetchHelper(`/namesearch?q=${inputValue}`, "get");
    if (response.status === 200) {
      const resJson = await response.json();
      console.log(resJson);
      setNames(resJson);
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
      <h2>Sök efter namn</h2>
      <div className="name-container">
        <label>
          <span>Namn:</span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLocaleUpperCase())}
          />
        </label>
        <button type="button" onClick={searchName}>
          Sök
        </button>
      </div>

      <h2>Lägg till nytt namn</h2>
      <div className="name-container">
        <label>
          <span>Nytt namn:</span>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value.toLocaleUpperCase())}
          />
        </label>
        <button type="button" onClick={addNewName}>
          Lägg till
        </button>
      </div>

      <div className="name-container">
        <h3>Resultat - Välj i listan:</h3>
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
      <div>{selectedName && <p>Valt namn: {selectedName}</p>}</div>
    </div>
  );
}
