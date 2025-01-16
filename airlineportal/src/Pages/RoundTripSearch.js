import React, { useState } from "react";
import { Container, Grid, Button, Typography } from "@mui/material";
import Passengers from "../Component/Passengers/Passengers";
import { useNavigate } from "react-router-dom";
import TripSearch from "../Component/TripSearch/TripSearch";
import Return from "../Component/Return/Return"; // Import Return component
import Class from "../Component/Class/Class";
import Header from "../Component/Header/Header";
import "./RoundTripSearch.css";
import { useFlightContext } from "../FlightContext";
import FlightSearchReturn from "../Component/FlightSearchReturn/FlightSearchReturn";
import LocationSearch2 from "../Component/LocationSearch/LocationSearch2";
import CheckBoxRound from "../Component/CheckBoxRound/CheckBoxRound";
import CalendarDivRound from "../Component/CalendarDiv/CalendarDivRound";
import CalendarReturn from "../Component/CalendarDiv/CalendarReturn";

const RoundTripSearch = () => {
  const {
    traveller,
    setTraveller,
    selectedTrip,
    setSelectedTrip,
    className,
    setClassName,
    departureDateString,
    setDepartureDateString,
    returnDateString,
    setReturnDateString,
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
  const [nonStop1, setNonStop1] = useState(false);
  const [nonStop2, setNonStop2] = useState(false);
  const [selectedDepartureTime1, setSelectedDepartureTime1] = useState(0);
  const [selectedDepartureTime2, setSelectedDepartureTime2] = useState(0);
  const [selectedArrivalTime1, setSelectedArrivalTime1] = useState(0);
  const [selectedArrivalTime2, setSelectedArrivalTime2] = useState(0);
  const [isOneStop2, setIsOneStop2] = useState(false);
  const [isMoreThanOneStop2, setIsMoreThanOneStop2] = useState(false);
  const [isOneStop1, setIsOneStop1] = useState(false);
  const [isMoreThanOneStop1, setIsMoreThanOneStop1] = useState(false);

  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [run, setRun] = useState(false);
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

  const handleSearchClick = () => {
    setRun(true);
    if (!selectedFrom || !selectedTo) {
      setError1("Both From and To locations must be selected.");
      return;
    }

    if (selectedFrom.code === selectedTo.code) {
      setError1("From and To airports cannot be the same.");
      return;
    }

    setError1("");
  };
  return (
    <>
      <Header />
      <Container maxWidth="xxl" className="roundtripcontainer">
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
          <Grid item xs={1.4}>
            <TripSearch
              selectedTrip={selectedTrip}
              handleTripTypeChange={handleTripTypeChange}
            />
          </Grid>

          <LocationSearch2
            error1={error1}
            setError1={setError1}
            selectedFrom={selectedFrom}
            selectedTo={selectedTo}
            setSelectedFrom={setSelectedFrom}
            setSelectedTo={setSelectedTo}
          />

          <Grid item xs={1.6}>
            <CalendarDivRound
            />
          </Grid>

          <Grid item xs={1.6} style={{ marginLeft: "-30px" }}>
            <CalendarReturn
            />{" "}
            {/* Include Return component */}
          </Grid>

          {/* Passengers Section */}
          <Grid item xs={1.7} style={{marginLeft:'70px',marginTop:'20px'}}>
            <div
              style={{
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
          <Grid item xs={1.9} style={{marginLeft:'-10px'}}>
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
        <CheckBoxRound
          selectedArrivalTime1={selectedArrivalTime1}
          selectedArrivalTime2={selectedArrivalTime2}
          selectedDepartureTime1={selectedDepartureTime1}
          selectedDepartureTime2={selectedDepartureTime2}
          setSelectedArrivalTime2={setSelectedArrivalTime2}
          setSelectedArrivalTime1={setSelectedArrivalTime1}
          setSelectedDepartureTime2={setSelectedDepartureTime2}
          setSelectedDepartureTime1={setSelectedDepartureTime1}
          selectedFrom={selectedFrom}
          selectedTo={selectedTo}
          setNonStop1={setNonStop1}
          setNonStop2={setNonStop2}
          setIsOneStop1={setIsOneStop1}
          setIsMoreThanOneStop1={setIsMoreThanOneStop1}
          setIsOneStop2={setIsOneStop2}
          setIsMoreThanOneStop2={setIsMoreThanOneStop2}
        />
        <FlightSearchReturn
        selectedDepartureTime2={selectedDepartureTime2}
        selectedDepartureTime1={selectedDepartureTime1}
        selectedArrivalTime2={selectedArrivalTime2}
        selectedArrivalTime1={selectedArrivalTime1}
        isOneStop1={isOneStop1}
        isOneStop2={isOneStop2}
        isMoreThanOneStop1={isMoreThanOneStop1}
        isMoreThanOneStop2={isMoreThanOneStop2}
          nonStop1={nonStop1}
          nonStop2={nonStop2}
          run={run}
          setRun={setRun}
          className={className}
          departureDateString={departureDateString}
          selectedFrom={selectedFrom}
          selectedTo={selectedTo}
          adults={adults}
          child={child}
          infants={infants}
          error1={error1}
          setError1={setError1}
          returnDateString={returnDateString}
          error2={error2}
          setError2={setError2}

          // setMaxStops={setMaxStops}
          // setMaxPrice={setMaxPrice}
          // setMinPrice={setMinPrice}
          // setMinTotalTime={setMinTotalTime}
          // setMaxTotalTime={setMaxTotalTime}
        />
      </div>
    </>
  );
};

export default RoundTripSearch;
