const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.vercel.app' 
  : 'http://localhost:4000';

async function testRootRoute() {
  console.log('🧪 Testing Root Route (/)...\n');
  
  try {
    const response = await fetch(`${BASE_URL}/`);
    const data = await response.json();
    
    console.log('✅ Root Route Test Results:');
    console.log(`Status: ${response.status}`);
    console.log(`Success: ${data.success}`);
    console.log(`Message: ${data.message}`);
    console.log(`Version: ${data.version}`);
    console.log(`Environment: ${data.environment}`);
    console.log(`Timestamp: ${data.timestamp}\n`);
    
    if (response.status === 200 && data.success) {
      console.log('🎉 Root route is working perfectly!');
      return true;
    } else {
      console.log('❌ Root route test failed');
      return false;
    }
  } catch (error) {
    console.error('❌ Root Route Test Failed:');
    console.error(`Error: ${error.message}`);
    return false;
  }
}

async function testHealthRoute() {
  console.log('🧪 Testing Health Route (/health)...\n');
  
  try {
    const response = await fetch(`${BASE_URL}/health`);
    const data = await response.json();
    
    console.log('✅ Health Route Test Results:');
    console.log(`Status: ${response.status}`);
    console.log(`Success: ${data.success}`);
    console.log(`Message: ${data.message}`);
    console.log(`Uptime: ${data.uptime} seconds`);
    console.log(`Timestamp: ${data.timestamp}\n`);
    
    if (response.status === 200 && data.success) {
      console.log('🎉 Health route is working perfectly!');
      return true;
    } else {
      console.log('❌ Health route test failed');
      return false;
    }
  } catch (error) {
    console.error('❌ Health Route Test Failed:');
    console.error(`Error: ${error.message}`);
    return false;
  }
}

async function runAllRouteTests() {
  console.log('🚀 Starting Route Tests...\n');
  
  const rootTest = await testRootRoute();
  const healthTest = await testHealthRoute();
  
  console.log('\n📊 Test Summary:');
  console.log(`Root Route (/): ${rootTest ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Health Route (/health): ${healthTest ? '✅ PASS' : '❌ FAIL'}`);
  
  if (rootTest && healthTest) {
    console.log('\n🎉 All route tests passed! Your API is ready for deployment.');
  } else {
    console.log('\n❌ Some tests failed. Please check the errors above.');
  }
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllRouteTests();
}

export { testRootRoute, testHealthRoute, runAllRouteTests };