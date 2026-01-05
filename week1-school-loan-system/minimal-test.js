const http = require('http');

console.log('Testing API endpoints...');

// Test health endpoint
const testEndpoint = (path, method = 'GET', data = null) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
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

    req.on('error', (err) => {
      reject(err);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
};

// Run tests
async function runTests() {
  try {
    console.log('1. Testing health endpoint...');
    const health = await testEndpoint('/health');
    console.log('Health:', health.status, health.data.message);

    console.log('2. Testing root endpoint...');
    const root = await testEndpoint('/');
    console.log('Root:', root.status, typeof root.data === 'string' ? root.data.trim() : root.data);

    console.log('3. Testing user routes...');
    const users = await testEndpoint('/api/v1/users');
    console.log('Users GET:', users.status, users.data.error?.message || 'Success');

    console.log('4. Testing user creation...');
    const newUser = await testEndpoint('/api/v1/users', 'POST', {
      name: 'Test User',
      email: 'test@example.com'
    });
    console.log('User POST:', newUser.status, newUser.data);

  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

runTests();