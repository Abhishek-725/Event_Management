var express = require('express');
var router = express.Router();
const controller = require('../controllers/forgetPasswordController');

/* Insert Users Data  */
router.post('/mailOtp',controller.mailUsers);

/* Login Users   */
router.post('/verifyOtp',controller.verifyOtp);

/*   *********  change Password***********  */
router.post('/changePassword',controller.changePassword);

/* auth user        */
router.get('/auth',controller.authUser);
/* GET users listing. */
router.get('/', controller.getUsers);


module.exports = router;