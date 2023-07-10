var express = require('express');
var router = express.Router();
var path = require('path');
const controller = require('../controllers/userDessertController');

/* Insert Users Data  */
router.post('/insertUserDessert',controller.createUserDessert);

module.exports = router;