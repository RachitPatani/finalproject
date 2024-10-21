import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./StyleElement/BusSearchResults.css"; // Include this CSS file

function BusSearchResults() {
  const [open, setOpen] = useState(false);
  const [buses, setBuses] = useState([]);
  const [error, setError] = useState(null);
  const [filterDate, setFilterDate] = useState(""); // State for filtering by date
  const [sortByCost, setSortByCost] = useState(""); // State for sorting by cost
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

  const handleSortChange = (e, value) => {
    setSortByCost(value);
    console.log(value); // Update sorting option
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
      <Typography variant="h4" gutterBottom>
        Filters
      </Typography>
      <Typography variant="h5" gutterBottom>
        Sort By Cost
      </Typography>
      <ListItem key="Low to High" disablePadding>
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
    </Box>
  );

  return (
    <div className="bus-search-page">
      <div className="bus-results-container">
        <h2>
          Bus Results from {from} to {to} on {busDate}
          <br />
          <Button style={{ width: "2px" }} onClick={toggleDrawer(true)}>Filters</Button>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </h2>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {buses.length > 0 ? (
          <div className="bus-cards-wrapper">
            {buses.map((bus) => (
              <div className="bus-card" key={bus.id}>
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
                    </p>
                    <p className="bus-price"><strong>Price:</strong> {bus.cost}</p>
                  </div>
                </div>
                <span><button
                  className="book-button"
                  onClick={() => handleBook(bus.id)}
                >
                  Book Bus
                </button>
                </span>
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