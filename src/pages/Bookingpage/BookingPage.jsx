
import { useParams } from 'react-router-dom';
import { Seats } from '../../components/Seats/Seats';
import TicketPicker from '../../components/TicketPicker/TicketPicker';
import { useEffect } from 'react';
import { fetchHelper } from '../../utils/fetchHelper';
import { useState } from 'react';
import { movieLengthFormatter } from '../../utils/movieLengthFormatter';
import { ageLimitFormatter } from '../../utils/ageLimitFormatter';
import { useNavigate } from 'react-router-dom';

export function BookingPage() {
  const [data, setData] = useState({})
  const {screeningid} = useParams()
  
  const navigate = useNavigate()

  useEffect(() =>{
    async function fectchScreening(screeningid){
      const res = await fetchHelper(`/screening/${screeningid}`, 'get')
      const data = await res.json()
      console.log(data);
      setData(data)
      // fetchHelper()
    }
    fectchScreening(screeningid)
    
  }, [])
  return (
    <div className="Bookingpage-container">
      {/* <div className="header-content"> */}
        <div className="seaction-header">
          {/* Image */}
          <p>{data.title} {movieLengthFormatter(data.durationinminutes)} - <span>{ageLimitFormatter(data.agelimit)}</span></p>
            <p>{data.screeningDate}, <span>{data.theatre}</span></p>
            <p> Slutar ca: {data.endTime}</p>
        </div>
          <div className="seaction-header2">
            <TicketPicker />
          </div>
      {/* </div> */}


      {/* <div className="seat-section"> */}
        <div className="section-1">
          <h2>Välj platser</h2>
          <Seats />
        </div>
        <div className="section-2">
          <p>Vald plats: rad 1 plats 1-2</p>
          <button onClick={() =>{
            navigate(`/bookingconfirmation/${screeningid}`)
          }}>Boka biljett</button>
        </div>
      {/* </div> */}
    </div>
  );
}


