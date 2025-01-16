import { Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import './Trip.css';
import { useContext } from 'react';
import { FlightContext } from '../../FlightContext';

const Trip = ({className,setClassName, setSelectedTrip, selectedTrip }) => { 
  const{
    setCount
  }=useContext(FlightContext)

  const handleChange = (event) => {
    setSelectedTrip(event.target.value);
    setCount(1)
  };

  const handleClassChange = (event) => {
    setClassName(event.target.value);
  };

  return (
    <FormControl>
      <RadioGroup value={selectedTrip} onChange={handleChange}>
        <div className='topmincontainer'>
          <div className='trip'>
            <FormControlLabel className='one' value="one-way" control={<Radio />} label="One Way" />
            <FormControlLabel className='round' value="round-trip" control={<Radio />} label="Round Trip" />
            <FormControlLabel className='multi' value="multi-way" control={<Radio />} label="Multi Way" />
          </div>
          <div>
            <select className='class' value={className} onChange={handleClassChange}>
              <option value="ECONOMY">Economy</option>
              <option value="PREMIUM_ECONOMY">Economy Premium</option>
              <option value="BUSINESS">Business</option>
              <option value="FIRST">First</option>
            </select>
          </div>
        </div>
      </RadioGroup>
    </FormControl>
  );
};

export default Trip;
