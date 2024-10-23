import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './StyleElement/Dashboard.css';
import { AuthContext } from './AuthContext';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext); 

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) {
                setLoading(false);
                setError(<h1 style={{ textAlign: 'center' }}>Please log in to access your dashboard.</h1>);
                return;
            }

            setLoading(true);
            try {
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
    }, [user]);

    const deleteBooking = async (bookingId) => {
        try {
            await axios.delete(`http://localhost:8080/booking/deletebooking/${bookingId}`);
            setBookings(bookings.filter(booking => booking.id !== bookingId));
            alert("Booking has been deleted");
        } catch (error) {
            console.error('Failed to delete booking:', error);
            setError('Failed to delete booking');
            alert("Booking could not be deleted");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">User Dashboard</h2>
            {userData && (
                <div className="user-info-card">
                    <h3>Welcome, {userData.name.toUpperCase()}</h3>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
                    <p><strong>Role:</strong> {userData.role}</p>
                </div>
            )}
            {bookings.length > 0 ? (
                <div className="bookings-grid">
                    {bookings.map((booking) => {
                        const discountedPrice = booking.cost - (booking.cost * (booking.discount / 100));
                        return (
                            <div className="booking-card" key={booking.id}>
                                <div className="booking-details">
                                    <div className="booking-row">
                                        <div className="booking-info">
                                            <p><strong>Booking ID:</strong> {booking.id}</p>
                                            <p><strong>Name:</strong> {booking.name}</p>
                                            <p><strong>Age:</strong> {booking.age}</p>
                                        </div>
                                        <div className="booking-info">
                                            <p><strong>Phone:</strong> {booking.phone}</p>
                                            <p><strong>Bus Name:</strong> {booking.busName}</p>
                                            <p><strong>From:</strong> {booking.from}</p>
                                        </div>
                                        <div className="booking-info">
                                            <p><strong>To:</strong> {booking.to}</p>
                                            <p><strong>Bus Date:</strong> {booking.busDate}</p>
                                            <p><strong>Time:</strong> {booking.time}</p>
                                        </div>
                                        <div className="booking-info">
                                            <p><strong>Original Cost:</strong> ₹{booking.cost.toFixed(2)}</p>
                                            <p><strong>Discount:</strong> {booking.discount}%</p>
                                            <p><strong>Discounted Price:</strong> ₹{discountedPrice.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="cancel-booking-button" onClick={() => deleteBooking(booking.id)}>Cancel Booking</button>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p>No bookings available</p>
            )}
        </div>
    );
};

export default Dashboard;
