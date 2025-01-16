import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App3 = () => {
  const [bookings, setBookings] = useState([]); // Store pending bookings
  const [error, setError] = useState(""); // Store errors

  // Fetch only pending bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/bookings?status=Pending");
        setBookings(response.data);
        setError("");
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings.");
      }
    };
    fetchBookings();
  }, []);

  // Update the status of a booking
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/bookings/${id}`, { status: newStatus });
      setBookings((prev) => prev.filter((booking) => booking._id !== id)); // Remove from list
    } catch (err) {
      console.error("Error updating booking:", err);
      setError("Failed to update booking.");
    }
  };

  return (
    <div className="booking-status-container">
      <h1>Manage Pending Bookings</h1>
      {error && <div className="error">{error}</div>}
      <div className="booking-list">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking._id} className="booking-item">
              <div className="booking-info">
                <h3>
                  {booking.departureCity} to {booking.arrivalCity}
                </h3>
                <p>Departure Date: {new Date(booking.departureDate).toLocaleDateString()}</p>
                <p>Total Price: ₹ {booking.totalPrice}</p>
                <p>Total Travellers: {booking.totalTraveller}</p>
              </div>
              <div className="booking-actions">
                <button
                  className="action-button approve"
                  onClick={() => updateStatus(booking._id, "Approved")}
                >
                  ✓
                </button>
                <button
                  className="action-button reject"
                  onClick={() => updateStatus(booking._id, "Rejected")}
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No pending bookings to display.</p>
        )}
      </div>
    </div>
  );
};

export default App3;
