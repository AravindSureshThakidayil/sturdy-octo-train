import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import ReceptionistPage from "./pages/receptionist";
import PharmacyPage from "./pages/pharmacy"; // Import the PharmacyPage component
import reportWebVitals from './reportWebVitals';
import DoctorDashboard from './pages/doctor';
import DoctorLogin from './pages/doctor_login';
import ReceptionistLogin from './pages/receptionist_login';
import PharmacyLogin from './pages/pharmacy_login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/reception" element={<ReceptionistPage />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/pharmacy" element={<PharmacyPage />} /> {/* Add the route for PharmacyPage */}
        <Route path="/doctorlogin" element={<DoctorLogin />} />
        <Route path="/receptionistlogin" element={<ReceptionistLogin />} />
        <Route path="/pharmacylogin" element={<PharmacyLogin />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();