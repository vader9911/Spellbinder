const express = require('express');
const router = express.Router();
const { Card, Collection, CollectionCard } = require('../../models');
//Query database for all cards
// router.get('/', async (req, res) => {
//     try {
//         const cardData = await Card.findAll();
//         res.status(200).json(cardData);
//     } catch (err) {
//         res.status(2004).end()
//     }
// });

// router.post('/findorcreate', async (req, res) => {
//     try {
//When the user clicks on a card, check to see if card exists, if not, create it.
    
//         const card = await Card.findOrCreate({
//             where: {
//                 scryfall_id: req.body.uuid
//             },
//             defaults: {
//                 oracle_text: req.body.oracle_text,
//                 rarity: req.body.rarity,
//                 card_name: req.body.card_name,
//                 img_uri: req.body.img_uri,
//                 card_price: req.body.card_price
//             }
//         });
//         //not seeing card returned
//         res.status(204).end());
//     } catch (err) {
//         res.status(2004).end()
//     }
// })
//Route for adding to a collection
/*
User views cards
User clicks 'add to my collection' on forest
Front-end knows the scryfall_id of 'Forest'
Front-end sends POST request to this endpoint with a body (likely) of { scryfall_id: <uuid>, collection_id: <int> }. (if the card is on the screen the metadata is also available)
*/
router.post('/addtocollection', async (req, res) => {
    try {
        // Check if the card exists in the card table
        let card = await Card.findOne({ where: { scryfall_id: req.body.scryfall_id } });

        // If the card doesn't exist, add it to the card table
        if (!card) {
            card = await Card.create({
                scryfall_id: req.body.scryfall_id,
                oracle_text: req.body.oracle_text,
                rarity: req.body.rarity,
                card_name: req.body.card_name,
                img_uri: req.body.img_uri
                
            });
        }

        const userId = req.session.user_id;
        
        let userCollection = await Collection.findOrCreate({
                where: {
                    user_id: userId,
                },
                raw: true,
            })

        console.log(userCollection)
        console.log(card)
        // Add the card to the user's collection
        await CollectionCard.create({
            collection_id: userCollection[0].id,
            card_id: card.id,           
        });

        res.status(204).end();
    } catch (err) {
        console.error('Error adding card to collection:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}); 

module.exports = router;
