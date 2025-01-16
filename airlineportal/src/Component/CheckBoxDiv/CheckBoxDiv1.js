import { Checkbox, Container } from "@mui/material";
import React, { useState } from "react";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import WbTwilightOutlinedIcon from "@mui/icons-material/WbTwilightOutlined";
import NightsStaySharpIcon from "@mui/icons-material/NightsStaySharp";
import "./CheckBoxDiv.css";

const CheckBoxDiv1 = ({
  selectedValue,
  setNonStop,
  selectedFrom,
  selectedFrom1,
  selectedFrom2,
  selectedFrom3,
  selectedFrom4,
  selectedTo,
  selectedTo1,
  selectedTo2,
  selectedTo3,
  selectedTo4,
  selectedArrivalTime,
  selectedDepartureTime,
  setSelectedArrivalTime,
  setSelectedDepartureTime,
  setIsOneStop,
  setIsMoreThanOneStop
}) => {
  const [nonStop, setNonStopState] = useState(false);
  const [isOneState, setIsOneState] = useState(false);
  const [isMoreState, setIsMoreState] = useState(false);


  // Handle the toggle for non-stop checkbox
  const handleToggle = () => {
    setNonStopState((prev) => !prev);
    setNonStop((prev) => !prev);
  };

  // Handle the toggle for 1-stop checkbox
  const handleToggle1 = () => {
    setIsOneState((prev) => !prev);
    setIsOneStop((prev)=>!prev);
  };

  // Handle the toggle for 1+ stop checkbox
  const handleToggle2 = () => {
    setIsMoreState((prev) => !prev);
    setIsMoreThanOneStop((prev)=>!prev)
  };

  // Handle departure time selection
  const handleDepartureTimeSelection = (time) => {
    setSelectedDepartureTime((prev) => (prev === time ? 0 : time)); // Toggle to 0 if same time is selected
  };

  // Handle arrival time selection
  const handleArrivalTimeSelection = (time) => {
    setSelectedArrivalTime((prev) => (prev === time ? 0 : time)); // Toggle to 0 if same time is selected
  };

  return (
    <Container className="checkmulti" style={{ border: "8px solid #e5eef5" }}>
      <div className="checkboxdiv">
        <div style={{ marginTop: "30px" }}>
          {selectedValue === 1 && <span>Stops From {selectedFrom.city}</span>}
          {selectedValue === 2 && <span>Stops From {selectedFrom1.city}</span>}
          {selectedValue === 3 && <span>Stops From {selectedFrom2.city}</span>}
          {selectedValue === 4 && <span>Stops From {selectedFrom3.city}</span>}
          {selectedValue === 5 && <span>Stops From {selectedFrom4.city}</span>}
        </div>
        <div>
          <Checkbox onChange={handleToggle} checked={nonStop}></Checkbox>
          <span>Non Stop</span>
        </div>
        <div>
          <Checkbox onChange={handleToggle1} checked={isOneState}></Checkbox>
          <span>1 Stop</span>
        </div>
        <div>
          <Checkbox onChange={handleToggle2} checked={isMoreState}></Checkbox>
          <span>1+ Stop</span>
        </div>
      </div>

      <div style={{ marginTop: "50px" }}>
        {selectedValue === 1 && <span>Departure From {selectedFrom.city}</span>}
        {selectedValue === 2 && (
          <span>Departure From {selectedFrom1.city}</span>
        )}
        {selectedValue === 3 && (
          <span>Departure From {selectedFrom2.city}</span>
        )}
        {selectedValue === 4 && (
          <span>Departure From {selectedFrom3.city}</span>
        )}
        {selectedValue === 5 && (
          <span>Departure From {selectedFrom4.city}</span>
        )}
      </div>

      <div className="departicon">
        <div
          className="a"
          onClick={() => handleDepartureTimeSelection(1)}
          style={{
            backgroundColor:
              selectedDepartureTime === 1 ? "#3498db" : "transparent",
          }}
        >
          <WbTwilightOutlinedIcon />
          <span>Before</span>
          <span>6 AM</span>
        </div>
        <div
          className="a"
          onClick={() => handleDepartureTimeSelection(2)}
          style={{
            backgroundColor:
              selectedDepartureTime === 2 ? "#3498db" : "transparent",
          }}
        >
          <WbSunnyOutlinedIcon />
          <span>6 AM To</span>
          <span>12 PM</span>
        </div>
        <div
          className="a"
          onClick={() => handleDepartureTimeSelection(3)}
          style={{
            backgroundColor:
              selectedDepartureTime === 3 ? "#3498db" : "transparent",
          }}
        >
          <WbTwilightOutlinedIcon />
          <span>12 PM To</span>
          <span>6 PM</span>
        </div>
        <div
          className="a"
          onClick={() => handleDepartureTimeSelection(4)}
          style={{
            backgroundColor:
              selectedDepartureTime === 4 ? "#3498db" : "transparent",
          }}
        >
          <NightsStaySharpIcon />
          <span>After</span>
          <span>6 PM</span>
        </div>
      </div>

      <div style={{ marginTop: "50px" }}>
        {selectedValue === 1 && <span>Arrival at {selectedTo.city}</span>}
        {selectedValue === 2 && <span>Arrival at {selectedTo1.city}</span>}
        {selectedValue === 3 && <span>Arrival at {selectedTo2.city}</span>}
        {selectedValue === 4 && <span>Arrival at {selectedTo3.city}</span>}
        {selectedValue === 5 && <span>Arrival at {selectedTo4.city}</span>}
      </div>

      <div className="arivalicon">
        <div
          className="a"
          onClick={() => handleArrivalTimeSelection(1)}
          style={{
            backgroundColor:
              selectedArrivalTime === 1 ? "#3498db" : "transparent",
          }}
        >
          <WbTwilightOutlinedIcon />
          <span>Before</span>
          <span>6 AM</span>
        </div>
        <div
          className="a"
          onClick={() => handleArrivalTimeSelection(2)}
          style={{
            backgroundColor:
              selectedArrivalTime === 2 ? "#3498db" : "transparent",
          }}
        >
          <WbSunnyOutlinedIcon />
          <span>6 AM to</span>
          <span>12 PM</span>
        </div>
        <div
          className="a"
          onClick={() => handleArrivalTimeSelection(3)}
          style={{
            backgroundColor:
              selectedArrivalTime === 3 ? "#3498db" : "transparent",
          }}
        >
          <WbTwilightOutlinedIcon />
          <span>12 PM to</span>
          <span>6 PM</span>
        </div>
        <div
          className="a"
          onClick={() => handleArrivalTimeSelection(4)}
          style={{
            backgroundColor:
              selectedArrivalTime === 4 ? "#3498db" : "transparent",
          }}
        >
          <NightsStaySharpIcon />
          <span>After</span>
          <span>6 PM</span>
        </div>
      </div>
    </Container>
  );
};

export default CheckBoxDiv1;
