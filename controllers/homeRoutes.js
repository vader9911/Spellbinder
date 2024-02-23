const express = require('express');
const router = express.Router();
const withAuth = require('../utils/auth');
const { CollectionCard, Card } = require('../models');

// With auth prevents non logged in users from viewing the homepage
router.get('/',withAuth, async (req, res) => {
  try {

    // Send over the 'loggedIn' session variable to the 'homepage' template
    res.render('landing-page', {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  try {

    // Send over the 'loggedIn' session variable to the 'homepage' template
    res.render('login', {
      // galleries,
      // loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/signup', async (req, res) => {
  try {
    res.render('signup', {
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/collection/:view', withAuth, async (req, res) => {
  try {
      let cardsInCollection = await CollectionCard.findAll({
        include: Card,
        where: {
          id: req.session.user_id,
        }
      })
      res.render('collection', {
        loggedIn: req.session.loggedIn,
        view: req.params.view,
        cards: cardsInCollection
      });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

