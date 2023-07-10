var express = require('express');
var router = express.Router();
const controllers = require('../controllers/StripeController');

router.post('/create-checkout-session',controllers.checkOut);

module.exports = router;