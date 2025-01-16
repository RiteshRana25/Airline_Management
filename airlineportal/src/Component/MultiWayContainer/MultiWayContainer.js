import React, { useContext } from 'react';
import TimeDiv2 from '../TimeDiv/TimeDiv2';
import './MultiWayContainer.css';
import { Container } from '@mui/material';
import Location1 from '../Locations/Location1';
import { FlightContext } from '../../FlightContext';

const MultiWayContainer = (
) => {
  const {
    error9,
    setError9,
    selectedFrom1,
  selectedTo1,
  setSelectedFrom1,
  setSelectedTo1,
  setIsFromClicked,
  setIsToClicked,
  isToClicked,
  isFromClicked,
  returnDateString,
  departureDateString,
  departureDateString1,
  setReturnDateString,
  setDepartureDateString1}= useContext(FlightContext);
  return (
    <Container className="multicontainer"  maxWidth="xl">
      <div className="container">
        <Location1
        setError9={setError9}
        error9={error9}
        selectedFrom1={selectedFrom1}
        selectedTo1={selectedTo1}
        setSelectedTo1={setSelectedTo1}
        setSelectedFrom1={setSelectedFrom1}
          isFromClicked={isFromClicked}
          isToClicked={isToClicked}
          setIsFromClicked={setIsFromClicked}
          setIsToClicked={setIsToClicked}
        />
        <TimeDiv2
          departureDateString={departureDateString}
          departureDateString1={departureDateString1}
          returnDateString={returnDateString}
          setDepartureDateString1={setDepartureDateString1}
          setReturnDateString={setReturnDateString}
        />
      </div>
    </Container>
    
  );
};

export default MultiWayContainer;
