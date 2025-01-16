import React from "react";
import TrendingFlatSharpIcon from "@mui/icons-material/TrendingFlatSharp";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

const FlightResultRound = ({
  setSelectedFlight,
  selectedOfferDetails,
  selectedOfferDetails2,
  totalTraveler,
  completeBooking,
  selectedFrom,
  selectedTo,
  setSelectedOfferDetails,
  setSelectedOfferDetails2,
  setSelectedOffer,
  setSelectedOffer2,
  setModalVisible,
  formattedDate,
  formattedDate1,
}) => {
  return (
    <>
      <div className="overlay" onClick={() => setModalVisible(false)}></div>
      <div className="bookingDetails">
        <h2>Booking Details</h2>

        {/* First Leg of Journey */}
        <h3>Outbound Flight</h3>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <p style={{ fontSize: "20px" }}>{selectedFrom.city}</p>
          <TrendingFlatSharpIcon style={{ margin: "0 10px" }} />
          <p style={{ fontSize: "20px" }}>{selectedTo.city}</p>
        </div>
        <div style={{ display: "flex", width: "100%" }}>
          <p style={{ fontSize: "20px" }}>{formattedDate}</p>
          <p style={{ marginLeft: "60px", fontSize: "20px" }}>
            {selectedOfferDetails.stops === 0
              ? "Non-stop"
              : `${selectedOfferDetails.stops} stop${
                  selectedOfferDetails.stops > 1 ? "s" : ""
                }`}
          </p>
          <p style={{ marginLeft: "60px", fontSize: "20px" }}>
            {selectedOfferDetails.totalDuration}
          </p>
        </div>
        {selectedOfferDetails?.departureCities?.map((departureCity, index) => (
          <div key={`outbound-${index}`} style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundImage: `url(https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/${selectedOfferDetails.airlineIATAArray[index]}.png?v=19)`,
                }}
              />
              <p style={{ marginLeft: "10px" }}>
                {selectedOfferDetails.allAirlines[index]}
              </p>
              <p style={{ marginLeft: "10px" }}>
                {selectedOfferDetails.flightSegments[index]}
              </p>
            </div>
            <div style={{ backgroundColor: "#f4f4f4" }}>
              <p style={{ fontSize: "18px" }}>
                {selectedOfferDetails.departureTimes[index]}
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
                  {selectedOfferDetails.segmentDurations[index]}
                </p>
              </div>
              <p style={{ fontSize: "18px" }}>
                {selectedOfferDetails.arrivalTimes[index]}
                <FiberManualRecordOutlinedIcon
                  style={{
                    marginLeft: "10px",
                    fontSize: "16px",
                    marginRight: "20px",
                  }}
                />
                {selectedOfferDetails.arrivalCities[index]}
              </p>
            </div>
            {index < selectedOfferDetails.layoverDurations.length && (
              <p style={{ fontSize: "16px" }}>
                <strong>Layover Duration:</strong>{" "}
                {selectedOfferDetails.layoverDurations[index]}
              </p>
            )}
          </div>
        ))}

        {/* Inbound Leg of Journey */}
        <h3>Return Flight</h3>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <p style={{ fontSize: "20px" }}>{selectedTo.city}</p>
          <TrendingFlatSharpIcon style={{ margin: "0 10px" }} />
          <p style={{ fontSize: "20px" }}>{selectedFrom.city}</p>
        </div>
        <div style={{ display: "flex", width: "100%" }}>
          <p style={{ fontSize: "20px" }}>{formattedDate1}</p>
          <p style={{ marginLeft: "60px", fontSize: "20px" }}>
            {selectedOfferDetails2.stops === 0
              ? "Non-stop"
              : `${selectedOfferDetails2.stops} stop${
                  selectedOfferDetails2.stops > 1 ? "s" : ""
                }`}
          </p>
          <p style={{ marginLeft: "60px", fontSize: "20px" }}>
            {selectedOfferDetails2.totalDuration}
          </p>
        </div>
        {selectedOfferDetails2?.departureCities?.map((departureCity, index) => (
          <div key={`return-${index}`} style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundImage: `url(https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/${selectedOfferDetails2.airlineIATAArray[index]}.png?v=19)`,
                }}
              />
              <p style={{ marginLeft: "10px" }}>
                {selectedOfferDetails2.allAirlines[index]}
              </p>
              <p style={{ marginLeft: "10px" }}>
                {selectedOfferDetails2.flightSegments[index]}
              </p>
            </div>
            <div style={{ backgroundColor: "#f4f4f4" }}>
              <p style={{ fontSize: "18px" }}>
                {selectedOfferDetails2.departureTimes[index]}
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
                  {selectedOfferDetails2.segmentDurations[index]}
                </p>
              </div>
              <p style={{ fontSize: "18px" }}>
                {selectedOfferDetails2.arrivalTimes[index]}
                <FiberManualRecordOutlinedIcon
                  style={{
                    marginLeft: "10px",
                    fontSize: "16px",
                    marginRight: "20px",
                  }}
                />
                {selectedOfferDetails2.arrivalCities[index]}
              </p>
            </div>
            {index < selectedOfferDetails2.layoverDurations.length && (
              <p style={{ fontSize: "16px" }}>
                <strong>Layover Duration:</strong>{" "}
                {selectedOfferDetails2.layoverDurations[index]}
              </p>
            )}
          </div>
        ))}

        {/* Total Price */}
        <p style={{ fontSize: "20px" }}>
          <strong>Total Price:</strong> ₹{" "}
          {new Intl.NumberFormat("en-IN").format(
            (selectedOfferDetails.price + selectedOfferDetails2.price) *
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
          <button type="button" onClick={() =>setModalVisible(false) }>
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

export default FlightResultRound;
