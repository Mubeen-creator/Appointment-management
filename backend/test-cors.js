// Test CORS Configuration
import axios from 'axios';

const testCORS = async () => {
  console.log('🌐 Testing CORS Configuration...');
  console.log('─'.repeat(50));

  const frontendUrls = [
    'https://zeecare-roan.vercel.app',
    'https://zeecareadmindashboaer.vercel.app',
    'http://localhost:5173',
    'http://localhost:5174'
  ];

  const testUrl = 'http://localhost:5000/api/v1/user/doctors';

  for (const origin of frontendUrls) {
    try {
      console.log(`\n🔍 Testing CORS for: ${origin}`);
      
      // Test preflight request
      const preflightResponse = await axios.options(testUrl, {
        headers: {
          'Origin': origin,
          'Access-Control-Request-Method': 'GET',
          'Access-Control-Request-Headers': 'Content-Type'
        },
        timeout: 5000,
        validateStatus: () => true
      });

      if (preflightResponse.status === 200 || preflightResponse.status === 204) {
        const allowOrigin = preflightResponse.headers['access-control-allow-origin'];
        const allowCredentials = preflightResponse.headers['access-control-allow-credentials'];
        
        if (allowOrigin === origin || allowOrigin === '*') {
          console.log(`✅ CORS allowed for ${origin}`);
          console.log(`   Allow-Origin: ${allowOrigin}`);
          console.log(`   Allow-Credentials: ${allowCredentials}`);
        } else {
          console.log(`❌ CORS blocked for ${origin}`);
          console.log(`   Expected: ${origin}`);
          console.log(`   Got: ${allowOrigin}`);
        }
      } else {
        console.log(`⚠️  Preflight failed for ${origin} (${preflightResponse.status})`);
      }

    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        console.log(`❌ Server not running - start with 'npm run test-production'`);
        break;
      } else {
        console.log(`❌ Error testing ${origin}: ${error.message}`);
      }
    }
  }

  console.log('\n🏁 CORS testing completed!');
  console.log('\n💡 Tips:');
  console.log('   - Make sure your server is running (npm run test-production)');
  console.log('   - Check FRONTEND_URL_ONE and FRONTEND_URL_TWO in .env.production');
  console.log('   - Verify CORS middleware configuration in app.js');
};

testCORS().catch(console.error);