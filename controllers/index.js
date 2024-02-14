const express = require('express');
const router = express.Router();
// The require('./api') statement is importing the api routes from the api/index.js file in the same directory.
// Similarly, require('./home-routes.js') is importing the homeRoutes from the home-routes.js file in the same directory.
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
