const { Client } = require('pg');
async function run() {
  const client = new Client({ connectionString: 'postgresql://postgres:1234@localhost:5432/fraudguard' });
  await client.connect();

  console.log('Registering user@gmail.com...');
  const userRes = await fetch('http://localhost:8080/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName: 'Normal', lastName: 'User', email: 'user@gmail.com', password: 'Test123' })
  });
  console.log(await userRes.text());

  console.log('Registering admin@gmail.com...');
  const adminRes = await fetch('http://localhost:8080/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName: 'Super', lastName: 'Admin', email: 'admin@gmail.com', password: 'Admin123' })
  });
  console.log(await adminRes.text());

  console.log('Updating role to ADMIN...');
  await client.query("UPDATE users SET role = 'ADMIN' WHERE email = 'admin@gmail.com';");
  await client.end();
  console.log('Done!');
}
run().catch(console.error);
