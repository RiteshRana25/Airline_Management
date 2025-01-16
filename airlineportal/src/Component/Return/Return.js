import { TextField, Typography } from '@mui/material';
import { useRef } from 'react';

const Return = ({ departureDateString, returnDateString, setReturnDateString }) => {
  // Calculate minimum return date (one day after departure date)
  const minReturnDate = new Date(departureDateString);
  if (departureDateString) {
    minReturnDate.setDate(minReturnDate.getDate() + 1);
  }

  // Format the minimum return date to YYYY-MM-DD
  const minReturnDateString = departureDateString
    ? minReturnDate.toISOString().split('T')[0]
    : '';

  // Create a ref to the input element
  const dateInputRef = useRef(null);

  // Function to handle click and open the calendar
  const handleClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.focus(); // Trigger the input focus, opening the calendar
    }
  };

  return (
    <>
      <Typography>Return</Typography>
      <TextField
        inputRef={dateInputRef} // Attach ref to the TextField
        onClick={handleClick} // Trigger the click handler to open the calendar
        type="date"
        value={returnDateString}
        onChange={(e) => setReturnDateString(e.target.value)}
        fullWidth
        sx={{ backgroundColor: '#2d3748', color: 'white' }}
        inputProps={{
          min: minReturnDateString, // Ensure the return date is one day after the departure date
        }}
      />
    </>
  );
};

export default Return;
