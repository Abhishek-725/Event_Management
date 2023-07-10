var express = require('express');
var router = express.Router();
var path = require('path');
const controller = require('../controllers/refreshMentController');

// creating local storage for photo
const multer = require('multer');
var storage = multer.diskStorage({
destination: (req, file, callBack) => {
      callBack(null, './public/images/refreshMentImages')     // './public/images/' directory name where save the file
},
filename: (req, file, callBack) => {
    callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    let filename = file.fieldname;
    console.log(filename);
}
})

var upload = multer({
    storage: storage
}).single("image");

/* Insert Users Data  */
router.post('/insertRefreshMent',upload,controller.createRefreshMent);

// Getting All Data of events
router.get('/',controller.getRefreshMent);

module.exports = router;