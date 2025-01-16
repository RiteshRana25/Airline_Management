import React, { useContext } from "react";
import { Container } from "@mui/material";
import { FlightContext } from "../FlightContext";
import MinContainer from "../Component/MinContainer/MinContainer";
import Header from "../Component/Header/Header";
import MultiWayContainer from "../Component/MultiWayContainer/MultiWayContainer";
import AddMore from "../Component/AddMore/AddMore";
import RemoveDivClose from "../Component/AddMore/RemoveDivClose";
import { Link, useNavigate } from "react-router-dom";
import MultiWayContainer1 from "../Component/MultiWayContainer/MultiWayContainer1";
import MultiWayContainer2 from "../Component/MultiWayContainer/MultiWayContainer2";
import MultiWayContainer3 from "../Component/MultiWayContainer/MultiWayContainer3";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const {
    selectedTrip,
    setSelectedTrip,
    isFromClicked,
    setIsFromClicked,
    isToClicked,
    setIsToClicked,
    departureDateString,
    departureDateString1,
    setDepartureDateString,
    returnDateString,
    setReturnDateString,
    selectedFrom,
    setSelectedFrom,
    selectedTo,
    setSelectedTo,
    error,
    setError,
    adults,
    setAdults,
    child,
    setChild,
    infants,
    setInfants,
    className,
    setClassName,
    traveller,
    setTraveller,
    count,
    setCount,
    selectedFrom1,
    selectedFrom2,
    selectedFrom3,
    selectedFrom4,
    selectedTo1,
    selectedTo2,
    selectedTo3,
    selectedTo4,
  } = useContext(FlightContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (selectedFrom.code !== "" || selectedTo.code) &&
      selectedFrom?.code === selectedTo?.code
    ) {
      setError("From and To airports cannot be the same.");
      alert("From and To airports cannot be the same.");
      return;
    } else if (
      (selectedFrom1.code !== "" || selectedTo1.code) &&
      selectedFrom1.code === selectedTo1.code
    ) {
      setError("From and To airports cannot be the same.");
      alert("From and To airports cannot be the same.");
      return;
    } else if (
      (selectedFrom2.code !== "" || selectedTo2.code) &&
      selectedFrom2?.code === selectedTo2?.code
    ) {
      setError("From and To airports cannot be the same.");
      alert("From and To airports cannot be the same.");
      return;
    } else if (
      (selectedFrom3.code !== "" || selectedTo3.code) &&
      selectedFrom3?.code === selectedTo3?.code
    ) {
      setError("From and To airports cannot be the same.");
      alert("From and To airports cannot be the same.");
      return;
    } else if (
      (selectedFrom4.code !== "" || selectedTo4.code) &&
      selectedFrom4?.code === selectedTo4?.code
    ) {
      setError("From and To airports cannot be the same.");
      alert("From and To airports cannot be the same.");
      return;
    }
    setError("");
  };

  const handleSearchClick = async () => {
    if (selectedTrip === "one-way" && selectedFrom.code !== selectedTo.code)
      navigate("/onewaysearch");
    else if (
      selectedTrip === "round-trip" &&
      selectedFrom.code !== selectedTo.code
    )
      navigate("/roundtripsearch");
    else if (selectedTrip === "multi-way") {
      if (
        (selectedFrom1.code === "" || selectedTo1.code === "") &&
        selectedFrom.code !== selectedTo.code
      ) {
        setCount(1);
        setSelectedTrip("one-way");
        navigate("/onewaysearch");
      } else if (
        selectedFrom1.code === selectedTo.code &&
        selectedTo1.code === selectedFrom.code &&
        (selectedFrom2.code === "" || selectedTo2.code === "") &&
        selectedFrom.code !== selectedTo.code &&
        selectedFrom1.code !== selectedTo1.code
      ) {
        setReturnDateString(departureDateString1);
        setCount(1);
        setSelectedTrip("round-trip");
        navigate("/roundtripsearch");
      } else if (
        count == 4 &&
        (selectedFrom4.code === "" || selectedTo4.code === "") &&
        (selectedFrom3.code === "" || selectedTo3.code === "") &&
        (selectedFrom2.code === "" || selectedTo2.code === "") &&
        selectedFrom.code !== selectedTo.code &&
        selectedFrom1.code !== selectedTo1.code
      ) {
        setCount(1);
        navigate("/multiwaysearch");
      } else if (
        count == 3 &&
        (selectedFrom3.code === "" || selectedTo3.code === "") &&
        (selectedFrom2.code === "" || selectedTo2.code === "") &&
        selectedFrom.code !== selectedTo.code &&
        selectedFrom1.code !== selectedTo1.code
      ) {
        setCount(1);
        navigate("/multiwaysearch");
      } else if (
        count == 2 &&
        (selectedFrom2.code === "" || selectedTo2.code === "") &&
        selectedFrom.code !== selectedTo.code &&
        selectedFrom1.code !== selectedTo1.code
      ) {
        setCount(1);
        navigate("/multiwaysearch");
      } else if (
        count == 4 &&
        (selectedFrom4.code === "" || selectedTo4.code === "") &&
        (selectedFrom3.code === "" || selectedTo3.code === "") &&
        selectedFrom.code !== selectedTo.code &&
        selectedFrom1.code !== selectedTo1.code &&
        selectedFrom2.code !== selectedTo2.code
      ) {
        setCount(2);
        navigate("/multiwaysearch");
      } else if (
        count == 3 &&
        (selectedFrom3.code === "" || selectedTo3.code === "") &&
        selectedFrom.code !== selectedTo.code &&
        selectedFrom1.code !== selectedTo1.code &&
        selectedFrom2.code !== selectedTo2.code
      ) {
        setCount(2);
        navigate("/multiwaysearch");
      } else if (
        count == 4 &&
        (selectedFrom4.code === "" || selectedTo4.code === "") &&
        selectedFrom.code !== selectedTo.code &&
        selectedFrom1.code !== selectedTo1.code &&
        selectedFrom2.code !== selectedTo2.code &&
        selectedFrom3.code !== selectedTo3.code
      ) {
        setCount(3);
        navigate("/multiwaysearch");
      } else if (
        count == 4 &&
        selectedFrom.code !== selectedTo.code &&
        selectedFrom1.code !== selectedTo1.code &&
        selectedFrom2.code !== selectedTo2.code &&
        selectedFrom3.code !== selectedTo3.code &&
        selectedFrom4.code !== selectedTo4.code
      ) {
        navigate("/multiwaysearch");
      } else {
        navigate("/multiwaysearch");
      }
    }
  };

  const updateValue = (newValue) => {
    if (newValue < 1) {
      setCount(1);
    } else if (newValue > 4) {
      setCount(4);
    } else {
      setCount(newValue);
    }
  };
  return (
    <div className="App">
      <Header />
      <Container
        style={{ display: "flex", flexDirection: "column" }}
        className="container"
        maxWidth="xxl"
      >
        <MinContainer
          traveller={traveller}
          setTraveller={setTraveller}
          error={error}
          setError={setError}
          selectedTo={selectedTo}
          setSelectedTo={setSelectedTo}
          selectedFrom={selectedFrom}
          setSelectedFrom={setSelectedFrom}
          className={className}
          setClassName={setClassName}
          departureDateString={departureDateString}
          returnDateString={returnDateString}
          setDepartureDateString={setDepartureDateString}
          setReturnDateString={setReturnDateString}
          isFromClicked={isFromClicked}
          isToClicked={isToClicked}
          selectedTrip={selectedTrip}
          setSelectedTrip={setSelectedTrip}
          setIsFromClicked={setIsFromClicked}
          setIsToClicked={setIsToClicked}
          adults={adults}
          child={child}
          infants={infants}
          setAdults={setAdults}
          setChild={setChild}
          setInfants={setInfants}
        />
      </Container>
      {selectedTrip === "multi-way" && count >= 1 && (
        <Container
          style={{ display: "flex", flexDirection: "column" }}
          className="container"
          maxWidth="xxl"
        >
          <MultiWayContainer />
          {count == 1 && <AddMore count={count} updateValue={updateValue} />}
        </Container>
      )}
      {selectedTrip === "multi-way" && count >= 2 && (
        <Container
          style={{ display: "flex", flexDirection: "column" }}
          className="container"
          maxWidth="xxl"
        >
          <MultiWayContainer1 />
          {count == 2 && <AddMore count={count} updateValue={updateValue} />}
        </Container>
      )}
      {selectedTrip === "multi-way" && count >= 3 && (
        <Container
          style={{ display: "flex", flexDirection: "column" }}
          className="container"
          maxWidth="xxl"
        >
          <MultiWayContainer2 />
          {count == 3 && <AddMore count={count} updateValue={updateValue} />}
        </Container>
      )}
      {selectedTrip === "multi-way" && count >= 4 && (
        <Container
          style={{ display: "flex", flexDirection: "column" }}
          className="container"
          maxWidth="xxl"
        >
          <MultiWayContainer3 />
          {count == 4 && (
            <RemoveDivClose count={count} updateValue={updateValue} />
          )}
        </Container>
      )}
      <Container className="searchdiv">
        <button
          className="search"
          onClick={(e) => {
            handleSubmit(e);
            handleSearchClick();
          }}
        >
          Search
        </button>
      </Container>
      {
        count<=2 && (
      <Container
        maxWidth="lg"
        style={{ marginLeft: "15px", marginTop: "100px" }}
      >
        <div className="last">
          <div className="last1">
            <div className="img1"></div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>Chennai Flights</span>
              <span style={{ whiteSpace: "normal" }}>
                Via-{" "}
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "INDIRA GANDHI INTL",
                      city: "DELHI",
                      code: "DEL",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "CHENNAI INTERNATIONAL",
                      city: "CHENNAI",
                      code: "MAA",
                      country: "INDIA",
                    });
                  }}
                >
                  Delhi,{" "}
                </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "NAVI MUMBAI INTERNATIONAL",
                      city: "MUMBAI",
                      code: "BOM",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "CHENNAI INTERNATIONAL",
                      city: "CHENNAI",
                      code: "MAA",
                      country: "INDIA",
                    });
                  }}
                >
                  Mumbai,{" "}
                </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "KEMPEGOWDA INTL",
                      city: "BENGALURU",
                      code: "BLR",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "CHENNAI INTERNATIONAL",
                      city: "CHENNAI",
                      code: "MAA",
                      country: "INDIA",
                    });
                  }}
                >
                  Bangalore,{" "}
                </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "S.VALLABHBHAI PATEL",
                      city: "AHMEDABAD",
                      code: "AMD",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "CHENNAI INTERNATIONAL",
                      city: "CHENNAI",
                      code: "MAA",
                      country: "INDIA",
                    });
                  }}
                >
                  Ahmedabad
                </Link>
              </span>
            </div>
          </div>
          <div className="last2">
            <div className="img2"></div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>Goa Flights</span>
              <span>
                Via-{" "}
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "INDIRA GANDHI INTL",
                      city: "DELHI",
                      code: "DEL",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "MOPA AIRPORT",
                      city: "GOA",
                      code: "GOI",
                      country: "INDIA",
                    });
                  }}
                >
                  Delhi,{" "}
                </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "NAVI MUMBAI INTERNATIONAL",
                      city: "MUMBAI",
                      code: "BOM",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "MOPA AIRPORT",
                      city: "GOA",
                      code: "GOI",
                      country: "INDIA",
                    });
                  }}
                >
                  Mumbai,{" "}
                </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "KEMPEGOWDA INTL",
                      city: "BENGALURU",
                      code: "BLR",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "MOPA AIRPORT",
                      city: "GOA",
                      code: "GOI",
                      country: "INDIA",
                    });
                  }}
                >
                  Bangalore,{" "}
                </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "S.VALLABHBHAI PATEL",
                      city: "AHMEDABAD",
                      code: "AMD",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "MOPA AIRPORT",
                      city: "GOA",
                      code: "GOI",
                      country: "INDIA",
                    });
                  }}
                >
                  Ahmedabad
                </Link>
              </span>
            </div>
          </div>
          <div className="last3">
            <div className="img3"></div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>Mumbai Flights</span>
              <span>
                Via-{" "}
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "INDIRA GANDHI INTL",
                      city: "DELHI",
                      code: "DEL",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "NAVI MUMBAI INTERNATIONAL",
                      city: "MUMBAI",
                      code: "BOM",
                      country: "INDIA",
                    });
                  }}
                >
                  Delhi,{" "}
                </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "KEMPEGOWDA INTL",
                      city: "BENGALURU",
                      code: "BLR",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "NAVI MUMBAI INTERNATIONAL",
                      city: "MUMBAI",
                      code: "BOM",
                      country: "INDIA",
                    });
                  }}
                >
                  Bangalore,{" "}
                </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "CHENNAI INTERNATIONAL",
                      city: "CHENNAI",
                      code: "MAA",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "NAVI MUMBAI INTERNATIONAL",
                      city: "MUMBAI",
                      code: "BOM",
                      country: "INDIA",
                    });
                  }}
                >
                  Chennai,{" "}
                </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "S.VALLABHBHAI PATEL",
                      city: "AHMEDABAD",
                      code: "AMD",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "NAVI MUMBAI INTERNATIONAL",
                      city: "MUMBAI",
                      code: "BOM",
                      country: "INDIA",
                    });
                  }}
                >
                  Ahmedabad
                </Link>
              </span>
            </div>
          </div>
          <div className="last4">
            <div className="img4"></div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>Hyderabad Flight</span>
              <span>
                Via-{" "}
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "CHENNAI INTERNATIONAL",
                      city: "CHENNAI",
                      code: "MAA",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "RAJIV GANDHI INTL",
                      city: "HYDERABAD",
                      code: "HYD",
                      country: "INDIA",
                    });
                  }}
                >
                  Chennai,{" "}
                </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "NAVI MUMBAI INTERNATIONAL",
                      city: "MUMBAI",
                      code: "BOM",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "RAJIV GANDHI INTL",
                      city: "HYDERABAD",
                      code: "HYD",
                      country: "INDIA",
                    });
                  }}
                >
                  Mumbai,{" "}
                </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "KEMPEGOWDA INTL",
                      city: "BENGALURU",
                      code: "BLR",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "RAJIV GANDHI INTL",
                      city: "HYDERABAD",
                      code: "HYD",
                      country: "INDIA",
                    });
                  }}
                >
                  Bangalore,{" "}
                </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "INDIRA GANDHI INTL",
                      city: "DELHI",
                      code: "DEL",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "RAJIV GANDHI INTL",
                      city: "HYDERABAD",
                      code: "HYD",
                      country: "INDIA",
                    });
                  }}
                >
                  Delhi
                </Link>
              </span>
            </div>
          </div>
          <div className="last5">
            <div className="img5"></div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>Delhi Flights</span>
              <span>
                Via-{" "}
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "NAVI MUMBAI INTERNATIONAL",
                      city: "MUMBAI",
                      code: "BOM",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "INDIRA GANDHI INTL",
                      city: "DELHI",
                      code: "DEL",
                      country: "INDIA",
                    });
                  }}
                >
                  Mumbai,{" "}
                </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "LOHEGAON",
                      city: "PUNE",
                      code: "PNQ",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "INDIRA GANDHI INTL",
                      city: "DELHI",
                      code: "DEL",
                      country: "INDIA",
                    });
                  }}
                >
                  Pune,{" "}
                </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "KEMPEGOWDA INTL",
                      city: "BENGALURU",
                      code: "BLR",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "INDIRA GANDHI INTL",
                      city: "DELHI",
                      code: "DEL",
                      country: "INDIA",
                    });
                  }}
                >
                  Bangalore,{" "}
                </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "CHENNAI INTERNATIONAL",
                      city: "CHENNAI",
                      code: "MAA",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "INDIRA GANDHI INTL",
                      city: "DELHI",
                      code: "DEL",
                      country: "INDIA",
                    });
                  }}
                >
                  Chennai
                </Link>
              </span>
            </div>
          </div>
          <div className="last6">
            <div className="img6"></div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>Pune Flights</span>
              <span>
                Via-{" "}
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "INDIRA GANDHI INTL",
                      city: "DELHI",
                      code: "DEL",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "LOHEGAON",
                      city: "PUNE",
                      code: "PNQ",
                      country: "INDIA",
                    });
                  }}
                >
                  Delhi,{" "}
                </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "KEMPEGOWDA INTL",
                      city: "BENGALURU",
                      code: "BLR",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "LOHEGAON",
                      city: "PUNE",
                      code: "PNQ",
                      country: "INDIA",
                    });
                  }}
                >
                  Bangalore,{" "}
                </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "CHENNAI INTERNATIONAL",
                      city: "CHENNAI",
                      code: "MAA",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "LOHEGAON",
                      city: "PUNE",
                      code: "PNQ",
                      country: "INDIA",
                    });
                  }}
                >
                  Chennai,{" "}
                </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "S.VALLABHBHAI PATEL",
                      city: "AHMEDABAD",
                      code: "AMD",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "LOHEGAON",
                      city: "PUNE",
                      code: "PNQ",
                      country: "INDIA",
                    });
                  }}
                >
                  Ahmedabad
                </Link>
              </span>
            </div>
          </div>
          <div className="last7">
            <div className="img7"></div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>Kolkata Flights</span>
              <span>
                Via-{" "}
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "INDIRA GANDHI INTL",
                      city: "DELHI",
                      code: "DEL",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "SUBHAS CHANDRA BOSE",
                      city: "KOLKATA",
                      code: "CCU",
                      country: "INDIA",
                    });
                  }}
                >
                  Delhi,{" "}
                </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "NAVI MUMBAI INTERNATIONAL",
                      city: "MUMBAI",
                      code: "BOM",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "SUBHAS CHANDRA BOSE",
                      city: "KOLKATA",
                      code: "CCU",
                      country: "INDIA",
                    });
                  }}
                >
                  Mumbai,{" "}
                </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "KEMPEGOWDA INTL",
                      city: "BENGALURU",
                      code: "BLR",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "SUBHAS CHANDRA BOSE",
                      city: "KOLKATA",
                      code: "CCU",
                      country: "INDIA",
                    });
                  }}
                >
                  Bangalore,{" "}
                </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "LOHEGAON",
                      city: "PUNE",
                      code: "PNQ",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "SUBHAS CHANDRA BOSE",
                      city: "KOLKATA",
                      code: "CCU",
                      country: "INDIA",
                    });
                  }}
                >
                  Pune
                </Link>
              </span>
            </div>
          </div>
          <div className="last8">
            <div className="img8"></div>
            <div>
              <span style={{ display: "flex", flexDirection: "column" }}>
                Bangalore Flights
              </span>
              <span>
                Via-{" "}
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "INDIRA GANDHI INTL",
                      city: "DELHI",
                      code: "DEL",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "KEMPEGOWDA INTL",
                      city: "BENGALURU",
                      code: "BLR",
                      country: "INDIA",
                    });
                  }}
                >
                  Delhi,{" "}
                </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "LOHEGAON",
                      city: "PUNE",
                      code: "PNQ",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "KEMPEGOWDA INTL",
                      city: "BENGALURU",
                      code: "BLR",
                      country: "INDIA",
                    });
                  }}
                >
                  Pune,{" "}
                </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "NAVI MUMBAI INTERNATIONAL",
                      city: "MUMBAI",
                      code: "BOM",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "KEMPEGOWDA INTL",
                      city: "BENGALURU",
                      code: "BLR",
                      country: "INDIA",
                    });
                  }}
                >
                  Mumbai,{" "}
                </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "SUBHAS CHANDRA BOSE",
                      city: "KOLKATA",
                      code: "CCU",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "KEMPEGOWDA INTL",
                      city: "BENGALURU",
                      code: "BLR",
                      country: "INDIA",
                    });
                  }}
                >
                  Kolkata
                </Link>
              </span>
            </div>
          </div>
          <div className="last9">
            <div className="img9"></div>
            <div>
              <span style={{ display: "flex", flexDirection: "column" }}>
                Jaipur Flights
              </span>
              <span>
                Via-{" "}
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "NAVI MUMBAI INTERNATIONAL",
                      city: "MUMBAI",
                      code: "BOM",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "CHENNAI INTERNATIONAL",
                      city: "CHENNAI",
                      code: "MAA",
                      country: "INDIA",
                    });
                  }}
                >
                  Mumbai,{" "}
                </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "LOHEGAON",
                      city: "PUNE",
                      code: "PNQ",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "CHENNAI INTERNATIONAL",
                      city: "CHENNAI",
                      code: "MAA",
                      country: "INDIA",
                    });
                  }}
                >
                  Pune,{" "}
                </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "INDIRA GANDHI INTL",
                      city: "DELHI",
                      code: "DEL",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "CHENNAI INTERNATIONAL",
                      city: "CHENNAI",
                      code: "MAA",
                      country: "INDIA",
                    });
                  }}
                >
                  Delhi,{" "}
                </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "KEMPEGOWDA INTL",
                      city: "BENGALURU",
                      code: "BLR",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "CHENNAI INTERNATIONAL",
                      city: "CHENNAI",
                      code: "MAA",
                      country: "INDIA",
                    });
                  }}
                >
                  Bangalore
                </Link>
              </span>
            </div>
          </div>
        </div>
      </Container>
)}
      {
        (selectedTrip==='round-trip'|| selectedTrip==='one-way') && (
      <Container maxWidth="lg" style={{ marginLeft: "15px" }}>
        <div className="lastouter">
          <div className="lastouter1">
            <div className="image1"></div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>London Flights</span>
              <span>
                Via-{" "}
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "INDIRA GANDHI INTL",
                      city: "DELHI",
                      code: "DEL",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "CITY AIRPORT",
                      city: "LONDON",
                      code: "LON",
                      country: "UNITED KINGDOM",
                    });
                  }}
                >Delhi, </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "KEMPEGOWDA INTL",
                      city: "BENGALURU",
                      code: "BLR",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "CITY AIRPORT",
                      city: "LONDON",
                      code: "LON",
                      country: "UNITED KINGDOM",
                    });
                  }}
                >Bangalore, </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "SUBHAS CHANDRA BOSE",
                      city: "KOLKATA",
                      code: "CCU",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "CITY AIRPORT",
                      city: "LONDON",
                      code: "LON",
                      country: "UNITED KINGDOM",
                    });
                  }}
                >Kolkata, </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "NAVI MUMBAI INTERNATIONAL",
                      city: "MUMBAI",
                      code: "BOM",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "CITY AIRPORT",
                      city: "LONDON",
                      code: "LON",
                      country: "UNITED KINGDOM",
                    });
                  }}
                >Mumbai</Link>
              </span>
            </div>
          </div>
          <div className="lastouter2">
            <div className="image2"></div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>Washington DC Flights</span>
              <span>
                Via-{" "}
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "NAVI MUMBAI INTERNATIONAL",
                      city: "MUMBAI",
                      code: "BOM",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "R REAGAN NAT",
                      city: "WASHINGTON",
                      code: "WAS",
                      country: "UNITED STATES OF AMERICA",
                    });
                  }}
                >Mumbai, </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "KEMPEGOWDA INTL",
                      city: "BENGALURU",
                      code: "BLR",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "R REAGAN NAT",
                      city: "WASHINGTON",
                      code: "WAS",
                      country: "UNITED STATES OF AMERICA",
                    });
                  }}
                >Bangalore, </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "INDIRA GANDHI INTL",
                      city: "DELHI",
                      code: "DEL",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "R REAGAN NAT",
                      city: "WASHINGTON",
                      code: "WAS",
                      country: "UNITED STATES OF AMERICA",
                    });
                  }}
                >Delhi, </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "SUBHAS CHANDRA BOSE",
                      city: "KOLKATA",
                      code: "CCU",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "R REAGAN NAT",
                      city: "WASHINGTON",
                      code: "WAS",
                      country: "UNITED STATES OF AMERICA",
                    });
                  }}
                >Kolkata</Link>
              </span>
            </div>
          </div>
          <div className="lastouter3">
            <div className="image3"></div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>Bangkok Flights</span>
              <span>
                Via-{" "}
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "KEMPEGOWDA INTL",
                      city: "BENGALURU",
                      code: "BLR",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "SUVARNABHUMI INTL",
                      city: "BANGKOK",
                      code: "BKK",
                      country: "THAILAND",
                    });
                  }}
                >Bangalore, </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "SUBHAS CHANDRA BOSE",
                      city: "KOLKATA",
                      code: "CCU",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "SUVARNABHUMI INTL",
                      city: "BANGKOK",
                      code: "BKK",
                      country: "THAILAND",
                    });
                  }}
                >Kolkata, </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "INDIRA GANDHI INTL",
                      city: "DELHI",
                      code: "DEL",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "SUVARNABHUMI INTL",
                      city: "BANGKOK",
                      code: "BKK",
                      country: "THAILAND",
                    });
                  }}
                >Delhi, </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "NAVI MUMBAI INTERNATIONAL",
                      city: "MUMBAI",
                      code: "BOM",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "SUVARNABHUMI INTL",
                      city: "BANGKOK",
                      code: "BKK",
                      country: "THAILAND",
                    });
                  }}
                >Mumbai</Link>
              </span>
            </div>
          </div>
          <div className="lastouter4">
            <div className="image4"></div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>New York Flights</span>
              <span>
                Via-{" "}
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "INDIRA GANDHI INTL",
                      city: "DELHI",
                      code: "DEL",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "LAGUARDIA",
                      city: "NEW YORK",
                      code: "NYC",
                      country: "UNITED STATES OF AMERICA",
                    });
                  }}
                >Delhi, </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "NAVI MUMBAI INTERNATIONAL",
                      city: "MUMBAI",
                      code: "BOM",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "LAGUARDIA",
                      city: "NEW YORK",
                      code: "NYC",
                      country: "UNITED STATES OF AMERICA",
                    });
                  }}
                >Mumbai, </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "KEMPEGOWDA INTL",
                      city: "BENGALURU",
                      code: "BLR",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "LAGUARDIA",
                      city: "NEW YORK",
                      code: "NYC",
                      country: "UNITED STATES OF AMERICA",
                    });
                  }}
                >Bangalore, </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "SUBHAS CHANDRA BOSE",
                      city: "KOLKATA",
                      code: "CCU",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "LAGUARDIA",
                      city: "NEW YORK",
                      code: "NYC",
                      country: "UNITED STATES OF AMERICA",
                    });
                  }}
                >Kolkata</Link>
              </span>
            </div>
          </div>
          <div className="lastouter5">
            <div className="image5"></div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>Paris Flights</span>
              <span>
                Via-{" "}
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "KEMPEGOWDA INTL",
                      city: "BENGALURU",
                      code: "BLR",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "ORLY",
                      city: "PARIS",
                      code: "PAR",
                      country: "FRANCE",
                    });
                  }}
                >Bangalore, </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "INDIRA GANDHI INTL",
                      city: "DELHI",
                      code: "DEL",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "ORLY",
                      city: "PARIS",
                      code: "PAR",
                      country: "FRANCE",
                    });
                  }}
                >Delhi, </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "SUBHAS CHANDRA BOSE",
                      city: "KOLKATA",
                      code: "CCU",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "ORLY",
                      city: "PARIS",
                      code: "PAR",
                      country: "FRANCE",
                    });
                  }}
                >Kolkata, </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "NAVI MUMBAI INTERNATIONAL",
                      city: "MUMBAI",
                      code: "BOM",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "ORLY",
                      city: "PARIS",
                      code: "PAR",
                      country: "FRANCE",
                    });
                  }}
                >Mumbai</Link>
              </span>
            </div>
          </div>
          <div className="lastouter6">
            <div className="image6"></div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>FrankFurt Flights</span>
              <span>
                Via-{" "}
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "SUBHAS CHANDRA BOSE",
                      city: "KOLKATA",
                      code: "CCU",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "FRANKFURT INTL",
                      city: "FRANKFURT",
                      code: "FRA",
                      country: "GERMANY",
                    });
                  }}
                >Kolkata, </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "KEMPEGOWDA INTL",
                      city: "BENGALURU",
                      code: "BLR",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "FRANKFURT INTL",
                      city: "FRANKFURT",
                      code: "FRA",
                      country: "GERMANY",
                    });
                  }}
                >Bangalore, </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "INDIRA GANDHI INTL",
                      city: "DELHI",
                      code: "DEL",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "FRANKFURT INTL",
                      city: "FRANKFURT",
                      code: "FRA",
                      country: "GERMANY",
                    });
                  }}
                >Delhi, </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "NAVI MUMBAI INTERNATIONAL",
                      city: "MUMBAI",
                      code: "BOM",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "FRANKFURT INTL",
                      city: "FRANKFURT",
                      code: "FRA",
                      country: "GERMANY",
                    });
                  }}
                >Mumbai</Link>
              </span>
            </div>
          </div>
          <div className="lastouter7">
            <div className="image7"></div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>Wuhan Flights</span>
              <span>
                Via-{" "}
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "SUBHAS CHANDRA BOSE",
                      city: "KOLKATA",
                      code: "CCU",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "WUHAN HANNAN",
                      city: "WUHAN",
                      code: "WUH",
                      country: "CHINA",
                    });
                  }}
                >Kolkata, </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "NAVI MUMBAI INTERNATIONAL",
                      city: "MUMBAI",
                      code: "BOM",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "WUHAN HANNAN",
                      city: "WUHAN",
                      code: "WUH",
                      country: "CHINA",
                    });
                  }}
                >Mumbai, </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "KEMPEGOWDA INTL",
                      city: "BENGALURU",
                      code: "BLR",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "WUHAN HANNAN",
                      city: "WUHAN",
                      code: "WUH",
                      country: "CHINA",
                    });
                  }}
                >Bangalore, </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "INDIRA GANDHI INTL",
                      city: "DELHI",
                      code: "DEL",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "WUHAN HANNAN",
                      city: "WUHAN",
                      code: "WUH",
                      country: "CHINA",
                    });
                  }}
                >Delhi</Link>
              </span>
            </div>
          </div>
          <div className="lastouter8">
            <div className="image8"></div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>Milan Flights</span>
              <span>
                Via-{" "}
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "NAVI MUMBAI INTERNATIONAL",
                      city: "MUMBAI",
                      code: "BOM",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "MALPENSA",
                      city: "MILAN",
                      code: "MIL",
                      country: "ITALY",
                    });
                  }}
                >Mumbai, </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "INDIRA GANDHI INTL",
                      city: "DELHI",
                      code: "DEL",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "MALPENSA",
                      city: "MILAN",
                      code: "MIL",
                      country: "ITALY",
                    });
                  }}
                >Delhi, </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "SUBHAS CHANDRA BOSE",
                      city: "KOLKATA",
                      code: "CCU",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "MALPENSA",
                      city: "MILAN",
                      code: "MIL",
                      country: "ITALY",
                    });
                  }}
                >Kolkata, </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "KEMPEGOWDA INTL",
                      city: "BENGALURU",
                      code: "BLR",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "MALPENSA",
                      city: "MILAN",
                      code: "MIL",
                      country: "ITALY",
                    });
                  }}
                >Bangalore</Link>
              </span>
            </div>
          </div>
          <div className="lastouter9">
            <div className="image9"></div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>Madrid Flights</span>
              <span>
                Via-{" "}
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "NAVI MUMBAI INTERNATIONAL",
                      city: "MUMBAI",
                      code: "BOM",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "ADOLOFO SUAREZ BARAJAS",
                      city: "MADRID",
                      code: "MAD",
                      country: "SPAIN",
                    });
                  }}
                >Mumbai, </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "KEMPEGOWDA INTL",
                      city: "BENGALURU",
                      code: "BLR",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "ADOLOFO SUAREZ BARAJAS",
                      city: "MADRID",
                      code: "MAD",
                      country: "SPAIN",
                    });
                  }}
                >Bangalore, </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "SUBHAS CHANDRA BOSE",
                      city: "KOLKATA",
                      code: "CCU",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "ADOLOFO SUAREZ BARAJAS",
                      city: "MADRID",
                      code: "MAD",
                      country: "SPAIN",
                    });
                  }}
                >Kolkata, </Link>
                <Link
                  to={"/onewaysearch"}
                  onClick={() => {
                    setSelectedFrom({
                      name: "INDIRA GANDHI INTL",
                      city: "DELHI",
                      code: "DEL",
                      country: "INDIA",
                    });
                    setSelectedTo({
                      name: "ADOLOFO SUAREZ BARAJAS",
                      city: "MADRID",
                      code: "MAD",
                      country: "SPAIN",
                    });
                  }}
                >Delhi</Link>
              </span>
            </div>
          </div>
        </div>
      </Container>
    )}
    </div>
  );
};

export default Home;
