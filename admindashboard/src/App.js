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
        const response = await axios.get("https://airline-management-three.vercel.app/bookings");
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
        // Remove the booking from the local state after status update
        setBookings((prev) => prev.filter((booking) => booking._id !== id));
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
          bookings
            .filter((booking) => booking.status === "Pending") // Only display bookings with status "Pending"
            .map((booking) => (
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
                  >
                    <CheckSharpIcon />
                  </button>
                  <button
                    className="action-button reject"
                    onClick={() => updateStatus(booking._id, "Rejected")}
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
