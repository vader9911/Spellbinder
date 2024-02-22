const express = require('express');
const router = express.Router();
const { Card } = require('../../models');
const { CollectionCard } = require('../../models');
//Query database for all cards
router.get('/', async (req, res) => {
    try {
        const cardData = await Card.findAll();
        res.status(200).json(cardData);
    } catch (err) {
        res.status(2004).end()
    }
});

router.post('/findorcreate', async (req, res) => {
    try {
//When the user clicks on a card, check to see if card exists, if not, create it.
    
        const card = await Card.findOrCreate({
            where: {
                scryfall_id: req.body.uuid
            },
            defaults: {
                oracle_text: req.body.oracle_text,
                rarity: req.body.rarity,
                card_name: req.body.card_name,
                img_uri: req.body.img_uri,
                card_price: req.body.card_price
            }
        });
        //not seeing card returned
        res.status(200).json(card);
    } catch (err) {
        res.status(2004).end()
    }
})
//Route for adding to a collection
/*
User views cards
User clicks 'add to my collection' on forest
Front-end knows the scryfall_id of 'Forest'
Front-end sends POST request to this endpoint with a body (likely) of { scryfall_id: <uuid>, collection_id: <int> }. (if the card is on the screen the metadata is also available)
*/
router.post('/addtocollection', async (req, res) => {
    try {
//When the user clicks on a card it checks to see if the card exists, if not, create it.
        const card = await Card.findOrCreate({
            where: {
                scryfall_id: req.body.uuid
            },
            defaults: {
                oracle_text: req.body.oracle_text,
                rarity: req.body.rarity,
                card_name: req.body.card_name,
                img_uri: req.body.img_uri,

            }
        });
//make a pairing between a card and a collection; and query the database
//find the user thats logged in and their collection
        const collectedCard = await CollectionCard.create({
            condition: req.body.condition,
            collection_id: req.body.collection_id,
            card_id: req.body.card_id,
        })
        res.status(2004).end()
    } catch (err) {
        res.status(200).json()
    }
})

module.exports = router;