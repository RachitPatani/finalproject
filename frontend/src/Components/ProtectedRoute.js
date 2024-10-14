// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

// Check if user is authenticated
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));  // Check localStorage for user
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
