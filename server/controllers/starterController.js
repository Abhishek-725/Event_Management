const db = require('../models/index');
var path = require('path');
const starter = db.starters;

exports.createStarter = async(req,res) => {
    try{
    if (!req.file) {
        return res.send("No image");
    }else{
        let imgsrc = 'http://localhost:3001/' + req.file.path;
        imgsrc = imgsrc.replace(/[\\]/g,"/");
        console.log("imgsrc : ",imgsrc);
        let{starterName ,description , starterPrice} = req.body;
        // console.log(req.body);
        console.log({starterName,description,starterPrice});
        //res.send(imgsrc);
        //Insert into database
        const response = await starter
        .create({ starter_name:starterName ,starter_description:description,starter_price:starterPrice,starter_image:imgsrc});
        // console.log({response});
        // sending response to frontend
        res.send("Data Save");
    }
}catch(error){
    console.log("Error is :",error);
    res.send("Server Down")
}
};

exports.getStarter = async(req,res,next)=>{
    const response = await starter.findAll();
    console.log(response);
    // sending response to frontend
    res.send({'result':response});

};