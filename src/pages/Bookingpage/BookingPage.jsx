// TODO: Import användarens prefered movie från filmdetaljsidan
//       Se till att du har states som hanterar priserna för ordinarie, pensionärer

import React, { useState } from 'react';
// import Seat from '../../components/Seats/Seat/Seat';

function BookingPage() {
  const [ordinariePris, setOrdinariePris] = useState(140);
  const [pensionärPris, setPensionärPris] = useState(120);
  const [barnPris, setBarnPris] = useState(80);

  const [ordinarieAntal, setOrdinarieAntal] = useState(0);
  const [pensionärAntal, setPensionärAntal] = useState(0);
  const [barnAntal, setBarnAntal] = useState(0);

  const totalPris =
    (ordinariePris * ordinarieAntal) + (pensionärPris * pensionärAntal) + (barnPris * barnAntal);

  return (
    <>
      <div className="Bookingpage-container">
        <h3>Barbie 1t:54m - <p>7+</p></h3>
        <h3>Lördag kl 20:00 - <p>Stora Visaren, Slut ca kl 22:00</p></h3>
        
        <h1>Välj antal biljetter</h1>
        <div className="ticket-wrapper">
          <p>Ordinarie ({ordinariePris}kr)</p>
          <div className="btn-container">
            <button onClick={() => setOrdinarieAntal(ordinarieAntal + 1)}>+</button>
            <p>{ordinarieAntal}</p>
            <button onClick={() => setOrdinarieAntal(ordinarieAntal - 1)}>-</button>
          </div>
          <p>Pensionär ({pensionärPris}kr)</p>
          <div className="btn-container">
            <button onClick={() => setPensionärAntal(pensionärAntal + 1)}>+</button>
            <p>{pensionärAntal}</p>
            <button onClick={() => setPensionärAntal(pensionärAntal - 1)}>-</button>
          </div>
          <p>Barn ({barnPris}kr)</p>
          <div className="btn-container">
            <button onClick={() => setBarnAntal(barnAntal + 1)}>+</button>
            <p>{barnAntal}</p>
            <button onClick={() => setBarnAntal(barnAntal - 1)}>-</button>
          </div>
        </div>
        <p>Totalt pris: {totalPris} kr</p>

        {/* Importera seats */}
        <div className="seat-section">
          <h2>Välj platser</h2>
          {/* <Seat /> */}
          <p>Vald plats: rad 1 plats 1-2</p>
          <button>Boka biljett</button>
        </div>
      </div>
    </>
  );
}

export default BookingPage;
