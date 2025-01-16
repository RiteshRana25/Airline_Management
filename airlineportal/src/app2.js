import React, { useState } from 'react';
import axios from 'axios';
import './App2.css';

const App = () => {
  const apiKey = '906ZDGG8nAKATZxuPASRrXqxDrE1XNsZ';
  const apiSecret = '6TGNxBJy7qKKa8KI';

  const [searchQueryFrom, setSearchQueryFrom] = useState('');
  const [searchQueryTo, setSearchQueryTo] = useState('');
  const [resultsFrom, setResultsFrom] = useState([]);
  const [resultsTo, setResultsTo] = useState([]);
  const [error, setError] = useState('');

  // States to store selected airport details
  const [selectedFromName, setSelectedFromName] = useState('');
  const [selectedFromCity, setSelectedFromCity] = useState('');
  const [selectedFromCode, setSelectedFromCode] = useState('');
  const [selectedToName, setSelectedToName] = useState('');
  const [selectedToCity, setSelectedToCity] = useState('');
  const [selectedToCode, setSelectedToCode] = useState('');

  const fetchAirportData = async (query, type) => {
    const url = `https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword=${query}&page%5Blimit%5D=10&page%5Boffset%5D=0&view=FULL`;

    try {
      const tokenResponse = await axios.post(
        'https://test.api.amadeus.com/v1/security/oauth2/token',
        new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: apiKey,
          client_secret: apiSecret,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }
      );

      const accessToken = tokenResponse.data.access_token;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (type === 'from') {
        setResultsFrom(response.data.data);
      } else if (type === 'to') {
        setResultsTo(response.data.data);
      }

      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching airport data');
      setResultsFrom([]);
      setResultsTo([]);
    }
  };

  const handleInputChangeFrom = (e) => {
    const query = e.target.value;
    setSearchQueryFrom(query);
    if (query.length > 2) {
      fetchAirportData(query, 'from');
    } else {
      setResultsFrom([]);
    }
  };

  const handleInputChangeTo = (e) => {
    const query = e.target.value;
    setSearchQueryTo(query);
    if (query.length > 2) {
      fetchAirportData(query, 'to');
    } else {
      setResultsTo([]);
    }
  };

  const handleSelectFrom = (airport) => {
    setSelectedFromName(airport.name);
    setSelectedFromCity(airport.address.cityName);
    setSelectedFromCode(airport.address.cityCode);
  };

  const handleSelectTo = (airport) => {
    setSelectedToName(airport.name);
    setSelectedToCity(airport.address.cityName);
    setSelectedToCode(airport.address.cityCode);
  };

  return (
    <div className="container">
      <div className="select-container">
        <span className="label">From</span>
        <input
          type="text"
          value={searchQueryFrom}
          onChange={handleInputChangeFrom}
          placeholder="Search airports from..."
          className="input"
        />
        {resultsFrom.length > 0 && (
          <div className="dropdown">
            {resultsFrom.map((airport) => (
              <div
                key={airport.id}
                className="div1"
                onClick={() => handleSelectFrom(airport)}
              >
                <div className="left-content">
                  <span>{airport.name}</span>
                  <span>{airport.address.cityName}</span>
                </div>
                <div className="right-content">
                  <span>{airport.address.cityCode}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="select-container">
        <span className="label">To</span>
        <input
          type="text"
          value={searchQueryTo}
          onChange={handleInputChangeTo}
          placeholder="Search airports to..."
          className="input"
        />
        {resultsTo.length > 0 && (
          <div className="dropdown">
            {resultsTo.map((airport) => (
              <div
                key={airport.id}
                className="div1"
                onClick={() => handleSelectTo(airport)}
              >
                <div className="left-content">
                  <span>{airport.name}</span>
                  <span>{airport.address.cityName}</span>
                </div>
                <div className="right-content">
                  <span>{airport.address.cityCode}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <div className="error">{error}</div>}

      {/* Display selected airport details */}
      <div className="selected-info">
        <h3>Selected From</h3>
        <p>Name: {selectedFromName}</p>
        <p>City: {selectedFromCity}</p>
        <p>Code: {selectedFromCode}</p>

        <h3>Selected To</h3>
        <p>Name: {selectedToName}</p>
        <p>City: {selectedToCity}</p>
        <p>Code: {selectedToCode}</p>
      </div>
    </div>
  );
};

export default App;
