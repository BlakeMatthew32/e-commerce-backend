import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config({debug: true});

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

const query = (text, params) => {
  return pool.query(text, params);
};

const checkUserExists = async (userEmail) => {
  const results = await query('SELECT * FROM customers WHERE email = $1', [userEmail]);
  return (results.rows[0] ? true : false);
};

const createUser = async (firstName, lastName, email, password) => {
  const results = await query('INSERT INTO customers (first_name, last_name, email) VALUES ($1, $2, $3);', [firstName, lastName, email]);
}

export { query, checkUserExists, createUser }