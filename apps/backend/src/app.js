
import * as db from './db/index.js';

import express from 'express';

const app = express();
const PORT = 3000;

app.get('/products', async (req, res, next) => {
  const result = await db.query('SELECT * FROM products LIMIT 10;');
  res.send(result.rows);
})

app.listen(PORT, (error) => {
  if(!error) {
    console.log('Server is running. Port: ' + PORT);
  } else {
    console.log('Error occured, server can\'t be started.', error);
  }
});