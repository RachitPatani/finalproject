import React, { useState,useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StyleElement/BusSearch.css'
import { AuthContext } from './AuthContext';

const BusSearch = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [busDate, setBusDate] = useState('');
  const [buses, setBuses] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate(); // Use navigate hook for redirection

  const handleSearch = () => {
    axios.get('http://localhost:8080/bus/search', {
      params: {
        from: from,
        to: to,
        busDate: busDate
      }
    })
      .then((response) => {
        setBuses(response.data);
        setError(null);
      })
      .catch((error) => {
        setError('Error fetching bus details. Please try again.');
        console.error('There was an error!', error);
      });
  };

  const handleBook = (busId) => {
    // Redirect to the booking form with the busId
    navigate(`/busbooking/${busId}`);
  };

  return (
    <div>
      <h2>Search for Buses</h2>
      <div>
        <div style={{textAlign:"center",padding:"2px",width: "50%",	margin: "auto"}}>

        <label><b> Source</b></label>
        <input type="text"  value={from} onChange={(e) => setFrom(e.target.value)} />

        <label><b> Destination</b></label>
        <input type="text"  value={to} onChange={(e) => setTo(e.target.value)} />

        <label><b>Date</b></label>
        <input type="date"  value={busDate} onChange={(e) => setBusDate(e.target.value)} />
        <p></p>

        <button onClick={handleSearch}>Search Buses</button>
      </div>

        </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {buses.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Bus Name</th>
              <th>From</th>
              <th>To</th>
              <th>Date</th>
              <th>Time</th>
              <th>Cost</th>
              <th>Total Seats</th>
              <th>Booked Seats</th>
              <th>Action</th> {/* Add a new column for the booking button */}
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr key={bus.id}>
                <td>{bus.busName}</td>
                <td>{bus.from}</td>
                <td>{bus.to}</td>
                <td>{bus.busDate}</td>
                <td>{bus.time}</td>
                <td>{bus.cost}</td>
                <td>{bus.tseats}</td>
                <td>{bus.bseats}</td>
                <td>
                  {
                    user?(

                      <button onClick={() => handleBook(bus.id)}>Book Bus</button> 
                    ):(<button onClick={()=>navigate('/login')}>Login</button> )
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No buses found</div>
      )}
    </div>
  );
};

export default BusSearch;