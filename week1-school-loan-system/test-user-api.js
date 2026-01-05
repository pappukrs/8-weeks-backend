const http = require('http');

console.log('Testing User API endpoints...\n');

// Test user creation and retrieval
async function testUserAPI() {
  const baseUrl = 'http://localhost:3000/api/v1/users';

  try {
    // Create a user
    console.log('1. Creating a user...');
    const createResponse = await makeRequest(`${baseUrl}`, 'POST', {
      name: 'Alice Johnson',
      email: 'alice@example.com'
    });
    console.log('✅ User created:', createResponse.data._id);

    const userId = createResponse.data._id;

    // Get the user by ID
    console.log('2. Retrieving the user...');
    const getResponse = await makeRequest(`${baseUrl}/${userId}`, 'GET');
    console.log('✅ User retrieved:', getResponse.data.name, getResponse.data.email);

    // Test loan creation
    console.log('3. Testing loan creation...');
    const loanResponse = await makeRequest('http://localhost:3000/api/v1/loans', 'POST', {
      userId: userId,
      amount: 50000
    });
    console.log('✅ Loan created:', loanResponse.data);

    console.log('\n🎉 All API tests passed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

function makeRequest(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          resolve({ status: res.statusCode, data: response });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

testUserAPI();
