import React, { useState, useEffect, useRef } from "react";
import { Grid, Typography, Button } from "@mui/material";
import GroupIcon from '@mui/icons-material/Group';

const Passengers = ({traveller,setTraveller, adults, child, infants, setAdults, setChild, setInfants }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference for the dropdown

  const maxTotal = 9;


  const handleIncrement = (type) => {
    if (type === "adults" && adults + child < maxTotal) {
      setAdults(adults + 1);
      setTraveller(traveller + 1);
    } else if (type === "children" && adults + child < maxTotal) {
      setChild(child + 1);
      setTraveller(traveller + 1);
    } else if (type === "infants" && infants < adults) {
      setInfants(infants + 1);
      setTraveller(traveller + 1);
    }
  };

  const handleDecrement = (type) => {
    if (type === "adults" && adults > 1) {
      const newAdults = adults - 1;
      let decrementBy = 1; // Start with decrementing one adult

      if (infants > newAdults) {
        // Adjust infants to match new adults
        const excessInfants = infants - newAdults;
        setInfants(newAdults);
        decrementBy += excessInfants; // Account for infants decremented
      }

      setAdults(newAdults);
      setTraveller(traveller - decrementBy);
    } else if (type === "children" && child > 0) {
      setChild(child - 1);
      setTraveller(traveller - 1);
    } else if (type === "infants" && infants > 0) {
      setInfants(infants - 1);
      setTraveller(traveller - 1);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  return (
    <Grid item xs={2} ref={dropdownRef} sx={{ position: 'relative' }}>
      <Typography onClick={toggleDropdown} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <GroupIcon sx={{ marginRight: 1}} />
        Passengers {traveller}
      </Typography>
      {isDropdownOpen && (
        <div style={{
          padding: '10px', 
          backgroundColor: '#333', 
          color: 'white', 
          borderRadius: '5px', 
          position: 'absolute', 
          top: '100%',
          left: '10%', 
          width: '660%',
          boxSizing: 'border-box', 
          zIndex: 1000, 
        }}>
          <div style={{ marginBottom: '10px' }}>
            <Typography>Adults</Typography>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button onClick={() => handleDecrement("adults")} size="small">-</Button>
              <span style={{ margin: '0 10px' }}>{adults}</span>
              <Button onClick={() => handleIncrement("adults")} size="small">+</Button>
            </div>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <Typography>Children</Typography>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button onClick={() => handleDecrement("children")} size="small">-</Button>
              <span style={{ margin: '0 10px' }}>{child}</span>
              <Button onClick={() => handleIncrement("children")} size="small">+</Button>
            </div>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <Typography>Infants</Typography>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button onClick={() => handleDecrement("infants")} size="small">-</Button>
              <span style={{ margin: '0 10px' }}>{infants}</span>
              <Button onClick={() => handleIncrement("infants")} size="small">+</Button>
            </div>
          </div>
        </div>
      )}
    </Grid>
  );
};

export default Passengers;
