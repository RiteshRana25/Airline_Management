import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./LocationSearch.css";
import SearchIcon from "@mui/icons-material/Search";

const LocationSearch = ({
  setError,
  selectedTo,
  setSelectedTo,
  selectedFrom,
  setSelectedFrom,
}) => {
  const apiKey = 'F4LGsfx2BrFcM2Xy6K3yiJmAmjiISi9G';
  const apiSecret = 'OfHPO1gx8jCuMYDf';

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

      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching airport data");
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
    if (airport.address.cityCode === selectedTo.code) {
      alert("From and To airports cannot be the same.")
      setError("From and To airports cannot be the same.");
      return;
    }

    setSelectedFrom({
      name: airport.name,
      city: airport.address.cityName,
      code: airport.address.cityCode,
      country: airport.address.countryName,
    });
    setIsFromClicked(false);
    setResultsFrom([]);
    setError(""); // Clear error if selection is valid
  };

  const handleSelectTo = (airport) => {
    if (airport.address.cityCode === selectedFrom.code) {
      alert("From and To airports cannot be the same.")
      setError("From and To airports cannot be the same.");
      return;
    }

    setSelectedTo({
      name: airport.name,
      city: airport.address.cityName,
      code: airport.address.cityCode,
      country: airport.address.countryName,
    });
    setIsToClicked(false);
    setResultsTo([]);
    setError(""); // Clear error if selection is valid
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
    <div className="search-location-container">
      {isFromClicked && (
        <div
          className="search-location-input"
          ref={fromInputRef}
          style={{ top: "220px", left: "260px" }}
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
            className="search-dropdown"
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
                className="search-dropdown-item"
                onClick={() => handleSelectFrom(airport)}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span>
                    {airport.address.cityName}
                    {","} {airport.address.countryName}
                  </span>
                  <span>{airport.name}</span>
                </div>
                <div className="search-citycode">
                  <span>{airport.address.cityCode}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        className="search-from"
        style={{ backgroundColor: "#2d3748" }}
        ref={fromRef}
        onClick={handleFromLocationClick}
      >
        <span style={{ fontSize: "large", color: " #008cff" }}>From</span>
        <span
          style={{
            fontSize: "large",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            maxWidth: "200px", // Adjust as needed
            display: "inline-block",
          }}
        >
          {selectedFrom.city}
          {", "}
          {selectedFrom.country}
        </span>
      </div>

      {isToClicked && (
        <div
          className="search-location-input"
          ref={toInputRef}
          style={{ top: "220px", left: "430px" }}
        >
          <div
            style={{
              display: "flex",
              boxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.1)",
            }}
          >
            <span style={{color:"black"}}>
              <SearchIcon className="iconsearch1" style={{ fontSize: "20px" }} />
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
            className="search-dropdown"
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
                className="search-dropdown-item"
                onClick={() => handleSelectTo(airport)}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span>
                    {airport.address.cityName}
                    {","} {airport.address.countryName}
                  </span>
                  <span>{airport.name}</span>
                </div>
                <div className="search-citycode">
                  <span>{airport.address.cityCode}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        className="search-to"
        ref={toRef}
        style={{ backgroundColor: "#2d3748" }}
        onClick={handleToLocationClick}
      >
        <span style={{ fontSize: "large", color: " #008cff" }}>To</span>
        <span
          style={{
            fontSize: "large",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            maxWidth: "200px", // Adjust as needed
            display: "inline-block",
          }}
        >
          {selectedTo.city}
          {", "}
          {selectedTo.country}
        </span>
      </div>
    </div>
  );
};

export default LocationSearch;
