import { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useContext(Context);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"}/api/v1/appointment/patient/my-appointments`,
          { withCredentials: true }
        );
        setAppointments(data.appointments);
        setLoading(false);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch appointments"
        );
        setLoading(false);
      }
    };

    if (isAuthenticated && user?.role === "Patient") {
      fetchAppointments();
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated || user?.role !== "Patient") {
    return <Navigate to="/login" />;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#ffa500"; // Orange
      case "Accepted":
        return "#28a745"; // Green
      case "Rejected":
        return "#dc3545"; // Red
      default:
        return "#6c757d"; // Gray
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div
        className="container"
        style={{ padding: "2rem", textAlign: "center", justifyContent:"center", marginTop:100 }}
      >
        <h2>Loading your appointments...</h2>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "2rem", marginTop: 100 }}>
      {appointments.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem" }}>
          <h3 style={{ color: "#666" }}>No appointments found</h3>
          <p style={{ color: "#888", marginTop: "1rem" }}>
            You have not booked any appointments yet.
          </p>
          <a
            href="/appointment"
            style={{
              display: "inline-block",
              marginTop: "1rem",
              padding: "0.75rem 1.5rem",
              backgroundColor: "#007bff",
              color: "white",
              textDecoration: "none",
              borderRadius: "5px",
              transition: "background-color 0.3s",
            }}
          >
            Book New Appointment
          </a>
        </div>
      ) : (
        <div className="appointments-grid">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="appointment-card"
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "1.5rem",
                marginBottom: "1rem",
                backgroundColor: "#fff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "1rem",
                }}
              >
                <h3 style={{ color: "#333", margin: 0 }}>
                  Appointment #{appointment._id.slice(-6).toUpperCase()}
                </h3>
                <span
                  style={{
                    padding: "0.25rem 0.75rem",
                    borderRadius: "20px",
                    fontSize: "0.875rem",
                    fontWeight: "bold",
                    color: "white",
                    backgroundColor: getStatusColor(appointment.status),
                  }}
                >
                  {appointment.status}
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
                <div>
                  <p style={{ margin: "0.5rem 0", color: "#555" }}>
                    <strong>Date:</strong>{" "}
                    {formatDate(appointment.appointment_date)}
                  </p>
                  <p style={{ margin: "0.5rem 0", color: "#555" }}>
                    <strong>Department:</strong> {appointment.department}
                  </p>
                  <p style={{ margin: "0.5rem 0", color: "#555" }}>
                    <strong>Doctor:</strong> Dr. {appointment.doctor.firstName}{" "}
                    {appointment.doctor.lastName}
                  </p>
                </div>
                <div>
                  <p style={{ margin: "0.5rem 0", color: "#555" }}>
                    <strong>Patient:</strong> {appointment.firstName}{" "}
                    {appointment.lastName}
                  </p>
                  <p style={{ margin: "0.5rem 0", color: "#555" }}>
                    <strong>Phone:</strong> {appointment.phone}
                  </p>
                  <p style={{ margin: "0.5rem 0", color: "#555" }}>
                    <strong>Has Visited:</strong>{" "}
                    {appointment.hasVisited ? "Yes" : "No"}
                  </p>
                </div>
              </div>

              <div
                style={{
                  marginTop: "1rem",
                  padding: "1rem",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "5px",
                }}
              >
                <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>
                  <strong>Address:</strong> {appointment.address}
                </p>
              </div>

              {appointment.status === "Pending" && (
                <div
                  style={{
                    marginTop: "1rem",
                    padding: "0.75rem",
                    backgroundColor: "#fff3cd",
                    borderRadius: "5px",
                    border: "1px solid #ffeaa7",
                  }}
                >
                  <p
                    style={{ margin: 0, color: "#856404", fontSize: "0.9rem" }}
                  >
                    ⏳ Your appointment is pending approval. You will be
                    notified once the admin reviews your request.
                  </p>
                </div>
              )}

              {appointment.status === "Accepted" && (
                <div
                  style={{
                    marginTop: "1rem",
                    padding: "0.75rem",
                    backgroundColor: "#d4edda",
                    borderRadius: "5px",
                    border: "1px solid #c3e6cb",
                  }}
                >
                  <p
                    style={{ margin: 0, color: "#155724", fontSize: "0.9rem" }}
                  >
                    ✅ Your appointment has been confirmed! Please arrive 15
                    minutes early.
                  </p>
                </div>
              )}

              {appointment.status === "Rejected" && (
                <div
                  style={{
                    marginTop: "1rem",
                    padding: "0.75rem",
                    backgroundColor: "#f8d7da",
                    borderRadius: "5px",
                    border: "1px solid #f5c6cb",
                  }}
                >
                  <p
                    style={{ margin: 0, color: "#721c24", fontSize: "0.9rem" }}
                  >
                    ❌ Unfortunately, your appointment request was not approved.
                    Please contact us for more information.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
