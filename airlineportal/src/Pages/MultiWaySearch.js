import React, { useContext, useEffect, useState } from "react";
import Header from "../Component/Header/Header";
import { Button, Container, Grid, Typography } from "@mui/material";
import TripSearch from "../Component/TripSearch/TripSearch";
import { FlightContext } from "../FlightContext";
import { useNavigate } from "react-router-dom";
import LocationMultiSearch from "../Component/LocationMultiSearch/LocationMultiSearch";
import Class from "../Component/Class/Class";
import Passengers from "../Component/Passengers/Passengers";
import FlightSearchMulti from "../Component/FlightSearchMulti/FlightSearchMulti";
import MultiLocationSelect from "../Component/MultiLocationSelect/MultiLocationSelect";
import FlightSearchMulti1 from "../Component/FlightSearchMulti/FlightSearchMulti1";
import FlightSearchMulti2 from "../Component/FlightSearchMulti/FlightSearchMulti2";
import FlightSearchMulti3 from "../Component/FlightSearchMulti/FlightSearchMulti3";
import FlightSearchMulti4 from "../Component/FlightSearchMulti/FlightSearchMulti4";
import CheckBoxDiv1 from "../Component/CheckBoxDiv/CheckBoxDiv1";
import TrendingFlatSharpIcon from "@mui/icons-material/TrendingFlatSharp";
import axios from "axios";
import FlightResultMulti from "../Component/FlightResult/FlightResultMulti";
import FlightResultMulti1 from "../Component/FlightResult/FlightResultMulti1";
import FlightResultMulti2 from "../Component/FlightResult/FlightResultMulti2";
import FlightResultMulti3 from "../Component/FlightResult/FlightResultMulti3";

