var express = require('express');
var router = express.Router();
const controller = require('../controllers/contactUsController');
const {authUser }= require('../middleware/authenticate');
/*       ********* send Mail **********  */
router.post('/sendMail',authUser,controller.sendMessage);

module.exports = router;