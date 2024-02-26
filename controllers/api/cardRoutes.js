const express = require('express');
const router = express.Router();
const { Card, Collection, CollectionCard } = require('../../models');

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

router.post('/removeFromCollection', async (req, res) => {
    try {
        // Check if the card exists in the card table
        let card = await Card.findOne({ where: { scryfall_id: req.body.scryfall_id },raw:true });

        const userId = req.session.user_id;
        
        let userCollection = await Collection.findOne({
                where: {
                    user_id: userId,
                },
                raw: true,
            })
        // Remove the card from the user's collection
        let cardToRemove = await CollectionCard.findOne({
            where: {
                card_id: card.id,
                collection_id: userCollection.id,
            }        
        });
        if (cardToRemove){cardToRemove.destroy()}
        
        res.status(204).end();
    } catch (err) {
        console.error('Error removing card from collection:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}); 

module.exports = router;
