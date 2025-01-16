import React from "react";
import TrendingFlatSharpIcon from "@mui/icons-material/TrendingFlatSharp";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

const FlightResultMulti = ({
  completeBooking,closeModal,totalTraveler,totalCost,selectedFlightDetails,selectedFlightDetails1,selectedFrom,selectedTo,selectedFrom1,selectedTo1,formattedDate,formattedDate1
}) => {
  return (
    <>
      <div className="overlay" onClick={closeModal}></div>
      <div className="bookingDetails">
        <h2>Booking Details</h2>

        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <p style={{ fontSize: "20px" }}>{selectedFrom.city}</p>
          <TrendingFlatSharpIcon style={{ margin: "0 10px" }} />
          <p style={{ fontSize: "20px" }}>{selectedTo.city}</p>
        </div>
        <div style={{ display: "flex", width: "100%" }}>
          <p style={{ fontSize: "20px" }}>{formattedDate}</p>
          <p style={{ marginLeft: "60px", fontSize: "20px" }}>
            {selectedFlightDetails.stops === 0
              ? "Non-stop"
              : `${selectedFlightDetails.stops} stop${
                  selectedFlightDetails.stops > 1 ? "s" : ""
                }`}
          </p>
          <p style={{ marginLeft: "60px", fontSize: "20px" }}>
            {selectedFlightDetails.totalDuration}
          </p>
        </div>
        {selectedFlightDetails?.departureCities?.map((departureCity, index) => (
          <div key={`outbound-${index}`} style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundImage: `url(https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/${selectedFlightDetails.airlineIATA[index]}.png?v=19)`,
                }}
              />
              <p style={{ marginLeft: "10px" }}>
                {selectedFlightDetails.allAirlines[index]}
              </p>
              <p style={{ marginLeft: "10px" }}>
                {selectedFlightDetails.flightSegments[index]}
              </p>
            </div>
            <div style={{ backgroundColor: "#f4f4f4" }}>
              <p style={{ fontSize: "18px" }}>
                {selectedFlightDetails.departureTimes[index]}
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
                  {selectedFlightDetails.segmentDurations[index]}
                </p>
              </div>
              <p style={{ fontSize: "18px" }}>
                {selectedFlightDetails.arrivalTimes[index]}
                <FiberManualRecordOutlinedIcon
                  style={{
                    marginLeft: "10px",
                    fontSize: "16px",
                    marginRight: "20px",
                  }}
                />
                {selectedFlightDetails.arrivalCities[index]}
              </p>
            </div>
            {index < selectedFlightDetails.layoverDurations.length && (
              <p style={{ fontSize: "16px" }}>
                <strong>Layover Duration:</strong>{" "}
                {selectedFlightDetails.layoverDurations[index]}
              </p>
            )}
          </div>
        ))}

        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <p style={{ fontSize: "20px" }}>{selectedFrom1.city}</p>
          <TrendingFlatSharpIcon style={{ margin: "0 10px" }} />
          <p style={{ fontSize: "20px" }}>{selectedTo1.city}</p>
        </div>
        <div style={{ display: "flex", width: "100%" }}>
          <p style={{ fontSize: "20px" }}>{formattedDate1}</p>
          <p style={{ marginLeft: "60px", fontSize: "20px" }}>
            {selectedFlightDetails1.stops === 0
              ? "Non-stop"
              : `${selectedFlightDetails1.stops} stop${
                  selectedFlightDetails1.stops > 1 ? "s" : ""
                }`}
          </p>
          <p style={{ marginLeft: "60px", fontSize: "20px" }}>
            {selectedFlightDetails1.totalDuration}
          </p>
        </div>
        {selectedFlightDetails1?.departureCities?.map((departureCity, index) => (
          <div key={`return-${index}`} style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundImage: `url(https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/${selectedFlightDetails1.airlineIATA[index]}.png?v=19)`,
                }}
              />
              <p style={{ marginLeft: "10px" }}>
                {selectedFlightDetails1.allAirlines[index]}
              </p>
              <p style={{ marginLeft: "10px" }}>
                {selectedFlightDetails1.flightSegments[index]}
              </p>
            </div>
            <div style={{ backgroundColor: "#f4f4f4" }}>
              <p style={{ fontSize: "18px" }}>
                {selectedFlightDetails1.departureTimes[index]}
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
                  {selectedFlightDetails1.segmentDurations[index]}
                </p>
              </div>
              <p style={{ fontSize: "18px" }}>
                {selectedFlightDetails1.arrivalTimes[index]}
                <FiberManualRecordOutlinedIcon
                  style={{
                    marginLeft: "10px",
                    fontSize: "16px",
                    marginRight: "20px",
                  }}
                />
                {selectedFlightDetails1.arrivalCities[index]}
              </p>
            </div>
            {index < selectedFlightDetails1.layoverDurations.length && (
              <p style={{ fontSize: "16px" }}>
                <strong>Layover Duration:</strong>{" "}
                {selectedFlightDetails1.layoverDurations[index]}
              </p>
            )}
          </div>
        ))}

        {/* Total Price */}
        <p style={{ fontSize: "20px" }}>
          <strong>Total Price:</strong> ₹{" "}
          {new Intl.NumberFormat("en-IN").format(
            totalCost *
              totalTraveler
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
          <button type="button" onClick={closeModal }>
            Close
          </button>
          <button onClick={completeBooking}>Book</button>
        </div>
      </div>

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

export default FlightResultMulti;
