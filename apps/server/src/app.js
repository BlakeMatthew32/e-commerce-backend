import express from 'express';

import * as db from './db/index.js';

import usersRouter from './routes/users.js';

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(express.json());

app.get('/products', async (req, res, next) => {
  const result = await db.query('SELECT * FROM products LIMIT 10;');
  res.send(result.rows);
});

app.use('/users',  usersRouter);


app.listen(PORT, (error) => {
  if(!error) {
    console.log('Server is running. Port: ' + PORT);
  } else {
    console.log('Error occured, server can\'t be started.', error);
  }
});