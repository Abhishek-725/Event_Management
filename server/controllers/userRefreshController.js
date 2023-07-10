const db = require('../models/index');
var path = require('path');
const userrefreshment = db.userrefreshments;

exports.createUserRefrshMent = async(req,res) => {
try {
    let {refreshMent_id,refreshMent_name,refreshMent_price,
        userId,refrehMentQuantity,refrehMentTotal} = req.body.elements;
    console.log("refre",refreshMent_price,userId);

    const response = await 
    userrefreshment.create({user_id:userId,userRefreshments_name:refreshMent_name,
        userRefreshments_price:refreshMent_price,userRefreshments_quantity:refrehMentQuantity,
        userRefreshments_total:refrehMentTotal});
    console.log(response);
    res.send("success")
} catch (error) {
    console.log(error);
}

}

