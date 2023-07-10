const db = require('../models/index');
var path = require('path');
const event = db.events;

exports.createEvent = async(req,res) => {
    if (!req.file) {
        return res.send("No image");
    }else{
        let imgsrc = 'http://localhost:3001/' + req.file.path;
        imgsrc = imgsrc.replace(/[\\]/g,"/");
        console.log("imgsrc : ",imgsrc);
        let{title} = req.body;
        console.log({eventname:title});
        //res.send(imgsrc);
        //Insert into database
        const response = await event.create({ event_name:title ,event_images:imgsrc});
        console.log(response);
        // sending response to frontend
        res.send("Data Save");
    }
    
};

exports.getEvents = async(req,res,next)=>{
        const response = await event.findAll();
        console.log(response);
        // sending response to frontend
        res.send({'result':response});

};