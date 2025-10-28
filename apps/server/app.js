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

app.use('/users', usersRouter);


app.listen(PORT, (error) => {
  if(!error) {
    console.log('Server is running. Port: ' + PORT);
  } else {
    console.log('Error occured, server can\'t be started.', error);
  }
});