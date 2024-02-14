const express = require('express');
const router = express.Router();
const withAuth = require('../utils/auth');

// With auth prevents non logged in users from viewing the homepage
router.get('/', async (req, res) => {
  try {

    // Send over the 'loggedIn' session variable to the 'homepage' template
    res.render('landing-page', {
      // galleries,
      // loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
//The model stores data and its logic. 
  //What is getting stored, accessing those things, modifying thig s getting stored.
//view 
  //ui/ux
//controller
  //interface between the two