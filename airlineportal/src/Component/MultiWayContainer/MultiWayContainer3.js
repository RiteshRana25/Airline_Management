import React, { useContext } from 'react';
import './MultiWayContainer.css';
import { Container } from '@mui/material';
import TimeDiv5 from '../TimeDiv/TimeDiv5';
import Location4 from '../Locations/Location4';
import { FlightContext } from '../../FlightContext';

const MultiWayContainer3 = () => {
  const{
  error6,
  setError6,
  selectedFrom4,
  selectedTo4,
  setSelectedFrom4,
  setSelectedTo4,
  setIsFromClicked,
  setIsToClicked,
  isToClicked,
  isFromClicked,
  returnDateString,
  departureDateString3,
  departureDateString4,
  setReturnDateString,
  setDepartureDateString4,
}= useContext(FlightContext);
  return (
    <Container className="multicontainer3"  maxWidth="xl">
      <div className="container">
        <Location4
        error6={error6}
        setError6={setError6}
        selectedFrom4={selectedFrom4}
        selectedTo4={selectedTo4}
        setSelectedTo4={setSelectedTo4}
        setSelectedFrom4={setSelectedFrom4}
          isFromClicked={isFromClicked}
          isToClicked={isToClicked}
          setIsFromClicked={setIsFromClicked}
          setIsToClicked={setIsToClicked}
        />
        <TimeDiv5
          departureDateString3={departureDateString3}
          departureDateString4={departureDateString4}
          returnDateString={returnDateString}
          setDepartureDateString4={setDepartureDateString4}
          setReturnDateString={setReturnDateString}
        />
      </div>
    </Container>
    
  );
};

export default MultiWayContainer3;
