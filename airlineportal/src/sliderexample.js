import React, { useState } from "react";
import { Slider, Typography, Box } from "@mui/material";

const Sliderexample = () => {
  const [value1, setValue1] = useState(300000000); // Slider 1 value
  const [value2, setValue2] = useState(80); // Slider 2 range (in minutes)

  const handleChange1 = (event, newValue) => {
    setValue1(newValue);
  };

  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
  };

  // Formatter for Indian numbering system
  const formatToIndianNumber = (number) =>
    new Intl.NumberFormat("en-IN").format(number);

  // Convert value2 (in minutes) to hours and minutes format (e.g., 2h 20m)
  const formatToHoursMinutes = (value) => {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <Box sx={{ width: 300, margin: "auto", mt: 5 }}>
      {/* Slider 1: Single Value */}
      <Typography variant="h6">Single Value Slider (Indian Format)</Typography>
      <Slider
        value={value1}
        onChange={handleChange1}
        aria-labelledby="slider-1"
        valueLabelDisplay="on"
        valueLabelFormat={formatToIndianNumber}
        min={0}
        max={1000000000}
      />
      <Typography>
        Current Value: {formatToIndianNumber(value1)}
      </Typography>

      {/* Slider 2: Time (Hours and Minutes) */}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Time Slider (Hours & Minutes)
      </Typography>
      <Slider
        value={value2}
        onChange={handleChange2}
        aria-labelledby="slider-2"
        valueLabelDisplay="auto"
        valueLabelFormat={formatToHoursMinutes}
        min={0}
        max={1440} // 1440 minutes in a day
      />
      <Typography>
        Current Time: {formatToHoursMinutes(value2)} {/* Display in hours and minutes */}
      </Typography>
    </Box>
  );
};

export default Sliderexample;
