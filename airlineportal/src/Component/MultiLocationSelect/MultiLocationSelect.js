import React, { useContext, useEffect, useState } from 'react';
import { Container } from '@mui/material';
import './MultiLocationSelect.css';
import { FlightContext } from '../../FlightContext';
import TrendingFlatSharpIcon from '@mui/icons-material/TrendingFlatSharp';

const MultiLocationSelect = ({ count, run1, setRun1,selectedValue,setSelectedValue }) => {
  const {
    selectedFrom,
    selectedFrom1,
    selectedFrom2,
    selectedFrom3,
    selectedFrom4,
    selectedTo,
    selectedTo1,
    selectedTo2,
    selectedTo3,
    selectedTo4,
    departureDateString,
    departureDateString1,
    departureDateString2,
    departureDateString3,
    departureDateString4
  } = useContext(FlightContext);

  // State for visibleCount
  const [visibleCount, setVisibleCount] = useState(count + 1);
  const [cityNameFrom, setCityNameFrom] = useState('')
  const [cityNameFrom1, setCityNameFrom1] = useState('')
  const [cityNameFrom2, setCityNameFrom2] = useState('')
  const [cityNameFrom3, setCityNameFrom3] = useState('')
  const [cityNameFrom4, setCityNameFrom4] = useState('')
  const [cityNameTo, setCityNameTo] = useState('')
  const [cityNameTo1, setCityNameTo1] = useState('')
  const [cityNameTo2, setCityNameTo2] = useState('')
  const [cityNameTo3,setCityNameTo3] = useState('')
  const [cityNameTo4, setCityNameTo4] = useState('')
  const [departure, setDeparture] = useState('')
  const [departure1, setDeparture1] = useState('')
  const [departure2, setDeparture2] = useState('')
  const [departure3, setDeparture3] = useState('')
  const [departure4, setDeparture4] = useState('')


  const handleDivClick = (value) => {
    setSelectedValue(value); // Update the selected value
  };

  // Update visibleCount whenever run1 changes
  useEffect(() => {
    if (run1) {
      setVisibleCount(count + 1);
      setRun1(false);
    }
  }, [run1, count, setRun1]);
  useEffect(()=>{
    setCityNameFrom(selectedFrom.city)
    setCityNameFrom1(selectedFrom1.city)
    setCityNameFrom2(selectedFrom2.city)
    setCityNameFrom3(selectedFrom3.city)
    setCityNameFrom4(selectedFrom4.city)
    setCityNameTo(selectedTo.city)
    setCityNameTo1(selectedTo1.city)
    setCityNameTo2(selectedTo2.city)
    setCityNameTo3(selectedTo3.city)
    setCityNameTo4(selectedTo4.city)
    setDeparture(departureDateString)
    setDeparture1(departureDateString1)
    setDeparture2(departureDateString2)
    setDeparture3(departureDateString3)
    setDeparture4(departureDateString4)
  },[run1])

  // Array of content for each div
  const divContents = [
    { from: cityNameFrom, to: cityNameTo,date:departure },
    { from: cityNameFrom1, to: cityNameTo1,date:departure1 },
    { from: cityNameFrom2, to: cityNameTo2 ,date:departure2},
    { from: cityNameFrom3, to: cityNameTo3,date:departure3 },
    { from: cityNameFrom4, to: cityNameTo4,date:departure4 },
  ];

  return (
    <Container maxWidth="md" className="container01">
      {[1, 2, 3, 4, 5].map((value, index) => (
        <div
          key={value}
          className={`box ${selectedValue === value ? 'selected' : ''}`}
          style={{
            display: value <= visibleCount ? 'block' : 'none', // Show based on `visibleCount`
          }}
          onClick={() => handleDivClick(value)}
        >
          <p>
            {divContents[index].from}{' '}
            <TrendingFlatSharpIcon style={{ verticalAlign: 'middle' }} />{' '}
            {divContents[index].to}
          </p>
          <p>{divContents[index].date}</p>
        </div>
      ))}
    </Container>
  );
};

export default MultiLocationSelect;
