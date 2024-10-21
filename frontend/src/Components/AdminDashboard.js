import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./StyleElement/AdminDashboard.css";
import { AuthContext } from "./AuthContext";
const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [buses, setBuses] = useState([]);
  const [newBus, setNewBus] = useState({
    busName: "",
    from: "",
    to: "",
    cost: "",
    busDate: "",
    time: "",
    tseats: "",
    bseats: "",
  });
  const [editBus, setEditBus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const today = new Date().toISOString().split("T")[0];
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  useEffect(() => {
    const fetchBuses = async () => {
      if (!user) {
        setLoading(false);
        setError("Please log in to access your Admin Dashboard.");
        return;
      }
      if (user.role !== "admin") {
        setLoading(false);
        setError("You don't have access to Admin Dashboard.");
        return;
      }
      try {
        const response = await axios.get("http://localhost:8080/bus/all");
        setBuses(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching buses");
        setLoading(false);
      }
    };
    fetchBuses();
  }, [user]);
  const handleInputChange = (e) => {
    setNewBus({
      ...newBus,
      [e.target.name]: e.target.value,
    });
  };
  const handleAddBus = (e) => {
    e.preventDefault();
    const selectedDate = new Date(newBus.busDate);
    if (selectedDate < new Date(today)) {
      alert("Bus date cannot be in the past.");
      return;
    }
    axios
      .post("http://localhost:8080/bus/add", newBus)
      .then((response) => {
        setBuses([...buses, response.data]);
        setShowAddModal(false);
        setNewBus({
          busName: "",
          from: "",
          to: "",
          cost: "",
          busDate: "",
          time: "",
          tseats: "",
          bseats: "",
        });
      })
      .catch((error) => {
        console.error("Error adding bus:", error);
      });
  };
  const handleDeleteBus = (busId) => {
    axios
      .delete(`http://localhost:8080/busdelete/${busId}`)
      .then(() => {
        setBuses(buses.filter((bus) =>
          bus.id
          !== busId));
      })
      .catch((error) => {
        console.error("Error deleting bus:", error);
      });
  };
  const handleEditBus = (bus) => {
    setEditBus(bus);
    setShowEditModal(true);
  };
  const handleUpdateBus = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/busupdate/${editBus.id
        }`, editBus)
      .then((response) => {
        setBuses(
          buses.map((bus) => (
            bus.id
              ===
              editBus.id
              ? response.data : bus))
        );
        setEditBus(null);
        setShowEditModal(false);
      })
      .catch((error) => {
        console.error("Error updating bus:", error);
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
      <button className="add-button" onClick={() => setShowAddModal(true)}>
        Add Bus
      </button>
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowAddModal(false)}>
              &times;
            </span>
            <h3>Add New Bus</h3>
            <form onSubmit={handleAddBus}>
              {/* Form Inputs for Adding a New Bus */}
              <input
                type="text"
                name="busName"
                placeholder="Bus Name"
                value={newBus.busName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="from"
                placeholder="From"
                value={newBus.from}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="to"
                placeholder="To"
                value={newBus.to}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="cost"
                placeholder="Cost"
                value={newBus.cost}
                onChange={handleInputChange}
                required
              />
              <input
                type="date"
                name="busDate"
                placeholder="Bus Date"
                value={newBus.busDate}
                onChange={handleInputChange}
                required
              />
              <input
                type="time"
                name="time"
                placeholder="Time"
                value={newBus.time}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="tseats"
                placeholder="Total Seats"
                value={newBus.tseats}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="bseats"
                placeholder="Booked Seats"
                value={newBus.bseats}
                onChange={handleInputChange}
                required
              />
              <button type="submit">Add Bus</button>
            </form>
          </div>
        </div>
      )}
      <div className="bus-list">
        <h3>Bus List</h3>
        <div className="bus-cards">
          {buses.map((bus) => (
            <div key={
              bus.id
            } className="bus-card">
              <h4>{bus.busName}</h4>
              <p>From: {bus.from}</p>
              <p>To: {bus.to}</p>
              <p>Cost: {bus.cost}</p>
              <p>Date: {bus.busDate}</p>
              <p>Time: {bus.time}</p>
              <p>Total Seats: {bus.tseats}</p>
              <p>Booked Seats: {bus.bseats}</p>
              <div className="button-group">
                <button
                  className="edit-button"
                  onClick={() => handleEditBus(bus)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteBus(
                    bus.id
                  )}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowEditModal(false)}>
              &times;
            </span>
            <h3>Edit Bus</h3>
            <form onSubmit={handleUpdateBus}>
              {/* Form Inputs for Editing a Bus */}
              <input
                type="text"
                name="busName"
                placeholder="Bus Name"
                value={editBus.busName}
                onChange={(e) =>
                  setEditBus({ ...editBus, busName: e.target.value })
                }
                required
              />
              <input
                type="text"
                name="from"
                placeholder="From"
                value={editBus.from}
                onChange={(e) =>
                  setEditBus({ ...editBus, from: e.target.value })
                }
                required
              />
              <input
                type="text"
                name="to"
                placeholder="To"
                value={editBus.to}
                onChange={(e) => setEditBus({ ...editBus, to: e.target.value })}
                required
              />
              <input
                type="number"
                name="cost"
                placeholder="Cost"
                value={editBus.cost}
                onChange={(e) =>
                  setEditBus({ ...editBus, cost: e.target.value })
                }
                required
              />
              <input
                type="date"
                name="busDate"
                placeholder="Bus Date"
                value={editBus.busDate}
                onChange={(e) =>
                  setEditBus({ ...editBus, busDate: e.target.value })
                }
                required
              />
              <input
                type="time"
                name="time"
                placeholder="Time"
                value={editBus.time}
                onChange={(e) => setEditBus({ ...editBus, time: e.target.value })}
                required
              />
              <input
                type="number"
                name="tseats"
                placeholder="Total Seats"
                value={editBus.tseats}
                onChange={(e) =>
                  setEditBus({ ...editBus, tseats: e.target.value })
                }
                required
              />
              <input
                type="number"
                name="bseats"
                placeholder="Booked Seats"
                value={editBus.bseats}
                onChange={(e) =>
                  setEditBus({ ...editBus, bseats: e.target.value })
                }
                required
              />
              <button type="submit">Update Bus</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminDashboard;