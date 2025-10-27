import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

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
  const customersResults = await query('INSERT INTO customers (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING id;', [firstName, lastName, email]);
  const passwordsResults = await query('INSERT INTO passwords (password, customer_id) VALUES ($1, $2);', [password, customersResults.rows[0].id]);
}

const getUserByEmail = async (email) => {
  try {
    const customersResults = await query('SELECT * FROM customers WHERE email = $1;', [email]);
    const passwordsResults = await query('SELECT password FROM passwords where customer_id = $1', [customersResults.rows[0].id]);

    const user = {
      ...customersResults.rows[0],
      ...passwordsResults.rows[0]
    }

    return user;
  } catch (error) {
    return null;
  }
};

const getUserById = async (id) => {
  try {
    const customersResults = await query('SELECT * FROM customers WHERE email = $1;', [email]);
    const passwordsResults = await query('SELECT password FROM passwords where customer_id = $1', [customersResults.rows[0].id]); 
    
    const user = {
      ...customersResults.rows[0],
      ...passwordsResults.rows[0]
    }

    return user;
  } catch (error) {
    return null;
  }
}

export { query, checkUserExists, createUser, getUserByEmail, getUserById }