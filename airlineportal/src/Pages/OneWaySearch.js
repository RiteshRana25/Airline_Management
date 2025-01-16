import React, { useState } from "react";
import { Container, Grid, Button, Typography } from "@mui/material";
import { useFlightContext } from "../FlightContext";
import Passengers from "../Component/Passengers/Passengers";
import LocationSearch from "../Component/LocationSearch/LocationSearch";
import TripSearch from "../Component/TripSearch/TripSearch";
import Class from "../Component/Class/Class";
import "./OneWaySearch.css";
import Header from "../Component/Header/Header";
import FlightSearch from "../Component/FlightSearch/FlightSearch";
import CheckBoxDiv from "../Component/CheckBoxDiv/CheckBoxDiv";
import { useNavigate } from "react-router-dom";
import CalendarOne from "../Component/CalendarDiv/CalendarOne";

const OneWaySearch = () => {
  const {
    traveller,
    setTraveller,
    selectedTrip,
    setSelectedTrip,
    className,
    setClassName,
    departureDateString,
    selectedFrom,
    selectedTo,
    adults,
    child,
    infants,
    setSelectedFrom,
    setSelectedTo,
    setAdults,
    setInfants,
    setChild,
    setCount,
    setSelectedFrom1,
    setSelectedTo1
  } = useFlightContext();
  const [selectedDepartureTime, setSelectedDepartureTime] = useState(0);
  const [selectedArrivalTime, setSelectedArrivalTime] = useState(0);
  const [run, setRun] = useState(false);
  const [error, setError] = useState("");
  const [maxStops, setMaxStops] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxTotalTime, setMaxTotalTime] = useState(null);
  const [minTotalTime, setMinTotalTime] = useState(null);
  const [nonStop, setNonStop] = useState(false);
  const [isOneStop, setIsOneStop] = useState(false);
  const [isMoreThanOneStop, setIsMoreThanOneStop] = useState(false);
  const handleSearchClick = () => {
    setRun(true);
    if (!selectedFrom || !selectedTo) {
      setError("Both From and To locations must be selected.");
      return;
    }

    if (selectedFrom.code === selectedTo.code) {
      setError("From and To airports cannot be the same.");
      return;
    }

    setError("");
  };
  const navigate = useNavigate();
  const handleClassChange = (event) => {
    setClassName(event.target.value);
  };
  const handleTripTypeChange = (event) => {
    const selectedTripType = event.target.value;
    setSelectedTrip(selectedTripType);

    if (selectedTripType === "round-trip") {
      navigate("/roundtripsearch");
    } else if (selectedTripType === "multi-way") {
      setCount(1)
      setSelectedFrom1({
        name: "CHENNAI INTERNATIONAL",
        city: "CHENNAI",
        code: "MAA",
        country: "INDIA",
      });
      setSelectedTo1({
        name: "KEMPEGOWDA INTL",
        city: "BENGALURU",
        code: "BLR",
        country: "INDIA",
      });
      navigate("/multiwaysearch");
    } else if (selectedTripType === "one-way") {
      navigate("/onewaysearch");
    }
  };
  return (
    <>
      <Header />
      <Container maxWidth="xxl" className="onewaycontainer">
        <Grid
          container
          spacing={2}
          alignItems="center"
          sx={{
            padding: "20px",
            backgroundColor: "#1a202c",
            borderRadius: "8px",
            color: "white",
          }}
        >
          <Grid item xs={2}>
            <TripSearch
              handleTripTypeChange={handleTripTypeChange}
              selectedTrip={selectedTrip}
            />
          </Grid>
          <LocationSearch
            error={error}
            setError={setError}
            selectedTo={selectedTo}
            setSelectedTo={setSelectedTo}
            selectedFrom={selectedFrom}
            setSelectedFrom={setSelectedFrom}
          />
          <Grid className="depart" style={{ color: "white" }} item xs={2}>
            <CalendarOne
            />
          </Grid>
          <Grid item xs={2} style={{marginLeft:'10px'}}>
            <Typography>Passengers</Typography>
            <div
              style={{
                marginLeft: "-20px",
                backgroundColor: "#2d3748",
                padding: "10px",
                borderRadius: "5px",
                height: "38px",
                color: "white",
              }}
            >
              <Passengers
                traveller={traveller}
                setTraveller={setTraveller}
                adults={adults}
                child={child}
                infants={infants}
                setAdults={setAdults}
                setChild={setChild}
                setInfants={setInfants}
              />
            </div>
          </Grid>
          <Grid item xs={2}>
            <Class
              className={className}
              handleClassChange={handleClassChange}
            />
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#6c757d",
                color: "white",
                width: "150px",
                padding: "10px",
                fontWeight: "bold",
              }}
              onClick={handleSearchClick}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Container>
      <div style={{ display: "flex" }}>
        <CheckBoxDiv
          selectedArrivalTime={selectedArrivalTime}
          selectedDepartureTime={selectedDepartureTime}
          setSelectedArrivalTime={setSelectedArrivalTime}
          setSelectedDepartureTime={setSelectedDepartureTime}
          setNonStop={setNonStop}
          selectedTo={selectedTo}
          selectedFrom={selectedFrom}
          maxStops={maxStops}
          maxPrice={maxPrice}
          minPrice={minPrice}
          maxTotalTime={maxTotalTime}
          minTotalTime={minTotalTime}
          setIsMoreThanOneStop={setIsMoreThanOneStop}
          isMoreThanOneStop={isMoreThanOneStop}
          setIsOneStop={setIsOneStop}
          isOneStop={isOneStop}
        />
        <FlightSearch
          isMoreThanOneStop={isMoreThanOneStop}
          isOneStop={isOneStop}
          selectedArrivalTime={selectedArrivalTime}
          selectedDepartureTime={selectedDepartureTime}
          nonStop={nonStop}
          run={run}
          setRun={setRun}
          className={className}
          departureDateString={departureDateString}
          selectedFrom={selectedFrom}
          selectedTo={selectedTo}
          adults={adults}
          child={child}
          infants={infants}
          error={error}
          setError={setError}
          setMaxStops={setMaxStops}
          setMaxPrice={setMaxPrice}
          setMinPrice={setMinPrice}
          setMinTotalTime={setMinTotalTime}
          setMaxTotalTime={setMaxTotalTime}
        />
      </div>
    </>
  );
};

export default OneWaySearch;
