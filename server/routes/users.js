var express = require('express');
var router = express.Router();
const controller = require('../controllers/usersController');

/*              *******  Insert Users Data   *********        */
router.post('/InsertUser',controller.createUsers);

                        /* Login Users   */
router.post('/loginUser',controller.loginUser);
/*             **********    Logout user   **********        */
router.get('/logOutUser',controller.logOutUser)
/*             **********     auth user    *********         */
router.get('/auth',controller.authUser);

                        /* GET users listing.                */
router.get('/', controller.getUsers);


module.exports = router;
