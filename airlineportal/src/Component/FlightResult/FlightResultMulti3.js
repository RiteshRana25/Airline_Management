import React from "react";
import TrendingFlatSharpIcon from "@mui/icons-material/TrendingFlatSharp";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

const FlightResultMulti3 = ({
  completeBooking3,
  closeModal3,
  totalTraveler,
  totalCost3,
  selectedFlightDetails,
  selectedFlightDetails1,
  selectedFlightDetails2,
  selectedFlightDetails3,
  selectedFlightDetails4,
  selectedFrom,
  selectedTo,
  selectedFrom1,
  selectedFrom2,
  selectedFrom3,
  selectedFrom4,
  selectedTo1,
  selectedTo2,
  selectedTo3,
  selectedTo4,
  formattedDate,
  formattedDate1,
  formattedDate2,
  formattedDate3,
  formattedDate4,
}) => {
  return (
    <>
      <div className="overlay" onClick={closeModal3}></div>
      <div className="bookingDetails">
        <h2>Booking Details</h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
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
        {selectedFlightDetails1?.departureCities?.map(
          (departureCity, index) => (
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
          )
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <p style={{ fontSize: "20px" }}>{selectedFrom2.city}</p>
          <TrendingFlatSharpIcon style={{ margin: "0 10px" }} />
          <p style={{ fontSize: "20px" }}>{selectedTo2.city}</p>
        </div>
        <div style={{ display: "flex", width: "100%" }}>
          <p style={{ fontSize: "20px" }}>{formattedDate2}</p>
          <p style={{ marginLeft: "60px", fontSize: "20px" }}>
            {selectedFlightDetails2.stops === 0
              ? "Non-stop"
              : `${selectedFlightDetails2.stops} stop${
                  selectedFlightDetails2.stops > 1 ? "s" : ""
                }`}
          </p>
          <p style={{ marginLeft: "60px", fontSize: "20px" }}>
            {selectedFlightDetails2.totalDuration}
          </p>
        </div>
        {selectedFlightDetails2?.departureCities?.map(
          (departureCity, index) => (
            <div key={`return-${index}`} style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundImage: `url(https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/${selectedFlightDetails2.airlineIATA[index]}.png?v=19)`,
                  }}
                />
                <p style={{ marginLeft: "10px" }}>
                  {selectedFlightDetails2.allAirlines[index]}
                </p>
                <p style={{ marginLeft: "10px" }}>
                  {selectedFlightDetails2.flightSegments[index]}
                </p>
              </div>
              <div style={{ backgroundColor: "#f4f4f4" }}>
                <p style={{ fontSize: "18px" }}>
                  {selectedFlightDetails2.departureTimes[index]}
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
                    {selectedFlightDetails2.segmentDurations[index]}
                  </p>
                </div>
                <p style={{ fontSize: "18px" }}>
                  {selectedFlightDetails2.arrivalTimes[index]}
                  <FiberManualRecordOutlinedIcon
                    style={{
                      marginLeft: "10px",
                      fontSize: "16px",
                      marginRight: "20px",
                    }}
                  />
                  {selectedFlightDetails2.arrivalCities[index]}
                </p>
              </div>
              {index < selectedFlightDetails2.layoverDurations.length && (
                <p style={{ fontSize: "16px" }}>
                  <strong>Layover Duration:</strong>{" "}
                  {selectedFlightDetails2.layoverDurations[index]}
                </p>
              )}
            </div>
          )
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <p style={{ fontSize: "20px" }}>{selectedFrom3.city}</p>
          <TrendingFlatSharpIcon style={{ margin: "0 10px" }} />
          <p style={{ fontSize: "20px" }}>{selectedTo3.city}</p>
        </div>
        <div style={{ display: "flex", width: "100%" }}>
          <p style={{ fontSize: "20px" }}>{formattedDate3}</p>
          <p style={{ marginLeft: "60px", fontSize: "20px" }}>
            {selectedFlightDetails3.stops === 0
              ? "Non-stop"
              : `${selectedFlightDetails3.stops} stop${
                  selectedFlightDetails3.stops > 1 ? "s" : ""
                }`}
          </p>
          <p style={{ marginLeft: "60px", fontSize: "20px" }}>
            {selectedFlightDetails3.totalDuration}
          </p>
        </div>
        {selectedFlightDetails3?.departureCities?.map(
          (departureCity, index) => (
            <div key={`return-${index}`} style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundImage: `url(https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/${selectedFlightDetails3.airlineIATA[index]}.png?v=19)`,
                  }}
                />
                <p style={{ marginLeft: "10px" }}>
                  {selectedFlightDetails3.allAirlines[index]}
                </p>
                <p style={{ marginLeft: "10px" }}>
                  {selectedFlightDetails3.flightSegments[index]}
                </p>
              </div>
              <div style={{ backgroundColor: "#f4f4f4" }}>
                <p style={{ fontSize: "18px" }}>
                  {selectedFlightDetails3.departureTimes[index]}
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
                    {selectedFlightDetails3.segmentDurations[index]}
                  </p>
                </div>
                <p style={{ fontSize: "18px" }}>
                  {selectedFlightDetails3.arrivalTimes[index]}
                  <FiberManualRecordOutlinedIcon
                    style={{
                      marginLeft: "10px",
                      fontSize: "16px",
                      marginRight: "20px",
                    }}
                  />
                  {selectedFlightDetails3.arrivalCities[index]}
                </p>
              </div>
              {index < selectedFlightDetails3.layoverDurations.length && (
                <p style={{ fontSize: "16px" }}>
                  <strong>Layover Duration:</strong>{" "}
                  {selectedFlightDetails3.layoverDurations[index]}
                </p>
              )}
            </div>
          )
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <p style={{ fontSize: "20px" }}>{selectedFrom4.city}</p>
          <TrendingFlatSharpIcon style={{ margin: "0 10px" }} />
          <p style={{ fontSize: "20px" }}>{selectedTo4.city}</p>
        </div>
        <div style={{ display: "flex", width: "100%" }}>
          <p style={{ fontSize: "20px" }}>{formattedDate4}</p>
          <p style={{ marginLeft: "60px", fontSize: "20px" }}>
            {selectedFlightDetails4.stops === 0
              ? "Non-stop"
              : `${selectedFlightDetails4.stops} stop${
                  selectedFlightDetails4.stops > 1 ? "s" : ""
                }`}
          </p>
          <p style={{ marginLeft: "60px", fontSize: "20px" }}>
            {selectedFlightDetails4.totalDuration}
          </p>
        </div>
        {selectedFlightDetails4?.departureCities?.map(
          (departureCity, index) => (
            <div key={`return-${index}`} style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundImage: `url(https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/${selectedFlightDetails4.airlineIATA[index]}.png?v=19)`,
                  }}
                />
                <p style={{ marginLeft: "10px" }}>
                  {selectedFlightDetails4.allAirlines[index]}
                </p>
                <p style={{ marginLeft: "10px" }}>
                  {selectedFlightDetails4.flightSegments[index]}
                </p>
              </div>
              <div style={{ backgroundColor: "#f4f4f4" }}>
                <p style={{ fontSize: "18px" }}>
                  {selectedFlightDetails4.departureTimes[index]}
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
                    {selectedFlightDetails4.segmentDurations[index]}
                  </p>
                </div>
                <p style={{ fontSize: "18px" }}>
                  {selectedFlightDetails4.arrivalTimes[index]}
                  <FiberManualRecordOutlinedIcon
                    style={{
                      marginLeft: "10px",
                      fontSize: "16px",
                      marginRight: "20px",
                    }}
                  />
                  {selectedFlightDetails4.arrivalCities[index]}
                </p>
              </div>
              {index < selectedFlightDetails4.layoverDurations.length && (
                <p style={{ fontSize: "16px" }}>
                  <strong>Layover Duration:</strong>{" "}
                  {selectedFlightDetails4.layoverDurations[index]}
                </p>
              )}
            </div>
          )
        )}


        {/* Total Price */}
        <p style={{ fontSize: "20px" }}>
          <strong>Total Price:</strong> ₹{" "}
          {new Intl.NumberFormat("en-IN").format(totalCost3 * totalTraveler)}
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
          <button type="button" onClick={closeModal3}>
            Close
          </button>
          <button onClick={completeBooking3}>Book</button>
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

export default FlightResultMulti3;
