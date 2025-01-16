import React, { useState, useEffect, useRef } from "react";
import "./Travellers.css";
import GroupIcon from "@mui/icons-material/Group";

const Travellers = ({ traveller, setTraveller, adults, child, infants, setAdults, setChild, setInfants }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    setIsDropdownOpen((prev) => !prev);
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
    <div className="travellers" ref={dropdownRef}>
      <div className="traveller-summary" onClick={toggleDropdown}>
        <GroupIcon />
        Travellers {traveller}
      </div>
      {isDropdownOpen && (
        <div className="traveller-dropdown">
          <div className="traveller-item">
            <span>Adults</span>
            <div className="counter">
              <button onClick={() => handleDecrement("adults")} disabled={adults <= 1}>
                -
              </button>
              <span>{adults}</span>
              <button onClick={() => handleIncrement("adults")} disabled={adults + child >= maxTotal}>
                +
              </button>
            </div>
          </div>
          <div className="traveller-item">
            <span>Children</span>
            <div className="counter">
              <button onClick={() => handleDecrement("children")} disabled={child <= 0}>
                -
              </button>
              <span>{child}</span>
              <button onClick={() => handleIncrement("children")} disabled={adults + child >= maxTotal}>
                +
              </button>
            </div>
          </div>
          <div className="traveller-item">
            <span>Infants</span>
            <div className="counter">
              <button onClick={() => handleDecrement("infants")} disabled={infants <= 0}>
                -
              </button>
              <span>{infants}</span>
              <button onClick={() => handleIncrement("infants")} disabled={infants >= adults}>
                +
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Travellers;
