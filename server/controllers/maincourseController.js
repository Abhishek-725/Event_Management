const db = require('../models/index');
var path = require('path');
const maincourse = db.maincourses;

exports.createmaincourse = async(req,res) => {
    try{
    if (!req.file) {
        return res.send("No image");
    }else{
        let imgsrc = 'http://localhost:3001/' + req.file.path;
        imgsrc = imgsrc.replace(/[\\]/g,"/");
        console.log("imgsrc : ",imgsrc);
        let{dishName , dishType , dishPrice , description} = req.body;
        // console.log(req.body);
        console.log({dishName,dishType,dishPrice});
        //res.send(imgsrc);
        //Insert into database
        const response = 
        await maincourse.create({maincourse_name:dishName ,maincourse_type:dishType,maincourse_price:dishPrice,maincourse_description:description,maincourse_image:imgsrc});
        console.log({response});
        // sending response to frontend
        res.send("Data Save");
    }
}catch(error){
    console.log("Error is :",error);
    res.send("Server Down")
}
};

exports.getmaincourse = async(req,res,next)=>{
        const response = await maincourse.findAll({attributes :{exclude : ['createdAt','updatedAt']}});
        console.log(response);
        // sending response to frontend
        res.send({'result':response});

};