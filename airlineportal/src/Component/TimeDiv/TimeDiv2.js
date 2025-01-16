import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { format, parseISO } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "./TimeDiv2.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const TimeDiv2 = ({
  departureDateString,
  departureDateString1,
  setDepartureDateString1,
}) => {
  // Convert departureDateString to a Date object
  const getDepartureDate = () => {
    if (departureDateString) {
      return parseISO(departureDateString);
    }
    return getTomorrow();
  };

  const getTomorrow = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today;
  };

  const minDate = getDepartureDate();
  const [departureDate, setDepartureDate] = useState(minDate);
  const [isDepartureOpen, setIsDepartureOpen] = useState(false);

  const customDateFormat = (date) => {
    if (date) {
      const day = format(date, "d");
      const monthYear = format(date, "MMM yyyy");
      const dayOfWeek = format(date, "EEEE");

      return (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "20px" }}>
            {day} {monthYear}
          </div>
          <div style={{ fontSize: "20px" }}>{dayOfWeek}</div>
        </div>
      );
    }
    return null;
  };

  const handleDepartureClick = () => {
    setIsDepartureOpen(!isDepartureOpen);
  };

  const handleDepartureDateChange = (date) => {
    setDepartureDate(date);
    setDepartureDateString1(format(date, "yyyy-MM-dd"));
  };

  // Update departureDate dynamically if departureDateString changes
  useEffect(() => {
    const newDepartureDate = getDepartureDate();
    if (newDepartureDate > departureDate) {
      setDepartureDate(newDepartureDate);
    }
  }, [departureDateString]); // Dependency on departureDateString

  // Update departureDateString1 if departureDateString changes and is later than current
  useEffect(() => {
    const newDepartureDate = getDepartureDate();
    if (
      departureDateString1 &&
      parseISO(departureDateString1) < newDepartureDate
    ) {
      setDepartureDateString1(format(newDepartureDate, "yyyy-MM-dd"));
    }
  }, [departureDateString, departureDateString1, setDepartureDateString1]);

  return (
    <div className="time">
      <div className="date-section" onClick={handleDepartureClick}>
        <label htmlFor="departure" style={{ fontSize: "25px" }}>
          <CalendarMonthIcon />
          Departure
        </label>

        <DatePicker
          selected={departureDate}
          onChange={handleDepartureDateChange}
          dateFormat="MM/dd/yyyy"
          open={isDepartureOpen}
          onClickOutside={() => setIsDepartureOpen(false)}
          customInput={null}
          monthsShown={1}
          nextMonthButtonLabel="Next Month"
          previousMonthButtonLabel="Previous Month"
          minDate={minDate} // Restricts selection to the minDate
        />

        {departureDate && customDateFormat(departureDate)}
      </div>
    </div>
  );
};

export default TimeDiv2;
