const express = require('express');
const router = express.Router();
const { Collection } = require('../../models');
const withAuth = require('../../utils/auth');

// Creats a collection if the user does not already have one. Also Looks for one.

router.get('/', withAuth, async (req, res) =>{

  try{
    const collectionData = await Collection.findOrCreate ({
      where:{
        user_id: req.session.userid
      }
    });
    res.status(200).redirect('/collection/');
  } catch(err) {
    res.status(500).json(err);
  };
});



  module.exports = router;
