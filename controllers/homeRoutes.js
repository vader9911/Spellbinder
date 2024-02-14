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



module.exports = router;