const { Pool } = require('pg');

const pool = new Pool({
  user: 'dielisdelen',
  host: 'localhost',
  database: 'mda',
  port: 5432,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};