const MultiWaySearch = () => {
  const {
    traveller,
    setTraveller,
    adults,
    setAdults,
    infants,
    setInfants,
    child,
    setChild,
    setClassName,
    className,
    selectedTrip,
    setSelectedTrip,
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
    departureDateString,
    departureDateString1,
    departureDateString2,
    departureDateString3,
    departureDateString4,
    count,
    username,
    isLoggedIn,
    setCount,
    setSelectedTo2,
    setSelectedTo3,
    setSelectedTo4,
    setSelectedFrom2,
    setSelectedFrom3,
    setSelectedFrom4,
  } = useContext(FlightContext);

  const navigate = useNavigate();
  const [totalTraveler, setTotalTraveler] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedFlight1, setSelectedFlight1] = useState(null);
  const [selectedFlight2, setSelectedFlight2] = useState(null);
  const [selectedFlight3, setSelectedFlight3] = useState(null);
  const [selectedFlight4, setSelectedFlight4] = useState(null);
  const [selectedFlightDetails, setSelectedFlightDetails] = useState({});
  const [selectedFlightDetails1, setSelectedFlightDetails1] = useState({});
  const [selectedFlightDetails2, setSelectedFlightDetails2] = useState({});
  const [selectedFlightDetails3, setSelectedFlightDetails3] = useState({});
  const [selectedFlightDetails4, setSelectedFlightDetails4] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const [totalCost1, setTotalCost1] = useState(0);
  const [totalCost2, setTotalCost2] = useState(0);
  const [totalCost3, setTotalCost3] = useState(0);
  const [formattedDate, setFormattedDate] = useState("");
  const [formattedDate1, setFormattedDate1] = useState("");
  const [formattedDate2, setFormattedDate2] = useState("");
  const [formattedDate3, setFormattedDate3] = useState("");
  const [formattedDate4, setFormattedDate4] = useState("");

  const [run1, setRun1] = useState(false);
  const [selectedDepartureTime, setSelectedDepartureTime] = useState(0);
  const [selectedArrivalTime, setSelectedArrivalTime] = useState(0);
  const [maxStops, setMaxStops] = useState(0);
  const [error1, setError1] = useState("");
  const [nonStop, setNonStop] = useState(false);
  const [selectedValue, setSelectedValue] = useState(1);
  const [isOneStop, setIsOneStop] = useState(false);
  const [isMoreThanOneStop, setIsMoreThanOneStop] = useState(false);

  const handleTripTypeChange = (event) => {
    const selectedTripType = event.target.value;
    setSelectedTrip(selectedTripType);

    if (selectedTripType === "round-trip") {
      navigate("/roundtripsearch");
    } else if (selectedTripType === "multi-way") {
      navigate("/multiwaysearch");
    } else if (selectedTripType === "one-way") {
      navigate("/onewaysearch");
    }
  };
  const handleClassChange = (event) => {
    setClassName(event.target.value);
  };
  const handleSearchClick = () => {
    if (count == 4 && (selectedFrom2.city === "" || selectedTo2.city === "")) {
      setSelectedFrom4({
        name: "",
        city: "",
        code: "",
        country: "",
      });
      setSelectedTo4({
        name: "",
        city: "",
        code: "",
        country: "",
      });
      setSelectedFrom3({
        name: "",
        city: "",
        code: "",
        country: "",
      });
      setSelectedTo3({
        name: "",
        city: "",
        code: "",
        country: "",
      });
      setCount(1);
      setRun1(true);
      return;
    } else if (
      count == 4 &&
      (selectedFrom3.city === "" || selectedTo3.city === "")
    ) {
      setSelectedFrom4({
        name: "",
        city: "",
        code: "",
        country: "",
      });
      setSelectedTo4({
        name: "",
        city: "",
        code: "",
        country: "",
      });
      setCount(2);
      setRun1(true);
      return;
    } else if (
      count == 4 &&
      (selectedFrom4.city === "" || selectedTo4.city === "")
    ) {
      setCount(3);
      setRun1(true);
      return;
    } else if (
      count == 3 &&
      (selectedFrom2.city === "" || selectedTo2.city === "")
    ) {
      setSelectedFrom4({
        name: "",
        city: "",
        code: "",
        country: "",
      });
      setSelectedTo4({
        name: "",
        city: "",
        code: "",
        country: "",
      });
      setSelectedFrom3({
        name: "",
        city: "",
        code: "",
        country: "",
      });
      setSelectedTo3({
        name: "",
        city: "",
        code: "",
        country: "",
      });
      setCount(1);
      setRun1(true);
      return;
    } else if (
      count == 3 &&
      (selectedFrom3.city === "" || selectedTo3.city === "")
    ) {
      setSelectedFrom4({
        name: "",
        city: "",
        code: "",
        country: "",
      });
      setSelectedTo4({
        name: "",
        city: "",
        code: "",
        country: "",
      });
      setCount(2);
      setRun1(true);
      return;
    } else if (
      count == 2 &&
      (selectedFrom2.city === "" || selectedTo2.city === "")
    ) {
      setSelectedFrom4({
        name: "",
        city: "",
        code: "",
        country: "",
      });
      setSelectedFrom3({
        name: "",
        city: "",
        code: "",
        country: "",
      });
      setSelectedTo4({
        name: "",
        city: "",
        code: "",
        country: "",
      });
      setSelectedTo3({
        name: "",
        city: "",
        code: "",
        country: "",
      });
      setCount(1);
      setRun1(true);
      return;
    }
    setRun1(true);
  };

  useEffect(() => {
    setTotalCost(
      selectedFlightDetails.price + selectedFlightDetails1.price
    );
    setTotalCost1(
      selectedFlightDetails.price +
        selectedFlightDetails1.price +
        selectedFlightDetails2.price
    );
    setTotalCost2(
      selectedFlightDetails.price +
        selectedFlightDetails1.price +
        selectedFlightDetails2.price +
        selectedFlightDetails3.price
    );
    setTotalCost3(
      selectedFlightDetails.price +
        selectedFlightDetails1.price +
        selectedFlightDetails2.price +
        selectedFlightDetails3.price +
        selectedFlightDetails4.price
    );
  }, [
    selectedFlightDetails,
    selectedFlightDetails1,
    selectedFlightDetails2,
    selectedFlightDetails3,
    selectedFlightDetails4,
  ]);

  const handleBooking = () => {
    setTotalTraveler(adults + child);
    setModalVisible(true);
  };
  const handleBooking1 = () => {
    setTotalTraveler(adults + child);
    setModalVisible1(true);
  };
  const handleBooking2 = () => {
    setTotalTraveler(adults + child);
    setModalVisible2(true);
  };
  const handleBooking3 = () => {
    setTotalTraveler(adults + child);
    setModalVisible3(true);
  };

  const closeModal = () => {
    setModalVisible(false); // Close the modal
  };
  const closeModal1 = () => {
    setModalVisible1(false); // Close the modal
  };
  const closeModal2 = () => {
    setModalVisible2(false); // Close the modal
  };
  const closeModal3 = () => {
    setModalVisible3(false); // Close the modal
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
          totalPrice: selectedFlightDetails.price * totalTraveler,
          username,
          totalTraveller: totalTraveler,
        },
        {
          departureCity: selectedFrom1.city,
          arrivalCity: selectedTo1.city,
          departureDate: formattedDate1,
          totalPrice: selectedFlightDetails1.price * totalTraveler,
          username,
          totalTraveller: totalTraveler,
        },
      ];

      // Send the booking data for both flights
      const responses = await Promise.all(
        bookingDetails.map((details) =>
          axios.post("https://airline-management-backend.vercel.app/bookFlight", details)
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

  const completeBooking1 = async () => {
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
          totalPrice: selectedFlightDetails.price * totalTraveler,
          username,
          totalTraveller: totalTraveler,
        },
        {
          departureCity: selectedFrom1.city,
          arrivalCity: selectedTo1.city,
          departureDate: formattedDate1,
          totalPrice: selectedFlightDetails1.price * totalTraveler,
          username,
          totalTraveller: totalTraveler,
        },
        {
          departureCity: selectedFrom2.city,
          arrivalCity: selectedTo2.city,
          departureDate: formattedDate2,
          totalPrice: selectedFlightDetails2.price * totalTraveler,
          username,
          totalTraveller: totalTraveler,
        },
      ];

      // Send the booking data for both flights
      const responses = await Promise.all(
        bookingDetails.map((details) =>
          axios.post("https://airline-management-backend.vercel.app/bookFlight", details)
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

  const completeBooking2 = async () => {
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
          totalPrice: selectedFlightDetails.price * totalTraveler,
          username,
          totalTraveller: totalTraveler,
        },
        {
          departureCity: selectedFrom1.city,
          arrivalCity: selectedTo1.city,
          departureDate: formattedDate1,
          totalPrice: selectedFlightDetails1.price * totalTraveler,
          username,
          totalTraveller: totalTraveler,
        },
        {
          departureCity: selectedFrom2.city,
          arrivalCity: selectedTo2.city,
          departureDate: formattedDate2,
          totalPrice: selectedFlightDetails2.price * totalTraveler,
          username,
          totalTraveller: totalTraveler,
        },
        {
          departureCity: selectedFrom3.city,
          arrivalCity: selectedTo3.city,
          departureDate: formattedDate3,
          totalPrice: selectedFlightDetails3.price * totalTraveler,
          username,
          totalTraveller: totalTraveler,
        },
      ];

      // Send the booking data for both flights
      const responses = await Promise.all(
        bookingDetails.map((details) =>
          axios.post("https://airline-management-backend.vercel.app/bookFlight", details)
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
  const completeBooking3 = async () => {
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
          totalPrice: selectedFlightDetails.price * totalTraveler,
          username,
          totalTraveller: totalTraveler,
        },
        {
          departureCity: selectedFrom1.city,
          arrivalCity: selectedTo1.city,
          departureDate: formattedDate1,
          totalPrice: selectedFlightDetails1.price * totalTraveler,
          username,
          totalTraveller: totalTraveler,
        },
        {
          departureCity: selectedFrom2.city,
          arrivalCity: selectedTo2.city,
          departureDate: formattedDate2,
          totalPrice: selectedFlightDetails2.price * totalTraveler,
          username,
          totalTraveller: totalTraveler,
        },
        {
          departureCity: selectedFrom3.city,
          arrivalCity: selectedTo3.city,
          departureDate: formattedDate3,
          totalPrice: selectedFlightDetails3.price * totalTraveler,
          username,
          totalTraveller: totalTraveler,
        },
        {
          departureCity: selectedFrom4.city,
          arrivalCity: selectedTo4.city,
          departureDate: formattedDate4,
          totalPrice: selectedFlightDetails4.price * totalTraveler,
          username,
          totalTraveller: totalTraveler,
        },
      ];

      // Send the booking data for both flights
      const responses = await Promise.all(
        bookingDetails.map((details) =>
          axios.post("https://airline-management-backend.vercel.app/bookFlight", details)
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
    <>
      <Header />
      <Container maxWidth="xxl" className="roundtripcontainer">
        <Grid
          container
          spacing={2}
          alignItems="center"
          sx={{
            position: "relative",
            padding: "20px",
            backgroundColor: "#1a202c",
            borderRadius: "8px",
            color: "white",
          }}
        >
          <Grid item xs={2} style={{ position: "absolute", top: "0px" }}>
            <TripSearch
              handleTripTypeChange={handleTripTypeChange}
              selectedTrip={selectedTrip}
            />
          </Grid>
          <Grid item xs={2} style={{ marginLeft: "150px", width: "50%" }}>
            <LocationMultiSearch />
          </Grid>
          <Grid
            item
            xs={2}
            style={{ position: "absolute", top: "0", left: "63%" }}
          >
            <Typography style={{ color: "#008cff" }}>Passengers</Typography>
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
          <Grid
            item
            xs={2}
            style={{ position: "absolute", top: "0", left: "78%" }}
          >
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
        <CheckBoxDiv1
          setIsOneStop={setIsOneStop}
          setIsMoreThanOneStop={setIsMoreThanOneStop}
          selectedArrivalTime={selectedArrivalTime}
          setSelectedArrivalTime={setSelectedArrivalTime}
          setSelectedDepartureTime={setSelectedDepartureTime}
          selectedDepartureTime={selectedDepartureTime}
          selectedValue={selectedValue}
          setNonStop={setNonStop}
          selectedTo={selectedTo}
          selectedTo1={selectedTo1}
          selectedTo2={selectedTo2}
          selectedTo3={selectedTo3}
          selectedTo4={selectedTo4}
          selectedFrom={selectedFrom}
          selectedFrom1={selectedFrom1}
          selectedFrom2={selectedFrom2}
          selectedFrom3={selectedFrom3}
          selectedFrom4={selectedFrom4}
        />
        <div
          className="multisearch"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <MultiLocationSelect
            count={count}
            run1={run1}
            setRun1={setRun1}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
          />
          {selectedValue == 1 && (
            <FlightSearchMulti
            setFormattedDate={setFormattedDate}
              setSelectedFlightDetails={setSelectedFlightDetails}
              setSelectedFlight={setSelectedFlight}
              selectedFlight={selectedFlight}
              isMoreThanOneStop={isMoreThanOneStop}
              isOneStop={isOneStop}
              selectedArrivalTime={selectedArrivalTime}
              selectedDepartureTime={selectedDepartureTime}
              nonStop={nonStop}
              setMaxStops={setMaxStops}
              departureDateString={departureDateString}
              selectedFrom={selectedFrom}
              selectedTo={selectedTo}
              run1={run1}
              setRun1={setRun1}
            />
          )}
          {selectedValue == 2 && (
            <FlightSearchMulti1
            setFormattedDate1={setFormattedDate1}
              setSelectedFlightDetails1={setSelectedFlightDetails1}
              selectedFlight1={selectedFlight1}
              setSelectedFlight1={setSelectedFlight1}
              isMoreThanOneStop={isMoreThanOneStop}
              isOneStop={isOneStop}
              selectedArrivalTime={selectedArrivalTime}
              selectedDepartureTime={selectedDepartureTime}
              nonStop={nonStop}
              setMaxStops={setMaxStops}
              departureDateString1={departureDateString1}
              selectedFrom1={selectedFrom1}
              selectedTo1={selectedTo1}
              run1={run1}
              setRun1={setRun1}
            />
          )}
          {selectedValue == 3 && (
            <FlightSearchMulti2
            setFormattedDate2={setFormattedDate2}
              selectedFlight2={selectedFlight2}
              setSelectedFlight2={setSelectedFlight2}
              setSelectedFlightDetails2={setSelectedFlightDetails2}
              isMoreThanOneStop={isMoreThanOneStop}
              isOneStop={isOneStop}
              selectedArrivalTime={selectedArrivalTime}
              selectedDepartureTime={selectedDepartureTime}
              nonStop={nonStop}
              setMaxStops={setMaxStops}
              departureDateString2={departureDateString2}
              selectedFrom2={selectedFrom2}
              selectedTo2={selectedTo2}
              run1={run1}
              setRun1={setRun1}
            />
          )}
          {selectedValue == 4 && (
            <FlightSearchMulti3
            setFormattedDate3={setFormattedDate3}
              selectedFlight3={selectedFlight3}
              setSelectedFlight3={setSelectedFlight3}
              setSelectedFlightDetails3={setSelectedFlightDetails3}
              isMoreThanOneStop={isMoreThanOneStop}
              isOneStop={isOneStop}
              selectedArrivalTime={selectedArrivalTime}
              selectedDepartureTime={selectedDepartureTime}
              nonStop={nonStop}
              setMaxStops={setMaxStops}
              departureDateString3={departureDateString3}
              selectedFrom3={selectedFrom3}
              selectedTo3={selectedTo3}
              run1={run1}
              setRun1={setRun1}
            />
          )}
          {selectedValue == 5 && (
            <FlightSearchMulti4
            setFormattedDate4={setFormattedDate4}
              selectedFlight4={selectedFlight4}
              setSelectedFlight4={setSelectedFlight4}
              setSelectedFlightDetails4={setSelectedFlightDetails4}
              isMoreThanOneStop={isMoreThanOneStop}
              isOneStop={isOneStop}
              selectedArrivalTime={selectedArrivalTime}
              selectedDepartureTime={selectedDepartureTime}
              nonStop={nonStop}
              setMaxStops={setMaxStops}
              departureDateString4={departureDateString4}
              selectedFrom4={selectedFrom4}
              selectedTo4={selectedTo4}
              run1={run1}
              setRun1={setRun1}
            />
          )}
        </div>
      </div>
      {count == 1 && selectedFlight !== null && selectedFlight1 !== null && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            marginLeft: "400px",
            width: "65%",
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
            <div style={{ marginLeft: "10px", borderRight: "1px solid white" }}>
              <div
                style={{
                  background: "white",
                  position: "relative",
                  width: "30px",
                  height: "30px",
                }}
              >
                {Array.isArray(selectedFlightDetails.uniqueIATACodes) &&
                      selectedFlightDetails.uniqueIATACodes.map(
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
                    })}
              </div>
              <h1>
                {selectedFrom.code}
                <TrendingFlatSharpIcon />
                {selectedTo.code}
              </h1>
              <h3>
                <strong></strong> ₹{" "}
                {new Intl.NumberFormat("en-IN", {
                  maximumFractionDigits: 0,
                }).format(selectedFlightDetails.price)}
              </h3>
            </div>
            <div style={{ marginLeft: "20px" }}>
              <div
                style={{
                  background: "white",
                  position: "relative",
                  width: "30px",
                  height: "30px",
                }}
              >
                 {Array.isArray(selectedFlightDetails1.uniqueIATACodes) &&
                      selectedFlightDetails1.uniqueIATACodes.map(
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
                    })}
              </div>
              <h1>
                {selectedFrom1.code}
                <TrendingFlatSharpIcon />
                {selectedTo1.code}
              </h1>
              <h3>
                <strong></strong> ₹{" "}
                {new Intl.NumberFormat("en-IN", {
                  maximumFractionDigits: 0,
                }).format(selectedFlightDetails1.price)}
              </h3>
            </div>
            <div style={{ marginLeft: "200px", marginTop: "30px" }}>
              <h1 style={{ width: "150px" }}>
                ₹{" "}
                {new Intl.NumberFormat("en-IN", {
                  maximumFractionDigits: 0,
                }).format(totalCost)}
              </h1>
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
      {count == 2 &&
        selectedFlight !== null &&
        selectedFlight1 !== null &&
        selectedFlight2 !== null && (
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              marginLeft: "400px",
              width: "65%",
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
                style={{ marginLeft: "10px", borderRight: "1px solid white" }}
              >
                <div
                  style={{
                    background: "white",
                    position: "relative",
                    width: "30px",
                    height: "30px",
                  }}
                >
                   {Array.isArray(selectedFlightDetails.uniqueIATACodes) &&
                      selectedFlightDetails.uniqueIATACodes.map(
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
                      })}
                </div>
                <h1>
                  {selectedFrom.code}
                  <TrendingFlatSharpIcon />
                  {selectedTo.code}
                </h1>
                <h3>
                  <strong></strong> ₹{" "}
                  {new Intl.NumberFormat("en-IN", {
                    maximumFractionDigits: 0,
                  }).format(selectedFlightDetails.price)}
                </h3>
              </div>
              <div
                style={{ marginLeft: "20px", borderRight: "1px solid white" }}
              >
                <div
                  style={{
                    background: "white",
                    position: "relative",
                    width: "30px",
                    height: "30px",
                  }}
                >
                   {Array.isArray(selectedFlightDetails1.uniqueIATACodes) &&
                      selectedFlightDetails1.uniqueIATACodes.map(
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
                      })}
                </div>
                <h1>
                  {selectedFrom1.code}
                  <TrendingFlatSharpIcon />
                  {selectedTo1.code}
                </h1>
                <h3>
                  <strong></strong> ₹{" "}
                  {new Intl.NumberFormat("en-IN", {
                    maximumFractionDigits: 0,
                  }).format(selectedFlightDetails1.price)}
                </h3>
              </div>
              <div style={{ marginLeft: "20px" }}>
                <div
                  style={{
                    background: "white",
                    position: "relative",
                    width: "30px",
                    height: "30px",
                  }}
                >
                  {Array.isArray(selectedFlightDetails2.uniqueIATACodes) &&
                      selectedFlightDetails2.uniqueIATACodes.map(
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
                      })}
                </div>
                <h1>
                  {selectedFrom2.code}
                  <TrendingFlatSharpIcon />
                  {selectedTo2.code}
                </h1>
                <h3>
                  <strong></strong> ₹{" "}
                  {new Intl.NumberFormat("en-IN", {
                    maximumFractionDigits: 0,
                  }).format(selectedFlightDetails2.price)}
                </h3>
              </div>
              <div style={{ marginLeft: "50px", marginTop: "30px" }}>
                <h1 style={{ width: "150px" }}>
                  ₹{" "}
                  {new Intl.NumberFormat("en-IN", {
                    maximumFractionDigits: 0,
                  }).format(totalCost1)}
                </h1>
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
                onClick={handleBooking1}
              >
                Continue
              </button>
            </div>
          </div>
        )}
      {count == 3 &&
        selectedFlight !== null &&
        selectedFlight1 !== null &&
        selectedFlight2 !== null &&
        selectedFlight3 !== null && (
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              marginLeft: "400px",
              width: "68%",
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
                style={{ marginLeft: "-10px", borderRight: "1px solid white" }}
              >
                <div
                  style={{
                    background: "white",
                    position: "relative",
                    width: "30px",
                    height: "30px",
                  }}
                >
                  {Array.isArray(selectedFlightDetails.uniqueIATACodes) &&
                      selectedFlightDetails.uniqueIATACodes.map(
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
                      })}
                </div>
                <div style={{ display: "flex" }}>
                  <h2>{selectedFrom.code}</h2>
                  <TrendingFlatSharpIcon style={{ marginTop: "20px" }} />
                  <h2>{selectedTo.code}</h2>
                </div>
                <h3 style={{ marginTop: "0px" }}>
                  <strong></strong> ₹{" "}
                  {new Intl.NumberFormat("en-IN", {
                    maximumFractionDigits: 0,
                  }).format(selectedFlightDetails.price)}
                </h3>
              </div>
              <div
                style={{ marginLeft: "20px", borderRight: "1px solid white" }}
              >
                <div
                  style={{
                    background: "white",
                    position: "relative",
                    width: "30px",
                    height: "30px",
                  }}
                >
                  {Array.isArray(selectedFlightDetails1.uniqueIATACodes) &&
                      selectedFlightDetails1.uniqueIATACodes.map(
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
                      })}
                </div>
                <div style={{ display: "flex" }}>
                  <h2>{selectedFrom1.code}</h2>
                  <TrendingFlatSharpIcon style={{ marginTop: "20px" }} />
                  <h2>{selectedTo1.code}</h2>
                </div>
                <h3 style={{ marginTop: "0px" }}>
                  <strong></strong> ₹{" "}
                  {new Intl.NumberFormat("en-IN", {
                    maximumFractionDigits: 0,
                  }).format(selectedFlightDetails1.price)}
                </h3>
              </div>
              <div
                style={{ marginLeft: "20px", borderRight: "1px solid white" }}
              >
                <div
                  style={{
                    background: "white",
                    position: "relative",
                    width: "30px",
                    height: "30px",
                  }}
                >
                  {Array.isArray(selectedFlightDetails2.uniqueIATACodes) &&
                      selectedFlightDetails2.uniqueIATACodes.map(
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
                      })}
                </div>
                <div style={{ display: "flex" }}>
                  <h2>{selectedFrom2.code}</h2>
                  <TrendingFlatSharpIcon style={{ marginTop: "20px" }} />
                  <h2>{selectedTo2.code}</h2>
                </div>
                <h3 style={{ marginTop: "0px" }}>
                  <strong></strong> ₹{" "}
                  {new Intl.NumberFormat("en-IN", {
                    maximumFractionDigits: 0,
                  }).format(selectedFlightDetails2.price)}
                </h3>
              </div>
              <div style={{ marginLeft: "20px" }}>
                <div
                  style={{
                    background: "white",
                    position: "relative",
                    width: "30px",
                    height: "30px",
                  }}
                >
                   {Array.isArray(selectedFlightDetails3.uniqueIATACodes) &&
                      selectedFlightDetails3.uniqueIATACodes.map(
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
                      })}
                </div>
                <div style={{ display: "flex" }}>
                  <h2>{selectedFrom3.code}</h2>
                  <TrendingFlatSharpIcon style={{ marginTop: "20px" }} />
                  <h2>{selectedTo3.code}</h2>
                </div>
                <h3 style={{ marginTop: "0px" }}>
                  <strong></strong> ₹{" "}
                  {new Intl.NumberFormat("en-IN", {
                    maximumFractionDigits: 0,
                  }).format(selectedFlightDetails3.price)}
                </h3>
              </div>
              <div style={{ marginLeft: "40px", marginTop: "30px" }}>
                <h1 style={{ width: "150px" }}>
                  ₹{" "}
                  {new Intl.NumberFormat("en-IN", {
                    maximumFractionDigits: 0,
                  }).format(totalCost2)}
                </h1>
              </div>
              <button
                style={{
                  marginLeft: "-30px",
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
                onClick={handleBooking2}
              >
                Continue
              </button>
            </div>
          </div>
        )}
      {count == 4 &&
        selectedFlight !== null &&
        selectedFlight1 !== null &&
        selectedFlight2 !== null &&
        selectedFlight3 !== null &&
        selectedFlight4 !== null && (
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              marginLeft: "400px",
              width: "69%",
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
              <div style={{ borderRight: "1px solid white" }}>
                <div
                  style={{
                    background: "white",
                    position: "relative",
                    width: "30px",
                    height: "30px",
                  }}
                >
                  {Array.isArray(selectedFlightDetails.uniqueIATACodes) &&
                      selectedFlightDetails.uniqueIATACodes.map(
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
                      })}
                </div>
                <div style={{ display: "flex" }}>
                  <h2>{selectedFrom.code}</h2>
                  <TrendingFlatSharpIcon style={{ marginTop: "20px" }} />
                  <h2>{selectedTo.code}</h2>
                </div>
                <h3 style={{ marginTop: "0px" }}>
                  <strong></strong> ₹{" "}
                  {new Intl.NumberFormat("en-IN", {
                    maximumFractionDigits: 0,
                  }).format(selectedFlightDetails.price)}
                </h3>
              </div>
              <div
                style={{ marginLeft: "5px", borderRight: "1px solid white" }}
              >
                <div
                  style={{
                    background: "white",
                    position: "relative",
                    width: "30px",
                    height: "30px",
                  }}
                >
                   {Array.isArray(selectedFlightDetails1.uniqueIATACodes) &&
                      selectedFlightDetails1.uniqueIATACodes.map(
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
                      })}
                </div>
                <div style={{ display: "flex" }}>
                  <h2>{selectedFrom1.code}</h2>
                  <TrendingFlatSharpIcon style={{ marginTop: "20px" }} />
                  <h2>{selectedTo1.code}</h2>
                </div>
                <h3 style={{ marginTop: "0px" }}>
                  <strong></strong> ₹{" "}
                  {new Intl.NumberFormat("en-IN", {
                    maximumFractionDigits: 0,
                  }).format(selectedFlightDetails1.price)}
                </h3>
              </div>
              <div
                style={{ marginLeft: "5px", borderRight: "1px solid white" }}
              >
                <div
                  style={{
                    background: "white",
                    position: "relative",
                    width: "30px",
                    height: "30px",
                  }}
                >
                  {Array.isArray(selectedFlightDetails2.uniqueIATACodes) &&
                      selectedFlightDetails2.uniqueIATACodes.map(
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
                      })}
                </div>
                <div style={{ display: "flex" }}>
                  <h2>{selectedFrom2.code}</h2>
                  <TrendingFlatSharpIcon style={{ marginTop: "20px" }} />
                  <h2>{selectedTo2.code}</h2>
                </div>
                <h3 style={{ marginTop: "0px" }}>
                  <strong></strong> ₹{" "}
                  {new Intl.NumberFormat("en-IN", {
                    maximumFractionDigits: 0,
                  }).format(selectedFlightDetails2.price)}
                </h3>
              </div>
              <div
                style={{ marginLeft: "5px", borderRight: "1px solid white" }}
              >
                <div
                  style={{
                    background: "white",
                    position: "relative",
                    width: "30px",
                    height: "30px",
                  }}
                >
                  {Array.isArray(selectedFlightDetails3.uniqueIATACodes) &&
                      selectedFlightDetails3.uniqueIATACodes.map(
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
                      })}
                </div>
                <div style={{ display: "flex" }}>
                  <h2>{selectedFrom3.code}</h2>
                  <TrendingFlatSharpIcon style={{ marginTop: "20px" }} />
                  <h2>{selectedTo3.code}</h2>
                </div>
                <h3 style={{ marginTop: "0px" }}>
                  <strong></strong> ₹{" "}
                  {new Intl.NumberFormat("en-IN", {
                    maximumFractionDigits: 0,
                  }).format(selectedFlightDetails3.price)}
                </h3>
              </div>
              <div style={{ marginLeft: "5px" }}>
                <div
                  style={{
                    background: "white",
                    position: "relative",
                    width: "30px",
                    height: "30px",
                  }}
                >
                   {Array.isArray(selectedFlightDetails4.uniqueIATACodes) &&
                      selectedFlightDetails4.uniqueIATACodes.map(
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
                      })}
                </div>
                <div style={{ display: "flex" }}>
                  <h2>{selectedFrom4.code}</h2>
                  <TrendingFlatSharpIcon style={{ marginTop: "20px" }} />
                  <h2>{selectedTo4.code}</h2>
                </div>
                <h3 style={{ marginTop: "0px" }}>
                  <strong></strong> ₹{" "}
                  {new Intl.NumberFormat("en-IN", {
                    maximumFractionDigits: 0,
                  }).format(selectedFlightDetails4.price)}
                </h3>
              </div>
              <div style={{ marginLeft: "10px", marginTop: "30px" }}>
                <h1 style={{ width: "150px" }}>
                  ₹{" "}
                  {new Intl.NumberFormat("en-IN", {
                    maximumFractionDigits: 0,
                  }).format(totalCost3)}
                </h1>
              </div>
              <button
                style={{
                  marginLeft: "-10px",
                  height: "40px",
                  width: "90px",
                  marginTop: "55px",
                  backgroundColor: "#2ecc71",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={handleBooking3}
              >
                Continue
              </button>
            </div>
          </div>
        )}
      {modalVisible && (
        <FlightResultMulti 
        completeBooking={completeBooking}
        closeModal={closeModal}
        totalCost={totalCost}
        totalTraveler={totalTraveler}
        selectedFlightDetails={selectedFlightDetails}
        selectedFlightDetails1={selectedFlightDetails1}
        selectedFrom={selectedFrom}
        selectedFrom1={selectedFrom1}
        selectedTo={selectedTo}
        selectedTo1={selectedTo1}
        formattedDate={formattedDate}
        formattedDate1={formattedDate1}
        />
      )}
      {modalVisible1 && (
       <FlightResultMulti1
       completeBooking1={completeBooking1}
        closeModal1={closeModal1}
        totalCost1={totalCost1}
        totalTraveler={totalTraveler}
        selectedFlightDetails={selectedFlightDetails}
        selectedFlightDetails1={selectedFlightDetails1}
        selectedFlightDetails2={selectedFlightDetails2}
        selectedFrom={selectedFrom}
        selectedFrom1={selectedFrom1}
        selectedFrom2={selectedFrom2}
        selectedTo={selectedTo}
        selectedTo1={selectedTo1}
        selectedTo2={selectedTo2}
        formattedDate={formattedDate}
        formattedDate1={formattedDate1}
        formattedDate2={formattedDate2}
       />
      )}
      {modalVisible2 && (
        <FlightResultMulti2
        completeBooking2={completeBooking2}
        closeModal2={closeModal2}
        totalCost2={totalCost2}
        totalTraveler={totalTraveler}
        selectedFlightDetails={selectedFlightDetails}
        selectedFlightDetails1={selectedFlightDetails1}
        selectedFlightDetails2={selectedFlightDetails2}
        selectedFlightDetails3={selectedFlightDetails3}
        selectedFrom={selectedFrom}
        selectedFrom1={selectedFrom1}
        selectedFrom2={selectedFrom2}
        selectedFrom3={selectedFrom3}
        selectedTo={selectedTo}
        selectedTo1={selectedTo1}
        selectedTo2={selectedTo2}
        selectedTo3={selectedTo3}
        formattedDate={formattedDate}
        formattedDate1={formattedDate1}
        formattedDate2={formattedDate2}
        formattedDate3={formattedDate3}
        />
      )}
      {modalVisible3 && (
        <FlightResultMulti3
        completeBooking3={completeBooking3}
        closeModal3={closeModal3}
        totalCost3={totalCost3}
        totalTraveler={totalTraveler}
        selectedFlightDetails={selectedFlightDetails}
        selectedFlightDetails1={selectedFlightDetails1}
        selectedFlightDetails2={selectedFlightDetails2}
        selectedFlightDetails3={selectedFlightDetails3}
        selectedFlightDetails4={selectedFlightDetails4}
        selectedFrom={selectedFrom}
        selectedFrom1={selectedFrom1}
        selectedFrom2={selectedFrom2}
        selectedFrom3={selectedFrom3}
        selectedFrom4={selectedFrom4}
        selectedTo={selectedTo}
        selectedTo1={selectedTo1}
        selectedTo2={selectedTo2}
        selectedTo3={selectedTo3}
        selectedTo4={selectedTo4}
        formattedDate={formattedDate}
        formattedDate1={formattedDate1}
        formattedDate2={formattedDate2}
        formattedDate3={formattedDate3}
        formattedDate4={formattedDate4}
        />
      )}
    </>
  );
};

export default MultiWaySearch;
