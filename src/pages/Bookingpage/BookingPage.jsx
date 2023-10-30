import React from 'react';
import { Seats } from '../../components/Seats/Seats';
import TicketPicker from '../../components/TicketPicker/TicketPicker';

function BookingPage() {
  return (
    <div className="Bookingpage-container">
      <div className="header-content">
        <div className="seaction-header">
          {/* Image */}
          <h3>Midnight in Paris 1t:54m - <p>7+</p></h3>
        </div>
          <div className="seaction-header2">
            <h3>Lördag kl 20:00 - <p>Stora Visaren, Slut ca kl 22:00</p></h3>
          </div>
      </div>

      <TicketPicker />

      <div className="seat-section">
        <div className="section-1">
          <h2>Välj platser</h2>
          <Seats />
        </div>
        <div className="section-2">
          <p>Vald plats: rad 1 plats 1-2</p>
          <button>Boka biljett</button>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
