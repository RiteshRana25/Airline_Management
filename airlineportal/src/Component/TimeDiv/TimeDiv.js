import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "./TimeDiv.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const TimeDiv = ({
  selectedTrip,
  returnDateString,
  departureDateString,
  setReturnDateString,
  setDepartureDateString,
}) => {
  const getTomorrow = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today;
  };

  const [departureDate, setDepartureDate] = useState(getTomorrow());
  const [returnDate, setReturnDate] = useState(getTomorrow());
  const [isDepartureOpen, setIsDepartureOpen] = useState(false);
  const [isReturnOpen, setIsReturnOpen] = useState(false);

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
    setIsReturnOpen(false);
  };

  const handleReturnClick = () => {
    setIsReturnOpen(!isReturnOpen);
    setIsDepartureOpen(false);
  };

  const handleDepartureDateChange = (date) => {
    setDepartureDate(date);
    setDepartureDateString(format(date, "yyyy-MM-dd"));

    // Automatically adjust return date if it's earlier than the new departure date
    if (returnDate && returnDate.getTime() <= date.getTime()) {
      const newReturnDate = new Date(date);
      newReturnDate.setDate(date.getDate() + 1);
      setReturnDate(newReturnDate);
      setReturnDateString(format(newReturnDate, "yyyy-MM-dd"));
    }
  };

  const handleReturnDateChange = (date) => {
    // Ensure return date is not the same as or before the departure date
    if (date && date.getTime() <= departureDate.getTime()) {
      alert("Return date must be after the departure date.");
      return;
    }
    setReturnDate(date);
    setReturnDateString(format(date, "yyyy-MM-dd"));
  };

  return (
    <div className="time">
      <div
        className={`date-section ${selectedTrip === "round-trip" ? "half" : ""}`}
        onClick={handleDepartureClick}
      >
        <label htmlFor="departure" style={{ fontSize: "20px" }}>
          {<CalendarMonthIcon />} Departure
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
          minDate={getTomorrow()} // Restricts selection to tomorrow or later
        />

        {departureDate && customDateFormat(departureDate)}
      </div>

      {selectedTrip === "round-trip" && (
        <div className="date-section half" onClick={handleReturnClick}>
          <label htmlFor="return" style={{ fontSize: "20px" }}>
            {<CalendarMonthIcon />} Return
          </label>

          <DatePicker
            selected={returnDate}
            onChange={handleReturnDateChange}
            dateFormat="MM/dd/yyyy"
            open={isReturnOpen}
            onClickOutside={() => setIsReturnOpen(false)}
            customInput={null}
            monthsShown={1}
            nextMonthButtonLabel="Next Month"
            previousMonthButtonLabel="Previous Month"
            minDate={departureDate} // Ensures return date is after the departure date
          />

          {returnDate && customDateFormat(returnDate)}
        </div>
      )}
    </div>
  );
};

export default TimeDiv;
