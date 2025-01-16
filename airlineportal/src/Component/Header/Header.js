import React, { useContext, useEffect } from "react";
import "./Header.css";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FlightContext } from "../../FlightContext";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const Header = () => {
  const {
    username,
    setUsername,
    setIsLoggedIn,
    isLoggedIn,
    darkMode,
    setDarkMode,
  } = useContext(FlightContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(username);
  }, []);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    if (value === "login") {
      navigate("/loginpage");
    } else if (value === "signup") {
      navigate("/signup");
    } else if (value === "logout") {
      setIsLoggedIn(false);
      setUsername("");
      navigate("/");
    } else if (value === "status") {
      navigate("/status");
    }
  };
  const handleClick = () => {
    setDarkMode((prevValue) => !prevValue); // Toggle the state
  };

  return (
    <Container maxWidth="xl">
      <div className="header">
        {darkMode === false ? (
          <div className="switch1" onClick={handleClick}>
            <div className="light">
              <LightModeOutlinedIcon />
            </div>
          </div>
        ) : (
          <div className="switch2" onClick={handleClick}>
            <div className="dark">
              <DarkModeIcon />
            </div>
          </div>
        )}
        <select className="login" onChange={handleSelectChange}>
          <option value="" selected disabled hidden>
            {isLoggedIn ? username : "Account"}
          </option>
          {isLoggedIn ? (
            <>
              <option value="status">Booking Status</option>
              <option value="logout">Logout</option>
            </>
          ) : (
            <>
              <option value="login">Login</option>
              <option value="signup">Sign Up</option>
            </>
          )}
        </select>
        <span className="title">Flight Reservation ✈️</span>
      </div>
    </Container>
  );
};

export default Header;
