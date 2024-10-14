// AuthContext.js
import React, { createContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
//  const navigate=useNavigate();
  

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Initialize user state

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData); // Set user information after login
    localStorage.setItem('user', JSON.stringify(userData)); // Optional: Store user in localStorage
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null); // Clear user information on logout
    localStorage.removeItem('user');     // Example: remove token or user data
    //  navigate('/');// Redirect to normal Dashboard for regular users
    

  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
