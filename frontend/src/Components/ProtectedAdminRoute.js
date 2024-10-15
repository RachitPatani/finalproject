import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));  // Check localStorage for user
  return user.role==='admin' ? children : <Navigate to="/admindashboard" />;
};

export default ProtectedAdminRoute