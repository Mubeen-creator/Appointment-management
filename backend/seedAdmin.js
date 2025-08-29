// Seed Default Admin User for Dashboard Access
import { config } from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import { User } from "./models/userSchema.js";

// Load environment variables
config({ path: "./.env" });

const seedAdmin = async () => {
  try {
    console.log("🌱 Starting admin user seeding...");
    
    // Connect to database
    await dbConnection();
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ 
      email: "admin@hospital.com",
      role: "Admin" 
    });
    
    if (existingAdmin) {
      console.log("✅ Admin user already exists!");
      console.log("📧 Email: admin@hospital.com");
      console.log("🔑 Password: admin123");
      console.log("👤 Role: Admin");
      process.exit(0);
    }
    
    // Create default admin user
    const adminUser = await User.create({
      firstName: "Hospital",
      lastName: "Admin",
      email: "admin@hospital.com",
      phone: "12345678901", // 11 digits as required
      nic: "1234567890123",
      dob: "1990-01-01",
      gender: "Male",
      password: "admin123",
      role: "Admin"
    });
    
    console.log("🎉 Default admin user created successfully!");
    console.log("─".repeat(50));
    console.log("📋 Dashboard Login Credentials:");
    console.log("📧 Email: admin@hospital.com");
    console.log("🔑 Password: admin123");
    console.log("👤 Role: Admin");
    console.log("─".repeat(50));
    console.log("⚠️  Please change the password after first login!");
    
    process.exit(0);
    
  } catch (error) {
    console.error("❌ Error seeding admin user:", error.message);
    process.exit(1);
  }
};

// Also create a function to list all existing users
const listUsers = async () => {
  try {
    console.log("👥 Fetching all users...");
    
    await dbConnection();
    
    const users = await User.find({}).select('firstName lastName email role');
    
    if (users.length === 0) {
      console.log("📭 No users found in database");
      return;
    }
    
    console.log(`👥 Found ${users.length} users:`);
    console.log("─".repeat(60));
    
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.firstName} ${user.lastName}`);
      console.log(`   📧 Email: ${user.email}`);
      console.log(`   👤 Role: ${user.role}`);
      console.log("─".repeat(60));
    });
    
    process.exit(0);
    
  } catch (error) {
    console.error("❌ Error fetching users:", error.message);
    process.exit(1);
  }
};

// Check command line arguments
const command = process.argv[2];

if (command === 'list') {
  listUsers();
} else {
  seedAdmin();
}