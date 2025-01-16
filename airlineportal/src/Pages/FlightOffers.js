import React, { useEffect, useState } from "react";
import axios from "axios";

const FlightOffers = () => {
  const [iataCode1, setIataCode1] = useState("MUC"); // First IATA code
  const [iataCode2, setIataCode2] = useState("DEL"); // Second IATA code
  const [cityName1, setCityName1] = useState("");
  const [cityName2, setCityName2] = useState(""); 
  const [accessToken, setAccessToken] = useState(""); // Access token for Amadeus API

  // Function to fetch the access token
  const apiKey = "906ZDGG8nAKATZxuPASRrXqxDrE1XNsZ";
  const apiSecret = "6TGNxBJy7qKKa8KI";
  const fetchAccessToken = async () => {
    try {
      const response = await axios.post(
        "https://test.api.amadeus.com/v1/security/oauth2/token",
        new URLSearchParams({
          grant_type: "client_credentials",
          client_id: apiKey, // Replace with your Amadeus client ID
          client_secret: apiSecret, // Replace with your Amadeus client secret
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setAccessToken(response.data.access_token); // Store the token
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };

  // Fetch city names for both IATA codes
  const fetchCityName = async (iataCode, setCityName) => {
    try {
      const response = await axios.get(
        "https://test.api.amadeus.com/v1/reference-data/locations",
        {
          params: {
            subType: "CITY",
            keyword: iataCode,
            "page[limit]": 10,
            "page[offset]": 0,
            sort: "analytics.travelers.score",
            view: "FULL",
          },
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include token in headers
          },
        }
      );

      const cityData = response.data?.data || [];
      const matchedCity = cityData.find(
        (item) => item.iataCode.toUpperCase() === iataCode.toUpperCase()
      );

      if (matchedCity) {
        setCityName(matchedCity.address.cityName); // Extract the city name
      } else {
        setCityName("City not found");
      }
    } catch (error) {
      console.error("Error fetching city name:", error);
      setCityName("Error fetching city name");
    }
  };

  useEffect(() => {
    // Fetch access token on component mount
    fetchAccessToken();
  }, []);

  useEffect(() => {
    if (!accessToken) return; // Prevent API call if token is missing

    // Fetch city names for both IATA codes
    fetchCityName(iataCode1, setCityName1);
    fetchCityName(iataCode2, setCityName2);
  }, [accessToken]); // Trigger when the access token changes

  return (
    <div>
      <h1>City Names by IATA Codes</h1>
      <p>
        <strong>City 1 (IATA Code: {iataCode1}):</strong> {cityName1}
      </p>
      <p>
        <strong>City 2 (IATA Code: {iataCode2}):</strong> {cityName2}
      </p>
    </div>
  );
};

export default FlightOffers;
