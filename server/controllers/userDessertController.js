const db = require('../models/index');
var path = require('path');
const userdessert = db.userdesserts;

exports.createUserDessert = async(req,res) => {
    try {
        let {desert_id,desert_name,desert_description,desert_price,
        desert_image,userId,dessertQuantity,dessertTotal}= req.body.elements;
        console.log("dessert",desert_name);

        const response = await userdessert.create({
            user_id:userId,userdesserts_name:desert_name,
            userdesserts_price:desert_price,
            userdesserts_quantity:dessertQuantity,
            userdesserts_total:dessertTotal
        })
        console.log(response);
        res.send("success")
    } catch (error) {
        console.log(error);
    }

}