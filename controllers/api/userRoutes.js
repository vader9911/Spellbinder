// //Logout
// router.post('/logout', (req, res) => {
// if (req.session.logged_in) {
//   // Remove the session variables
//   req.session.destroy(() => {
//     res.status(204).end();
//   });
// } else {
//   res.status(404).end();
// }
// });

// // Login route
// router.get('/login', (req, res) => {
// if (req.session.loggedIn) {
//   res.redirect('/');
//   return;
// }
// res.render('login');
// });
const express = require('express');
const router = express.Router();
// const withAuth = require('../utils/auth');
//This page handles user sign up, login and logout.
// Sign up
// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
      
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);

  }
});


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