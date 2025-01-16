import React, { useContext } from 'react';
import './MultiWayContainer.css';
import { Container } from '@mui/material';
import Location3 from '../Locations/Location3';
import TimeDiv4 from '../TimeDiv/TimeDiv4';
import { FlightContext } from '../../FlightContext';

const MultiWayContainer2 = () => {
  const{
    error7,setError7,
    selectedFrom3,
    selectedTo3,
    setSelectedFrom3,
    setSelectedTo3,
    setIsFromClicked,
    setIsToClicked,
    isToClicked,
    isFromClicked,
    returnDateString,
    departureDateString2,
    departureDateString3,
    setReturnDateString,
    setDepartureDateString3,
  }= useContext(FlightContext);
  return (
    <Container className="multicontainer2"  maxWidth="xl">
      <div className="container">
        <Location3
        error7={error7}
        setError7={setError7}
        selectedFrom3={selectedFrom3}
        selectedTo3={selectedTo3}
        setSelectedTo3={setSelectedTo3}
        setSelectedFrom3={setSelectedFrom3}
          isFromClicked={isFromClicked}
          isToClicked={isToClicked}
          setIsFromClicked={setIsFromClicked}
          setIsToClicked={setIsToClicked}
        />
        <TimeDiv4
        departureDateString2={departureDateString2}
          departureDateString3={departureDateString3}
          returnDateString={returnDateString}
          setDepartureDateString3={setDepartureDateString3}
          setReturnDateString={setReturnDateString}
        />
      </div>
    </Container>
    
  );
};

export default MultiWayContainer2;
