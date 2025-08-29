// API Configuration
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const API_ENDPOINTS = {
  // User endpoints
  PATIENT_ME: `${API_BASE_URL}/api/v1/user/patient/me`,
  PATIENT_LOGIN: `${API_BASE_URL}/api/v1/user/login`,
  PATIENT_LOGOUT: `${API_BASE_URL}/api/v1/user/patient/logout`,
  PATIENT_REGISTER: `${API_BASE_URL}/api/v1/user/patient/register`,
  DOCTORS: `${API_BASE_URL}/api/v1/user/doctors`,
  
  // Appointment endpoints
  APPOINTMENT_POST: `${API_BASE_URL}/api/v1/appointment/post`,
  PATIENT_APPOINTMENTS: `${API_BASE_URL}/api/v1/appointment/patient/my-appointments`,
  
  // Message endpoints
  MESSAGE_SEND: `${API_BASE_URL}/api/v1/message/send`,
};

export default API_BASE_URL;