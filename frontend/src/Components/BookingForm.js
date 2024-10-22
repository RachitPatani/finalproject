import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import './StyleElement/BookingForm.css'; // Ensure you import your CSS

const BookingForm = () => {
    const { user } = useContext(AuthContext);
    const [bus, setBus] = useState(null);
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
    const [discount, setDiscount] = useState(null); // Discount state
    const [open, setOpen] = useState(false); // Modal state

    const navigate = useNavigate();  // Initialize useNavigate

    useEffect(() => {
        const fetchBusDetails = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/bus/${busId}`); // Adjust API endpoint as necessary
            setBus(response.data);  // Store the bus data
          } catch (error) {
            console.error('Error fetching bus details:', error);
          }
        };
        fetchBusDetails();
      }, [busId]);

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
        if (bus.bseats >= bus.tseats) {
            setError('This bus is fully booked. You cannot proceed with the booking.');
            alert("bus is fully booked , redirecting you to  dashboard")
            return navigate(`/dashboard`); // Prevent further submission if the bus is fully booked
          }

        try {
            const response = await axios.post('http://localhost:8080/booking/createbooking', {
                name: booking.name,
                age: booking.age,
                phone: booking.phone,
                user: { id: user.id },
                bus: { id: busId }
            });
            console.log('Booking successful:', response.data);
            // Open modal on successful booking
            setBooking({ ...booking, id: response.data.id });
            setOpen(true);
        } catch (error) {
            setError('There was an error booking the bus. Please try again.'); // Set error message
            console.error('There was an error booking the bus:', error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const handleGenerateDiscount = async () => {
        const randomDiscount = Math.floor(Math.random() * 11) + 10; // Generate random number between 10 and 20
        setDiscount(randomDiscount);
        try {
            await axios.put(`http://localhost:8080/booking/updateDiscount/${booking.id}`, null, { params: { discount: randomDiscount } });
            console.log('Discount updated successfully');
        } catch (error) {
            console.error('Error updating discount:', error);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setDiscount(null);
        navigate(`/dashboard`);
    };

    return (
        <div className="booking-form-container"> {/* Apply a container class for styling */}
            <h2>Book a Bus</h2>
            <br/>
            {error && <div className="error-message">{error}</div>} {/* Display error message */}

            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '100%' } }} // Adjust width to 100%
                Validate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <TextField
                    id="name"
                    name="name"
                    label="Name"
                    variant="outlined"
                    value={booking.name}
                    type="text"
                    onChange={handleChange}
                    required
                />
                <TextField
                    id="age"
                    name="age"
                    label="Age"
                    variant="outlined"
                    value={booking.age}
                    type="number"
                    onChange={handleChange}
                    required
                />
                <TextField
                    id="phone"
                    name="phone"
                    label="Phone"
                    variant="outlined"
                    value={booking.phone}
                    type="text"
                    onChange={handleChange}
                    required
                />
                <Button variant="contained" type="submit" disabled={loading}>
                    {loading ? 'Booking...' : 'Book Bus'}
                </Button>
            </Box>

            {/* Modal for discount */}
            <Modal open={open} onClose={handleClose}>
                <Box className="modal-box">
                    <Typography variant="h6" component="h2">
                        Booking Successful!
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Click the button below to generate a random discount percentage between 10% and 20%.
                    </Typography>
                    <Button variant="contained" onClick={handleGenerateDiscount} sx={{ mt: 2 }}>
                        Generate Discount
                    </Button>
                    {discount !== null && (
                        <Typography sx={{ mt: 2 }}>
                            You got a {discount}% discount on your ticket price!
                        </Typography>
                    )}
                    <Button variant="contained" onClick={handleClose} sx={{ mt: 2 }}>
                        Close
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default BookingForm;
