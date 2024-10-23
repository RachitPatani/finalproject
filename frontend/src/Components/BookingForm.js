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
    const [bookings, setBookings] = useState([]);
    const [currentBooking, setCurrentBooking] = useState({
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
        setCurrentBooking({
            ...currentBooking,
            [e.target.name]: e.target.value
        });
    };

    const addBooking = () => {
        if (bookings.length >= 4) {
            setError('You can only add up to 4 bookings at a time.');
            return;
        }
        setBookings([...bookings, {
            ...currentBooking,
            user: { id: user.id },
            bus: { id: busId }
        }]);
        setCurrentBooking({
            name: '',
            age: '',
            phone: '',
            userId: user.id,
            busId: busId
        });
    };

    const removeBooking = (index) => {
        setBookings(bookings.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (bus.bseats >= bus.tseats) {
            setError('This bus is fully booked. You cannot proceed with the booking.');
            alert("Bus is fully booked, redirecting you to dashboard");
            setLoading(false);
            return navigate(`/dashboard`);
        }

        try {
            // Send the array of bookings directly to the backend
            const response = await axios.post('http://localhost:8080/booking/createbookings', bookings);
            const createdBookings = response.data;
            
            // Update the bookings state with the created bookings
            setBookings(createdBookings);
            
            console.log('Booking response:', createdBookings);
            setOpen(true); // Open modal on successful booking
        } catch (error) {
            console.error('Error during booking submission:', error);
            setError('There was an error booking the bus. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateDiscount = async () => {
        const randomDiscount = Math.floor(Math.random() * 11) + 10;
        setDiscount(randomDiscount);
        try {
            const updatedBookings = await Promise.all(bookings.map(async (booking) => {
                const response = await axios.put(`http://localhost:8080/booking/updateDiscount/${booking.id}`, null, { params: { discount: randomDiscount } });
                return response.data;
            }));
            setBookings(updatedBookings);
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

            <div className="form-and-bookings">
                <Box
                    component="form"
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <TextField
                        id="name"
                        name="name"
                        label="Name"
                        variant="outlined"
                        value={currentBooking.name}
                        type="text"
                        onChange={handleChange}
                        // required
                        // error={currentBooking.name === ''}
                        helperText={currentBooking.name === '' ? 'Name is required' : ''}
                    />
                    <TextField
                        id="age"
                        name="age"
                        label="Age"
                        variant="outlined"
                        value={currentBooking.age}
                        type="number"
                        onChange={handleChange}
                        // required
                        // error={currentBooking.age < 18}
                        helperText={currentBooking.age < 18 ? 'You must be at least 18' : ''}
                    />
                    <TextField
                        id="phone"
                        name="phone"
                        label="Phone"
                        variant="outlined"
                        value={currentBooking.phone}
                        type="text"
                        onChange={handleChange}
                        // required
                        // error={currentBooking.phone.length < 10 || currentBooking.phone.length > 15}
                        helperText={currentBooking.phone.length < 10 || currentBooking.phone.length > 15 ? 'Invalid phone number' : ''}
                    />
                    <Button variant="contained" onClick={addBooking} disabled={bookings.length >= 4}>
                        Add Booking
                    </Button>
                    <Button variant="contained" type="submit" disabled={loading || bookings.length === 0} sx={{ mt: 2 }}>
                        {loading ? 'Booking...' : 'Book Bus'}
                    </Button>
                </Box>

                <div className="bookings-list">
                    {bookings.map((booking, index) => (
                        <div className="booking-card" key={index}>
                            <Typography variant="body1"><strong>Name:</strong> {booking.name}</Typography>
                            <Typography variant="body1"><strong>Age:</strong> {booking.age}</Typography>
                            <Typography variant="body1"><strong>Phone:</strong> {booking.phone}</Typography>
                            <Button variant="contained" color="error" style={{width:"fit-content"}} onClick={() => removeBooking(index)}>
                                Remove
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

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
