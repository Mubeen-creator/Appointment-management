// Manual Admin Creation Script
import axios from 'axios';

const createAdmin = async () => {
  try {
    console.log("🔧 Creating admin user manually...");
    
    const adminData = {
      firstName: "Hospital",
      lastName: "Admin", 
      email: "admin@hospital.com",
      phone: "1234567890",
      nic: "1234567890123",
      dob: "1990-01-01",
      gender: "Male",
      password: "admin123"
    };
    
    const response = await axios.post(
      'http://localhost:5000/api/v1/user/admin/addnew',
      adminData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log("✅ Admin user created successfully!");
    console.log("📋 Dashboard Login Credentials:");
    console.log("📧 Email: admin@hospital.com");
    console.log("🔑 Password: admin123");
    console.log("👤 Role: Admin");
    
  } catch (error) {
    if (error.response) {
      console.error("❌ Error:", error.response.data.message);
    } else {
      console.error("❌ Error:", error.message);
    }
  }
};

createAdmin();