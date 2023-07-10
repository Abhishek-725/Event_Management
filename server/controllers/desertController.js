const db = require('../models/index');
var path = require('path');
const desert = db.deserts;

exports.createDesert = async(req,res) => {
    try{
    if (!req.file) {
        return res.send("No image");
    }else{
        let imgsrc = 'http://localhost:3001/' + req.file.path;
        imgsrc = imgsrc.replace(/[\\]/g,"/");
        console.log("imgsrc : ",imgsrc);
        let{desertName , description, desertPrice} = req.body;
        // console.log(req.body);
        console.log({desertName,description,desertPrice});
        //res.send(imgsrc);
        //Insert into database
        const response = await desert
        .create({ desert_name:desertName ,desert_description:description,desert_price:desertPrice,desert_image:imgsrc});
        // console.log({response});
        // sending response to frontend
        res.send("Data Save");
    }
}catch(error){
    console.log("Error is :",error);
    res.send("Server Down")
}
};

exports.getDesert = async(req,res,next)=>{
    const response = await desert.findAll();
    console.log(response);
    // sending response to frontend
    res.send({'result':response});

};