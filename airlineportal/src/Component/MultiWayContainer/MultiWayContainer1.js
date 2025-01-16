import React, { useContext } from 'react';
import './MultiWayContainer.css';
import { Container } from '@mui/material';
import TimeDiv3 from '../TimeDiv/TimeDiv3';
import Location2 from '../Locations/Location2';
import { FlightContext } from '../../FlightContext';

const MultiWayContainer1 = () => {
  const {
    error8,
    setError8,
    selectedFrom2,
    selectedTo2,
    setSelectedFrom2,
    setSelectedTo2,
    setIsFromClicked,
    setIsToClicked,
    isToClicked,
    isFromClicked,
    returnDateString,
    departureDateString1,
    departureDateString2,
    setReturnDateString,
    setDepartureDateString2,
  }= useContext(FlightContext);

  return (
    <Container className="multicontainer1"  maxWidth="xl">
      <div className="container">
        <Location2
        error8={error8}
        setError8={setError8}
        selectedFrom2={selectedFrom2}
        selectedTo2={selectedTo2}
        setSelectedTo2={setSelectedTo2}
        setSelectedFrom2={setSelectedFrom2}
          isFromClicked={isFromClicked}
          isToClicked={isToClicked}
          setIsFromClicked={setIsFromClicked}
          setIsToClicked={setIsToClicked}
        />
        <TimeDiv3
          departureDateString1={departureDateString1}
          departureDateString2={departureDateString2}
          returnDateString={returnDateString}
          setDepartureDateString2={setDepartureDateString2}
          setReturnDateString={setReturnDateString}
        />
      </div>
    </Container>
    
  );
};

export default MultiWayContainer1;
