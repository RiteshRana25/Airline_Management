import React, { useState, useEffect, useContext } from "react";
import { FlightContext } from "../FlightContext"; // Import context
import axios from "axios";
import './Status.css'; // Assuming you have custom styles for the Status component

const Status = () => {
  const { username } = useContext(FlightContext); // Get username from context
  const [bookings, setBookings] = useState([]); // Store bookings data
  const [error, setError] = useState(""); // Store error message

  // Fetch bookings for the user based on the username
  useEffect(() => {
    if (username) {
      const fetchBookings = async () => {
        try {
          console.log(`Fetching bookings for username: ${username}`); // Debugging line
          const response = await axios.get(`https://airline-management-three.vercel.app/bookings/${username}`);
          console.log('Bookings fetched:', response.data); // Debugging line
          setBookings(response.data); // Store booking data in state
          setError(""); // Clear any previous errors
        } catch (err) {
          console.error('Error fetching bookings:', err); // Debugging line
          setError("No bookings found for this username."); // Error handling
          setBookings([]); // Clear previous bookings
        }
      };

      fetchBookings(); // Call the function to fetch bookings
    }
  }, [username]); // Only re-run if username changes

  // Function to get the color for the status div based on booking status
  const getStatusColor = (status) => {
    if (status === 'Pending') return 'grey';
    if (status === 'Approved') return 'green';
    if (status === 'Rejected') return 'red';
    return 'white'; // Default color for unknown statuses
  };

  // Format the departure date correctly with 2025 as the year
  const formatDate = (date) => {
    const newDate = new Date(date);
    // Set the year to 2025 if it's different
    newDate.setFullYear(2025); 
    return newDate.toLocaleDateString(); // Format date to a readable format (MM/DD/YYYY)
  };

  return (
    <div className="status-container">
      <h1>Flight Booking Status for {username}</h1>

      {error && <div className="error">{error}</div>} {/* Show error if no bookings found */}

      <div className="bookings-container">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div
              key={booking._id}
              className="booking-item"
            >
              <h3>{booking.departureCity} to {booking.arrivalCity}</h3>
              <p>Departure Date: {formatDate(booking.departureDate)}</p>
              <p>Total Price: ₹ {booking.totalPrice}</p>
              <div 
                className="status"
                style={{backgroundColor:'white'}}
              >
                <p>Status: <strong  style={{backgroundColor: getStatusColor(booking.status) }}>{booking.status}</strong></p>
              </div>
            </div>
          ))
        ) : (
          <p>No bookings found for this user.</p>
        )}
      </div>
    </div>
  );
};

export default Status;
