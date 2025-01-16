import { TextField, Typography } from "@mui/material";
import { useRef } from "react";
import { format } from "date-fns";

const Depart = ({ departureDateString, setDepartureDateString, setReturnDateString }) => {
  const today = new Date().toISOString().split("T")[0];
  const dateInputRef = useRef(null);

  const handleClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.focus();
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setDepartureDateString(e.target.value);

    // Automatically set the return date to one day after the selected departure date
    if (setReturnDateString) {
      const newReturnDate = new Date(selectedDate);
      newReturnDate.setDate(selectedDate.getDate() + 1);
      setReturnDateString(format(newReturnDate, "yyyy-MM-dd"));
    }
  };

  return (
    <>
      <Typography>Depart</Typography>
      <TextField
        ref={dateInputRef}
        onClick={handleClick}
        type="date"
        value={departureDateString}
        onChange={handleDateChange}
        fullWidth
        sx={{ backgroundColor: "#2d3748", color: "white", marginLeft: "-20px" }}
        inputProps={{
          min: today, // Minimum date is today
        }}
      />
    </>
  );
};

export default Depart;
