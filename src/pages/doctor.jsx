import React, { useState, useEffect } from 'react';
import db from '../firebase_config';
import { doc, getDoc } from "firebase/firestore";
import "../styles/master.css";
import "../styles/doctor.css";

const DoctorDashboard = () => {
    const [patientId, setPatientId] = useState('');
    const [patientInfo, setPatientInfo] = useState({ patient_name: '', patient_dob: '', patient_dob: '', patient_date_registration: '', patient_sex: '' });
    const [observation, setObservation] = useState('');
    const [prescription, setPrescription] = useState('');
    const [patientHistory, setPatientHistory] = useState([]);

    const handlePatientSearch = async (e) => {
        e.preventDefault();
        const id = patientId;

        var patientDoc;
        if (patientDoc = (await getDoc(doc(db, "patients", id))).data()) {
            setPatientInfo(patientDoc);
        } else {
            alert("ERROR!");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEntry = {
            date: new Date().toISOString().split('T')[0],
            observation,
            prescription
        };
        setPatientHistory([newEntry, ...patientHistory]);
        setObservation('');
        setPrescription('');
    };

    return (
        <div className="doctor-dashboard">
            <header>
                <h1>ABC Hospital - Doctor's Dashboard</h1>
            </header>
            <main>
                <section className="patient-search">
                    <h2>Enter Patient name</h2>
                    <form onSubmit={handlePatientSearch}>
                        <div className="form-group">
                            <input
                                type="number"
                                value={patientId}
                                onChange={(e) => setPatientId(e.target.value)}
                                placeholder="Enter patient ID"
                                required
                            />
                            <button type="submit">Search</button>
                        </div>
                    </form>
                </section>
                {(patientInfo != {}) && (
                    <>
                        <section className="patient-info">
                            <h2>Patient Information</h2>
                            <p><strong>Name:</strong> {patientInfo.patient_name.toString()}</p>
                            <p><strong>Age:</strong> {patientInfo.patient_dob.toString()}</p>
                            <p><strong>Gender:</strong> {patientInfo.patient_sex.toString()}</p>
                            <p><strong>Last Visit:</strong> {Date(patientInfo.patient_date_registration).toString()}</p>
                        </section>
                        <section className="observation-prescription">
                            <h2>Observation and Prescription</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="observation">Observation:</label>
                                    <textarea
                                        id="observation"
                                        value={observation}
                                        onChange={(e) => setObservation(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="prescription">Prescription:</label>
                                    <textarea
                                        id="prescription"
                                        value={prescription.toString()}
                                        onChange={(e) => setPrescription(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit">Save</button>
                            </form>
                        </section>
                        <section className="patient-history">
                            <h2>Patient History</h2>
                            {patientHistory.map((entry, index) => (
                                <div key={index} className="history-entry">
                                    <h3>{entry.date}</h3>
                                    <p><strong>Observation:</strong> {entry.observation.toString()}</p>
                                    <p><strong>Prescription:</strong> {entry.prescription.toString()}</p>
                                </div>
                            ))}
                        </section>
                    </>
                )}
            </main>
        </div>
    );
};

export default DoctorDashboard;