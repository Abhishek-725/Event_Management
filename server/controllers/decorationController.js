const db = require('../models/index');
var path = require('path');
const decoration = db.decorations;

exports.createDecoration = async(req,res) => {
    try{
    if (!req.file) {
        return res.send("No image");
    }else{
        let imgsrc = 'http://localhost:3001/' + req.file.path;
        imgsrc = imgsrc.replace(/[\\]/g,"/");
        console.log("imgsrc : ",imgsrc);
        let{decorationName ,type , decorationPrice} = req.body;
        // console.log(req.body);
        console.log({decorationName,type,decorationPrice});
        //res.send(imgsrc);
        //Insert into database
        const response = await decoration
        .create({ decoration_name:decorationName ,decoration_type:type,decoration_price:decorationPrice,decoration_image:imgsrc});
        // console.log({response});
        // sending response to frontend
        res.send("Data Save");
    }
}catch(error){
    console.log("Error is :",error);
    res.send("Server Down")
}
};

exports.getDecoration = async(req,res,next)=>{
    const response = await decoration.findAll();
    console.log(response);
    // sending response to frontend
    res.send({'result':response});

};