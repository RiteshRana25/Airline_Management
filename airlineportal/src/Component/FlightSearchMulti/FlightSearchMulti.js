import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, CircularProgress } from "@mui/material";
import "./FlightSearchMulti.css";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const FlightSearchMulti = ({
  nonStop,
  setMaxStops,
  className,
  departureDateString,
  selectedFrom,
  selectedTo,
  run1,
  setRun1,
  selectedArrivalTime,
  selectedDepartureTime,
  isMoreThanOneStop,
  isOneStop,
  setSelectedFlight,
  selectedFlight,
  setSelectedFlightDetails,
  setFormattedDate
}) => {
  const [error01, setError01] = useState("");
  const [airplanes, setAirplanes] = useState([]);
  const [cityName1, setCityName1] = useState("");
  const [cityName2, setCityName2] = useState("");
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiKey = 'F4LGsfx2BrFcM2Xy6K3yiJmAmjiISi9G';
  const apiSecret = 'OfHPO1gx8jCuMYDf';

  const fetchFlightData = async () => {
    setLoading(true);
    setError01("");

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
            departureDate: departureDateString,
            adults: 1,
            travelClass: className,
            nonStop: nonStop,
            currencyCode: "USD",
            max: 250,
          },
        }
      );

      let flightsData = flightResponse.data.data;

      // Filtering based on selected departure and arrival times
      if (selectedDepartureTime === 1) {
        flightsData = flightsData.filter((flight) =>
          flight.itineraries.some((itinerary) => {
            const firstSegment = itinerary.segments[0];
            if (!firstSegment || !firstSegment.departure?.at) return false;
            const departureTime = new Date(
              firstSegment.departure.at
            ).getHours();
            return departureTime >= 0 && departureTime < 6;
          })
        );
      } else if (selectedDepartureTime === 2) {
        flightsData = flightsData.filter((flight) =>
          flight.itineraries.some((itinerary) => {
            const firstSegment = itinerary.segments[0];
            if (!firstSegment || !firstSegment.departure?.at) return false;
            const departureTime = new Date(
              firstSegment.departure.at
            ).getHours();
            return departureTime >= 6 && departureTime < 12;
          })
        );
      } else if (selectedDepartureTime === 3) {
        flightsData = flightsData.filter((flight) =>
          flight.itineraries.some((itinerary) => {
            const firstSegment = itinerary.segments[0];
            if (!firstSegment || !firstSegment.departure?.at) return false;
            const departureTime = new Date(
              firstSegment.departure.at
            ).getHours();
            return departureTime >= 12 && departureTime < 18;
          })
        );
      } else if (selectedDepartureTime === 4) {
        flightsData = flightsData.filter((flight) =>
          flight.itineraries.some((itinerary) => {
            const firstSegment = itinerary.segments[0];
            if (!firstSegment || !firstSegment.departure?.at) return false;
            const departureTime = new Date(
              firstSegment.departure.at
            ).getHours();
            return departureTime >= 18 && departureTime < 24;
          })
        );
      }

      if (selectedArrivalTime === 1) {
        flightsData = flightsData.filter((flight) =>
          flight.itineraries.some((itinerary) => {
            const lastSegment =
              itinerary.segments[itinerary.segments.length - 1];
            if (!lastSegment || !lastSegment.arrival?.at) return false;
            const arrivalTime = new Date(lastSegment.arrival.at).getHours();
            return arrivalTime >= 0 && arrivalTime < 6;
          })
        );
      } else if (selectedArrivalTime === 2) {
        flightsData = flightsData.filter((flight) =>
          flight.itineraries.some((itinerary) => {
            const lastSegment =
              itinerary.segments[itinerary.segments.length - 1];
            if (!lastSegment || !lastSegment.arrival?.at) return false;
            const arrivalTime = new Date(lastSegment.arrival.at).getHours();
            return arrivalTime >= 6 && arrivalTime < 12;
          })
        );
      } else if (selectedArrivalTime === 3) {
        flightsData = flightsData.filter((flight) =>
          flight.itineraries.some((itinerary) => {
            const lastSegment =
              itinerary.segments[itinerary.segments.length - 1];
            if (!lastSegment || !lastSegment.arrival?.at) return false;
            const arrivalTime = new Date(lastSegment.arrival.at).getHours();
            return arrivalTime >= 12 && arrivalTime < 18;
          })
        );
      } else if (selectedArrivalTime === 4) {
        flightsData = flightsData.filter((flight) =>
          flight.itineraries.some((itinerary) => {
            const lastSegment =
              itinerary.segments[itinerary.segments.length - 1];
            if (!lastSegment || !lastSegment.arrival?.at) return false;
            const arrivalTime = new Date(lastSegment.arrival.at).getHours();
            return arrivalTime >= 18 && arrivalTime < 24;
          })
        );
      }

      // Filter based on stops
      if (isOneStop) {
        flightsData = flightsData.filter((flight) =>
          flight.itineraries.some(
            (itinerary) => itinerary.segments.length - 1 === 1
          )
        );
      } else if (isMoreThanOneStop) {
        flightsData = flightsData.filter((flight) =>
          flight.itineraries.some(
            (itinerary) => itinerary.segments.length - 1 > 1
          )
        );
      }

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

          const airplaneData = airplaneResponse.data.data.map((airline) => ({
            iataCode: airline.iataCode,
            commonName: airline.commonName,
          }));

          setAirplanes(airplaneData);
        } catch (err) {
          console.error("Error fetching airplane data:", err);
        }
      };

      await fetchAirplanes();

      setFlights(flightsData);
      setMaxStops(
        Math.max(
          ...flightsData.map(
            (flight) => flight.itineraries[0].segments.length - 1
          )
        )
      );
    } catch (err) {
      setError01(err.response?.data?.message || "Error fetching flight data");
    } finally {
      setLoading(false);
    }
  };

  const convertDurationToHours = (duration) => {
    const match = duration.match(/PT(\d+)H(?:(\d+)M)?/);
    if (match) {
      const hours = parseInt(match[1], 10);
      const minutes = match[2] ? parseInt(match[2], 10) : 0;
      return { hours, minutes };
    }
    return { hours: 0, minutes: 0 };
  };

  useEffect(() => {
    fetchFlightData();
    setCityName1(selectedFrom.city);
    setCityName2(selectedTo.city);
    setRun1(false);
  }, [
    run1,
    nonStop,
    isMoreThanOneStop,
    isOneStop,
    selectedArrivalTime,
    selectedDepartureTime,
  ]);

  const renderDots = (stops) => {
    const dots = [];
    if (stops === 1) {
      dots.push(
        <span
          key={0}
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            width: "10px",
            height: "10px",
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
            width: "10px",
            height: "10px",
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
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "#3498db",
          }}
        ></span>
      );
    }
    return dots;
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "long", day: "numeric", month: "short" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const [day, month, dateNum] = formattedDate.split(" ");
    return `${day} ${dateNum} ${month}`;
  };

  const handleSelectFlight = (flight, itinerary) => {
    const date = new Date(departureDateString);
    setFormattedDate(formatDate(date));
    setSelectedFlight(flight);
    const airlinesSet = new Set();
    const allAirlines = [];
    const departureCities = [];
    const arrivalCities = [];
    const segmentDurations = [];
    const layoverDurations = [];
    const departureTimes = [];
    const arrivalTimes = [];
    const flightSegments = [];
    const airlineIATA = [];
    const uniqueIATACodes = new Set(); // Set to store unique IATA codes
  
    const firstDepartureTime = new Date(itinerary.segments[0].departure.at);
    const lastArrivalTime = new Date(
      itinerary.segments[itinerary.segments.length - 1].arrival.at
    );
  
    itinerary.segments.forEach((segment, index) => {
      // Get airline name and code
      const airline = airplanes.find(
        (airplane) => airplane.iataCode === segment.carrierCode
      );
      const airlineName = airline ? airline.commonName : segment.carrierCode;
      airlinesSet.add(airlineName);
      allAirlines.push(airlineName);
  
      const airlineIataCode = airline ? airline.iataCode : segment.carrierCode;
      airlineIATA.push(airlineIataCode);
  
      // Add unique IATA code to the set
      uniqueIATACodes.add(airlineIataCode);
  
      // Collect cities and times
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
  
      // Calculate durations
      const segmentDurationMs = arrivalTime - departureTime;
      segmentDurations.push(
        `${Math.floor(segmentDurationMs / (1000 * 60 * 60))}h ${
          (segmentDurationMs / (1000 * 60)) % 60
        }m`
      );
  
      if (index < itinerary.segments.length - 1) {
        const nextDepartureTime = new Date(
          itinerary.segments[index + 1].departure.at
        );
        const layoverDurationMs = nextDepartureTime - arrivalTime;
        layoverDurations.push(
          `${Math.floor(layoverDurationMs / (1000 * 60 * 60))}h ${
            (layoverDurationMs / (1000 * 60)) % 60
          }m`
        );
      }
  
      // Carrier code and flight number
      flightSegments.push(`${segment.carrierCode} ${segment.number}`);
    });
  
    // Calculate total duration
    const totalDurationMs = lastArrivalTime - firstDepartureTime;
    const totalDuration = `${Math.floor(totalDurationMs / (1000 * 60 * 60))}h ${
      (totalDurationMs / (1000 * 60)) % 60
    }m`;
  
    // Prepare flight details object
    const flightDetails = {
      airlines: Array.from(airlinesSet),
      allAirlines,
      uniqueIATACodes: Array.from(uniqueIATACodes), // Convert set to array for details
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
      stops: itinerary.segments.length - 1,
      price: flight.price.total * 85,
      firstDepartureCity: departureCities[0],
      lastArrivalCity: arrivalCities[arrivalCities.length - 1],
      departureCities,
      arrivalCities,
      departureTimes,
      arrivalTimes,
      flightSegments,
      airlineIATA,
    };
    setSelectedFlightDetails(flightDetails);
  };
  
  return (
    <Container className="searchmulti"
      maxWidth="md"
      style={{
        border: "8px solid #e5eef5",
        width: "1000px",
      }}
    >
      <h2>
        Select flight From {selectedFrom.city} to {selectedTo.city}
      </h2>

      {error01 && <p style={{ color: "red" }}>{error01}</p>}

      {loading ? (
        <CircularProgress />
      ) : (
        <div className="maindiv">
          {flights.length > 0 ? (
            flights.map((flight) => (
              <div className="singlediv" key={flight.id}>
                {flight.itineraries.map((itinerary, idx) => (
                  <div className="whichcontain" key={idx}>
                    <div className="aircode">
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
                            itinerary.segments.map(
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
                        style={{
                          fontSize: "medium",
                          display: "block",
                          width: "120px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {[
                          ...new Set(
                            itinerary.segments.map((segment) => {
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
                    </div>

                    <div className="departtime">
                      <span>
                        {new Date(
                          itinerary.segments[0].departure.at
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <span
                        style={{
                          fontSize: "medium",
                          display: "block",
                          width: "120px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {" "}
                        {cityName1}
                      </span>
                    </div>
                    <div className="totaltime">
                      <span>
                        {String(
                          convertDurationToHours(itinerary.duration).hours
                        ).padStart(2, "0")}{" "}
                        h
                        {convertDurationToHours(itinerary.duration).minutes >
                          0 &&
                          ` ${
                            convertDurationToHours(itinerary.duration).minutes
                          } m`}
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
                        {renderDots(itinerary.segments.length - 1)}
                      </div>
                      <span
                        style={{
                          display: "block",
                          width: "100%",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {itinerary.segments.length > 1
                          ? `${
                              itinerary.segments.length - 1
                            } stop(s) via ${itinerary.segments
                              .slice(0, -1)
                              .map((segment) => segment.arrival.iataCode)
                              .join(", ")}`
                          : "Non-stop"}
                      </span>
                    </div>

                    <div className="arivaltime">
                      <span>
                        {new Date(
                          itinerary.segments[
                            itinerary.segments.length - 1
                          ].arrival.at
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <span
                        style={{
                          fontSize: "medium",
                          display: "block",
                          width: "120px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {cityName2}
                      </span>
                    </div>
                    <div className="totalcost">
                      <span>
                        {"₹ "}
                        {new Intl.NumberFormat("en-IN", {
                          maximumFractionDigits: 0,
                        }).format(flight.price.total * 85)}
                      </span>
                      <span> per adult</span>
                    </div>
                    <div className="bookingbutton">
                      <button
                        type="button"
                        onClick={() => handleSelectFlight(flight, itinerary)} // Set the selected flight and its details
                        style={{
                          backgroundColor:"#3498db",
                          color: "white",
                          padding: "10px 20px",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        {selectedFlight?.id === flight.id
                          ?<>
                          <span style={{display:"flex"}}><CheckCircleIcon style={{marginTop:'2px',fontSize:'16px'}}/>Selected</span>
                          </> 
                          : "Select"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p>No flight offers found.</p>
          )}
        </div>
      )}
    </Container>
  );
};

export default FlightSearchMulti;
