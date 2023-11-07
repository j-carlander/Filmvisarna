
export function UserBookingsHistoryCard({ bookingData }) {
    
      
        const dateArr = bookingData.date.split(". kl: ");
      
        const time = dateArr[1];
      
        const day = dateArr[0];
      
        return (
          <li className="user-booking">
            <div className="booking-info-hist">
              <p>{bookingData.title},</p>
              <p>{time},</p> 
              <p>{day}</p>
            </div>
          </li>
        );
}