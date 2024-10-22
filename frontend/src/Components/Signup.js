import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress'; // Import loading spinner
import axios from 'axios';
import './StyleElement/Auth.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State for loading spinner
  const navigate = useNavigate();

  // Email validation regex
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test(email);
  };

  // Password strength validation
  const validatePassword = (password) => {
    return password.length >= 6; // Minimum 6 characters for password
  };

  // Phone number validation (must be exactly 10 digits)
  const validatePhoneNumber = (phoneNumber) => {
    const phoneRe = /^[0-9]{10}$/; // Regex for exactly 10 digits
    return phoneRe.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error
    setError('');

    // Client-side validation
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      setError('Phone number must be exactly 10 digits.');
      return;
    }

    setLoading(true); // Show spinner while processing

    try {
      const response = await axios.post('http://localhost:8080/auth/signup', {
        name,
        email,
        phoneNumber,
        password,
        role: 'user' // default role
      });
      if (response.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      setError('User already exists or there was a problem with the server.');
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Signup</h2>
        {error && <p className="error">{error}</p>}
        <Box
          component="form"
          Validate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            id="outlined-basic"
            label="Phone"
            variant="outlined"
            value={phoneNumber}
            type="text"
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            type="submit"
            disabled={loading} // Disable button while loading
            fullWidth
            sx={{ marginTop: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Signup'} {/* Show spinner while loading */}
          </Button>
          <p style={{ marginTop: '1em' }}>
            Already have an account? <a href="/login">Login</a>
          </p>
        </Box>
      </div>
    </div>
  );
};

export default Signup;
