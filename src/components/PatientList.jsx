import { useEffect, useState } from "react";
import axios from "axios";

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/patients", {
          headers: { Authorization: token },
        });
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div>
      <h1>Patient Information</h1>
      {patients.length === 0 ? (
        <div style={styles.loginMessage}>
          <p>
            You are not logged in. Please login{" "}
            <a href="/login" style={styles.loginLink}>
              Login
            </a>
          </p>
        </div>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Diagnosis</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient._id}>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
                <td>{patient.diagnosis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Inline CSS styles for the medical theme
const styles = {
  loginMessage: {
    padding: "20px",
    margin: "20px auto",
    backgroundColor: "#f8d7da", // Light red background for warning
    color: "#721c24", // Dark red text
    border: "1px solid #f5c6cb", // Light red border
    borderRadius: "5px", // Rounded corners
    fontFamily: "Arial, sans-serif", // Clean font for the medical theme
    maxWidth: "500px", // Limit the width for a nice appearance
    textAlign: "center",
  },
  loginLink: {
    color: "#155724", // Green color for the login link
    fontWeight: "bold",
    textDecoration: "none", // Remove underline
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    margin: "20px 0",
    fontFamily: "Arial, sans-serif", // Clean font for medical theme
  },
  th: {
    backgroundColor: "#f4f4f4",
    padding: "8px",
    textAlign: "left",
    border: "1px solid #ddd",
  },
  td: {
    padding: "8px",
    textAlign: "left",
    border: "1px solid #ddd",
  },
};

export default PatientList;
