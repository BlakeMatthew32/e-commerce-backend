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

// user accout actions 

const getUserInfo = async (userId) => {
  const user = await getUserById(userId).rows[0];
  const userInfo = {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
  };

  return userInfo;
};

const getUserOrders = async (userId) => {
  const userOrders = await query('SELECT * FROM orders WHERE customer_id = $1;', [userId]).rows;
  return userOrders;
}

const getUserAddressInfomation = async (userId) => {
  const userAddressInfo = await query(
    `SELECT * FROM addresses
     JOIN addresses_customers
     ON addresses.id = addresses_customers.addresses_id 
     WHERE addresses_customers.customer_id = $1;`,
     [userId]
  ).rows;
  console.log(userAddressInfo)
}

const addUserAddress = async (addressInfo, userId) => {
  const {nameNumber, street, city, county, country, postalCode} = addressInfo;
  const results = await query(`
    INSERT INTO addresses (name_number, street, city, county, country, postal_code)
    VALUES (
      $1,
      $2,
      $3,
      $4,
      $5
    )
      RETURNING *;
    `, [nameNumber, street, city, county, country, postalCode]);
    await query(`
      INSERT INTO addresses_customers (address_id, customer_id)
      VALUES (
        $1,
        $2
      );`,
      [results.rows[0].id, userId]
    );

    

}

export { 
  getAllProducts,
  getProductsByCategory, 
  getProductById, 
  checkUserExists, 
  createUser, 
  getUserByEmail, 
  getUserById,
  getUserInfo,
  getUserOrders,
  getUserAddressInfomation,
  addUserAddress,
};