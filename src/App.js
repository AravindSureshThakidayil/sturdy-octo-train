import React from 'react';
import { Link } from "react-router-dom";
import "./styles/master.css"
import "./App.css";

const Landing = () => {
  const handleLogin = () => {
    // Placeholder for login logic
    console.log('Login button clicked');
  };
  const date = new Date();
  return (
    <div className="login-page">
      <div className="datetime-container">
        {date.getDate().toString() + " " + "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ")[date.getMonth()] + " " + date.getFullYear().toString()}
        <br />
        {"Monday Tuesday Wednesday Thursday Friday Saturday Sunday".split(" ")[date.getDay()]}
      </div>
      <div className="login-container">
        <div className="logo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="heart-pulse-icon">
            <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
            <path d="M3.5 12h6l.5-1 2 4.5 2-7 1.5 3.5h5"></path>
          </svg>
          <h1 className='heading'>ABC Hospital Management System</h1>
        </div>
        <button className="login-button" onClick={handleLogin}>
          <Link to="/reception">Receptionist</Link>
          {/* Log In */}
        </button>
        <button className='login-button'>
          <Link to='/doctor'>Doctor</Link>
        </button>
        <button className='login-button'>
          <Link to='/pharmacy'>Pharmacy</Link>
        </button>
      </div>
    </div>
  );
};

export default Landing;
