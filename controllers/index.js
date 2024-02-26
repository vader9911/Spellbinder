const express = require('express');
const router = express.Router();
// The require('./api') statement is importing the api routes from the api/index.js file in the same directory.
// Similarly, require('./home-routes.js') is importing the homeRoutes from the home-routes.js file in the same directory.
//For anything within the api folder prefix it with /api
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');

router.use('/', homeRoutes);
//Anything within that folder is at the /api endpoint
//Becaus api is a folder, once again its going to look for an index file inside that 
router.use('/api', apiRoutes);

module.exports = router;
