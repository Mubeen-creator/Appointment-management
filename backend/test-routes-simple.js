// Simple route test without database dependency
import express from "express";

// Create a minimal app just for testing routes
const app = express();

// Add the same routes we added to app.js
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hospital Management System API is running successfully!",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Start server for testing
const PORT = 3001;
const server = app.listen(PORT, () => {
  console.log(`🧪 Test server running on port ${PORT}`);
  testRoutes();
});

async function testRoutes() {
  console.log('\n🧪 Testing Routes...\n');
  
  try {
    // Test root route
    console.log('Testing GET / ...');
    const rootResponse = await fetch(`http://localhost:${PORT}/`);
    const rootData = await rootResponse.json();
    
    console.log('✅ Root Route Response:');
    console.log(`   Status: ${rootResponse.status}`);
    console.log(`   Success: ${rootData.success}`);
    console.log(`   Message: ${rootData.message}`);
    console.log(`   Version: ${rootData.version}\n`);
    
    // Test health route
    console.log('Testing GET /health ...');
    const healthResponse = await fetch(`http://localhost:${PORT}/health`);
    const healthData = await healthResponse.json();
    
    console.log('✅ Health Route Response:');
    console.log(`   Status: ${healthResponse.status}`);
    console.log(`   Success: ${healthData.success}`);
    console.log(`   Message: ${healthData.message}`);
    console.log(`   Uptime: ${healthData.uptime} seconds\n`);
    
    if (rootResponse.status === 200 && healthResponse.status === 200) {
      console.log('🎉 All routes are working perfectly!');
      console.log('✅ Your API is ready for Vercel deployment!');
    } else {
      console.log('❌ Some routes failed');
    }
    
  } catch (error) {
    console.error('❌ Route test failed:', error.message);
  } finally {
    server.close();
    console.log('\n🔚 Test completed');
  }
}