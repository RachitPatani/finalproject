import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./StyleElement/BusSearchResults.css";  // Include this CSS file
function BusSearchResults() {
 const [buses, setBuses] = useState([]);
 const [error, setError] = useState(null);
 const [filterDate, setFilterDate] = useState("");   // State for filtering by date
 const [sortByCost, setSortByCost] = useState("");   // State for sorting by cost
 const location = useLocation();
 const navigate = useNavigate();
 // Extract query parameters from the URL
 const searchParams = new URLSearchParams(location.search);
 const from = searchParams.get("from");
 const to = searchParams.get("to");
 const busDate = searchParams.get("busDate");
 const fetchBuses = (filterDate, sortByCost) => {
   axios
     .get("http://localhost:8080/bus/search", {
       params: {
         from: from,
         to: to,
         busDate: busDate,
         filterDate: filterDate,
         sortByCost: sortByCost,
       },
     })
     .then((response) => {
       setBuses(response.data);
       setError(null);
     })
     .catch((error) => {
       setError("Error fetching bus details. Please try again.");
       console.error("There was an error!", error);
     });
 };
 useEffect(() => {
   fetchBuses(filterDate, sortByCost); // Fetch buses initially
 }, [from, to, busDate, filterDate, sortByCost]);
 const handleBook = (busId) => {
   navigate(`/busbooking/${busId}`);
 };
 const handleFilterChange = (e) => {
   setFilterDate(e.target.value);  // Update filter date
 };
 const handleSortChange = (e) => {
   setSortByCost(e.target.value);  // Update sorting option
 };
 return (
<div className="bus-search-page">
<aside className="filter-sidebar">
<h3>Filter and Sort</h3>
       {/* Filter by Date */}
<div className="filter-section">
<label>Filter by Date:</label>
<input
           type="date"
           value={filterDate}
           onChange={handleFilterChange}
           className="filter-input"
         />
</div>
       {/* Sort by Cost */}
<div className="filter-section">
<label>Sort by Cost:</label>
<select
           value={sortByCost}
           onChange={handleSortChange}
           className="filter-input"
>
<option value="">Select</option>
<option value="asc">Low to High</option>
<option value="desc">High to Low</option>
</select>
</div>
</aside>
<div className="bus-results-container">
<h2>Bus Results from {from} to {to} on {busDate}</h2>
       {error && <div style={{ color: "red" }}>{error}</div>}
       {buses.length > 0 ? (
<div className="bus-cards-wrapper">
           {buses.map((bus) => (
<div className="bus-card" key={bus.id}>
<div className="bus-details">
<h3 className="bus-name">{bus.busName}</h3>
<p className="bus-route">
                   From: {bus.from} | To: {bus.to}
</p>
<p className="bus-date-time">
                   Date: {bus.busDate} | Time: {bus.time}
</p>
<p className="bus-seats">
                   Total Seats: {bus.tseats} | Booked: {bus.bseats}
</p>
<p className="bus-price">Price: {bus.cost}</p>
</div>
<button className="book-button" onClick={() => handleBook(bus.id)}>Book Bus</button>
</div>
           ))}
</div>
       ) : (
<div>No buses found for your search criteria.</div>
       )}
</div>
</div>
 );
}
export default BusSearchResults;