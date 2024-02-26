const router = require('express').Router();
const cardRoutes = require('./cardRoutes');

const userRoutes = require('./userRoutes');
const collectionRoutes = require ('./collectionRoutes');

router.use('/users', userRoutes);
router.use('/collection', collectionRoutes);
router.use('/cards', cardRoutes);


module.exports = router;
