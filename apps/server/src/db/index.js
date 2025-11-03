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

// Products database actions

const getAllProducts = async () => {
  const results = await query('SELECT * FROM products;');
  return results.rows
}

const getProductsByCategory = async (category) => {
  const results = await query('SELECT * FROM products WHERE category ILIKE $1', [category]);
  return results.rows;
}

const getProductById = async (id) => {
  const results = await query('SELECT * FROM products WHERE id = $1', [id]);
  return results.rows[0];
}


// Rgistration and login database actions

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
    const results = await query('SELECT * FROM customers JOIN passwords ON customers.id = passwords.customer_id WHERE customers.email = $1;', [email]);

    const user = results.rows[0];

    return user;
  } catch (error) {
    return null;
  }
};

const getUserById = async (id) => {
  try {
    const results = await query(
      `SELECT * FROM customers
       JOIN passwords ON customers.id = passwords.customer_id 
       WHERE customers.id = $1;`, 
       [id]
    );
    
    const user = results.rows[0];

    return user;
  } catch (error) {
    return null;
  }
};

// delete user needs to be implemented removing everthing for that user from all tables
// if orders are outstanding for user this would need to be handled

// Error handling needs to be implemented for all user account opperations

const getUserOrders = async (userId) => {
  const userOrders = await query('SELECT * FROM orders WHERE customer_id = $1;', [userId]).rows;
  return userOrders;
};

// get specific order and products from order

// request order cancalation 

const getUserAddresses = async (userId) => {
  const userAddressInfo = await query(
    `SELECT * FROM addresses
     WHERE addresses.customer_id = $1;`,
     [userId]
  );
  return userAddressInfo.rows;
};

const addUserAddress = async (newAddress, userId) => {
  const {nameNumber, street, city, county, country, postalCode} = newAddress;
  const results = await query(`
    INSERT INTO addresses (name_number, street, city, county, country, postal_code, customer_id)
    VALUES (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6,
      $7
    )
      RETURNING *;
    `, [nameNumber, street, city, county, country, postalCode, userId]);
};

// maybe the address table should be a one to many relationship, one customer to many addresses? 
// could mean that the same address can appear in the table, but means that each user wuld have there own
// addresses, makes it easier to delete them for a given user

const removeAddress = async (addressId, userId) => {
  // remove the address for the current user only,
  //if that address is also used for other users do not remove it for them
  const results = await query(`
    DELETE FROM addresses
    WHERE id = $1 AND customer_id = $2;
  `, [addressId, userId]);
  console.log(results);
};

export { 
  getAllProducts,
  getProductsByCategory, 
  getProductById, 
  checkUserExists, 
  createUser, 
  getUserByEmail, 
  getUserById,
  getUserOrders,
  getUserAddresses,
  addUserAddress,
  removeAddress,
};