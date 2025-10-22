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
}

export { query }