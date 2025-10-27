import express from "express";
import passport from "passport";

import registerRouter from './register.js';

const usersRouter = express.Router();

usersRouter.use('/register', registerRouter);

usersRouter.post('/login', passport.authenticate('local', {
  failureRedirect: '/login_failed',
  successRedirect: '/login_success'
}));

usersRouter.delete('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
  });
  res.redirect('/logout_success');
})

export default usersRouter;
