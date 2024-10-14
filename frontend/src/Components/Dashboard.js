import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './StyleElement/Dashboard.css';
import { AuthContext } from './AuthContext';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext); // Get user data from context

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) {
                setLoading(false);
                setError(<h1 style={{alignContent:'center'}}>Please log in to access your dashboard.</h1>);
                return;
            }

            setLoading(true);
            try {
                // Ensure user exists before making requests
                if (user && user.id) {
                    const userResponse = await axios.get(`http://localhost:8080/user/${user.id}`);
                    const bookingsResponse = await axios.get(`http://localhost:8080/booking/bususer/${user.id}`);

                    setUserData(userResponse.data);
                    setBookings(bookingsResponse.data);
                } else {
                    setError('User data is not available.');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to fetch user details.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user]); // Dependency array includes user
    const deleteBooking = async (bookingId) => {
        try {
            await axios.delete(`http://localhost:8080/booking/deletebooking/${bookingId}`); // Adjust this URL based on your API
            setBookings(bookings.filter(booking => booking.id !== bookingId));
            alert("booking is deleted") // Remove the deleted booking from state
        } catch (error) {
            console.error('Failed to delete booking:', error);
            setError('Failed to delete booking');
            alert("booking is not deleted")
        }
    };

    // Render loading or error messages
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    // Render user data and bookings
    return (
        <div className="dashboard-container">
            <h2>User Dashboard</h2>
            {userData && (
                <div className="user-info">
                    <h3>Welcome, {userData.name}</h3>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
                    <p><strong>Role:</strong> {userData.role}</p>
                </div>
            )}
            {bookings.length > 0 ? (
                <table className="user-details-table">
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Phone</th>
                            <th>Bus Name</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Bus Date</th>
                            <th>Time</th>
                            <th>Cost</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.id}>
                                <td>{booking.id}</td>
                                <td>{booking.name}</td>
                                <td>{booking.age}</td>
                                <td>{booking.phone}</td>
                                <td>{booking.busName}</td>
                                <td>{booking.from}</td>
                                <td>{booking.to}</td>
                                <td>{booking.busDate}</td>
                                <td>{booking.time}</td>
                                <td>{booking.cost}</td>
                                <td>
                                    <button onClick={() => deleteBooking(booking.id)}>Delete</button> {/* Delete button */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No bookings available</p>
            )}
        </div>
    );
};

export default Dashboard;
