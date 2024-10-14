import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import './StyleElement/BookingForm.css'; // Ensure you import your CSS

const BookingForm = () => {
    const { user } = useContext(AuthContext);
    const { busId } = useParams();
    const [booking, setBooking] = useState({
        name: '',
        age: '',
        phone: '',
        userId: user.id,
        busId: busId
    });
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    const navigate = useNavigate();  // Initialize useNavigate

    const handleChange = (e) => {
        setBooking({
            ...booking,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading state to true
        setError(null); // Reset error state

        try {
            const response = await axios.post('http://localhost:8080/booking/createbooking', {
                name: booking.name,
                age: booking.age,
                phone: booking.phone,
                user: { id: user.id },
                bus: { id: busId }
            });
            console.log('Booking successful:', response.data);
            navigate(`/dashboard`);
        } catch (error) {
            setError('There was an error booking the bus. Please try again.'); // Set error message
            console.error('There was an error booking the bus:', error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="booking-form-container"> {/* Apply a container class for styling */}
            <h2>Book a Bus</h2>
            {error && <div className="error-message">{error}</div>} {/* Display error message */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={booking.name}
                    onChange={handleChange}
                    required // Required field
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Your Age"
                    value={booking.age}
                    onChange={handleChange}
                    required // Required field
                />
                <input
                    type="number"
                    name="phone"
                    placeholder="Your Phone"
                    value={booking.phone}
                    onChange={handleChange}
                    required // Required field
                />
                <button type="submit" disabled={loading}> {/* Disable button when loading */}
                    {loading ? 'Booking...' : 'Book Bus'}
                </button>
            </form>
        </div>
    );
};

export default BookingForm;
