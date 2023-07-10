const db = require('../models/index');
var path = require('path');
const userdishe = db.userdishes;

exports.createUserDish = async(req,res) => {
    try {
        let {maincourse_id,maincourse_name,maincourse_type,maincourse_price,
        maincourse_image,userId,quantity,total}= req.body.elements;
        console.log("dish",maincourse_name,quantity,total);
        const response = 
        await userdishe.create({
            user_id:userId , userdishes_name:maincourse_name,userdishes_type:maincourse_type,
            userdishes_price: maincourse_price,
            userdishes_quantity:quantity,userdishes_total:total
        })
        console.log(response);
        res.send("success")
    } catch (error) {
        console.log(error);
    }

}