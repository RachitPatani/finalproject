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
                setError(<h1 style={{textAlign:'center'}}>Please log in to access your dashboard.</h1>);
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
            alert("Booking has been deleted"); // Remove the deleted booking from state
        } catch (error) {
            console.error('Failed to delete booking:', error);
            setError('Failed to delete booking');
            alert("Booking could not be deleted");
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
                <div className="bookings-container">
                    {bookings.map((booking) => (
                        <div className="booking-card" key={booking.id}>
                            <h4>Booking ID: {booking.id}</h4>
                            <p><strong>Name:</strong> {booking.name}</p>
                            <p><strong>Age:</strong> {booking.age}</p>
                            <p><strong>Phone:</strong> {booking.phone}</p>
                            <p><strong>Bus Name:</strong> {booking.busName}</p>
                            <p><strong>From:</strong> {booking.from}</p>
                            <p><strong>To:</strong> {booking.to}</p>
                            <p><strong>Bus Date:</strong> {booking.busDate}</p>
                            <p><strong>Time:</strong> {booking.time}</p>
                            <p><strong>Cost:</strong> {booking.cost}</p>
                            <button className="delete-button" onClick={() => deleteBooking(booking.id)}>Cancel</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No bookings available</p>
            )}
        </div>
    );
};

export default Dashboard;
