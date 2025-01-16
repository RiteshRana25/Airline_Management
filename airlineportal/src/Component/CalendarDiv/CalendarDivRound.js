import React, { useState, useRef, useEffect, useContext } from "react";
import "./CalendarDiv.css";
import { FlightContext } from "../../FlightContext";

const CalendarDivRound = () => {
  const { setDepartureDateString, departureDateString } = useContext(FlightContext);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    departureDateString ? new Date(departureDateString) : null
  ); // Default to departureDateString if available
  const [currentMonth, setCurrentMonth] = useState(
    departureDateString ? new Date(departureDateString) : new Date()
  );
  const today = new Date();
  const calendarRef = useRef(null);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const getDaysInMonth = (month, year) =>
    new Array(31)
      .fill("")
      .map((_, i) => new Date(year, month, i + 1))
      .filter((date) => date.getMonth() === month);

  const daysInCurrentMonth = getDaysInMonth(
    currentMonth.getMonth(),
    currentMonth.getFullYear()
  );

  // Function to format the date as yyyy-MM-dd
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Function to format the date for display (day, Mon Week, Year)
  const formatDisplayDate = (date) => {
    if (!date) return "";
    return date.toLocaleString("default", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleDayClick = (day) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    if (date >= today) {
      setSelectedDate(date); // Store the full Date object
      setDepartureDateString(formatDate(date)); // Store the formatted date (yyyy-MM-dd) in context
      setIsCalendarOpen(false); // Close the calendar
    }
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const goToPreviousMonth = () => {
    if (
      currentMonth.getFullYear() > today.getFullYear() ||
      (currentMonth.getFullYear() === today.getFullYear() &&
        currentMonth.getMonth() > today.getMonth())
    ) {
      setCurrentMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
      );
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="calendar-wrapper" ref={calendarRef}>
      {/* The div to open the calendar */}
      <div style={{marginTop:'-7px',height:'55px',width:'150px',marginLeft:'115px'}} onClick={() => setIsCalendarOpen(!isCalendarOpen)} className="calendar-trigger">
        <span className="depart-label">Depart</span>
        <span style={{ fontSize: "18px" }}>
          {selectedDate ? formatDisplayDate(selectedDate) : ""}
        </span>
      </div>

      {/* Calendar display */}
      {isCalendarOpen && (
        <div className="calendar-overlay">
          <div className="calendar-container">
            {/* Header with navigation */}
            <div className="calendar-header">
              <button onClick={goToPreviousMonth} className="nav-btn">
                {"<"}
              </button>
              <span className="month-display">
                {currentMonth.toLocaleString("default", {
                  month: "long",
                })}{" "}
                {currentMonth.getFullYear()}
              </span>
              <button onClick={goToNextMonth} className="nav-btn">
                {">"}
              </button>
            </div>

            {/* Days of the week */}
            <div className="calendar-days">
              {daysOfWeek.map((day) => (
                <div key={day} className="day-name">
                  {day}
                </div>
              ))}
            </div>

            {/* Days of the current month */}
            <div className="calendar-grid">
              {daysInCurrentMonth.map((date) => {
                const isPastDate = date < today;

                return (
                  <div
                    key={date.getDate()}
                    onClick={() => !isPastDate && handleDayClick(date.getDate())}
                    className={`calendar-date ${isPastDate ? "disabled" : ""} ${
                      selectedDate && selectedDate.toDateString() === date.toDateString()
                        ? "selected"
                        : ""
                    }`}
                  >
                    {date.getDate()}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarDivRound;
