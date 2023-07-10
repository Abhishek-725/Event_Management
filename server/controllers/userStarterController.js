const db = require('../models/index');
var path = require('path');
const userstarter = db.userstarters;

exports.createUserStarter = async(req,res) => {
    try {
        let {starter_id,starter_name,starter_description,starter_price,starter_image,
            userId,starterQuantity,starterTotal}= req.body.elements;
        console.log("starter",starter_price);
        
        const response = 
        await userstarter.create({
            user_id:userId,userstarters_name:starter_name,userstarters_price:starter_price,
            userstarters_quantity:starterQuantity,userstarters_total:starterTotal
        })
        console.log(response.dataValues);
        res.send("success")
    } catch (error) {
        console.log(error);
    }

}







