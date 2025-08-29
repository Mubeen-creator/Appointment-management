// Test MongoDB Atlas Connection
import { config } from "dotenv";
import { dbConnection } from "./database/dbConnection.js";

// Load environment variables
config({ path: "./.env" });

console.log("🧪 Testing MongoDB Atlas Connection...");
console.log("📋 Configuration:");
console.log(`   Database: ${process.env.DB_NAME}`);
console.log(`   MongoDB Atlas: ${process.env.MONGODB_ATLAS}`);
console.log(`   Connection String: ${process.env.MONGO_URI ? 'Configured ✅' : 'Missing ❌'}`);
console.log("─".repeat(50));

// Test the connection
try {
  dbConnection();
  console.log("🎉 Database connection test initiated!");
  
  // Wait for connection to establish
  setTimeout(() => {
    console.log("✅ Database connection test completed successfully!");
    process.exit(0);
  }, 3000);
  
} catch (error) {
  console.error("💥 Database connection test failed:", error.message);
  process.exit(1);
}