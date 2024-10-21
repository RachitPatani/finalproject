// Login.js
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './StyleElement/Login.css'; // Import the CSS file

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
    
    try {
      // Call login API
      const response = await axios.post('http://localhost:8080/auth/login', { email, password });
      const userData = response.data;

      if (userData) {
        // Set the user in context (with role, etc.)
        login(userData);

        // Redirect based on user role
        if (userData.role === 'admin') {
          navigate('/admin');  // Redirect to Admin Dashboard if role is admin
        } else {
          navigate('/dashboard');  // Redirect to normal Dashboard for regular users
        }
      }
    } catch (error) {
      setError('Invalid login credentials. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <div className='login-form'>

      <h2>Login</h2>

      <Box
            component="form"
            sx={{  '& > :not(style)': { m: 1, width: '30ch' }  }}
            Validate
            autoComplete="off"
            onSubmit={handleLogin}
            >
            
            <TextField id="outlined-basic" label="Email " variant="outlined" value={email} type="email" onChange={(e)=>setEmail(e.target.value)} required />
           
            <TextField id="outlined-basic" label="Password " variant="outlined" value={password} type="password" onChange={(e)=>setPassword(e.target.value)} required />        
     
        {error && <div className="error">{error}</div>} {/* Display error message */}
        <Button variant="contained" type="submit">Login</Button>
       
      
        </Box>
            </div>
    </div>
  );
};

export default Login;
