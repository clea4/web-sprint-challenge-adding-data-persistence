// Quick API test script
const http = require('http');

const PORT = 9000;

function request(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: PORT,
      path: `/api${path}`,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve(body);
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function testAPI() {
  try {
    console.log('Testing API endpoints...\n');

    // Test POST /api/resources
    console.log('1. Testing POST /api/resources');
    const resource = await request('POST', '/resources', {
      resource_name: 'Test Resource',
      resource_description: 'A test resource'
    });
    console.log('✓ Resource created:', resource);

    // Test GET /api/resources
    console.log('\n2. Testing GET /api/resources');
    const resources = await request('GET', '/resources');
    console.log('✓ Resources retrieved:', resources);

    // Test POST /api/projects
    console.log('\n3. Testing POST /api/projects');
    const project = await request('POST', '/projects', {
      project_name: 'Test Project',
      project_description: 'A test project',
      project_completed: false
    });
    console.log('✓ Project created:', project);

    // Test GET /api/projects
    console.log('\n4. Testing GET /api/projects');
    const projects = await request('GET', '/projects');
    console.log('✓ Projects retrieved:', projects);

    // Test POST /api/tasks
    console.log('\n5. Testing POST /api/tasks');
    const task = await request('POST', '/tasks', {
      task_description: 'Test Task',
      task_notes: 'Some notes',
      task_completed: false,
      project_id: project.project_id
    });
    console.log('✓ Task created:', task);

    // Test GET /api/tasks
    console.log('\n6. Testing GET /api/tasks');
    const tasks = await request('GET', '/tasks');
    console.log('✓ Tasks retrieved:', tasks);

    console.log('\n✅ All tests passed!');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
  process.exit(0);
}

testAPI();
