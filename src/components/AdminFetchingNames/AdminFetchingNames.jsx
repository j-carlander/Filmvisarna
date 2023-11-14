import { useState } from "react";
import { fetchHelper } from "../../utils/fetchHelper";

export function AdminFetchingNames() {
    const [inputValue, setInputValue] = useState("");
    const [names, setNames] = useState([]);
    const [newName, setNewName] = useState("");
    const [selectedName, setSelectedName] = useState("");

    async function searchName(e) {
        e.preventDefault();

        if (!inputValue) return;

        const response = await fetchHelper(`/namesearch?q=${inputValue}`, "get");
        if (response.status === 200) {
            const resJson = await response.json();
            setNames(resJson)[0];
          }
          setNames({
            error:
              "Ogiltigt namn, kontrollera stavning och försök igen!",
          });
    }

    async function addNewName(e) {
      e.preventDefault();
  
      if (!newName) return;

      if (names.some((name) => name === newName)) {
        return;
      }
  
      const response = await fetchHelper(`/addname?name=${newName}`, "POST", { name: newName, });
        if (response.status === 200) {
            const resJson = await response.json();
            setNewName(resJson);
          }
          setNewName({
            error:
              "Det gick inte att lägga till det nya namnet. Var god försök igen.",
          });

      setNames([...names, newName]);
      setNewName("");
    }

    function handleNameSelect(name) {
      setSelectedName(name);
      setInputValue("");
    }


      return (
        <div>

        <h2>Sök efter namn</h2>
        <form onSubmit={searchName}>
            <label>
            Namn:
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value.toLocaleUpperCase())}
            />
            </label>
            <button type="submit">Sök</button>
        </form>

        <h2>Lägg till nytt namn</h2>
      <form onSubmit={addNewName}>
        <label>
          Nytt namn:
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value.toLocaleUpperCase())}
          />
        </label>
        <button type="submit">Lägg till</button>
      </form>

      <div>
          <h3>Resultat - Välj i listan:</h3>
          <ul>
          {names.map((nameVal, index) => (
            <li key={index}>
              <button onClick={() => handleNameSelect(nameVal.name)}>
                {nameVal.name}
              </button>
            </li>
          ))}
          </ul>
        </div>
        <div>
          {selectedName && <p>Valt namn: {selectedName}</p>}
        </div>

        </div>
      )
}