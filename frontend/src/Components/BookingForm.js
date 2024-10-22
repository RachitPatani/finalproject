import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import './StyleElement/BookingForm.css'; // CSS file for styles

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

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBusDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/bus/${busId}`);
                setBus(response.data);
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
        setLoading(true);
        setError(null);

        if (bus.bseats >= bus.tseats) {
            setError('This bus is fully booked. You cannot proceed with the booking.');
            alert("Bus is fully booked, redirecting you to dashboard");
            return navigate(`/dashboard`);
        }

        try {
            const response = await axios.post('http://localhost:8080/booking/createbooking', {
                name: booking.name,
                age: booking.age,
                phone: booking.phone,
                user: { id: user.id },
                bus: { id: busId }
            });
            setBooking({ ...booking, id: response.data.id });
            setOpen(true); // Open modal on successful booking
        } catch (error) {
            setError('There was an error booking the bus. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateDiscount = async () => {
        const randomDiscount = Math.floor(Math.random() * 11) + 10;
        setDiscount(randomDiscount);
        try {
            await axios.put(`http://localhost:8080/booking/updateDiscount/${booking.id}`, null, { params: { discount: randomDiscount } });
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
        <div className="booking-form-container">
            <h2>Book a Bus</h2>
            <br/>
            {error && <div className="error-message">{error}</div>}

            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '100%' } }}
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
                    error={booking.name === ''}
                    helperText={booking.name === '' ? 'Name is required' : ''}
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
                    error={booking.age < 18}
                    helperText={booking.age < 18 ? 'You must be at least 18' : ''}
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
                    error={booking.phone.length < 10 || booking.phone.length > 15}
                    helperText={booking.phone.length < 10 || booking.phone.length > 15 ? 'Invalid phone number' : ''}
                />
                <Button variant="contained" type="submit" disabled={loading}>
                    {loading ? 'Booking...' : 'Book Bus'}
                </Button>
            </Box>

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
