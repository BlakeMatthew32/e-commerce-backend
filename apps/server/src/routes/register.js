import express from 'express';

import * as db from '../db/index.js';

const registerRouter = express.Router();

registerRouter.post('/', async (req, res, next) => {
  const { firstName, lastName, email, password, passwordConfirm } = req.body;

  const userExists = await db.checkUserExists(email);

  if (userExists) {
    res.send(`This user already exists.`);
    return;
  };

  db.createUser(firstName, lastName, email, password);

  res.send(`User Exists: ${userExists}`);
});

export default registerRouter;