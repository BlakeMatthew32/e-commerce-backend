import express from 'express';
import passport from 'passport';
import session from 'express-session';
import {initializePassport} from './src/passport-initalize.js';

import * as db from './src/db/index.js';

import usersRouter from './src/routes/users.js';

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

initializePassport(
  passport,
  db.getUserByEmail,
  db.getUserById
)

app.use(express.urlencoded({extended: false}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());

app.get('/products', async (req, res, next) => {
  const result = await db.query('SELECT * FROM products LIMIT 10;');
  res.send(result.rows);
});

app.get('/login_failed', (req, res) => {
  res.json({login: false})
});

app.get('/login_success', (req, res) => {
  console.log(req.user)
  res.json({login: true});
});

app.get('/logout_success', (req, res) => {
  console.log(req.user);
  res.json({login: false});
});

app.use('/users', usersRouter);


app.listen(PORT, (error) => {
  if(!error) {
    console.log('Server is running. Port: ' + PORT);
  } else {
    console.log('Error occured, server can\'t be started.', error);
  }
});