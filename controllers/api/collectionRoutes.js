const express = require('express');
const router = express.Router();
const { Collection } = require('../../models');

// CREATE a collection
router.post('/', async (req, res) => {
    try {
      const collectionData = await Collection.create(req.body);
      res.status(200).json(collectionData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// DELETE a collection
router.delete('/:id', async (req, res) => {
    try {
      const collectionData = await Collection.destroy({
        where: { id: req.params.id }
      });
      if (!collectionData) {
        res.status(404).json({ message: 'No collection with this id!' });
        return;
      }
      res.status(200).json(tripData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;
