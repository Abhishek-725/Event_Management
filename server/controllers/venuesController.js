const db = require('../models/index');
var path = require('path');
const venue = db.venues;

exports.createVenue = async(req,res) => {
    try{
    if (!req.file) {
        return res.send("No image");
    }else{
        let imgsrc = 'http://localhost:3001/' + req.file.path;
        imgsrc = imgsrc.replace(/[\\]/g,"/");
        console.log("imgsrc : ",imgsrc);
        let{title , address , cost} = req.body;
        // console.log(req.body);
        console.log({eventname:title,address,cost});
        //res.send(imgsrc);
        //Insert into database
        const response = 
        await venue.create({ venue_name:title ,venue_address:address,venue_price:cost,venue_image:imgsrc});
        console.log({response});
        // sending response to frontend
        res.send("Data Save");
    }
}catch(error){
    console.log("Error is :",error);
    res.send("Server Down")
}
};

exports.getVenue = async(req,res,next)=>{
        const response = await venue.findAll();
        console.log(response);
        // sending response to frontend
        res.send({'result':response});

};