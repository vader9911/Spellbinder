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
    res.status(200).redirect('/collection/img');
  } catch(err) {
    res.status(500).json(err);
  };
});

// // DELETES a collection
// router.delete('/:id', async (req, res) => {
//     try {
//       const collectionData = await Collection.destroy({
//         where: { id: req.params.id }
//       });
//       res.status(200).json(tripData);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

  module.exports = router;
