const express = require('express');
const router = express.Router();
//Renders landing page when they go to home page.
router.get('/', async (req, res) => {
    try {

      res.render('landing-page');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  // router.get('/login', (req, res) => {
  //   if (req.session.loggedIn) {
  //     res.redirect('/');
  //     return;
  //   }
  
  //   res.render('login');
  // });

  router.get('/login', (req, res) => {
    res.render('login')
  })

module.exports = router;