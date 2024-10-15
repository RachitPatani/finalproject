import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./StyleElement/AdminDashboard.css"; // Create or update this CSS file for styling
import { AuthContext } from "./AuthContext";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [buses, setBuses] = useState([]); // To store bus list
  const [newBus, setNewBus] = useState({
    // To handle adding new buses
    busName: "",
    from: "",
    to: "",
    cost: "",
    busDate: "",
    time: "",
    tseats: "",
    bseats: "",
  });
  const [editBus, setEditBus] = useState(null); // To handle updating buses
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const today = new Date();

  useEffect(() => {
    // Fetch buses from the backend
    const fetchBuses = async () => {
      if (!user) {
        setLoading(false);
        setError(
          <h1 style={{ alignContent: "center" }}>
            Please log in to access your Admindashboard.
          </h1>
        );
        return;
      }
      if (user.role === "user") {
        setLoading(false);
        setError(
          <h1 style={{ alignContent: "center" }}>
            Dont have acces to admindashboard
          </h1>
        );
        return;
      }
      try {
        const response = await axios.get("http://localhost:8080/bus/all"); // Replace with your actual endpoint
        setBuses(response.data);
        // console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching buses");
        setLoading(false);
      }
    };

    fetchBuses();
  });
  const validateNewBusForm = () => {
    const { busName, from, to, cost, busDate, tseats, bseats, time } = newBus;
    // Validate all fields and check if booked seats are less than or equal to total seats
    return (
      busName && from && to && cost && busDate && time &&
      (tseats > 0) && (bseats >= 0 )&& (bseats <= tseats)
    );
  };

  const validateEditBusForm = () => {
    const { busName, from, to, cost, busDate, tseats, bseats, time } = editBus || {};
    // Validate all fields and check if booked seats are less than or equal to total seats
    return (
      busName && from && to && cost && busDate && time &&
      tseats > 0 && bseats >= 0 && bseats <= tseats
    );
  };

  const handleInputChange = (e) => {
    setNewBus({
      ...newBus,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddBus = (e) => {
    e.preventDefault();

    if (newBus.tseats <= 0) {
      alert("Total seats must be greater than 0");
      return;
    }

    // Validate that busDate is not in the past

    const selectedDate = new Date(newBus.busDate);

    // Check if selectedDate is before today
    if (selectedDate < today.setHours(0, 0, 0, 0)) {
      alert("Bus date cannot be in the past");
      return;
    }

    console.log(newBus);
    axios
      .post("http://localhost:8080/bus/add", newBus)
      .then((response) => {
        setBuses([...buses, response.data]); // Add new bus to the list
        setNewBus({
          busName: "",
          from: "",
          to: "",
          cost: "",
          busDate: "",
          time: "",
          tseats: "",
          bseats: "",
        }); // Reset the form
      })
      .catch((error) => {
        console.error("Error adding bus:", error);
      });
  };

  const handleDeleteBus = (busId) => {
    axios
      .delete(`http://localhost:8080/busdelete/${busId}`)
      .then(() => {
        setBuses(buses.filter((bus) => bus.id !== busId)); // Remove bus from the list
      })
      .catch((error) => {
        console.error("Error deleting bus:", error);
      });
  };

  const handleEditBus = (bus) => {
    setEditBus(bus); // Set bus to be edited in form
  };

  const handleUpdateBus = (e) => {
    e.preventDefault();
    // Add http:// to the PUT request URL
    axios
      .put(`http://localhost:8080/busupdate/${editBus.id}`, editBus)
      .then((response) => {
        setBuses(
          buses.map((bus) => (bus.id === editBus.id ? response.data : bus))
        ); // Update bus in the list
        setEditBus(null); // Clear the edit form
      })
      .catch((error) => {
        console.error("Error updating bus:", error);
      });
  };

  const handleEditInputChange = (e) => {
    setEditBus({
      ...editBus,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return <p>Loading buses...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {/* Add Bus Form */}
      <div className="form-container">
        <div className="form-container">
        <div className="add-bus-form">
        <h3 >
            Add New Bus
          </h3>
          <div style={{ display: "block", justifyContent: "center" }}>

          
          </div>

          <form onSubmit={handleAddBus}>
            <input
              type="text"
              name="busName"
              placeholder="Bus Name"
              value={newBus.busName}
              onChange={handleInputChange}
              required
            />
            <p />
            <input
              type="text"
              name="from"
              placeholder="From"
              value={newBus.from}
              onChange={handleInputChange}
              required
            />
            <p />
            <input
              type="text"
              name="to"
              placeholder="To"
              value={newBus.to}
              onChange={handleInputChange}
              required
            />
            <p />
            <input
              type="number"
              name="cost"
              placeholder="Cost"
              value={newBus.cost}
              onChange={handleInputChange}
              required
            />
            <p />
            <input
              type="date"
              name="busDate"
              min={today}
              placeholder="Bus Date"
              value={newBus.busDate}
              onChange={handleInputChange}
              required
            />
            <p />
            <input
              type="time"
              name="time"
              placeholder="time"
              value={newBus.time}
              onChange={handleInputChange}
              required
            />
            <p />
            <input
              type="number"
              name="bseats"
              placeholder="Booked Seats"
              value={newBus.bseats}
              onChange={handleInputChange}
              required
            />
            <p />
            <input
              type="number"
              name="tseats"
              placeholder="Total Seats"
              value={newBus.tseats}
              onChange={handleInputChange}
              required
            />
            <p />
            <button type="submit" disabled={!validateNewBusForm()}>Add Bus</button>
          </form>
          </div>

          {/* Edit Bus Form */}
          {editBus && (
            <div>
              <div style={{ display: "block", justifyContent: "center" }}>
                {" "}
                
              </div>
              <div className="edit-bus-form">
              <h3 style={{ display: "flex", justifyContent: "center" }}>
                  Edit Bus
                </h3>
                <br></br>
                <form onSubmit={handleUpdateBus}>
                  <input
                    type="text"
                    name="busName"
                    placeholder="Bus Name"
                    value={editBus.busName}
                    onChange={handleEditInputChange}
                    required
                  />
                  <p/>
                  <input
                    type="text"
                    name="from"
                    placeholder="From"
                    value={editBus.from}
                    onChange={handleEditInputChange}
                    required
                  />
                  <p/>
                  <input
                    type="text"
                    name="to"
                    placeholder="To"
                    value={editBus.to}
                    onChange={handleEditInputChange}
                    required
                  />
                  <p/>
                  <input
                    type="number"
                    name="cost"
                    placeholder="Cost"
                    value={editBus.cost}
                    onChange={handleEditInputChange}
                    required
                  />
                  <p/>
                  <input
                    type="date"
                    name="busDate"
                    placeholder="Bus Date"
                    value={editBus.busDate}
                    onChange={handleEditInputChange}
                    required
                  />
                  <p/>
                  <input
                    type="text"
                    name="time"
                    placeholder="time"
                    value={editBus.time}
                    onChange={handleEditInputChange}
                    required
                  />
                  <p/>
                  <input
                    type="number"
                    name="bseats"
                    placeholder="Booked Seats"
                    value={editBus.bseats}
                    onChange={handleEditInputChange}
                    required
                  />
                  <p/>
                  <input
                    type="number"
                    name="tseats"
                    placeholder="Total Seats"
                    value={editBus.tseats}
                    onChange={handleEditInputChange}
                    required
                  />
                  <p/>

                  <button disabled={!validateEditBusForm()} type="submit">Update Bus</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bus List */}
      <div className="bus-list">
        <h3>Bus List</h3>
        {buses.length > 0 ? (
          <table className="bus-table">
            <thead>
              <tr>
                <th>Bus ID</th>
                <th>Bus Name</th>
                <th>From</th>
                <th>To</th>
                <th>Cost</th>
                <th>Date</th>
                <th>Time</th>
                <th>Booked Seats</th>
                <th>Total Seats</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {buses.map((bus) => (
                <tr key={bus.id}>
                  <td>{bus.id}</td>
                  <td>{bus.busName}</td>
                  <td>{bus.from}</td>
                  <td>{bus.to}</td>
                  <td>{bus.cost}</td>
                  <td>{bus.busDate}</td>
                  <td>{bus.time}</td>
                  <td>{bus.bseats}</td>
                  <td>{bus.tseats}</td>

                  <td>
                    <button
                      className="editbutton"
                      onClick={() => handleEditBus(bus)}
                    >
                      Edit
                    </button>
                    <p></p>
                    <button
                      className="deletebutton"
                      onClick={() => handleDeleteBus(bus.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No buses available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
