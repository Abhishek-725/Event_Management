const db = require('../models/index');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const user = db.users;

exports.authUser = async(req,res,next) => {
        try {
    //     const token = req.cookies.jwt;
    //     console.log(token);
    //     const userVerify = jwt.verify(token,"secret");
    //     console.log(userVerify.id);
    //     const response = await user.findOne(
    //         {   where : { userId : userVerify.id},attributes :{exclude : ['createdAt','updatedAt']} });
    //     console.log(response.dataValues);
    //     const userData = response.dataValues;
    //     if (response.dataValues.userToken && response.dataValues.userRole) {
    //         res.send({Message : "Valid User",Admin : true,userData:userData})
    //     } else {
    //         res.send({Message : "Valid User",Admin : false,userData:userData});
    //     }
    console.log("auth run middleware");
    next();
    } catch (error) {
        // console.log(error);
        res.send({Message:"Token Not Found"});
    }

}