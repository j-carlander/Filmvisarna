import React, { useState } from 'react';
import Seat from '../../components/Seats/Seat/Seat';

function BookingPage() {
  const [ordinariePris, setOrdinariePris] = useState(140);
  const [pensionärPris, setPensionärPris] = useState(120);
  const [barnPris, setBarnPris] = useState(80);

  const [ordinarieAntal, setOrdinarieAntal] = useState(0);
  const [pensionärAntal, setPensionärAntal] = useState(0);
  const [barnAntal, setBarnAntal] = useState(0);

  const totalPris =
    (ordinariePris * ordinarieAntal) + (pensionärPris * pensionärAntal) + (barnPris * barnAntal);

    if(barnAntal < 0){
      setBarnAntal(0)
    }

    if(pensionärAntal < 0){
      setPensionärAntal(0)
    }

    if(ordinarieAntal < 0){
      setOrdinarieAntal(0)
    }
  return (
    <>
      <div className="Bookingpage-container">
        <div className="header-content">
          <h3>Barbie 1t:54m - <p>7+</p></h3>
          <h3>Lördag kl 20:00 - <p>Stora Visaren, Slut ca kl 22:00</p></h3>
        </div>
        
        <div className="ticket-wrapper">
          <h1>Välj antal biljetter</h1>
          <div className="btn-container">
            <p>Ordinarie ({ordinariePris}kr)</p>
            <button onClick={() => setOrdinarieAntal(ordinarieAntal + 1)}>+</button>
            <p>{ordinarieAntal}</p>
            <button onClick={() => setOrdinarieAntal(ordinarieAntal - 1)}>-</button>
          </div>
          <div className="btn-container">
          <p>Pensionär ({pensionärPris}kr)</p>
            <button onClick={() => setPensionärAntal(pensionärAntal + 1)}>+</button>
            <p>{pensionärAntal}</p>
            <button onClick={() => setPensionärAntal(pensionärAntal - 1)}>-</button>
          </div>
          <div className="btn-container">
            <p>Barn ({barnPris}kr)</p>
            <button onClick={() => setBarnAntal(barnAntal + 1)}>+</button>
            <p>{barnAntal}</p>
            <button onClick={() => setBarnAntal(barnAntal - 1)}>-</button>
          </div>
          <p className='sum'>Totalt kostnad: {totalPris} kr</p>
        </div>

        {/* Importera seats */}
        <div className="seat-section">
          <h2>Välj platser</h2>
          <Seat />
          <p>Vald plats: rad 1 plats 1-2</p>
          <button>Boka biljett</button>
        </div>
      </div>
    </>
  );
}

export default BookingPage;
