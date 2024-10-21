// src/components/Signup.js
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';
import './signup.mp4';
import './StyleElement/Auth.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      setError('User already exists');
    }
  };

  return (
    <div className="auth-container">
      {/* <video autoPlay loop muted
      style={
        {
          position:"absolute",
          width:"100%",
          left:"50%",
          top:"50%",
          height:"100%",
          objectFit:"cover",
          transform:"translate(-50%,-50%)",
          
        }
      }>
        <source src='signup.mp4' type='video/mp4'/>

      </video> */}
      <div className="auth-form">
        <h2>Signup</h2>
        {error && <p className="error">{error}</p>}
              <Box
            component="form"
            sx={{  '& > :not(style)': { m: 1, width: '30ch' }  }}
            Validate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField id="outlined-basic" label="Name " variant="outlined" value={name} type="text" onChange={(e)=>setName(e.target.value)} required />
            <TextField id="outlined-basic" label="Email " variant="outlined" value={email} type="email" onChange={(e)=>setEmail(e.target.value)} required />
            <TextField id="outlined-basic" label="Phone " variant="outlined" value={phoneNumber} type="number" onChange={(e)=>setPhoneNumber(e.target.value)} required  />
            <TextField id="outlined-basic" label="Password " variant="outlined" value={password} type="password" onChange={(e)=>setPassword(e.target.value)} required />
            <Button variant="contained" type="submit">Signup</Button>

        
        </Box>
        
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default Signup;
