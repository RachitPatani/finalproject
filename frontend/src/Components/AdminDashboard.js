import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StyleElement/AdminDashboard.css'; // Create or update this CSS file for styling

const AdminDashboard = () => {
  const [buses, setBuses] = useState([]);        // To store bus list
  const [newBus, setNewBus] = useState({         // To handle adding new buses
    busName: '',
    from: '',
    to: '',
    cost: '',    
    busDate: '',
    time:'',
    tseats: '', 
    bseats: ''
  });
  const [editBus, setEditBus] = useState(null);  // To handle updating buses
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch buses from the backend
    const fetchBuses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/bus/all'); // Replace with your actual endpoint
        setBuses(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching buses');
        setLoading(false);
      }
    };

    fetchBuses();
  });

  const handleInputChange = (e) => {
    setNewBus({
      ...newBus,
      [e.target.name]: e.target.value
    });
  };

  const handleAddBus = (e) => {
    e.preventDefault();
    console.log(newBus);
    axios.post('http://localhost:8080/bus/add', newBus)
      .then((response) => {
        setBuses([...buses, response.data]); // Add new bus to the list
        setNewBus({ busName: '', from: '', to: '', cost: '', busDate: '',time:'', tseats: '', bseats: '' }); // Reset the form
      })
      .catch((error) => {
        console.error('Error adding bus:', error);
      });
  };

  const handleDeleteBus = (busId) => {
    axios.delete(`http://localhost:8080/busdelete/${busId}`)
      .then(() => {
        setBuses(buses.filter(bus => bus.id !== busId)); // Remove bus from the list
      })
      .catch((error) => {
        console.error('Error deleting bus:', error);
      });
  };

  const handleEditBus = (bus) => {
    setEditBus(bus); // Set bus to be edited in form
  };

  const handleUpdateBus = (e) => {
    e.preventDefault();
    // Add http:// to the PUT request URL
    axios.put(`http://localhost:8080/busupdate/${editBus.id}`, editBus)
      .then((response) => {
        setBuses(buses.map(bus => (bus.id === editBus.id ? response.data : bus))); // Update bus in the list
        setEditBus(null); // Clear the edit form
      })
      .catch((error) => {
        console.error('Error updating bus:', error);
      });
  };

  const handleEditInputChange = (e) => {
    setEditBus({
      ...editBus,
      [e.target.name]: e.target.value
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
        <h3 style={{display:'flex',justifyContent:'center'}}>Add New Bus</h3>
      <div className="add-bus-form">
        
        <form onSubmit={handleAddBus}>
          <input type="text" name="busName" placeholder="Bus Name" value={newBus.busName} onChange={handleInputChange} required />
          <input type="text" name="from" placeholder="From" value={newBus.from} onChange={handleInputChange} required />
          <input type="text" name="to" placeholder="To" value={newBus.to} onChange={handleInputChange} required />
          <input type="number" name="cost" placeholder="Cost" value={newBus.cost} onChange={handleInputChange} required />
          <input type="date" name="busDate" placeholder="Bus Date" value={newBus.busDate} onChange={handleInputChange} required />
          <input type="text" name="time" placeholder="time" value={newBus.time} onChange={handleInputChange} required />
          <input type="number" name="bseats" placeholder="Booked Seats" value={newBus.bseats} onChange={handleInputChange} required />
          <input type="number" name="tseats" placeholder="Total Seats" value={newBus.tseats} onChange={handleInputChange} required />

          <button type="submit">Add Bus</button>
        </form>
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
                    <button onClick={() => handleEditBus(bus)}>Edit</button>
                    <p></p>
                    <button onClick={() => handleDeleteBus(bus.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No buses available.</p>
        )}
      </div>
      
      {/* Edit Bus Form */}
      {editBus && (
        <div>
         <div style={{display:'block',justifyContent:'center'}}> <h3 style={{display:'flex',justifyContent:'center'}}>Edit Bus</h3></div>
        <div className="edit-bus-form">
         <br></br>
          <form onSubmit={handleUpdateBus}>
            <input type="text" name="busName" placeholder="Bus Name" value={editBus.busName} onChange={handleEditInputChange} required />
            <input type="text" name="from" placeholder="From" value={editBus.from} onChange={handleEditInputChange} required />
            <input type="text" name="to" placeholder="To" value={editBus.to} onChange={handleEditInputChange} required />
            <input type="number" name="cost" placeholder="Cost" value={editBus.cost} onChange={handleEditInputChange} required />
            <input type="date" name="busDate" placeholder="Bus Date" value={editBus.busDate} onChange={handleEditInputChange} required />
            <input type="text" name="time" placeholder="time" value={editBus.time} onChange={handleEditInputChange} required />
            <input type="number" name="bseats" placeholder="Booked Seats" value={editBus.bseats} onChange={handleEditInputChange} required />
            <input type="number" name="tseats" placeholder="Total Seats" value={editBus.tseats} onChange={handleEditInputChange} required />

            <button type="submit">Update Bus</button>
          </form>
        </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
