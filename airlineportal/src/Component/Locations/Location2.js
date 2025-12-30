import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Location.css";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import SearchIcon from "@mui/icons-material/Search";


const Location2 = ({
  error8,
  setError8,
  selectedTo2,
  setSelectedTo2,
  selectedFrom2,
  setSelectedFrom2,
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

      setError8("");
    } catch (error) {
      setError8(error.response?.data?.message || "Error fetching airport data");
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
    if (airport.address.cityCode === selectedTo2.code) {
      alert("From and To airports cannot be the same.")
      setError8("From and To airports cannot be the same.");
      return;
    }

    setSelectedFrom2({
      name: airport.name,
      city: airport.address.cityName,
      code: airport.address.cityCode,
      country: airport.address.countryName,
    });
    setIsFromClicked(false);
    setResultsFrom([]);
    setError8(""); // Clear error if selection is valid
  };

  const handleSelectTo = (airport) => {
    if (airport.address.cityCode === selectedFrom2.code) {
      alert("From and To airports cannot be the same.")
      setError8("From and To airports cannot be the same.");
      return;
    }

    setSelectedTo2({
      name: airport.name,
      city: airport.address.cityName,
      code: airport.address.cityCode,
      country: airport.address.countryName,
    });
    setIsToClicked(false);
    setResultsTo([]);
    setError8(""); // Clear error if selection is valid
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
    <div className="location-container">
      {isFromClicked && (
        <div
          className="location-input"
          ref={fromInputRef}
          style={{ top: "610px", left: "95px" }}
        >
          <div
            style={{
              display: "flex",
              boxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.1)",
            }}
          >
            <span>
              <SearchIcon className="iconsearch" style={{ fontSize: "20px" }} />
            </span>
            <input
              type="text"
              placeholder="From"
              value={searchQueryFrom}
              onChange={handleInputChangeFrom}
              style={{ border: "none", marginTop: "-2px", width: "250px" }}
            />
          </div>
           <div
            className="dropdown"
            style={{
              maxHeight: "200px",
              minHeight: "200px", // Set the maximum height of the dropdown
              overflowY: "auto", // Add vertical scrollbar if content overflows
              border: "1px solid #ccc", // Optional: Add border for better visibility
              borderRadius: "5px", // Optional: Add border-radius for styling
              padding: "5px", 
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Optional: Add shadow for better dropdown effect
            }}
          >
            {resultsFrom.map((airport) => (
              <div
                key={airport.id}
                className="dropdown-item"
                onClick={() => handleSelectFrom(airport)}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span>
                    {airport.address.cityName}
                    {","} {airport.address.countryName}
                  </span>
                  <span>{airport.name}</span>
                </div>
                <div className="citycode">
                  <span>{airport.address.cityCode}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="from" ref={fromRef} onClick={handleFromLocationClick}>
        <span style={{ fontSize: "x-large" }}>
          {<FlightTakeoffIcon />} Flying From
        </span>
        <span
          style={{
            fontSize: "xx-large",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {selectedFrom2.code !== "" ? (
            <>{selectedFrom2.city}</>
          ) : (
            "Select City"
          )}
        </span>

        <span
          className="tofrom"
          style={{
            fontSize: "large",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {selectedFrom2.code !== "" ? (
            <>
              {selectedFrom2.code}, {selectedFrom2.name}
            </>
          ) : (
            ""
          )}
        </span>
      </div>

      <div
        className="swap"
        onClick={() => {
          const temp = selectedFrom2;
          setSelectedFrom2(selectedTo2);
          setSelectedTo2(temp);
          setError8(""); // Clear error when swapping
        }}
      >
        <SwapHorizIcon />
      </div>

      {isToClicked && (
        <div
          className="location-input"
          ref={toInputRef}
          style={{ top: "610px", left: "415px" }}
        >
          <div
            style={{
              display: "flex",
              boxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.1)",
            }}
          >
            <span>
              <SearchIcon className="iconsearch1" style={{ fontSize: "20px" }} />
            </span>
            <input
              type="text"
              placeholder="To"
              value={searchQueryTo}
              onChange={handleInputChangeTo}
              style={{ border: "none", marginTop: "-2px", width: "250px" }}
            />
          </div>
          <div
            className="dropdown"
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
                className="dropdown-item"
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
                <div className="citycode">
                  <span>{airport.address.cityCode}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="to" ref={toRef} onClick={handleToLocationClick}>
        <span style={{ fontSize: "x-large" }}>
          {<FlightLandIcon />} Destination To
        </span>
        <span
          style={{
            fontSize: "xx-large",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {selectedTo2.code !== "" ? <>{selectedTo2.city}</> : "Select City"}
        </span>
        <span
          className="tofrom"
          style={{
            fontSize: "large",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {selectedTo2.code !== "" ? (
            <>
              {selectedTo2.code}, {selectedTo2.name}
            </>
          ) : (
            ""
          )}
        </span>
      </div>
    </div>
  );
};

export default Location2;
