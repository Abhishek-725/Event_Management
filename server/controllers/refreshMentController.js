const db = require('../models/index');
var path = require('path');
const refreshment = db.refreshments;

exports.createRefreshMent = async(req,res) => {
    try{
    if (!req.file) {
        return res.send("No image");
    }else{
        let imgsrc = 'http://localhost:3001/' + req.file.path;
        imgsrc = imgsrc.replace(/[\\]/g,"/");
        console.log("imgsrc : ",imgsrc);
        let{refreshMentName ,description , refreshMentPrice} = req.body;
        // console.log(req.body);
        console.log({refreshMentName,description,refreshMentPrice});
        //res.send(imgsrc);
        //Insert into database
        const response = await refreshment
        .create({ refreshMent_name:refreshMentName ,refreshMent_description:description,refreshMent_price:refreshMentPrice,refreshMent_image:imgsrc});
        // console.log({response});
        // sending response to frontend
        res.send("Data Save");
    }
}catch(error){
    console.log("Error is :",error);
    res.send("Server Down")
}
};

exports.getRefreshMent = async(req,res,next)=>{
    const response = await refreshment.findAll();
    console.log(response);
    // sending response to frontend
    res.send({'result':response});

};