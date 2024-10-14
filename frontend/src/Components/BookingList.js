// src/components/UserBookingDetails.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookingList = () => {
  const { userId } = useParams();  // Get userId from the route parameter
  const [bookings, setBookings] = useState([]);  // State to store booking details
  const [loading, setLoading] = useState(true);  // State to manage loading

  useEffect(() => {
    // Fetch bookings with bus details by userId
    axios.get(`http://localhost:8080/booking/bususer/${userId}`)
      .then((response) => {
        setBookings(response.data);  // Set the booking data from the response
        setLoading(false);  // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching booking details:', error);
        setLoading(false);  // Stop loading if there is an error
      });
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;  // Show loading indicator
  }

  return (
    <div>
      <h2>Bookings for User ID: {userId}</h2>
      <table>
        <thead>
          <tr>
         
            <th>Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>booking ID</th>
            <th>Bus Name</th>
            <th>From</th>
            <th>To</th>
            <th>Date</th>
            <th>Time</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
                <tr key={booking.id}>
              <td>{booking.name}</td>
              <td>{booking.age}</td>
              <td>{booking.phone}</td>
              <td>{booking.id}</td>
              <td>{booking.busName}</td>
              <td>{booking.from}</td>
              <td>{booking.to}</td>
              <td>{booking.busDate}</td>
              <td>{booking.time}</td>
              <td>{booking.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingList;
