import React from 'react'
import {MenuItem, Select,Typography } from '@mui/material';
const Class = ({className, handleClassChange}) => {
    return (
      <>
      <Typography style={{color:'#008cff'}}>Class</Typography>
      <Select value={className} onChange={handleClassChange} fullWidth sx={{ backgroundColor: '#2d3748', color: 'white', height: '100%' }}>
        <MenuItem value="ECONOMY">Economy</MenuItem>
        <MenuItem value="PREMIUM_ECONOMY">Economy Premium</MenuItem>
        <MenuItem value="BUSINESS">Business</MenuItem>
        <MenuItem value="FIRST">First</MenuItem>        
      </Select>
    </>
    )
}

export default Class