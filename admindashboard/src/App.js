import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import CloseIcon from "@mui/icons-material/Close";

const App = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("https://airline-management-backend.vercel.app/bookings");
        setBookings(response.data);
        setError("");
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings.");
      }
    };
    fetchBookings();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await axios.patch(
        `https://airline-management-backend.vercel.app/bookings/${id}`,
        { status: newStatus }
      );
      if (response.data.booking) {
        // Update the status in the local state after successful PATCH request
        setBookings((prev) =>
          prev.map((booking) =>
            booking._id === id ? { ...booking, status: newStatus } : booking
          )
        );
      }
    } catch (err) {
      console.error("Error updating booking:", err);
      setError("Failed to update booking.");
    }
  };

  return (
    <div className="booking-status-container">
      <h1>Admin Dashboard - Manage Bookings</h1>
      {error && <div className="error">{error}</div>}
      <div className="booking-list">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking._id} className="booking-item">
              <div className="booking-info">
                <h3>
                  {booking.departureCity} to {booking.arrivalCity}
                </h3>
                <p>
                  Departure Date:{" "}
                  {(() => {
                    const originalDate = new Date(booking.departureDate);
                    const adjustedDate = new Date(
                      originalDate.setFullYear(originalDate.getFullYear() + 24)
                    );
                    return adjustedDate.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });
                  })()}
                </p>

                <p>Total Price: ₹ {booking.totalPrice}</p>
                <p>Total Travellers: {booking.totalTraveller}</p>
                <p>Status: {booking.status}</p>
              </div>
              <div className="booking-actions">
                <button
                  className="action-button approve"
                  onClick={() => updateStatus(booking._id, "Approved")}
                  disabled={booking.status !== "Pending"}
                >
                  <CheckSharpIcon />
                </button>
                <button
                  className="action-button reject"
                  onClick={() => updateStatus(booking._id, "Rejected")}
                  disabled={booking.status !== "Pending"}
                >
                  <CloseIcon />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No bookings to display.</p>
        )}
      </div>
    </div>
  );
};

export default App;
