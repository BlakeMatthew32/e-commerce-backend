import express from 'express';
import bcrypt from 'bcrypt';

import * as db from '../db/index.js';

const saltRounds = 10;

const registerRouter = express.Router();

registerRouter.post('/', async (req, res, next) => {
  const { firstName, lastName, email, password, passwordConfirm } = req.body;

  const userExists = await db.checkUserExists(email);

  if (userExists) {
    res.send(`This user already exists.`);
    return;
  };

  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        throw new Error(err);
      }
      console.log(hash);
      db.createUser(firstName, lastName, email, hash);
    });
  });


  res.send(`User Exists: ${userExists}`);
});

export default registerRouter;