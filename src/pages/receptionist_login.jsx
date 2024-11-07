import React, { useState } from 'react';
import { getAuth } from "firebase/auth";
import {Navigate} from "react-router-dom"
import auth from "../firebase_config"
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const initiateLogIn = () => {
    // let email = document.getElementById("email").value
    // let password = document.getElementById("password").value
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    window.open("/reception")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  };

  return (
    <div className="login-pagee">
      <div className="login-carde">
        <div className="card-headere">
          <div className="logoe">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="heart-pulse-icone">
              <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
              <path d="M3.5 12h6l.5-1 2 4.5 2-7 1.5 3.5h5"></path>
            </svg>
            <h1>ABC Hospital</h1>
          </div>
          <h2>Receptionist Login</h2>
          <p>Login to access your account</p>
        </div>
        <div className="card-content">
          <form>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="input-icon">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <input id="email" type="email" value={email} onInput={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="input-icon">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password} onInput={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="card-footer">
          <button className="login-buttone" onClick={initiateLogIn}>Log In</button>
          
        </div>
      </div>
      <style jsx>{`
        .login-pagee {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to top left, rgba(47, 47, 119, .5), rgb(186, 26, 53, .5));
    /* padding: 1rem; */
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }
  .login-carde {
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    padding: 2rem;
  
  }
  .card-headere {
    text-align: center;
    margin-bottom: 2rem;
  }
  .logoe {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }
  .heart-pulse-icone {
    width: 48px;
    height: 48px;
    color: rgb(76, 139, 177);
  }
  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    color: rgb(76, 139, 177);
    margin-left: 0.5rem;
  }
  h2 {
    font-size: 1.5rem;
    color: #3a5883;
    margin-bottom: 0.5rem;
  }
  p {
    color: #535a69;
  }
  .input-group {
    margin-bottom: 1rem;
  }
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #374151;
  }
  .input-wrapper {
    position: relative;
  }
  .input-icon {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    color: #9ca3af;
  }
  input {
    width: 88%;
    padding: 0.5rem 0.75rem 0.5rem 2.5rem;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    font-size: 1rem;
  }
  input:focus {
    outline: none;
    border-color: #505d7865;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
  .password-toggle {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: #9ca3af;
  }
  .password-toggle svg {
    width: 20px;
    height: 20px;
  }
  .login-buttone {
    width: 100%;
    padding: 0.75rem;
    background-color: rgb(135, 104, 143);
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
    
  }
      `}</style>
    </div>
  );
};

export default Login;
