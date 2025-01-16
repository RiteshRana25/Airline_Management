import { Checkbox, Container } from "@mui/material";
import React, { useState } from "react";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import WbTwilightOutlinedIcon from "@mui/icons-material/WbTwilightOutlined";
import NightsStaySharpIcon from "@mui/icons-material/NightsStaySharp";
import './CheckBoxDiv.css';

const CheckBoxDiv = ({ 
  setNonStop, 
  selectedFrom, 
  selectedTo, 
  selectedDepartureTime, 
  selectedArrivalTime, 
  setSelectedArrivalTime, 
  setSelectedDepartureTime, 
  setIsMoreThanOneStop,  
  setIsOneStop,  
}) => {
  // State to manage non-stop checkbox
  const [nonStop, setNonStopState] = useState(false);
  const [isOneState, setIsOneState] = useState(false);
  const [isMoreState, setIsMoreState] = useState(false);

  // Handle the toggle for non-stop checkbox
  const handleToggle = () => {
    setNonStopState((prev) => !prev);
    setNonStop((prev) => !prev);
  };

  const handleToggle1 = () => {
    setIsOneState((prev) => !prev);
    setIsOneStop((prev) => !prev);
  };

  const handleToggle2 = () => {
    setIsMoreState((prev) => !prev);
    setIsMoreThanOneStop((prev) => !prev);
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
    <Container maxWidth='xs' className="checkone"  style={{marginLeft:'-60px', border: '8px solid #e5eef5' }}>
      <div className="checkboxdiv">
        <div style={{ marginTop: '30px' }}>
          <span>Stops From {selectedFrom.city}</span>
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
      <div style={{marginLeft:'40px', marginTop: '50px' }}>
        <span>Departure From {selectedFrom.city}</span>
      </div>
      <div className="departicon">
        <div 
          className="a" 
          onClick={() => handleDepartureTimeSelection(1)}
          style={{ backgroundColor: selectedDepartureTime === 1 ? '#3498db' : 'transparent' }}
        >
          <WbTwilightOutlinedIcon />
          <span>Before</span>
          <span>6 AM</span>
        </div>
        <div 
          className="a" 
          onClick={() => handleDepartureTimeSelection(2)}
          style={{ backgroundColor: selectedDepartureTime === 2 ? '#3498db' : 'transparent' }}
        >
          <WbSunnyOutlinedIcon />
          <span>6 AM To</span>
          <span>12 PM</span>
        </div>
        <div 
          className="a" 
          onClick={() => handleDepartureTimeSelection(3)}
          style={{ backgroundColor: selectedDepartureTime === 3 ? '#3498db' : 'transparent' }}
        >
          <WbTwilightOutlinedIcon />
          <span>12 PM To</span>
          <span>6 PM</span>
        </div>
        <div 
          className="a" 
          onClick={() => handleDepartureTimeSelection(4)}
          style={{ backgroundColor: selectedDepartureTime === 4 ? '#3498db' : 'transparent' }}
        >
          <NightsStaySharpIcon />
          <span>After</span>
          <span>6 PM</span>
        </div>
      </div>
      <div style={{ marginLeft:'40px',marginTop: '50px' }}>
        <span>Arrival at {selectedTo.city}</span>
      </div>
      <div className="arivalicon">
        <div 
          className="a" 
          onClick={() => handleArrivalTimeSelection(1)}
          style={{ backgroundColor: selectedArrivalTime === 1 ? '#3498db' : 'transparent' }}
        >
          <WbTwilightOutlinedIcon />
          <span>Before</span>
          <span>6 AM</span>
        </div>
        <div 
          className="a" 
          onClick={() => handleArrivalTimeSelection(2)}
          style={{ backgroundColor: selectedArrivalTime === 2 ? '#3498db' : 'transparent' }}
        >
          <WbSunnyOutlinedIcon />
          <span>6 AM to</span>
          <span>12 PM</span>
        </div>
        <div 
          className="a" 
          onClick={() => handleArrivalTimeSelection(3)}
          style={{ backgroundColor: selectedArrivalTime === 3 ? '#3498db' : 'transparent' }}
        >
          <WbTwilightOutlinedIcon />
          <span>12 PM to</span>
          <span>6 PM</span>
        </div>
        <div 
          className="a" 
          onClick={() => handleArrivalTimeSelection(4)}
          style={{ backgroundColor: selectedArrivalTime === 4 ? '#3498db' : 'transparent' }}
        >
          <NightsStaySharpIcon />
          <span>After</span>
          <span>6 PM</span>
        </div>
      </div>
    </Container>
  );
};

export default CheckBoxDiv;
