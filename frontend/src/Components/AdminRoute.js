// AdminRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // Check if the user is logged in and has an admin role
  if (user && user.role === 'admin') {
    return <Navigate to={"/admindashboard"} />; // Render admin dashboard if user is admin
  } else {
    // Redirect to home or login if not admin
    return <Navigate to="/admin" />;
  }
};

export default AdminRoute;
