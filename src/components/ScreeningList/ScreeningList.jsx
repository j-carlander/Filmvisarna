// ScreeningsList.jsx

import { useEffect, useState } from 'react';
import { fetchHelper } from '../../utils/fetchHelper';
import ScreeningDetails from './ScreeningDetails';

function ScreeningsList({ movieId }) {
  const [screenings, setScreenings] = useState([]);

  useEffect(() => {
    async function fetchScreenings() {
      const response = await fetchHelper(`/moviescreenings/${movieId}`, 'get');
      const data = await response.json();
      setScreenings(data);
    }

    fetchScreenings();
  }, [movieId]);

  return (
    <section>
        {screenings.map((screening, index) => 
            <ScreeningDetails key={index} screening={screening} />
        )}
    </section>
  );
}

export default ScreeningsList;
