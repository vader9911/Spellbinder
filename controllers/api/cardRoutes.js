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
});




//Route for adding to a collection
/*
User views cards
User clicks 'add to my collection' on forest
Front-end knows the scryfall_id of 'Forest'
Front-end sends POST request to this endpoint with a body (likely) of { scryfall_id: <uuid>, collection_id: <int> }. (if the card is on the screen the metadata is also available)
*/
router.post('/', async (req, res) => {
    try {
        //there needs to be a form with a label of uuid
        const card = await Card.findOne({
            where: {
                scryfall_id: req.body.uuid
            }
            //TODO if does not returns null add to collectionCard (the relationship table)
            //TODO else create the card and add it to collectionCard (the relationship table)
        }) ;
        res.status(200).json(cardData);
    } catch (err) {
        res.status(200).json()
    }
})

module.exports = router;