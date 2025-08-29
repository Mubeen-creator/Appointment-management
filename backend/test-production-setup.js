// Test Production Setup Locally
import { config } from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import app from "./app.js";

// Load production environment variables
config({ path: "./.env.production" });

console.log("🧪 Testing Production Setup Locally...");
console.log("─".repeat(50));

// Test environment variables
const requiredEnvVars = [
  'MONGO_URI',
  'JWT_SECRET_KEY',
  'FRONTEND_URL_ONE',
  'FRONTEND_URL_TWO',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET'
];

console.log("📋 Environment Variables Check:");
let allEnvVarsPresent = true;

requiredEnvVars.forEach(envVar => {
  const value = process.env[envVar];
  if (value) {
    console.log(`✅ ${envVar}: ${envVar.includes('SECRET') || envVar.includes('PASSWORD') ? '****' : value.substring(0, 20) + '...'}`);
  } else {
    console.log(`❌ ${envVar}: Missing`);
    allEnvVarsPresent = false;
  }
});

if (!allEnvVarsPresent) {
  console.log("\n❌ Some environment variables are missing!");
  process.exit(1);
}

console.log("\n🔗 CORS Configuration:");
console.log(`Frontend URL 1: ${process.env.FRONTEND_URL_ONE}`);
console.log(`Frontend URL 2: ${process.env.FRONTEND_URL_TWO}`);

// Test database connection
console.log("\n🗄️  Testing Database Connection...");
try {
  await dbConnection();
  console.log("✅ Database connection successful!");
} catch (error) {
  console.error("❌ Database connection failed:", error.message);
  process.exit(1);
}

// Start server on production port
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`\n🚀 Production test server running on port ${PORT}`);
  console.log(`📡 API Base URL: http://localhost:${PORT}`);
  console.log("\n🧪 Test Endpoints:");
  console.log(`   GET  http://localhost:${PORT}/api/v1/user/doctors`);
  console.log(`   POST http://localhost:${PORT}/api/v1/message/send`);
  console.log(`   POST http://localhost:${PORT}/api/v1/user/login`);
  console.log("\n⏹️  Press Ctrl+C to stop the server");
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down production test server...');
  server.close(() => {
    console.log('✅ Server closed successfully');
    process.exit(0);
  });
});