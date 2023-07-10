var express = require('express');
var router = express.Router();
var path = require('path');
const controller = require('../controllers/userStarterController');

/* Insert Users Data  */
router.post('/insertUserStarter',controller.createUserStarter);

module.exports = router;