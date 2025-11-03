import express from "express";
import passport from "passport";

import registerRouter from './register.js';
import { addUserAddress, getUserAddresses, getUserOrders, removeAddress } from "../db/index.js";

const usersRouter = express.Router();

// middleware, maybe move to new file?

const checkAuth = (req, res, next) => {
  const isAuthenticated = req.isAuthenticated && req.isAuthenticated();

  if (!isAuthenticated) {
    return res.json({
      message: 'Must be signed in!'
    });
  } 

  next();
}

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

usersRouter.post('/logout', checkAuth, (req, res) => {
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

// user account information 

// in all user account routes authentication middleware needed to check user 
// is signed in to ensure user data is only accessible by the correct user.

usersRouter.get('/account', checkAuth, async (req, res, next) => {
  const userId = req.user.id;
  const userOrders = await getUserOrders(userId);
  const userAddresses = await getUserAddresses(userId);
  const userInfo = {
    orders: userOrders || [],
    addresses: userAddresses,
  };

  res.json(userInfo);
});

usersRouter.post('/account/address', checkAuth, async (req, res, next) => {
  const newAddress = req.body.address;
  // add checks to ensure the address data is correct
  await addUserAddress(newAddress, req.user.id);
  res.status(201).json({
    address: newAddress,
  });
});

usersRouter.delete('/account/address/:id', checkAuth, async (req, res, next) => {
  const addressId = req.params.id;
  // checks to see if address exists?
  const successful = await removeAddress(addressId, req.user.id);
  res.json({
    message: "Address deleted",
  });
});

//route to check login functionality

usersRouter.get("/me", checkAuth, (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ user: null, message: "Not logged in" });
  }
});


export default usersRouter;
