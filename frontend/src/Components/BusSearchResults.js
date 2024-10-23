import React, { useState, useEffect, useContext } from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal'; // Import Modal from MUI
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext"; 
import axios from "axios";
import "./StyleElement/BusSearchResults.css"; 

function BusSearchResults() {
    const today = new Date().toISOString().split('T')[0];
  const [open, setOpen] = useState(false);
  const [buses, setBuses] = useState([]);
  const [error, setError] = useState(null);
  const [filterDate, setFilterDate] = useState(""); 
  const [sortByCost, setSortByCost] = useState(""); 
  const [sortBySeats, setSortBySeats] = useState(""); // State for sorting by seat availability
  const [from, setFrom] = useState(""); 
  const [to, setTo] = useState(""); 
  const [busDate, setBusDate] = useState(""); 
  const location = useLocation();
  const navigate = useNavigate();

  const [fullBusModalOpen, setFullBusModalOpen] = useState(false); // State for full bus modal

  const { isAuthenticated } = useContext(AuthContext); 

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setFrom(searchParams.get("from") || "");
    setTo(searchParams.get("to") || "");
    setBusDate(searchParams.get("busDate") || "");
  }, [location.search]);

  const fetchBuses = (filterDate, sortByCost, sortBySeats) => {
    axios
      .get("http://localhost:8080/bus/search", {
        params: {
          from,
          to,
          busDate,
          filterDate,
          sortByCost,
        },
      })
      .then((response) => {
        let sortedBuses = response.data;

        // Sort buses based on seat availability
        if (sortBySeats === "most") {
          sortedBuses = sortedBuses.sort((a, b) => (b.tseats - b.bseats) - (a.tseats - a.bseats)); // Most available seats
        } else if (sortBySeats === "least") {
          sortedBuses = sortedBuses.sort((a, b) => (a.tseats - a.bseats) - (b.tseats - b.bseats)); // Fewest available seats
        }

        setBuses(sortedBuses);
        setError(null);
      })
      .catch((error) => {
        setError("Error fetching bus details. Please try again.");
        console.error("There was an error!", error);
      });
  };

  useEffect(() => {
    fetchBuses(filterDate, sortByCost, sortBySeats);
  }, [from, to, busDate, filterDate, sortByCost, sortBySeats]);

  const handleBook = (bus) => {
    if (bus.bseats >= bus.tseats) {
      setFullBusModalOpen(true); // Open modal if the bus is fully booked
    } else {
      if (!isAuthenticated) {
        navigate('/login');
      } else {
        navigate(`/busbooking/${bus.id}`);
      }
    }
  };

  const handleSortChange = (e, value) => {
    setSortByCost(value);
  };

  const handleSeatSortChange = (value) => {
    setSortBySeats(value);
  };

  const toggleDrawer = (newOpen) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <Typography variant="h4" gutterBottom style={{textAlign:'center'}}>
        Filters
      </Typography>
      <Divider />
      <Typography variant="h5" gutterBottom style={{textAlign:'center'}}>
        Sort By Cost
      </Typography>
      <Divider />
      <ListItem key="Low to High" disablePadding >
        <ListItemButton onClick={(e) => handleSortChange(e, 'asc')}>
          <ListItemText primary="Low to High" />
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem key="High to Low" disablePadding>
        <ListItemButton onClick={(e) => handleSortChange(e, 'desc')}>
          <ListItemText primary="High to Low" />
        </ListItemButton>
      </ListItem>
      <Divider />
      
      <Typography variant="h5" gutterBottom style={{textAlign:'center'}}>
        Sort By Seats
      </Typography>
      <ListItem key="Most Available Seats" disablePadding>
        <ListItemButton onClick={() => handleSeatSortChange('most')}>
          <ListItemText primary="Most Available Seats" />
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem key="Fewest Available Seats" disablePadding>
        <ListItemButton onClick={() => handleSeatSortChange('least')}>
          <ListItemText primary="Fewest Available Seats" />
        </ListItemButton>
      </ListItem>
    </Box>
  );

  const handleSearch = () => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.append("from", from);
    newSearchParams.append("to", to);
    newSearchParams.append("busDate", busDate);
    navigate(`/bus-search-results?${newSearchParams.toString()}`);
  };

  return (
    <div className="bus-search-page">
      <div className="bus-results-container">
        <h2 style={{textAlign:"center",marginTop:"3%"}}>Bus Results</h2>
        <br />

        <div className="search-bar">
          <input
            type="text"
            placeholder="From"
            className="input-field location-input"
            value={from}
            onChange={(e) => setFrom(e.target.value.toLowerCase())}
          />
          <input
            type="text"
            placeholder="To"
            className="input-field location-input"
            value={to}
            onChange={(e) => setTo(e.target.value.toLowerCase())}
          />
          <input
            type="date"
            value={busDate}
            className="input-field date-input"
            min={today}

            onChange={(e) => setBusDate(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>Modify</button>
        </div>

        
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>

        {buses.length > 0 ? (
          <div className="bus-cards-wrapper">
            <div className="filter-button" style={{width:"fit-content"}}>
          <Button onClick={toggleDrawer(true)}>Filters</Button>
        </div>
            {buses.map((bus) => (
              <div className="bus-new-card" key={bus.id}>
                <div className="bus-details">
                  <h3 className="bus-name">{bus.busName.toUpperCase()}</h3>
                  <div className="bus-info">
                    <p className="bus-route">
                      <strong>From:</strong> {bus.from.toUpperCase()} | <strong>To:</strong> {bus.to.toUpperCase()}
                    </p>
                    <p className="bus-date-time">
                      <strong>Date:</strong> {bus.busDate} | <strong>Time:</strong> {bus.time}
                    </p>
                    <p className="bus-seats">
                      <strong>Total Seats:</strong> {bus.tseats} | <strong>Booked:</strong> {bus.bseats}
                      |<strong>Available:</strong> {bus.tseats - bus.bseats}
                    </p>
                    <p className="bus-price"><strong>Price:</strong> {bus.cost}</p>
                  </div>
                </div>
                <span>
                    {!isAuthenticated?(<>
                  <button
                  className="book-bus-button-login"
                  onClick={() => handleBook(bus)}>
                    Login To Book
                  </button>
                      </>):
                      <>
                      <button
                      className="book-bus-button-book" 
                      onClick={() => handleBook(bus)}>
                        Book
                      </button>
                          </>

                    }
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div>No buses found for your search criteria.</div>
        )}

        {/* Modal for full bus warning */}
        <Modal open={fullBusModalOpen} onClose={() => setFullBusModalOpen(false)}>
          <Box className="modal-box">
            <Typography variant="h6" component="h2">
              Bus Full
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Sorry, this bus is fully booked. Please select another bus.
            </Typography>
            <Button variant="contained" onClick={() => setFullBusModalOpen(false)} sx={{ mt: 2 }}>
              Close
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default BusSearchResults;
