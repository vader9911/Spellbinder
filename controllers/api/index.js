const router = require('express').Router();

const userRoutes = require('./userRoutes');
const collectionRoutes = require ('./collectionRoutes');

//Anything tahts inside the userRoutes file is now prefixed by /users
router.use('/users', userRoutes);
router.use('collections', collectionRoutes);

module.exports = router;
