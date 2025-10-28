import express from "express";
import passport from "passport";

import registerRouter from './register.js';

const usersRouter = express.Router();

usersRouter.use('/register', registerRouter);

usersRouter.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    
    if (!user) {
      // Login failed
      return res.status(401).json({
        login: false,
        message: info.message || 'Login failed'
      });
    }

    // Login successful - establish session
    req.logIn(user, (err) => {
      if (err) return next(err);
      
      return res.json({
        login: true,
        message: 'Successfully logged in',
        user: {
          userId: user.id,
          name: user.first_name + ' ' + user.last_name,
          email: user.email
        }
      });
    });
  })(req, res, next);
});

usersRouter.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.json({
        message: 'Successfully Logged Out!',
      })
    })
  });
});

//route to check login functionality

usersRouter.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user.first_name });
  } else {
    res.status(401).json({ user: null, message: "Not logged in" });
  }
});

export default usersRouter;
