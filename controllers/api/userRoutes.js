//In all routes import whatever modal you are trying to affect
const express = require('express');
const router = express.Router();
const { User } = require('../../models');
// const withAuth = require('../utils/auth');
//This page handles user sign up, login and logout.
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
    
  } catch(err) {
    console.log("NOTICE ME SENPAI", err);
    res.status(500).json(err);
  }
});
// Sign up
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).json(dbUserData);

    // req.session.save(() => {
    //   req.session.loggedIn = true;

  } catch (err) {
    console.log("NOTICE ME SENPAI", err);
    res.status(500).json(err);

  }
});

//Add on to userRoute /login
//Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;