import React, { useContext, useState } from 'react';
import axios from 'axios';
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { FlightContext } from '../../FlightContext';

const LoginPage = () => {
  const{
    isLoggedIn,
    setIsLoggedIn,
    username,setUsername
  }=useContext(FlightContext)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset error message
    setErrorMessage('');

    // Send login data to backend
    axios
      .post('https://airline-management-backend.vercel.app/login', formData)
      .then((response) => {
        console.log(response.data);
        setIsLoggedIn(true);
        setUsername(response.data.user.username);

        alert(`Welcome, ${response.data.user.username}!`); 

        navigate('/');
      })
      .catch((error) => {

        setIsLoggedIn(false);
        if (error.response) {
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage('Server error, please try again later.');
        }
      });
  };

  return (
    <div className='loginmain'>

    <div className="login-container">
      <h2>Login</h2>

      {isLoggedIn ? (
        <div className="welcome-message">
          <h3>Welcome back, {username}!</h3>
        </div>
      ) : (
        <>
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                />
            </div>

            <button type="submit">Login</button>
            <div className="already">
              <span>Don't Have Account?</span>
              <Link to="/signup" className="navigate-link">Sign Up</Link>
            </div>
          </form>
        </>
      )}
    </div>
      </div>
  );
};

export default LoginPage;
