// Test the new serverless setup
import app from './index.js';

const PORT = 3003;

console.log('🧪 Testing New Serverless Setup...\n');

const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  testRoutes();
});

async function testRoutes() {
  try {
    // Test root route
    console.log('Testing GET / ...');
    const rootResponse = await fetch(`http://localhost:${PORT}/`);
    const rootData = await rootResponse.json();
    
    console.log('✅ Root Route Response:');
    console.log(`   Status: ${rootResponse.status}`);
    console.log(`   Message: ${rootData.message}`);
    console.log(`   Success: ${rootData.success}\n`);
    
    // Test welcome route
    console.log('Testing GET /welcome ...');
    const welcomeResponse = await fetch(`http://localhost:${PORT}/welcome`);
    const welcomeData = await welcomeResponse.json();
    
    console.log('✅ Welcome Route Response:');
    console.log(`   Status: ${welcomeResponse.status}`);
    console.log(`   Message: ${welcomeData.message}`);
    console.log(`   Features: ${welcomeData.features.join(', ')}\n`);
    
    // Test health route
    console.log('Testing GET /health ...');
    const healthResponse = await fetch(`http://localhost:${PORT}/health`);
    const healthData = await healthResponse.json();
    
    console.log('✅ Health Route Response:');
    console.log(`   Status: ${healthResponse.status}`);
    console.log(`   Message: ${healthData.message}\n`);
    
    if (rootResponse.status === 200 && welcomeResponse.status === 200 && healthResponse.status === 200) {
      console.log('🎉 All routes working perfectly!');
      console.log('✅ Ready for Vercel deployment!');
    } else {
      console.log('❌ Some routes failed');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    server.close();
    console.log('\n🔚 Test completed');
    process.exit(0);
  }
}