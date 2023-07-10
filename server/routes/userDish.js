var express = require('express');
var router = express.Router();
var path = require('path');
const controller = require('../controllers/userDishController');

/* Insert Users Data  */
router.post('/insertUserDish',controller.createUserDish);

module.exports = router;