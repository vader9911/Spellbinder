const router = require('express').Router();

const userRoutes = require('./userRoutes');

//Anything tahts inside the userRoutes file is now prefixed by /users
router.use('/users', userRoutes);

module.exports = router;
