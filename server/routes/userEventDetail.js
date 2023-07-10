var express = require('express');
var router = express.Router();
const controller = require('../controllers/userEventDetailController');
const {authUser }= require('../middleware/authenticate');
/*       ********* send Mail **********  */
router.post('/insertDetail',controller.createEvent);

// update status
router.post('/upDateStatus',controller.upDateStatus);
// accept order
router.post('/acceptOrder',controller.acceptOrder);
// reject order
router.post('/rejectOrder',controller.rejectOrder);
// Getting All Data of events
router.get('/',controller.getAllEvent);

// Getting All Data of events
router.get('/newEvnet',controller.getNewEvent);


// Getting All Data of events
router.post('/getDetail',controller.getUserDetail);

module.exports = router;