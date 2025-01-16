import React from 'react'
import {MenuItem, Select,Typography } from '@mui/material';

const TripSearch = ({handleTripTypeChange,selectedTrip}) => {
  return (
    <>
    <Typography style={{color:'#008cff'}}>Trip Type</Typography>
    <Select value={selectedTrip} onChange={handleTripTypeChange} fullWidth sx={{ backgroundColor: '#2d3748', color: 'white', height: '100%' }}>
      <MenuItem value="one-way">One Way</MenuItem>
      <MenuItem value="round-trip">Round Trip</MenuItem>
      <MenuItem value="multi-way">Multi-City</MenuItem>
    </Select>
  </>
  )
}

export default TripSearch