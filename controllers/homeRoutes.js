const express = require('express');
const router = express.Router();
const withAuth = require('../utils/auth');
const { CollectionCard, Collection, Card } = require('../models');

// With auth prevents non logged in users from viewing the homepage
router.get('/', async (req, res) => {
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
    // Find the user's collection and include associated cards
    const userCollection = await Collection.findOne({
      where: { user_id: req.session.user_id },
      include: { model: Card, through: CollectionCard }
    });

    // Log userCollection to inspect its structure
    console.log('User Collection:', JSON.stringify(userCollection, null, 2));

    // Extract img_uri from each card in the user's collection
    const cardImages = userCollection?.cards?.map(card => ({
      id: card.id,
      card_name: card.card_name,
      img_uri: card.img_uri
    })) || [];

    // Log the cards array to inspect its contents
    console.log('Card Images:', cardImages);

    // Render the collection view with card images
    res.render('collection', {
      loggedIn: req.session.loggedIn,
      view: req.params.view,
      cards: cardImages
    });
  } catch (err) {
    console.error('Error retrieving collection:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

