const express = require('express');
const router = express.Router();
const { Collection } = require('../../models');


  router.get('/:userid', async (req, res) =>{
    try{
      const collectionData = await Collection.findOrCreate ({
        where:{
          user_id: req.params.userid 
        }
      });
      res.status(200).json(collectionData);
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
