import React, { useState } from 'react';
import "../styles/master.css";
import "../styles/receptionist.css";
import { ReactDialogBox } from 'react-js-dialog-box';
import 'react-js-dialog-box/dist/index.css';
import db from "../firebase_config.jsx";
import { collection, doc, setDoc, getDocs, deleteDoc, getCountFromServer } from 'firebase/firestore';

const ReceptionistPage = () => {
  // const fireSQL = new FireSQL(db);
  var docRef = collection(db, "patients");

  const [patients, setPatients] = useState([]);
  const [currentPatient, setCurrentPatient] = useState({ id: 0, name: '', dob: '', gender: '', contact: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogBox, setDialogBox] = useState(false);

  const getPatientsFromDb = async () => {
    var patients = [];
    try {
      const docs = await getDocs(docRef);
      docs.forEach(function (doc) {
        patients = [...patients, {
          id: doc.id,
          name: doc.data().patient_name,
          dob: doc.data().patient_dob,
          gender: doc.data().patient_sex,
          contact: '0000'
        }];
      });
      setPatients(patients);
    } catch (e) {
      console.log("Firestore error");
    }
  }

  const modifyPatientInDb = async () => {
    var docid = currentPatient.id;
    if (!isEditing) {
      docid = (await getCountFromServer(docRef)).data().count + 1;
    }
    await setDoc(doc(db, "patients", "" + docid), {
      patient_date_registration: Date.now(),
      patient_name: currentPatient.name,
      patient_dob: currentPatient.dob,
      patient_sex: currentPatient.gender[0].toLowerCase()
    });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPatient(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await modifyPatientInDb();
    setCurrentPatient({ id: 0, name: '', dob: '', gender: '', contact: '' });
    setIsEditing(false);
    setDialogBox(false);
    getPatientsFromDb();
  };

  const handleEdit = (patient) => {
    setCurrentPatient(patient);
    setDialogBox(true);
    setIsEditing(true);
  };

  const handleDialogBox = () => {
    setDialogBox(!isDialogBox);
    getPatientsFromDb();
  };

  const handleDelete = async (id) => {
    if (window.confirm("You are about to delete a patient's record from the database. This can't be undone.") == true) {
      deleteDoc(doc(db, "patients", "" + id));
    } else {}
  };

  getPatientsFromDb();

  const getAge = (dob) => {
    
  }

  return (
    <div className="receptionist-page">
      <header className="receptionist-header">
        <h1>ABC Hospital — Receptionist Dashboard</h1>
      </header>
      <button className="add-patient-button" onClick={handleDialogBox}>
        +
      </button>
      <main>
        {isDialogBox &&
          <ReactDialogBox
            closeBox={handleDialogBox}
            modalWidth='50%'
            headerHeight='0'
            bodyBackgroundColor=''
            bodyTextColor='black'
            bodyHeight='65vh'
            headerText=''>
            <section className="patient-form">
              <h2>{isEditing ? 'Edit Patient' : 'Add New Patient'}</h2>
              <button className="close-dialog-button" onClick={handleDialogBox}>Close</button>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={currentPatient.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="age">DoB:</label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={currentPatient.dob}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Gender:</label>
                  <select
                    id="gender"
                    name="gender"
                    value={currentPatient.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="contact">Contact:</label>
                  <input
                    type="tel"
                    id="contact"
                    name="contact"
                    value={currentPatient.contact}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit">{isEditing ? 'Update Patient' : 'Add Patient'}</button>
              </form>
            </section>
          </ReactDialogBox>}
        <section className="patient-list">
          <h2>Patient List</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map(patient => (
                <tr key={patient.id}>
                  <td>{patient.name}</td>
                  <td>{getAge(patient.dob)}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.contact}</td>
                  <td>
                    <button onClick={() => handleEdit(patient)}>Edit</button>
                    <button onClick={() => handleDelete(patient.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default ReceptionistPage;
