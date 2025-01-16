import React, { createContext, useState, useContext } from "react";
import { format } from "date-fns";

// Helper function to get tomorrow's date
const getTomorrow = () => {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  return today;
};

// Create the context
export const FlightContext = createContext();

// Custom hook to use the FlightContext
export const useFlightContext = () => {
  return useContext(FlightContext);
};

// Context Provider component
export const FlightProvider = ({ children }) => {
  const [count, setCount] = useState('1')
  const [error, setError] = useState("")
  const [error9, setError9] = useState("")
  const [error8, setError8] = useState("")
  const [error7, setError7] = useState("")
  const [error6, setError6] = useState("")
  const [selectedTrip, setSelectedTrip] = useState("one-way");
  const [isFromClicked, setIsFromClicked] = useState(false);
  const [isToClicked, setIsToClicked] = useState(false);
  const [departureDateString, setDepartureDateString] = useState(
    format(getTomorrow(), "yyyy-MM-dd")
  );
  const [departureDateString1, setDepartureDateString1] = useState(
    format(getTomorrow(), "yyyy-MM-dd")
  );
  const [departureDateString2, setDepartureDateString2] = useState(
    format(getTomorrow(), "yyyy-MM-dd")
  );
  const [departureDateString3, setDepartureDateString3] = useState(
    format(getTomorrow(), "yyyy-MM-dd")
  );
  const [departureDateString4, setDepartureDateString4] = useState(
    format(getTomorrow(), "yyyy-MM-dd")
  );

  const [returnDateString, setReturnDateString] = useState(
    format(getTomorrow(), "yyyy-MM-dd")
  );
  const [selectedFrom, setSelectedFrom] = useState({
    name: "INDIRA GANDHI INTL",
    city: "DELHI",
    code: "DEL",
    country: "INDIA",
  });
  const [selectedFrom1, setSelectedFrom1] = useState({
    name: "",
    city: "",
    code: "",
    country: "",
  });
  const [selectedFrom2, setSelectedFrom2] = useState({
    name: "",
    city: "",
    code: "",
    country: "",
  });
  const [selectedFrom3, setSelectedFrom3] = useState({
    name: "",
    city: "",
    code: "",
    country: "",
  });
  const [selectedFrom4, setSelectedFrom4] = useState({
    name: "",
    city: "",
    code: "",
    country: "",
  });
  const [selectedTo, setSelectedTo] = useState({
    name: "LOHEGAON",
    city: "PUNE",
    code: "PNQ",
    country: "INDIA",
  });
  const [selectedTo1, setSelectedTo1] = useState({
    name: "",
    city: "",
    code: "",
    country: "",
  });
  const [selectedTo2, setSelectedTo2] = useState({
    name: "",
    city: "",
    code: "",
    country: "",
  });
  const [selectedTo3, setSelectedTo3] = useState({
    name: "",
    city: "",
    code: "",
    country: "",
  });
  const [selectedTo4, setSelectedTo4] = useState({
    name: "",
    city: "",
    code: "",
    country: "",
  });
  const [traveller, setTraveller] = useState(1)
  const [adults, setAdults] = useState(1);
  const [child, setChild] = useState(0);
  const [infants, setInfants] = useState(0);
  const [className, setClassName] = useState("ECONOMY");
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [username, setUsername] = useState(''); 
  const [darkMode, setDarkMode] = useState(false)

  return (
    <FlightContext.Provider
      value={{
        darkMode,
        setDarkMode,
        isLoggedIn,setIsLoggedIn,
        username,setUsername,
        count,
        setCount,
        traveller,
        setTraveller,
        selectedTrip,
        setSelectedTrip,
        isFromClicked,
        setIsFromClicked,
        isToClicked,
        setIsToClicked,
        error,
        setError,
        error6,
        setError6,
        error7,
        setError7,
        error8,
        setError8,
        error9,
        setError9,
        departureDateString,
        setDepartureDateString,
        departureDateString1,
        setDepartureDateString1,
        departureDateString2,
        setDepartureDateString2,
        departureDateString3,
        setDepartureDateString3,
        departureDateString4,
        setDepartureDateString4,
        returnDateString,
        setReturnDateString,
        selectedFrom,
        setSelectedFrom,
        selectedTo,
        setSelectedTo,
        selectedFrom1,
        setSelectedFrom1,
        selectedTo1,
        setSelectedTo1,
        selectedFrom2,
        setSelectedFrom2,
        selectedTo2,
        setSelectedTo2,
        selectedFrom3,
        setSelectedFrom3,
        selectedTo3,
        setSelectedTo3,
        selectedFrom4,
        setSelectedFrom4,
        selectedTo4,
        setSelectedTo4,
        adults,
        setAdults,
        child,
        setChild,
        infants,
        setInfants,
        className,
        setClassName,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
};
