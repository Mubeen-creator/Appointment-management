// Test API Endpoints Script
// Run this after starting the production test server

import axios from 'axios';

const API_BASE = 'http://localhost:5000';

const testEndpoints = async () => {
  console.log('🧪 Testing API Endpoints...');
  console.log('─'.repeat(50));

  const tests = [
    {
      name: 'Get Doctors',
      method: 'GET',
      url: `${API_BASE}/api/v1/user/doctors`,
      requiresAuth: false
    },
    {
      name: 'Health Check',
      method: 'GET', 
      url: `${API_BASE}/api/v1/user/doctors`,
      requiresAuth: false
    },
    {
      name: 'Send Message',
      method: 'POST',
      url: `${API_BASE}/api/v1/message/send`,
      requiresAuth: false,
      data: {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '12345678901',
        message: 'Test message from API test'
      }
    }
  ];

  for (const test of tests) {
    try {
      console.log(`\n🔍 Testing: ${test.name}`);
      
      let response;
      if (test.method === 'GET') {
        response = await axios.get(test.url, {
          timeout: 5000,
          validateStatus: () => true // Accept any status code
        });
      } else if (test.method === 'POST') {
        response = await axios.post(test.url, test.data, {
          timeout: 5000,
          validateStatus: () => true
        });
      }

      if (response.status >= 200 && response.status < 300) {
        console.log(`✅ ${test.name}: Success (${response.status})`);
        if (response.data) {
          console.log(`   Response: ${JSON.stringify(response.data).substring(0, 100)}...`);
        }
      } else if (response.status === 401 && test.requiresAuth) {
        console.log(`⚠️  ${test.name}: Authentication required (${response.status}) - This is expected`);
      } else {
        console.log(`❌ ${test.name}: Failed (${response.status})`);
        console.log(`   Error: ${response.data?.message || 'Unknown error'}`);
      }
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        console.log(`❌ ${test.name}: Server not running`);
      } else {
        console.log(`❌ ${test.name}: ${error.message}`);
      }
    }
  }

  console.log('\n🏁 API endpoint testing completed!');
};

// Run tests
testEndpoints().catch(console.error);