import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './Components/AuthContext';
import BookingForm from './Components/BookingForm';
import BookingList from './Components/BookingList';
import BusSearch from './Components/BusSearch';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Dashboard from './Components/Dashboard';
import ProtectedRoute from './Components/ProtectedRoute';
import Home from './Components/Home';
import AdminDashboard from './Components/AdminDashboard';
import AdminRoute from './Components/AdminRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/busbooking/:busId" element={<BookingForm />} />
            <Route path="/userbookings/:userId" element={<BookingList />} />
            <Route path="/bus-search" element={<BusSearch />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admindashboard" element={<AdminDashboard />}/>
            
            {/* Protected Route for Dashboard */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

            {/* Admin Routes - Using AdminRoute to check for the user role */}
            <Route path="/admin" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
