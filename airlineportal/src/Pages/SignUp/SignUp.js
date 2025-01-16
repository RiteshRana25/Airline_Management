import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    phonenumber: '',
    gender: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic
    if (!formData.username.trim()) {
      setErrorMessage('Username is required.');
      return;
    }

    if (formData.phonenumber.length !== 10) {
      setErrorMessage('Phone number must be exactly 10 digits.');
      return;
    }

    if (!formData.email.includes('@')) {
      setErrorMessage('Email must contain @.');
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setErrorMessage(
        'Password must have at least one uppercase letter, one special character, one number, and be at least 8 characters long.'
      );
      return;
    }

    // Reset error message on successful validation
    setErrorMessage('');

    // Send form data to backend
    axios
      .post('http://localhost:5000/submit-form', formData)
      .then((response) => {
        console.log('Form submitted successfully:', response.data);
        alert('Form submitted successfully!');
        setFormData({
          firstname: '',
          lastname: '',
          username: '',
          email: '',
          phonenumber: '',
          gender: '',
          password: '',
        });
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        alert('Error submitting form. Please try again.');
      });
  };

  return (
    <div className="sign-up-container">
      <h2>Sign Up</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
        <div className="already">
          <span>Already Have an Account?</span>
          <Link to="/loginpage" className="navigate-link">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
