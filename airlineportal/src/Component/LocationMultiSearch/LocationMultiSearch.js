import React, { useContext, useEffect, useRef, useState } from "react";
import "./LocationMultiSearch.css";
import { Typography } from "@mui/material";
import { FlightContext } from "../../FlightContext";
import LocationSearchMulti from "../LocationSearchMulti/LocationSearchMulti";
import CalendarDiv from "../CalendarDiv/CalendarDiv";
import LocationSearchMulti1 from "../LocationSearchMulti/LocationSearchMulti1";
import LocationSearchMulti2 from "../LocationSearchMulti/LocationSearchMulti2";
import CalendarDiv2 from "../CalendarDiv/CalendarDiv2";
import CalendarDiv3 from "../CalendarDiv/CalendarDiv3";
import LocationSearchMulti3 from "../LocationSearchMulti/LocationSearchMulti3";
import CalendarDiv4 from "../CalendarDiv/CalendarDiv4";
import CalendarDiv5 from "../CalendarDiv/CalendarDiv5";
import LocationSearchMulti4 from "../LocationSearchMulti/LocationSearchMulti4";
import CloseButton from "../CloseButton/CloseButton";
import AddButton from "../AddButton/AddButton";


const LocationMultiSearch = () => {
  const {
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
    setSelectedFrom,
    setSelectedFrom1,
    setSelectedFrom2,
    setSelectedFrom3,
    setSelectedFrom4,
    setSelectedTo,
    setSelectedTo1,
    setSelectedTo2,
    setSelectedTo3,
    setSelectedTo4,
    setCount,
    count,
  } = useContext(FlightContext);
  const [uniqueLocations, setUniqueLocations] = useState(new Set());

  const [error_1, setError_1] = useState("");
  const [error_2, setError_2] = useState("");
  const [error_3, setError_3] = useState("");
  const [error_4, setError_4] = useState("");
  const [error_5, setError_5] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [firstLocation, setFirstLocation] = useState("");
  const [lastLocation, setLastLocation] = useState("");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const allLocations = [
    selectedFrom.city,
    selectedFrom1.city,
    selectedFrom2.city,
    selectedFrom3.city,
    selectedFrom4.city,
    selectedTo.city,
    selectedTo1.city,
    selectedTo2.city,
    selectedTo3.city,
    selectedTo4.city
  ]
  useEffect(() => {
    const locationSet = new Set(
      allLocations
        .map((location) => (typeof location === "string" ? location : location?.city || "")) // Ensure only city strings are processed
        .filter((city) => city) // Remove empty or invalid cities
        .map((city) =>
          city
            .toLowerCase()
            .split(" ") 
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
            .join(" ") // Join back the words into a full city name
        )
    );
  
    const locationArray = [...locationSet]; // Convert Set to Array
    setFirstLocation(locationArray[0] || ""); // First location
    setLastLocation(locationArray[locationArray.length - 1] || ""); // Last location
    setUniqueLocations(new Set(locationArray.slice(1, -1))); // Middle unique locations
  }, [allLocations]);
  

  const updateValue = (newValue) => {
    if (newValue < 1) {
      setCount(1);
    } else if (newValue > 4) {
      setCount(4);
    } else {
      setCount(newValue);
    }
  };

  return (
    <>
      <Typography style={{ marginTop: "-20px", color: "#008cff" }}>
        From
      </Typography>
      <div ref={dropdownRef} className="dropdown-container">
        <div onClick={toggleDropdown} className="dropdown-trigger">
          <span style={{fontSize:'18px'}}>{selectedFrom.city} {' To '}
            {selectedTo4.city!=='' && (
              <>
              {selectedTo4.city}
              </>
            )}
            {
              selectedTo4.city==='' && selectedTo3.city!=='' && (
                <>
                {selectedTo3.city}
                </>
              )
            }
            {
              selectedTo4.city==='' && selectedTo3.city==='' && selectedTo2.city!=='' &&(
                <>
                {selectedTo2.city}
                </>
              )
            }
            {
              selectedTo4.city==='' && selectedTo3.city==='' && selectedTo2.city==='' && (
                <>
                {selectedTo1.city}
                </>
              )
            }
          </span>
          <span style={{marginLeft:'7px',color:'#878787'}}>{'Via  '}
        {[...uniqueLocations].join(", ")}
      </span>
        </div>
        {isOpen && (
          <div className="dropdown-content">
            <div style={{ display: "flex", width: "1000px" }}>
              <span style={{ marginLeft: "-65px", marginTop: "15px" }}>
                Trip 1
              </span>
              <LocationSearchMulti
                error_1={error_1}
                setError_1={setError_1}
                selectedFrom={selectedFrom}
                setSelectedFrom={setSelectedFrom}
                selectedTo={selectedTo}
                setSelectedTo={setSelectedTo}
              />
              <CalendarDiv />
            </div>
            {count >= 1 && (
              <div style={{ display: "flex", width: "1000px" }}>
                <span style={{ marginLeft: "-65px", marginTop: "15px" }}>
                  Trip 2
                </span>
                <LocationSearchMulti1
                  error_2={error_2}
                  setError_2={setError_2}
                  selectedFrom1={selectedFrom1}
                  setSelectedFrom1={setSelectedFrom1}
                  selectedTo1={selectedTo1}
                  setSelectedTo1={setSelectedTo1}
                />
                <CalendarDiv2 />
                {count == 1 && (
                  <div style={{marginLeft:'160px'}}>
                    <AddButton count={count} updateValue={updateValue} />
                  </div>
                )}
              </div>
            )}
            {count >= 2 && (
              <div style={{ display: "flex", width: "1000px" }}>
                <span style={{ marginLeft: "-65px", marginTop: "15px" }}>
                  Trip 3
                </span>
                <LocationSearchMulti2
                  error_3={error_3}
                  setError_3={setError_3}
                  selectedFrom2={selectedFrom2}
                  setSelectedFrom2={setSelectedFrom2}
                  selectedTo2={selectedTo2}
                  setSelectedTo2={setSelectedTo2}
                />
                <CalendarDiv3 />
                {count == 2 && (
                  <>
                    <CloseButton count={count} updateValue={updateValue} />
                    <AddButton count={count} updateValue={updateValue} />
                  </>
                )}
              </div>
            )}
            {count >= 3 && (
              <div style={{ display: "flex", width: "1000px" }}>
                <span style={{ marginLeft: "-65px", marginTop: "15px" }}>
                  Trip 4
                </span>
                <LocationSearchMulti3
                  error_4={error_4}
                  setError_4={setError_4}
                  selectedFrom3={selectedFrom3}
                  selectedTo3={selectedTo3}
                  setSelectedTo3={setSelectedTo3}
                  setSelectedFrom3={setSelectedFrom3}
                />
                <CalendarDiv4 />
                {count == 3 && (
                  <>
                    <CloseButton count={count} updateValue={updateValue} />
                    <AddButton count={count} updateValue={updateValue} />
                  </>
                )}
              </div>
            )}
            {count>=4 && (
            <div style={{ display: "flex", width: "1000px" }}>
              <span style={{ marginLeft: "-65px", marginTop: "15px" }}>
                Trip 5
              </span>
              <LocationSearchMulti4
                error_5={error_5}
                setError_5={setError_5}
                selectedFrom4={selectedFrom4}
                selectedTo4={selectedTo4}
                setSelectedTo4={setSelectedTo4}
                setSelectedFrom4={setSelectedFrom4}
              />
              <CalendarDiv5 />
              {
                count==4 && (
                  <CloseButton count={count} updateValue={updateValue} />
                )
              }
            </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default LocationMultiSearch;
