const express = require('express');
const router = express.Router();
const { Card } = require('../../models');
//Query database for all cards
router.get('/', async (req, res) => {
    try {
        const cardData = await Card.findAll();
        res.status(200).json(cardData);
    } catch (err) {
        res.status(200).json()
    }
})

//TODO write a route that finds one card according to uuid
    //findOne if returns null, post too database
        //if returns nll dont add to db, just add to collection, not the db
module.exports = router;