import { Checkbox, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import WbTwilightOutlinedIcon from "@mui/icons-material/WbTwilightOutlined";
import NightsStaySharpIcon from "@mui/icons-material/NightsStaySharp";
import './CheckBoxRound.css';

const CheckBoxRound = ({ 
  setNonStop1, 
  setNonStop2, 
  selectedFrom, 
  selectedTo, 
  setSelectedDepartureTime1, 
  setSelectedArrivalTime1,
  setSelectedDepartureTime2, 
  setSelectedArrivalTime2,
  selectedArrivalTime1,
  selectedArrivalTime2,
  selectedDepartureTime1,
  selectedDepartureTime2,
  setIsMoreThanOneStop1,
  setIsOneStop1,
  setIsMoreThanOneStop2,
  setIsOneStop2,
}) => {
  const [city1, setCity1] = useState("");
  const [city2, setCity2] = useState("");

  const handleToggle = () => {
    setNonStop1((prev) => !prev);
  };
  
  const handleToggle2 = () => {
    setNonStop2((prev) => !prev);
  };
  const handleToggle3 = () => {
    setIsOneStop1((prev) => !prev);
  };
  const handleToggle4 = () => {
    setIsOneStop2((prev) => !prev);
  };
  const handleToggle5 = () => {
    setIsMoreThanOneStop1((prev) => !prev);
  };
  const handleToggle6 = () => {
    setIsMoreThanOneStop2((prev) => !prev);
  };
  


  // Set the cities when selectedFrom or selectedTo changes
  useEffect(() => {
    setCity1(selectedFrom.city);
    setCity2(selectedTo.city);
  }, [selectedFrom, selectedTo]);

  // Handle time selection for departure and arrival
  const handleDepartureTimeSelection1 = (time) => {
    setSelectedDepartureTime1(prev => (prev === time ? 0 : time)); // Toggle to 0 if same time is selected
  };

  const handleArrivalTimeSelection1 = (time) => {
    setSelectedArrivalTime1(prev => (prev === time ? 0 : time)); // Toggle to 0 if same time is selected
  };

  const handleDepartureTimeSelection2 = (time) => {
    setSelectedDepartureTime2(prev => (prev === time ? 0 : time)); // Toggle to 0 if same time is selected
  };

  const handleArrivalTimeSelection2 = (time) => {
    setSelectedArrivalTime2(prev => (prev === time ? 0 : time)); // Toggle to 0 if same time is selected
  };

  return (
    <Container style={{ width: '300px', border: '8px solid #e5eef5' }} className="checkround">
      {/* Section for City 1 */}
      <div className="checkboxround">
        <div style={{ marginTop: '30px' }}>
          <span>Stops From {city1}</span>
        </div>
        <div>
          <Checkbox onChange={handleToggle}></Checkbox>
          <span>Non Stop</span>
        </div>
        <div>
          <Checkbox onChange={handleToggle3}></Checkbox>
          <span>1 Stop</span>
        </div>
        <div>
          <Checkbox onChange={handleToggle5}></Checkbox>
          <span>1+ Stop</span>
        </div>
      </div>

      <div style={{ marginTop: '50px' }}>
        <span>Departure From {city1}</span>
      </div>
      <div className="departiconreturn">
        <div
          className="a1"
          onClick={() => handleDepartureTimeSelection1(1)}
          style={{ backgroundColor: selectedDepartureTime1 === 1 ? '#3498db' : 'transparent' }}
        >
          <WbTwilightOutlinedIcon />
          <span>Before</span>
          <span>6 AM</span>
        </div>
        <div
          className="a1"
          onClick={() => handleDepartureTimeSelection1(2)}
          style={{ backgroundColor: selectedDepartureTime1 === 2 ? '#3498db' : 'transparent' }}
        >
          <WbSunnyOutlinedIcon />
          <span>6 AM To</span>
          <span>12 PM</span>
        </div>
        <div
          className="a1"
          onClick={() => handleDepartureTimeSelection1(3)}
          style={{ backgroundColor: selectedDepartureTime1 === 3 ? '#3498db' : 'transparent' }}
        >
          <WbTwilightOutlinedIcon />
          <span>12 PM To</span>
          <span>6 PM</span>
        </div>
        <div
          className="a1"
          onClick={() => handleDepartureTimeSelection1(4)}
          style={{ backgroundColor: selectedDepartureTime1 === 4 ? '#3498db' : 'transparent' }}
        >
          <NightsStaySharpIcon />
          <span>After </span>
          <span>6 PM</span>
        </div>
      </div>

      <div style={{ marginTop: '50px' }}>
        <span>Arrival at {city2}</span>
      </div>
      <div className="arivaliconreturn">
        <div
          className="a1"
          onClick={() => handleArrivalTimeSelection1(1)}
          style={{ backgroundColor: selectedArrivalTime1 === 1 ? '#3498db' : 'transparent' }}
        >
          <WbTwilightOutlinedIcon />
          <span>Before</span>
          <span>6 AM</span>
        </div>
        <div
          className="a1"
          onClick={() => handleArrivalTimeSelection1(2)}
          style={{ backgroundColor: selectedArrivalTime1 === 2 ? '#3498db' : 'transparent' }}
        >
          <WbSunnyOutlinedIcon />
          <span>6 AM to</span>
          <span>12 PM</span>
        </div>
        <div
          className="a1"
          onClick={() => handleArrivalTimeSelection1(3)}
          style={{ backgroundColor: selectedArrivalTime1 === 3 ? '#3498db' : 'transparent' }}
        >
          <WbTwilightOutlinedIcon />
          <span>12 PM to</span>
          <span>6 PM</span>
        </div>
        <div
          className="a1"
          onClick={() => handleArrivalTimeSelection1(4)}
          style={{ backgroundColor: selectedArrivalTime1 === 4 ? '#3498db' : 'transparent' }}
        >
          <NightsStaySharpIcon />
          <span>After </span>
          <span>6 PM</span>
        </div>
      </div>

      {/* Section for City 2 */}
      <div className="checkboxround">
        <div style={{ marginTop: '30px' }}>
          <span>Stops From {city2}</span>
        </div>
        <div>
          <Checkbox onChange={handleToggle2}></Checkbox>
          <span>Non Stop</span>
        </div>
        <div>
          <Checkbox onChange={handleToggle4}></Checkbox>
          <span>1 Stop</span>
        </div>
        <div>
          <Checkbox onChange={handleToggle6}></Checkbox>
          <span>1+ Stop</span>
        </div>
      </div>

      <div style={{ marginTop: '50px' }}>
        <span>Departure From {city2}</span>
      </div>
      <div className="departiconreturn">
        <div
          className="a1"
          onClick={() => handleDepartureTimeSelection2(1)}
          style={{ backgroundColor: selectedDepartureTime2 === 1 ? '#3498db' : 'transparent' }}
        >
          <WbTwilightOutlinedIcon />
          <span>Before</span>
          <span>6 AM</span>
        </div>
        <div
          className="a1"
          onClick={() => handleDepartureTimeSelection2(2)}
          style={{ backgroundColor: selectedDepartureTime2 === 2 ? '#3498db' : 'transparent' }}
        >
          <WbSunnyOutlinedIcon />
          <span>6 AM To</span>
          <span>12 PM</span>
        </div>
        <div
          className="a1"
          onClick={() => handleDepartureTimeSelection2(3)}
          style={{ backgroundColor: selectedDepartureTime2 === 3 ? '#3498db' : 'transparent' }}
        >
          <WbTwilightOutlinedIcon />
          <span>12 PM To</span>
          <span>6 PM</span>
        </div>
        <div
          className="a1"
          onClick={() => handleDepartureTimeSelection2(4)}
          style={{ backgroundColor: selectedDepartureTime2 === 4 ? '#3498db' : 'transparent' }}
        >
          <NightsStaySharpIcon />
          <span>After </span>
          <span>6 PM</span>
        </div>
      </div>

      <div style={{ marginTop: '50px' }}>
        <span>Arrival at {city1}</span>
      </div>
      <div className="arivaliconreturn">
        <div
          className="a1"
          onClick={() => handleArrivalTimeSelection2(1)}
          style={{ backgroundColor: selectedArrivalTime2 === 1 ? '#3498db' : 'transparent' }}
        >
          <WbTwilightOutlinedIcon />
          <span>Before</span>
          <span>6 AM</span>
        </div>
        <div
          className="a1"
          onClick={() => handleArrivalTimeSelection2(2)}
          style={{ backgroundColor: selectedArrivalTime2 === 2 ? '#3498db' : 'transparent' }}
        >
          <WbSunnyOutlinedIcon />
          <span>6 AM to</span>
          <span>12 PM</span>
        </div>
        <div
          className="a1"
          onClick={() => handleArrivalTimeSelection2(3)}
          style={{ backgroundColor: selectedArrivalTime2 === 3 ? '#3498db' : 'transparent' }}
        >
          <WbTwilightOutlinedIcon />
          <span>12 PM to</span>
          <span>6 PM</span>
        </div>
        <div
          className="a1"
          onClick={() => handleArrivalTimeSelection2(4)}
          style={{ backgroundColor: selectedArrivalTime2 === 4 ? '#3498db' : 'transparent' }}
        >
          <NightsStaySharpIcon />
          <span>After </span>
          <span>6 PM</span>
        </div>
      </div>
    </Container>
  );
};

export default CheckBoxRound;
