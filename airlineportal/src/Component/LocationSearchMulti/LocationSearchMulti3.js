import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./LocationSearchMulti.css";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import SearchIcon from "@mui/icons-material/Search";

const LocationSearchMulti3 = ({
  setError_4,
  selectedTo3,
  setSelectedTo3,
  selectedFrom3,
  setSelectedFrom3,
}) => {
const apiKey = process.env.REACT_APP_API_KEY;
const apiSecret = process.env.REACT_APP_API_SECRET;


  const [searchQueryFrom, setSearchQueryFrom] = useState("");
  const [searchQueryTo, setSearchQueryTo] = useState("");
  const [resultsFrom, setResultsFrom] = useState([]);
  const [resultsTo, setResultsTo] = useState([]);

  const [isFromClicked, setIsFromClicked] = useState(false);
  const [isToClicked, setIsToClicked] = useState(false);

  const fromRef = useRef(null);
  const toRef = useRef(null);
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);

  const fetchAirportData = async (query, type) => {
    const url = `https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword=${query}&page%5Blimit%5D=10&page%5Boffset%5D=0&view=FULL`;

    try {
      const tokenResponse = await axios.post(
        "https://test.api.amadeus.com/v1/security/oauth2/token",
        new URLSearchParams({
          grant_type: "client_credentials",
          client_id: apiKey,
          client_secret: apiSecret,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const accessToken = tokenResponse.data.access_token;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (type === "from") {
        setResultsFrom(response.data.data);
      } else {
        setResultsTo(response.data.data);
      }

      setError_4("");
    } catch (error) {
      setError_4(
        error.response?.data?.message || "Error fetching airport data"
      );
    }
  };

  const handleInputChangeFrom = (e) => {
    const query = e.target.value;
    setSearchQueryFrom(query);
    if (query.length > 2) {
      fetchAirportData(query, "from");
    } else {
      setResultsFrom([]);
    }
  };

  const handleInputChangeTo = (e) => {
    const query = e.target.value;
    setSearchQueryTo(query);
    if (query.length > 2) {
      fetchAirportData(query, "to");
    } else {
      setResultsTo([]);
    }
  };

  const handleSelectFrom = (airport) => {
    if (airport.address.cityCode === selectedTo3.code) {
      alert("From and To airports cannot be the same.")
      setError_4("From and To airports cannot be the same.");
      return;
    }

    setSelectedFrom3({
      name: airport.name,
      city: airport.address.cityName,
      code: airport.address.cityCode,
      country: airport.address.countryName,
    });
    setIsFromClicked(false);
    setResultsFrom([]);
    setError_4(""); // Clear error if selection is valid
  };

  const handleSelectTo = (airport) => {
    if (airport.address.cityCode === selectedFrom3.code) {
      alert("From and To airports cannot be the same.")
      setError_4("From and To airports cannot be the same.");
      return;
    }

    setSelectedTo3({
      name: airport.name,
      city: airport.address.cityName,
      code: airport.address.cityCode,
      country: airport.address.countryName,
    });
    setIsToClicked(false);
    setResultsTo([]);
    setError_4(""); // Clear error if selection is valid
  };

  const handleFromLocationClick = () => {
    setIsFromClicked(true);
    setIsToClicked(false);
  };

  const handleToLocationClick = () => {
    setIsToClicked(true);
    setIsFromClicked(false);
  };

  const handleClickOutside = (event) => {
    if (
      fromRef.current &&
      !fromRef.current.contains(event.target) &&
      fromInputRef.current &&
      !fromInputRef.current.contains(event.target)
    ) {
      setIsFromClicked(false);
    }

    if (
      toRef.current &&
      !toRef.current.contains(event.target) &&
      toInputRef.current &&
      !toInputRef.current.contains(event.target)
    ) {
      setIsToClicked(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="location-container-multi">
      {isFromClicked && (
        <div
          className="location-input-multi"
          ref={fromInputRef}
          style={{ top: "270px", left: "200px" }}
        >
          <div
            style={{
              display: "flex",
              boxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.1)",
            }}
          >
            <span style={{color:"black"}}>
              <SearchIcon className="iconsearch" style={{ fontSize: "20px" }} />
            </span>
            <input
              type="text"
              placeholder="Enter City"
              value={searchQueryFrom}
              onChange={handleInputChangeFrom}
              style={{ border: "none", marginTop: "-2px", width: "250px" }}
            />
          </div>
          <div
            className="dropdown-multi"
            style={{
              maxHeight: "200px",
              minHeight: "200px", // Set the maximum height of the dropdown
              overflowY: "auto", // Add vertical scrollbar if content overflows
              border: "1px solid #ccc", // Optional: Add border for better visibility
              borderRadius: "5px", // Optional: Add border-radius for styling
              padding: "5px", // Optional: Add padding for spacing
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Optional: Add shadow for better dropdown effect
            }}
          > 
            {resultsFrom.map((airport) => (
              <div
                key={airport.id}
                className="dropdown-item-multi"
                onClick={() => handleSelectFrom(airport)}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span>
                    {airport.address.cityName}
                    {","} {airport.address.countryName}
                  </span>
                  <span>{airport.name}</span>
                </div>
                <div className="citycode-multi">
                  <span>{airport.address.cityCode}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        className="from-multi"
        ref={fromRef}
        onClick={handleFromLocationClick}
      >
        <span style={{ fontSize: "large", color: "#008cff" }}>From</span>
        <span
          style={{
            fontSize: "large",
            color: "white",
            display: "inline-block",
            maxWidth: "140px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "clip",
          }}
        >
          {selectedFrom3.code !== "" ? <>{selectedFrom3.city}
          {" , "}
          {selectedFrom3.country}</> : ""}
        </span>
      </div>

      <div
        className="swap-multi"
        onClick={() => {
          const temp = selectedFrom3;
          setSelectedFrom3(selectedTo3);
          setSelectedTo3(temp);
          setError_4(""); // Clear error when swapping
        }}
      >
        <SwapHorizIcon />
      </div>

      {isToClicked && (
        <div
          className="location-input-multi"
          ref={toInputRef}
          style={{ top: "270px", left: "410px" }}
        >
          <div
            style={{
              display: "flex",
              boxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.1)",
            }}
          >
            <span style={{color:"black"}}>
              <SearchIcon className="iconsearch" style={{ fontSize: "20px" }} />
            </span>
            <input
              type="text"
              placeholder="Enter City"
              value={searchQueryTo}
              onChange={handleInputChangeTo}
              style={{ border: "none", marginTop: "-2px", width: "250px" }}
            />
          </div>
          <div
            className="dropdown-multi"
            style={{
              maxHeight: "200px",
              minHeight: "200px", // Set the maximum height of the dropdown
              overflowY: "auto", // Add vertical scrollbar if content overflows
              border: "1px solid #ccc", // Optional: Add border for better visibility
              borderRadius: "5px", // Optional: Add border-radius for styling
              padding: "5px", // Optional: Add padding for spacing
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Optional: Add shadow for better dropdown effect
            }}
          > 
            {resultsTo.map((airport) => (
              <div
                key={airport.id}
                className="dropdown-item-multi"
                onClick={() => handleSelectTo(airport)}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span>
                    {airport.address.cityName}
                    {","}
                    {airport.address.countryName}
                  </span>
                  <span>{airport.name}</span>
                </div>
                <div className="citycode-multi">
                  <span>{airport.address.cityCode}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="to-multi" ref={toRef} onClick={handleToLocationClick}>
        <span style={{ fontSize: "large", color: "#008cff" }}>To</span>
        <span
          style={{
            fontSize: "large",
            color: "white",
            display: "inline-block",
            maxWidth: "140px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "clip",
          }}
        >
          {selectedTo3.code !== "" ? <>{selectedTo3.city}
          {" , "}
          {selectedTo3.country}</> : ""}
        </span>
      </div>

    </div>
  );
};

export default LocationSearchMulti3;
