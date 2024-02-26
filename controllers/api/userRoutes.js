const express = require('express');
const router = express.Router();
const { User , Collection} = require('../../models');
//This page handles user sign up, login and logout.
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
    
  } catch(err) {
    res.status(500).json(err);
  }
});
// Sign up
router.post('/signup', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      
    })
    ;
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      console.log(dbUserData.id)
      req.session.loggedIn = true;
      console.log(req.session.loggedIn)
      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });


  } catch (err) {
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

    // Create session variables based on the logged-in user
    req.session.save(async () => {
    req.session.user_id = dbUserData.id;
    req.session.loggedIn = true;

    // Check if the user has a collection
    const collection = await Collection.findOne({ where: { user_id: dbUserData.id } });
    if (!collection) {
      // If the user doesn't have a collection, create one
      await Collection.create({ user_id: dbUserData.id });
      console.log('Collection created for user:', dbUserData.id);
      } else {
        console.log('User already has a collection:', dbUserData.id);
      }

      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });

  } catch (err) {
    console.error('Error during login:', err);
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  // When the user logs out, destroy the session
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});



module.exports = router;