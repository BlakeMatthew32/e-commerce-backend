import express from "express";

import registerRouter from './register.js';

const usersRouter = express.Router();

usersRouter.use('/register', registerRouter);

export default usersRouter;
