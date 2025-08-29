// API Configuration
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const API_ENDPOINTS = {
  // User endpoints
  ADMIN_ME: `${API_BASE_URL}/api/v1/user/admin/me`,
  ADMIN_LOGIN: `${API_BASE_URL}/api/v1/user/login`,
  ADMIN_LOGOUT: `${API_BASE_URL}/api/v1/user/admin/logout`,
  ADMIN_ADD: `${API_BASE_URL}/api/v1/user/admin/addnew`,
  DOCTOR_ADD: `${API_BASE_URL}/api/v1/user/doctor/addnew`,
  DOCTORS: `${API_BASE_URL}/api/v1/user/doctors`,
  
  // Appointment endpoints
  APPOINTMENTS_ALL: `${API_BASE_URL}/api/v1/appointment/getall`,
  APPOINTMENT_UPDATE: `${API_BASE_URL}/api/v1/appointment/update`,
  
  // Message endpoints
  MESSAGES_ALL: `${API_BASE_URL}/api/v1/message/getall`,
};

export default API_BASE_URL;