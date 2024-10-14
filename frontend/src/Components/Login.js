// Login.js
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
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
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        {error && <div className="error">{error}</div>} {/* Display error message */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
