import express from 'express';
import bcrypt from 'bcrypt';

import * as db from '../db/index.js';

const saltRounds = 10;

const registerRouter = express.Router();

registerRouter.post('/', async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const userExists = await db.checkUserExists(email);

  if (userExists) {
    res.send(`This user already exists.`);
    return;
  };

  bcrypt.genSalt(saltRounds, (error, salt) => {
    try {
      bcrypt.hash(password, salt, (error, hash) => {
        if (error) {
          throw new Error(error);
        }
        db.createUser(firstName, lastName, email, hash);
      });
    } catch (error) {
      console.log(error);
    }
    
  });


  res.send(`User Exists: ${userExists}`);
});

export default registerRouter;