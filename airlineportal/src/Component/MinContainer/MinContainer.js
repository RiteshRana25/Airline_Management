import './MinContainer.css';
import 'react-datepicker/dist/react-datepicker.css';
import Location from "../Locations/Location";
import Trip from '../Trip/Trip';
import TimeDiv from '../TimeDiv/TimeDiv';
import Travellers from '../Travellers/Travellers';
import { Container } from '@mui/material';
import { useEffect } from 'react';

const MinContainer = ({
  error, setError,
  traveller,setTraveller,
  selectedTo, setSelectedTo,
  selectedFrom, setSelectedFrom,
  className,setClassName,
  setIsFromClicked,setIsToClicked,isToClicked,isFromClicked,
  setSelectedTrip,selectedTrip,
  returnDateString,departureDateString,setReturnDateString,setDepartureDateString,
  adults,child,infants,setAdults,setChild,setInfants}) => {
  
    useEffect(() => {
      console.log(selectedTo,selectedFrom);
      
    }, [])
    

  return (
    <Container className="mincontainer"  maxWidth="xxl">
      <div className='trip'>
        <Trip className={className} setClassName={setClassName} selectedTrip={selectedTrip} setSelectedTrip={setSelectedTrip} />
      </div>
      <div className='container'>
        <Location
        error={error} setError={setError}
        selectedTo={selectedTo} setSelectedTo={setSelectedTo}
        selectedFrom={selectedFrom} setSelectedFrom={setSelectedFrom}
         isFromClicked={isFromClicked} isToClicked={isToClicked}
        setIsFromClicked={setIsFromClicked} setIsToClicked={setIsToClicked}/>
        <TimeDiv selectedTrip={selectedTrip} 
        departureDateString={departureDateString} returnDateString={returnDateString}
        setDepartureDateString={setDepartureDateString} setReturnDateString={setReturnDateString}/>
        <Travellers 
        traveller={traveller}
        setTraveller={setTraveller}
        adults={adults}
          child={child}
          infants={infants}
          setAdults={setAdults}
          setChild={setChild}
          setInfants={setInfants}/>
      </div>
    </Container>
     );
};

export default MinContainer;
