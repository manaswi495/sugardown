const { Pool } = require('pg');
const pool = new Pool({ connectionString: 'postgresql://postgres@127.0.0.1:5432/postgres?schema=public' });
pool.query('SELECT 1', (err, res) => {
  if (err) {
    console.error('Error connecting:', err);
  } else {
    console.log('Connected successfully!', res.rows);
  }
  pool.end();
});
