import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { CircularProgress, Container } from "@mui/material";
import "./FlightSearchReturn.css";
import TrendingFlatSharpIcon from "@mui/icons-material/TrendingFlatSharp";
import { FlightContext } from "../../FlightContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FlightResultRound from "../FlightResult/FlightResultRound";

const FlightSearchReturn = ({
  selectedFrom,
  selectedTo,
  departureDateString,
  className,
  returnDateString,
  run,
  setRun,
  nonStop1,
  nonStop2,
  isMoreThanOneStop1,
  isMoreThanOneStop2,
  isOneStop1,
  isOneStop2,
  selectedArrivalTime1,
  selectedArrivalTime2,
  selectedDepartureTime1,
  selectedDepartureTime2,
}) => {
  const { adults, child, username, isLoggedIn } = useContext(FlightContext);
  const [airplanes, setAirplanes] = useState([]);
  const [cityName1, setCityName1] = useState("");
  const [cityName2, setCityName2] = useState("");
  const [flightOffers, setFlightOffers] = useState([]);
  const [flightOffers2, setFlightOffers2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error1, setError1] = useState(""); // Separate useState for error1
  const [error2, setError2] = useState(""); // Separate useState for error2
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [selectedOffer2, setSelectedOffer2] = useState(null);
  const [selectedOfferDetails, setSelectedOfferDetails] = useState(null);
  const [selectedOfferDetails2, setSelectedOfferDetails2] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [totalTraveler, setTotalTraveler] = useState(1);
  const [formattedDate, setFormattedDate] = useState('')
  const [formattedDate1, setFormattedDate1] = useState('')
  const apiKey = "F4LGsfx2BrFcM2Xy6K3yiJmAmjiISi9G";
  const apiSecret = "OfHPO1gx8jCuMYDf";

  const getAccessToken = async () => {
    setLoading(true);
    setError1(""); // Reset error1 before making a request
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

      const flightResponse = await axios.get(
        "https://test.api.amadeus.com/v2/shopping/flight-offers",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            originLocationCode: selectedFrom.code,
            destinationLocationCode: selectedTo.code,
            departureDate: departureDateString, // Use dynamic departureDate
            adults: 1,
            travelClass: className,
            nonStop: nonStop1,
            currencyCode: "USD",
            max: 250,
          },
        }
      );
      let flightsData = flightResponse.data.data;

      if (selectedDepartureTime1 === 1) {
        flightsData = flightsData.filter((flight) =>
          flight.itineraries.some((itinerary) => {
            const firstSegment = itinerary.segments[0];
            if (!firstSegment || !firstSegment.departure?.at) return false;
            const departureTime = new Date(
              firstSegment.departure.at
            ).getHours();
            return departureTime >= 0 && departureTime < 6; // Ensure only 0:00 to 5:59
          })
        );
      } else if (selectedDepartureTime1 === 2) {
        flightsData = flightsData.filter((flight) =>
          flight.itineraries.some((itinerary) => {
            const firstSegment = itinerary.segments[0];
            if (!firstSegment || !firstSegment.departure?.at) return false;
            const departureTime = new Date(
              firstSegment.departure.at
            ).getHours();
            return departureTime >= 6 && departureTime < 12; // Ensure only 6:00 to 11:59
          })
        );
      } else if (selectedDepartureTime1 === 3) {
        flightsData = flightsData.filter((flight) =>
          flight.itineraries.some((itinerary) => {
            const firstSegment = itinerary.segments[0];
            if (!firstSegment || !firstSegment.departure?.at) return false;
            const departureTime = new Date(
              firstSegment.departure.at
            ).getHours();
            return departureTime >= 12 && departureTime < 18; // Ensure only 12:00 to 17:59
          })
        );
      } else if (selectedDepartureTime1 === 4) {
        flightsData = flightsData.filter((flight) =>
          flight.itineraries.some((itinerary) => {
            const firstSegment = itinerary.segments[0];
            if (!firstSegment || !firstSegment.departure?.at) return false;
            const departureTime = new Date(
              firstSegment.departure.at
            ).getHours();
            return departureTime >= 18 && departureTime < 24; // Ensure only 18:00 to 23:59
          })
        );
      }

      if (selectedArrivalTime1 === 1) {
        flightsData = flightsData.filter((flight) =>
          flight.itineraries.some((itinerary) => {
            const lastSegment =
              itinerary.segments[itinerary.segments.length - 1];
            if (!lastSegment || !lastSegment.arrival?.at) return false;
            const arrivalTime = new Date(lastSegment.arrival.at).getHours();
            return arrivalTime >= 0 && arrivalTime < 6; // Ensure only 0:00 to 5:59
          })
        );
      } else if (selectedArrivalTime1 === 2) {
        flightsData = flightsData.filter((flight) =>
          flight.itineraries.some((itinerary) => {
            const lastSegment =
              itinerary.segments[itinerary.segments.length - 1];
            if (!lastSegment || !lastSegment.arrival?.at) return false;
            const arrivalTime = new Date(lastSegment.arrival.at).getHours();
            return arrivalTime >= 6 && arrivalTime < 12; // Ensure only 6:00 to 11:59
          })
        );
      } else if (selectedArrivalTime1 === 3) {
        flightsData = flightsData.filter((flight) =>
          flight.itineraries.some((itinerary) => {
            const lastSegment =
              itinerary.segments[itinerary.segments.length - 1];
            if (!lastSegment || !lastSegment.arrival?.at) return false;
            const arrivalTime = new Date(lastSegment.arrival.at).getHours();
            return arrivalTime >= 12 && arrivalTime < 18; // Ensure only 12:00 to 17:59
          })
        );
      } else if (selectedArrivalTime1 === 4) {
        flightsData = flightsData.filter((flight) =>
          flight.itineraries.some((itinerary) => {
            const lastSegment =
              itinerary.segments[itinerary.segments.length - 1];
            if (!lastSegment || !lastSegment.arrival?.at) return false;
            const arrivalTime = new Date(lastSegment.arrival.at).getHours();
            return arrivalTime >= 18 && arrivalTime < 24; // Ensure only 18:00 to 23:59
          })
        );
      }
      if (isOneStop1) {
        flightsData = flightsData.filter((flight) =>
          flight.itineraries.some(
            (itinerary) => itinerary.segments.length - 1 === 1
          )
        );
      } else if (isMoreThanOneStop1) {
        flightsData = flightsData.filter((flight) =>
          flight.itineraries.some(
            (itinerary) => itinerary.segments.length - 1 > 1
          )
        );
      }

      setFlightOffers(flightsData);
    } catch (err) {
      setError1(err.response?.data?.message || "Error fetching flight data"); // Set error1
    } finally {
      setLoading(false);
    }
  };

  const getAccessToken2 = async () => {
    setLoading(true);
    setError2(""); // Reset error2 before making a request
    try {
      const tokenResponse2 = await axios.post(
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

      const accessToken2 = tokenResponse2.data.access_token;

      const flightResponse2 = await axios.get(
        "https://test.api.amadeus.com/v2/shopping/flight-offers",
        {
          headers: {
            Authorization: `Bearer ${accessToken2}`,
          },
          params: {
            originLocationCode: selectedTo.code,
            destinationLocationCode: selectedFrom.code,
            departureDate: returnDateString, // Use dynamic departureDate
            adults: 1,
            travelClass: className,
            nonStop: nonStop2,
            currencyCode: "USD",
            max: 250,
          },
        }
      );

      let flightsData = flightResponse2.data.data;

      if (selectedDepartureTime2 === 1) {
        flightsData = flightsData.filter((flight) =>
          flight.itineraries.some((itinerary) => {
            const firstSegment = itinerary.segments[0];
            if (!firstSegment || !firstSegment.departure?.at) return false;
            const departureTime = new Date(
              firstSegment.departure.at
            ).getHours();
            return departureTime >= 0 && departureTime < 6; // Ensure only 0:00 to 5:59
          })
        );
      } else if (selectedDepartureTime2 === 2) {
        flightsData = flightsData.filter((flight) =>
          flight.itineraries.some((itinerary) => {
            const firstSegment = itinerary.segments[0];
            if (!firstSegment || !firstSegment.departure?.at) return false;
            const departureTime = new Date(
              firstSegment.departure.at
            ).getHours();
            return departureTime >= 6 && departureTime < 12; // Ensure only 6:00 to 11:59
          })
        );
      } else if (selectedDepartureTime2 === 3) {
        flightsData = flightsData.filter((flight) =>
          flight.itineraries.some((itinerary) => {
            const firstSegment = itinerary.segments[0];
            if (!firstSegment || !firstSegment.departure?.at) return false;
            const departureTime = new Date(
              firstSegment.departure.at
            ).getHours();
            return departureTime >= 12 && departureTime < 18; // Ensure only 12:00 to 17:59
          })
        );
      } else if (selectedDepartureTime2 === 4) {
        flightsData = flightsData.filter((flight) =>
          flight.itineraries.some((itinerary) => {
            const firstSegment = itinerary.segments[0];
            if (!firstSegment || !firstSegment.departure?.at) return false;
            const departureTime = new Date(
              firstSegment.departure.at
            ).getHours();
            return departureTime >= 18 && departureTime < 24; // Ensure only 18:00 to 23:59
          })
        );
      }

      if (selectedArrivalTime2 === 1) {
        flightsData = flightsData.filter((flight) =>
          flight.itineraries.some((itinerary) => {
            const lastSegment =
              itinerary.segments[itinerary.segments.length - 1];
            if (!lastSegment || !lastSegment.arrival?.at) return false;
            const arrivalTime = new Date(lastSegment.arrival.at).getHours();
            return arrivalTime >= 0 && arrivalTime < 6; // Ensure only 0:00 to 5:59
          })
        );
      } else if (selectedArrivalTime2 === 2) {
        flightsData = flightsData.filter((flight) =>
          flight.itineraries.some((itinerary) => {
            const lastSegment =
              itinerary.segments[itinerary.segments.length - 1];
            if (!lastSegment || !lastSegment.arrival?.at) return false;
            const arrivalTime = new Date(lastSegment.arrival.at).getHours();
            return arrivalTime >= 6 && arrivalTime < 12; // Ensure only 6:00 to 11:59
          })
        );
      } else if (selectedArrivalTime2 === 3) {
        flightsData = flightsData.filter((flight) =>
          flight.itineraries.some((itinerary) => {
            const lastSegment =
              itinerary.segments[itinerary.segments.length - 1];
            if (!lastSegment || !lastSegment.arrival?.at) return false;
            const arrivalTime = new Date(lastSegment.arrival.at).getHours();
            return arrivalTime >= 12 && arrivalTime < 18; // Ensure only 12:00 to 17:59
          })
        );
      } else if (selectedArrivalTime2 === 4) {
        flightsData = flightsData.filter((flight) =>
          flight.itineraries.some((itinerary) => {
            const lastSegment =
              itinerary.segments[itinerary.segments.length - 1];
            if (!lastSegment || !lastSegment.arrival?.at) return false;
            const arrivalTime = new Date(lastSegment.arrival.at).getHours();
            return arrivalTime >= 18 && arrivalTime < 24; // Ensure only 18:00 to 23:59
          })
        );
      }
      if (isOneStop2) {
        flightsData = flightsData.filter((flight) =>
          flight.itineraries.some(
            (itinerary) => itinerary.segments.length - 1 === 1
          )
        );
      } else if (isMoreThanOneStop2) {
        flightsData = flightsData.filter((flight) =>
          flight.itineraries.some(
            (itinerary) => itinerary.segments.length - 1 > 1
          )
        );
      }

      // Update the state with the fetched flight offers
      setFlightOffers2(flightsData);
    } catch (err) {
      setError2(err.response?.data?.message || "Error fetching flight data"); // Set error2
    } finally {
      setLoading(false);
    }
  };

  const fetchAirplanes = async () => {
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

      const airplaneResponse = await axios.get(
        "https://test.api.amadeus.com/v1/reference-data/airlines",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Extract and store only the iataCode and commonName
      const airplaneData = airplaneResponse.data.data.map((airline) => ({
        iataCode: airline.iataCode,
        commonName: airline.commonName,
      }));

      setAirplanes(airplaneData); // Store the filtered data
    } catch (err) {
      console.error("Error fetching airplane data:", err);
    }
  };

  useEffect(() => {
    fetchAirplanes();
  }, []);
  useEffect(() => {
    setSelectedOfferDetails2(null);
    setSelectedOfferDetails(null);
    setSelectedOffer(null);
    setSelectedOffer2(null);
    setCityName1(selectedFrom.city);
    setCityName2(selectedTo.city);
    getAccessToken2();
    getAccessToken();
    setRun(false);
  }, [
    run,
    nonStop1,
    nonStop2,
    selectedArrivalTime1,
    selectedArrivalTime2,
    selectedDepartureTime1,
    selectedDepartureTime2,
    isMoreThanOneStop1,
    isMoreThanOneStop2,
    isOneStop1,
    isOneStop2,
  ]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "short", day: "numeric", month: "short" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const [day, month, dateNum] = formattedDate.split(" ");
    return `${day} ${dateNum} ${month}`;
  };
  function formatDate1(date) {
    const dayFormatter = new Intl.DateTimeFormat("en-US", { weekday: "long" });
    const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "short" });
    const dateFormatter = new Intl.DateTimeFormat("en-US", { day: "numeric" });

    const day = dayFormatter.format(date);
    const month = monthFormatter.format(date);
    const dayOfMonth = dateFormatter.format(date);

    return `${day}, ${month} ${dayOfMonth}`;
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0"); // Ensure two digits (e.g., 03 instead of 3)
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Ensure two digits (e.g., 05 instead of 5)
    return `${hours}:${minutes}`;
  };

  const renderDots = (stops) => {
    const dots = [];
    const dotSize = "10px"; // Adjust the size of dots
    const lineWidth = "180px"; // Length of the line connecting dots

    if (stops === 1) {
      dots.push(
        <span
          key={0}
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            backgroundColor: "#3498db",
          }}
        ></span>
      );
    } else if (stops === 2) {
      dots.push(
        <span
          key={0}
          style={{
            position: "absolute",
            left: "25%",
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            backgroundColor: "#3498db",
          }}
        ></span>
      );
      dots.push(
        <span
          key={1}
          style={{
            position: "absolute",
            left: "75%",
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            backgroundColor: "#3498db",
          }}
        ></span>
      );
    }

    return dots;
  };

  const formatDuration = (duration) => {
    const match = duration.match(/PT(\d+)H(?:(\d+)M)?/);
    if (match) {
      const hours = parseInt(match[1], 10);
      const minutes = match[2] ? parseInt(match[2], 10) : 0;

      // Format the output string based on hours and minutes
      let formattedDuration = `${hours} h`;
      if (minutes > 0) {
        formattedDuration += ` ${minutes} m`;
      }

      return formattedDuration;
    }

    return "0h"; // Default to "0h" if no match is found
  };

  const handleSelect = (index, type) => {
    let selectedOffer;
  
    if (type === "flightOffers") {
      selectedOffer = flightOffers[index];
    } else if (type === "flightOffers2") {
      selectedOffer = flightOffers2[index];
    }
  
    if (!selectedOffer) return;
  
    const itinerary = selectedOffer?.itineraries?.[0];
    const segments = itinerary?.segments || [];
  
    // Initialize arrays and sets for storing flight details
    const airlinesSet = new Set();
    const allAirlines = [];
    const departureCities = [];
    const arrivalCities = [];
    const segmentDurations = [];
    const layoverDurations = [];
    const departureTimes = [];
    const arrivalTimes = [];
    const flightSegments = [];
    const airlineIATASet = new Set(); // Unique IATA codes
    const airlineIATAArray = []; // Array with duplicates allowed
  
    // Get departure and arrival times for the first and last segments
    const firstDepartureTime = new Date(segments[0]?.departure?.at);
    const lastArrivalTime = new Date(
      segments[segments.length - 1]?.arrival?.at
    );
  
    // Process each segment
    segments.forEach((segment, idx) => {
      const airline = airplanes.find(
        (airplane) => airplane.iataCode === segment.carrierCode
      );
      const airlineName = airline ? airline.commonName : segment.carrierCode;
      airlinesSet.add(airlineName);
      allAirlines.push(airlineName);
  
      const airlineIataCode = airline ? airline.iataCode : segment.carrierCode;
      airlineIATASet.add(airlineIataCode); // Add to the set for unique values
      airlineIATAArray.push(airlineIataCode); // Add to the array (duplicates allowed)
  
      departureCities.push(segment.departure.iataCode);
      arrivalCities.push(segment.arrival.iataCode);
  
      const departureTime = new Date(segment.departure.at);
      const arrivalTime = new Date(segment.arrival.at);
  
      departureTimes.push(
        departureTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
      arrivalTimes.push(
        arrivalTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
  
      const segmentDurationMs = arrivalTime - departureTime;
      const segmentDuration = `${Math.floor(
        segmentDurationMs / (1000 * 60 * 60)
      )}h ${(segmentDurationMs / (1000 * 60)) % 60}m`;
      segmentDurations.push(segmentDuration);
  
      if (idx < segments.length - 1) {
        const nextDepartureTime = new Date(segments[idx + 1]?.departure?.at);
        const layoverDurationMs = nextDepartureTime - arrivalTime;
        const layoverDuration = `${Math.floor(
          layoverDurationMs / (1000 * 60 * 60)
        )}h ${(layoverDurationMs / (1000 * 60)) % 60}m`;
        layoverDurations.push(layoverDuration);
      }
  
      flightSegments.push(`${segment.carrierCode} ${segment.number}`);
    });
  
    const totalDurationMs = lastArrivalTime - firstDepartureTime;
    const totalDuration = `${Math.floor(totalDurationMs / (1000 * 60 * 60))}h ${
      (totalDurationMs / (1000 * 60)) % 60
    }m`;
  
    const flightDetails = {
      airlines: Array.from(airlinesSet),
      allAirlines,
      departureTime: firstDepartureTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      arrivalTime: lastArrivalTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      totalDuration,
      segmentDurations,
      layoverDurations,
      stops: segments.length - 1,
      price: selectedOffer?.price?.total
        ? selectedOffer.price.total * 85
        : "N/A",
      firstDepartureCity: departureCities[0],
      lastArrivalCity: arrivalCities[arrivalCities.length - 1],
      departureCities,
      arrivalCities,
      departureTimes,
      arrivalTimes,
      flightSegments,
      airlineIATASet: Array.from(airlineIATASet), // Unique IATA codes as an array
      airlineIATAArray, // IATA codes with duplicates
    };
  
    if (type === "flightOffers") {
      setSelectedOfferDetails(flightDetails);
      setSelectedOffer(`flightOffers-${index}`);
    } else if (type === "flightOffers2") {
      setSelectedOfferDetails2(flightDetails);
      setSelectedOffer2(`flightOffers2-${index}`);
    }
  };
  

  useEffect(() => {
    if (selectedOfferDetails && selectedOfferDetails2) {
      const newTotalCost =
        selectedOfferDetails.price + selectedOfferDetails2.price;
      setTotalCost(newTotalCost);
    } else {
      setTotalCost(0);
    }
  }, [selectedOfferDetails, selectedOfferDetails2]);
  const handleBooking = () => {
    const date = new Date(departureDateString);
    setFormattedDate(formatDate1(date));
    const date1 = new Date(returnDateString);
    setFormattedDate1(formatDate1(date));
    setTotalTraveler(adults + child);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false); // Close the modal
  };

  const completeBooking = async () => {
    if (!isLoggedIn) {
      alert("Please log in to book the flight!");
      return;
    }

    try {
      // Prepare booking details for both flights
      const bookingDetails = [
        {
          departureCity: selectedFrom.city,
          arrivalCity: selectedTo.city,
          departureDate: formattedDate,
          totalPrice: selectedOfferDetails.price * totalTraveler,
          username,
          totalTraveller: totalTraveler,
        },
        {
          departureCity: selectedTo.city,
          arrivalCity: selectedFrom.city,
          departureDate: formattedDate1,
          totalPrice: selectedOfferDetails2.price * totalTraveler,
          username,
          totalTraveller: totalTraveler,
        },
      ];

      // Send the booking data for both flights
      const responses = await Promise.all(
        bookingDetails.map((details) =>
          axios.post("http://localhost:5000/bookFlight", details)
        )
      );

      // If both responses are successful, show a single success message
      console.log("Booking successful:", responses);
      alert("Booking successful!");

      // Navigate to '/roundtripsearch'
    } catch (error) {
      console.error("Error booking flight:", error);
      alert("Error while booking flight!");
    }
  };

  return (
    <Container className="searchround">
      <h1>Flight Offers</h1>


          {loading ? (
            <CircularProgress />
          ) : (
            <div className="roundcontain">
              <div>
                {flightOffers.map((offer, index) => (
                  <div className="singleround" key={index}>
                    <div className="roundname">
                      <div
                        style={{
                          background: "white",
                          position: "relative",
                          width: "30px",
                          height: "30px",
                        }}
                      >
                        {[
                          ...new Set(
                            offer.itineraries[0]?.segments.map(
                              (segment) => segment.carrierCode
                            )
                          ),
                        ].map((carrierCode, index, uniqueCodes) => {
                          const isMultipleImages = uniqueCodes.length > 1;
                          const imageSize = isMultipleImages ? "15px" : "30px"; // Set size to 1/4 if more than 1 unique IATA code

                          return (
                            <div
                              key={index}
                              style={{
                                position: "absolute",
                                top: `${index * 15}px`, // Adjusts the vertical offset for diagonal effect
                                left: `${index * 15}px`, // Adjusts the horizontal offset for diagonal effect
                                backgroundImage: `url(https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/${carrierCode}.png?v=19)`,
                                width: imageSize,
                                height: imageSize,
                                backgroundSize: "cover", // Ensures the image covers the div area properly
                                backgroundPosition: "center", // Centers the image within the div
                              }}
                            ></div>
                          );
                        })}
                      </div>
                      <span
                        className="aircode"
                        style={{
                          marginLeft: "35px",
                          display: "block",
                          width: "30%",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {[
                          ...new Set(
                            offer.itineraries[0]?.segments.map((segment) => {
                              const airline = airplanes.find(
                                (airplane) =>
                                  airplane.iataCode === segment.carrierCode
                              );
                              return airline
                                ? airline.commonName
                                : segment.carrierCode;
                            })
                          ),
                        ].join(", ")}
                      </span>
                      <div className="currency">
                        <span>
                          {"₹ "}
                          {new Intl.NumberFormat("en-IN", {
                            maximumFractionDigits: 0,
                          }).format(offer.price.total * 85)}
                        </span>
                        <span>per adult</span>
                      </div>
                    </div>
                    <div className="roundmain">
                      <div className="departround">
                        <span>
                          {"depart "}{" "}
                          {formatDate(
                            offer.itineraries[0]?.segments[0]?.departure?.at
                          )}
                        </span>
                        <div className="rounddetail">
                          <div className="firstd">
                            <span>
                              {formatTime(
                                offer.itineraries[0]?.segments[0]?.departure?.at
                              )}
                            </span>
                            <span>{cityName1}</span>
                          </div>
                          <div className="secondd">
                            <span>
                              {formatDuration(offer.itineraries[0]?.duration)}
                            </span>
                            <div
                              style={{
                                position: "relative",
                                width: "180px",
                                height: "2px",
                                margin: "10px 0",
                                backgroundColor: "#3498db",
                              }}
                            >
                              {renderDots(
                                offer.itineraries[0]?.segments.length - 1
                              )}
                            </div>
                            <span>
                              {offer.itineraries[0]?.segments.length > 1
                                ? `${
                                    offer.itineraries[0]?.segments.length - 1
                                  } stop(s) via ${offer.itineraries[0]?.segments
                                    .slice(0, -1)
                                    .map((segment) => segment.arrival.iataCode)
                                    .join(", ")}`
                                : "Non-stop"}
                            </span>
                          </div>
                          <div className="thirdd">
                            <span>
                              {formatTime(
                                offer.itineraries[0]?.segments[0]?.arrival?.at
                              )}
                            </span>
                            <span>{cityName2}</span>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          marginTop: "30px",
                          display: "flex",
                          alignContent: "space-evenly",
                          marginLeft: "170px",
                        }}
                      >
                        <button
                          onClick={() => handleSelect(index, "flightOffers")}
                          style={{
                            padding: "10px 15px",
                            marginTop: "10px",
                            backgroundColor: "#3498db",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          {selectedOffer === `flightOffers-${index}` ? (
                            <>
                              <span style={{ display: "flex" }}>
                                <CheckCircleIcon
                                  style={{ marginTop: "0px", fontSize: "16px" }}
                                />
                                Selected
                              </span>
                            </>
                          ) : (
                            "Select"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                {flightOffers2.map((offer, index) => (
                  <div className="singleround1" key={index}>
                    <div className="roundname1">
                      <div
                        style={{
                          background: "white",
                          position: "relative",
                          width: "30px",
                          height: "30px",
                        }}
                      >
                        {[
                          ...new Set(
                            offer.itineraries[0]?.segments.map(
                              (segment) => segment.carrierCode
                            )
                          ),
                        ].map((carrierCode, index, uniqueCodes) => {
                          const isMultipleImages = uniqueCodes.length > 1;
                          const imageSize = isMultipleImages ? "15px" : "30px"; // Set size to 1/4 if more than 1 unique IATA code

                          return (
                            <div
                              key={index}
                              style={{
                                position: "absolute",
                                top: `${index * 15}px`, // Adjusts the vertical offset for diagonal effect
                                left: `${index * 15}px`, // Adjusts the horizontal offset for diagonal effect
                                backgroundImage: `url(https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/${carrierCode}.png?v=19)`,
                                width: imageSize,
                                height: imageSize,
                                backgroundSize: "cover", // Ensures the image covers the div area properly
                                backgroundPosition: "center", // Centers the image within the div
                              }}
                            ></div>
                          );
                        })}
                      </div>
                      <span
                        className="aircode"
                        style={{
                          marginLeft: "35px",
                          display: "block",
                          width: "30%",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {[
                          ...new Set(
                            offer.itineraries[0]?.segments.map((segment) => {
                              const airline = airplanes.find(
                                (airplane) =>
                                  airplane.iataCode === segment.carrierCode
                              );
                              return airline
                                ? airline.commonName
                                : segment.carrierCode;
                            })
                          ),
                        ].join(", ")}
                      </span>
                      <div className="currency1">
                        <span>
                          {"₹ "}
                          {new Intl.NumberFormat("en-IN", {
                            maximumFractionDigits: 0,
                          }).format(offer.price.total * 85)}
                        </span>
                        <span>per adult</span>
                      </div>
                    </div>
                    <div className="roundmain1">
                      <div className="departround1">
                        <span>
                          {"depart "}{" "}
                          {formatDate(
                            offer.itineraries[0]?.segments[0]?.departure?.at
                          )}
                        </span>
                        <div className="rounddetail1">
                          <div className="firstd1">
                            <span>
                              {formatTime(
                                offer.itineraries[0]?.segments[0]?.departure?.at
                              )}
                            </span>
                            <span>{cityName2}</span>
                          </div>
                          <div className="secondd1">
                            <span>
                              {formatDuration(offer.itineraries[0]?.duration)}
                            </span>
                            <div
                              style={{
                                position: "relative",
                                width: "180px",
                                height: "2px",
                                margin: "10px 0",
                                backgroundColor: "#3498db",
                              }}
                            >
                              {renderDots(
                                offer.itineraries[0]?.segments.length - 1
                              )}
                            </div>
                            <span>
                              {offer.itineraries[0]?.segments.length > 1
                                ? `${
                                    offer.itineraries[0]?.segments.length - 1
                                  } stop(s) via ${offer.itineraries[0]?.segments
                                    .slice(0, -1)
                                    .map((segment) => segment.arrival.iataCode)
                                    .join(", ")}`
                                : "Non-stop"}
                            </span>
                          </div>
                          <div className="thirdd1">
                            <span>
                              {formatTime(
                                offer.itineraries[0]?.segments[0]?.arrival?.at
                              )}
                            </span>
                            <span>{cityName1}</span>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          marginTop: "30px",
                          display: "flex",
                          alignContent: "space-evenly",
                          marginLeft: "170px",
                        }}
                      >
                        <button
                          onClick={() => handleSelect(index, "flightOffers2")}
                          style={{
                            padding: "10px 15px",
                            marginTop: "10px",
                            backgroundColor: "#3498db",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          {selectedOffer2 === `flightOffers2-${index}` ? (
                            <>
                              <span style={{ display: "flex" }}>
                                <CheckCircleIcon
                                  style={{ marginTop: "0px", fontSize: "16px" }}
                                />
                                Selected
                              </span>
                            </>
                          ) : (
                            "Select"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {selectedOfferDetails && selectedOfferDetails2 && (
            <div
              style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                marginLeft: "330px",
                width: "70%",
                backgroundColor: "#0a223d",
                color: "hsla(0, 0%, 100%, .8)",
                border: "2px solid #3498db",
                padding: "15px 20px",
                display: "flex",
                flexDirection: "column",
                zIndex: 1000,
              }}
            >
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    marginLeft: "30px",
                    marginRight: "20px",
                    borderRight: "1px solid white",
                  }}
                >
                  <div
                    style={{
                      background: "white",
                      position: "relative",
                      width: "30px",
                      height: "30px",
                    }}
                  >
                    {Array.isArray(selectedOfferDetails.airlineIATASet) &&
                      selectedOfferDetails.airlineIATASet.map(
                        (carrierCode, index, uniqueCodes) => {
                          const isMultipleImages = uniqueCodes.length > 1;
                          const imageSize = isMultipleImages ? "15px" : "30px";

                          return (
                            <div
                              key={index}
                              style={{
                                position: "absolute",
                                top: `${index * 15}px`, // Adjusts the vertical offset for diagonal effect
                                left: `${index * 15}px`, // Adjusts the horizontal offset for diagonal effect
                                backgroundImage: `url(https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/${carrierCode}.png?v=19)`,
                                width: imageSize,
                                height: imageSize,
                                backgroundSize: "cover", // Ensures the image covers the div area properly
                                backgroundPosition: "center", // Centers the image within the div
                              }}
                            ></div>
                          );
                        }
                      )}
                  </div>
                  <h1>
                    {selectedFrom.code}
                    <TrendingFlatSharpIcon />
                    {selectedTo.code}
                  </h1>
                  <h3>
                    <strong>Price:</strong> ₹{" "}
                    {new Intl.NumberFormat("en-IN", {
                      maximumFractionDigits: 0,
                    }).format(selectedOfferDetails.price)}
                  </h3>
                </div>
                <div style={{ marginLeft: "40px" }}>
                  <div
                    style={{
                      background: "white",
                      position: "relative",
                      width: "30px",
                      height: "30px",
                    }}
                  >
                    {Array.isArray(selectedOfferDetails2.airlineIATASet) &&
                      selectedOfferDetails2.airlineIATASet.map(
                        (carrierCode, index, uniqueCodes) => {
                          const isMultipleImages = uniqueCodes.length > 1;
                          const imageSize = isMultipleImages ? "15px" : "30px";

                          return (
                            <div
                              key={index}
                              style={{
                                position: "absolute",
                                top: `${index * 15}px`, // Adjusts the vertical offset for diagonal effect
                                left: `${index * 15}px`, // Adjusts the horizontal offset for diagonal effect
                                backgroundImage: `url(https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/${carrierCode}.png?v=19)`,
                                width: imageSize,
                                height: imageSize,
                                backgroundSize: "cover", // Ensures the image covers the div area properly
                                backgroundPosition: "center", // Centers the image within the div
                              }}
                            ></div>
                          );
                        }
                      )}
                  </div>
                  <h1>
                    {selectedTo.code}
                    <TrendingFlatSharpIcon />
                    {selectedFrom.code}
                  </h1>
                  <h3>
                    <strong>Price:</strong> ₹{" "}
                    {new Intl.NumberFormat("en-IN", {
                      maximumFractionDigits: 0,
                    }).format(selectedOfferDetails2.price)}
                  </h3>
                </div>
                <div style={{ marginLeft: "150px", marginTop: "40px" }}>
                  <h2>
                    <strong>Total Cost:</strong> ₹{" "}
                    {new Intl.NumberFormat("en-IN", {
                      maximumFractionDigits: 0,
                    }).format(totalCost)}
                  </h2>
                </div>
                <button
                  style={{
                    marginLeft: "20px",
                    height: "40px",
                    width: "100px",
                    marginTop: "55px",
                    backgroundColor: "#2ecc71",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={handleBooking}
                >
                  Continue
                </button>
              </div>
            </div>
          )}
      {modalVisible && (
        <FlightResultRound completeBooking={completeBooking}
        closeModal={closeModal}
        totalTraveler={totalTraveler}
        totalCost={totalCost}
        selectedOfferDetails2={selectedOfferDetails2}
        selectedOfferDetails={selectedOfferDetails}
        formatDuration={formatDuration}
        formatTime={formatTime}
        selectedFrom={selectedFrom}
        selectedTo={selectedTo}
        setSelectedOfferDetails={setSelectedOfferDetails}
        setSelectedOfferDetails2={setSelectedOfferDetails2}
        setSelectedOffer={setSelectedOffer}
        setSelectedOffer2={setSelectedOffer2}
        setModalVisible={setModalVisible}
        formattedDate={formattedDate}
        formattedDate1={formattedDate1}
         />
      )}
    </Container>
  );
};

export default FlightSearchReturn;
