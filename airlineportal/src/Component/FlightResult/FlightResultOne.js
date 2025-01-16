import React from "react";
import TrendingFlatSharpIcon from "@mui/icons-material/TrendingFlatSharp";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

const FlightResultOne = ({
  setSelectedFlight,
  selectedFlight,
  totalTraveler,
  handleBooking,
  formattedDate,
  selectedFrom,
  selectedTo,
}) => {
  return (
    <>
      <div className="overlay" onClick={() => setSelectedFlight(null)}></div>
      <div className="bookingDetails">
        <h2>Booking Details</h2>

        {/* Top Section: First Departure City to Last Arrival City */}
        <div style={{ display: "flex" }}>
          <p style={{ fontSize: "20px" }}>{selectedFrom.city} </p>
          <TrendingFlatSharpIcon style={{ marginTop: "20px" }} />
          <p style={{ fontSize: "20px" }}> {selectedTo.city}</p>
        </div>
        <div style={{ display: "flex", width: "100%" }}>
          <p style={{ fontSize: "20px" }}>{formattedDate}</p>
          <p style={{ marginLeft: "60px", fontSize: "20px" }}>
            {selectedFlight.stops === 0
              ? "Non-stop"
              : `${selectedFlight.stops} stop${
                  selectedFlight.stops > 1 ? "s" : ""
                }`}
          </p>
          <p style={{ marginLeft: "60px", fontSize: "20px" }}>
            {selectedFlight.totalDuration}
          </p>
        </div>

        {/* Segment Details */}
        {selectedFlight.departureCities.map((departureCity, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundImage: `url(https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/${selectedFlight.airlineIATA[index]}.png?v=19)`,
                }}
              />
              <p style={{ marginLeft: "10px" }}>{selectedFlight.allAirlines[index]}</p>
              <p style={{ marginLeft: "10px" }}>{selectedFlight.flightSegments[index]}</p>
            </div>
            <div style={{ backgroundColor: "#f4f4f4" }}>
              <p style={{ fontSize: "18px" }}>
                {selectedFlight.departureTimes[index]}
                <FiberManualRecordOutlinedIcon
                  style={{
                    marginLeft: "10px",
                    fontSize: "16px",
                    marginRight: "20px",
                  }}
                />
                {departureCity}
              </p>
              <div style={{ display: "flex", marginTop: "-10px" }}>
                <HorizontalRuleIcon
                  style={{
                    marginTop: "13px",
                    marginLeft: "45px",
                    transform: "rotate(90deg)",
                    width: "24px",
                    height: "24px",
                  }}
                />
                <p style={{ fontSize: "16px" }}>
                  {selectedFlight.segmentDurations[index]}
                </p>
              </div>
              <p style={{ fontSize: "18px" }}>
                {selectedFlight.arrivalTimes[index]}
                <FiberManualRecordOutlinedIcon
                  style={{
                    marginLeft: "10px",
                    fontSize: "16px",
                    marginRight: "20px",
                  }}
                />
                {selectedFlight.arrivalCities[index]}
              </p>
            </div>

            {index < selectedFlight.layoverDurations.length && (
              <p style={{ fontSize: "16px" }}>
                <strong>Layover Duration:</strong>{" "}
                {selectedFlight.layoverDurations[index]}
              </p>
            )}
          </div>
        ))}

        <p style={{ fontSize: "20px" }}>
          <strong>Total Price:</strong> ₹{" "}
          {new Intl.NumberFormat("en-IN").format(
            selectedFlight.price * totalTraveler
          )}
        </p>

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            alignContent: "space-evenly",
            width: "100%",
            justifyContent: "space-evenly",
          }}
        >
          <button type="button" onClick={() => setSelectedFlight(null)}>
            Close
          </button>
          <button onClick={handleBooking}>Book</button>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .bookingDetails {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80vw;
          max-height: 80vh;
          overflow-y: auto;
          padding: 20px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
        }
      `}</style>
    </>
  );
};

export default FlightResultOne;
