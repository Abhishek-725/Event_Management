var express = require('express');
var router = express.Router();
var path = require('path');
const controller = require('../controllers/userRefreshController');

/* Insert Users Data  */
router.post('/insertUserRefreshMent',controller.createUserRefrshMent);

module.exports = router;