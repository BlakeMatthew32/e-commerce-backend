
import * as db from './db/index.js';

import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/products', async (req, res, next) => {
  const result = await db.query('SELECT * FROM products LIMIT 10;');
  res.send(result.rows);
});

app.post('/users/register', async (req, res, next) => {
  const { firstName, lastName, email, password, passwordConfirm } = req.body;

  const userExists = await db.checkUserExists(email);

  if (userExists) {
    res.send(`This user already exists.`);
    return;
  };

  db.createUser(firstName, lastName, email, password);

  res.send(`User Exists: ${userExists}`);
});

app.listen(PORT, (error) => {
  if(!error) {
    console.log('Server is running. Port: ' + PORT);
  } else {
    console.log('Error occured, server can\'t be started.', error);
  }
});