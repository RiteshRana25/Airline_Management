import React, { Children, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Container, CircularProgress } from "@mui/material";
import "./FlightSearch.css";
import { FlightContext } from "../../FlightContext";
import FlightResultOne from "../FlightResult/FlightResultOne";

const FlightSearch = ({
  nonStop,
  setMaxStops,
  className,
  departureDateString,
  selectedFrom,
  selectedTo,
  error,
  setError,
  setMinTotalTime,
  setMaxTotalTime,
  setMinPrice,
  setMaxPrice,
  run,
  setRun,
  selectedDepartureTime,
  selectedArrivalTime,
  isOneStop,
  isMoreThanOneStop,
  child,
  adults,
}) => {
  const { isLoggedIn, username } = useContext(FlightContext);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [airplanes, setAirplanes] = useState([]);
  const [cityName1, setCityName1] = useState("");
  const [cityName2, setCityName2] = useState("");
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  const [totalTraveler, setTotalTraveler] = useState(1);

  const apiKey = "F4LGsfx2BrFcM2Xy6K3yiJmAmjiISi9G";
  const apiSecret = "OfHPO1gx8jCuMYDf";

  const fetchFlightData = async () => {
    setLoading(true);
    setError("");

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

      // Filter flights based on the 'filterBefore6am' condition
      if (selectedDepartureTime === 1) {
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
      } else if (selectedDepartureTime === 2) {
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
      } else if (selectedDepartureTime === 3) {
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
      } else if (selectedDepartureTime === 4) {
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

      if (selectedArrivalTime === 1) {
        flightsData = flightsData.filter((flight) =>
          flight.itineraries.some((itinerary) => {
            const lastSegment =
              itinerary.segments[itinerary.segments.length - 1];
            if (!lastSegment || !lastSegment.arrival?.at) return false;
            const arrivalTime = new Date(lastSegment.arrival.at).getHours();
            return arrivalTime >= 0 && arrivalTime < 6; // Ensure only 0:00 to 5:59
          })
        );
      } else if (selectedArrivalTime === 2) {
        flightsData = flightsData.filter((flight) =>
          flight.itineraries.some((itinerary) => {
            const lastSegment =
              itinerary.segments[itinerary.segments.length - 1];
            if (!lastSegment || !lastSegment.arrival?.at) return false;
            const arrivalTime = new Date(lastSegment.arrival.at).getHours();
            return arrivalTime >= 6 && arrivalTime < 12; // Ensure only 6:00 to 11:59
          })
        );
      } else if (selectedArrivalTime === 3) {
        flightsData = flightsData.filter((flight) =>
          flight.itineraries.some((itinerary) => {
            const lastSegment =
              itinerary.segments[itinerary.segments.length - 1];
            if (!lastSegment || !lastSegment.arrival?.at) return false;
            const arrivalTime = new Date(lastSegment.arrival.at).getHours();
            return arrivalTime >= 12 && arrivalTime < 18; // Ensure only 12:00 to 17:59
          })
        );
      } else if (selectedArrivalTime === 4) {
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

      // Calculate max/min price and durations
      let maxFlightPrice = 0;
      let minFlightPrice = Number.MAX_VALUE;
      let maxDuration = 0;
      let minDuration = Number.MAX_VALUE;

      flightsData.forEach((flight) => {
        const priceInINR = flight.price.total * 85; // Convert to INR
        maxFlightPrice = Math.max(maxFlightPrice, priceInINR);
        minFlightPrice = Math.min(minFlightPrice, priceInINR);

        flight.itineraries.forEach((itinerary) => {
          const totalDuration = itinerary.segments.reduce((acc, segment) => {
            const { hours, minutes } = convertDurationToHours(segment.duration);
            return acc + hours * 60 + minutes;
          }, 0);

          maxDuration = Math.max(maxDuration, totalDuration);
          minDuration = Math.min(minDuration, totalDuration);
        });
      });

      // Convert durations back to h m format
      const convertMinutesToTime = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return { hours, minutes };
      };

      setFlights(flightsData);
      setMaxStops(
        Math.max(
          ...flightsData.map(
            (flight) => flight.itineraries[0].segments.length - 1
          )
        )
      );
      setMaxPrice(
        new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
          maxFlightPrice
        )
      );
      setMinPrice(
        new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
          minFlightPrice
        )
      );

      const { hours: maxHours, minutes: maxMinutes } =
        convertMinutesToTime(maxDuration);
      const { hours: minHours, minutes: minMinutes } =
        convertMinutesToTime(minDuration);

      setMaxTotalTime(
        `${String(maxHours).padStart(2, "0")} h ${
          maxMinutes > 0 ? `${maxMinutes} m` : ""
        }`
      );
      setMinTotalTime(
        `${String(minHours).padStart(2, "0")} h ${
          minMinutes > 0 ? `${minMinutes} m` : ""
        }`
      );
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching flight data");
    } finally {
      setLoading(false);
    }
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
    setRun(false);
  }, [
    run,
    nonStop,
    selectedDepartureTime,
    selectedArrivalTime,
    isOneStop,
    isMoreThanOneStop,
  ]); // Add filterBefore6am as dependency

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

  function formatDate(date) {
    const dayFormatter = new Intl.DateTimeFormat("en-US", { weekday: "long" });
    const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "short" });
    const dateFormatter = new Intl.DateTimeFormat("en-US", { day: "numeric" });

    const day = dayFormatter.format(date);
    const month = monthFormatter.format(date);
    const dayOfMonth = dateFormatter.format(date);

    return `${day}, ${month} ${dayOfMonth}`;
  }
  const handleBookClick = (flightDetails) => {
    setSelectedFlight(flightDetails);
    const date = new Date(departureDateString);
    setFormattedDate(formatDate(date));
    setTotalTraveler(adults + child);
  };
  const handleBooking = async () => {
    if (!isLoggedIn) {
      alert("Please log in to book the flight!");
      return;
    }
    try {
      const bookingDetails = {
        departureCity: selectedFrom.city,
        arrivalCity: selectedTo.city,
        departureDate: formattedDate,
        totalPrice: selectedFlight.price * totalTraveler,
        username,
        totalTraveller: totalTraveler,
      };

      // Send the booking data to your backend
      const response = await axios.post(
        "https://airline-management-backend.vercel.app/bookFlight",
        bookingDetails
      );
      console.log("Booking successful:", response.data);
      alert("Booking successful!");
    } catch (error) {
      console.error("Error booking flight:", error);
      alert("Error while booking flight!");
    }
  };

  return (
    <Container
      className="searchone"
      maxWidth="lg"
      style={{
        border: "8px solid #e5eef5",
        width: "1000px",
      }}
    >
      <h1>Flight Search</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

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
                          width: "30px", // Adjust width to accommodate the images
                          height: "30px", // Adjust height for proper spacing
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
                          const imageSize = isMultipleImages ? "15px" : "30px"; // Set size to smaller if there are multiple images

                          let top = `${index * 15}px`;
                          let left = `${index * 15}px`;

                          // Custom positioning for the third image
                          if (index === 2) {
                            top = "0px"; // Aligns the third image horizontally
                            left = "15px"; // Places it to the right of the first image
                          }
                          if (index === 3) {
                            top = "15px"; // Places it below the third image
                            left = "0px"; // Places it to the left of the third image
                          }

                          return (
                            <div
                              key={index}
                              style={{
                                position: "absolute",
                                top: top, // Adjusts vertical offset
                                left: left, // Adjusts horizontal offset
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
                      ></span>

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
                        {itinerary.segments
                          .map(
                            (segment) =>
                              `${segment.carrierCode} ${segment.number}`
                          )
                          .join(", ")}
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
                      <span> {cityName1}</span>
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
                      <span>{cityName2}</span>
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
                        onClick={() => {
                          const airlinesSet = new Set();
                          const allAirlines = [];
                          const departureCities = [];
                          const arrivalCities = [];
                          const segmentDurations = [];
                          const layoverDurations = [];
                          const departureTimes = [];
                          const arrivalTimes = [];
                          const flightSegments = []; // To store carrier code and flight number
                          const airlineIATA = []; // To store airline IATA codes (including duplicates)

                          const firstDepartureTime = new Date(
                            itinerary.segments[0].departure.at
                          );
                          const lastArrivalTime = new Date(
                            itinerary.segments[
                              itinerary.segments.length - 1
                            ].arrival.at
                          );

                          itinerary.segments.forEach((segment, index) => {
                            // Get airline
                            const airline = airplanes.find(
                              (airplane) =>
                                airplane.iataCode === segment.carrierCode
                            );
                            const airlineName = airline
                              ? airline.commonName
                              : segment.carrierCode;
                            airlinesSet.add(airlineName);
                            allAirlines.push(airlineName);

                            // Collect airline IATA codes (including duplicates)
                            const airlineIataCode = airline
                              ? airline.iataCode
                              : segment.carrierCode;
                            airlineIATA.push(airlineIataCode); // Store each airline IATA code

                            // Collect departure and arrival cities
                            departureCities.push(segment.departure.iataCode);
                            arrivalCities.push(segment.arrival.iataCode);

                            // Collect departure and arrival times (in 24-hour format)
                            const departureTime = new Date(
                              segment.departure.at
                            );
                            const arrivalTime = new Date(segment.arrival.at);
                            departureTimes.push(
                              departureTime.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false, // Ensure 24-hour format
                              })
                            );
                            arrivalTimes.push(
                              arrivalTime.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false, // Ensure 24-hour format
                              })
                            );

                            // Calculate segment duration
                            const segmentDurationMs =
                              arrivalTime - departureTime;
                            const segmentDuration = `${Math.floor(
                              segmentDurationMs / (1000 * 60 * 60)
                            )}h ${(segmentDurationMs / (1000 * 60)) % 60}m`;
                            segmentDurations.push(segmentDuration);

                            // Calculate layover duration if applicable
                            if (index < itinerary.segments.length - 1) {
                              const nextDepartureTime = new Date(
                                itinerary.segments[index + 1].departure.at
                              );
                              const layoverDurationMs =
                                nextDepartureTime - arrivalTime;
                              const layoverDuration = `${Math.floor(
                                layoverDurationMs / (1000 * 60 * 60)
                              )}h ${(layoverDurationMs / (1000 * 60)) % 60}m`;
                              layoverDurations.push(layoverDuration);
                            }

                            // Add carrier code and flight number to flightSegments array
                            flightSegments.push(
                              `${segment.carrierCode} ${segment.number}`
                            );
                          });

                          // Calculate total duration
                          const totalDurationMs =
                            lastArrivalTime - firstDepartureTime;
                          const totalDuration = `${Math.floor(
                            totalDurationMs / (1000 * 60 * 60)
                          )}h ${(totalDurationMs / (1000 * 60)) % 60}m`;

                          handleBookClick({
                            airlines: Array.from(airlinesSet), // Unique airlines
                            allAirlines, // All airlines
                            departureTime:
                              firstDepartureTime.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false, // Ensure 24-hour format
                              }),
                            arrivalTime: lastArrivalTime.toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false, // Ensure 24-hour format
                              }
                            ),
                            totalDuration,
                            segmentDurations, // Each segment's duration
                            layoverDurations, // Each layover's duration
                            stops: itinerary.segments.length - 1,
                            price: flight.price.total * 85 * totalTraveler, // Converted to INR
                            firstDepartureCity: departureCities[0], // First departure city
                            lastArrivalCity:
                              arrivalCities[arrivalCities.length - 1], // Last arrival city
                            departureCities, // All departure cities
                            arrivalCities, // All arrival cities
                            departureTimes, // All departure times
                            arrivalTimes, // All arrival times
                            flightSegments, // Carrier codes and flight numbers
                            airlineIATA, // Airline IATA codes (including duplicates)
                          });
                        }}
                      >
                        Book
                      </button>
                    </div>
                    {selectedFlight && (
                      <FlightResultOne
                        handleBooking={handleBooking}
                        formattedDate={formattedDate}
                        setSelectedFlight={setSelectedFlight}
                        selectedFlight={selectedFlight}
                        totalTraveler={totalTraveler}
                        selectedFrom={selectedFrom}
                        selectedTo={selectedTo}
                      />
                    )}
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

export default FlightSearch;
