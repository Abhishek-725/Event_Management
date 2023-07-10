const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const db = require('../models/index');
var nodemailer = require("nodemailer");
const usereventdetail = db.usereventdetails;
const user = db.users;
const moment = require('moment');
const { Op } = require("sequelize");


exports.createEvent = async(req,res) => {
    try {
        let {userId,userName,eventName,venueName,decorationName,decorationType,
            venueAddress,date,time,totalAmount} = req.body;
        console.log(userId,eventName,venueName);
        const response = await usereventdetail.create({user_id:userId,user_name:userName,
            event_name:eventName ,decoration_name:decorationName,
            decoration_type:decorationType,venue_name:venueName,venue_address:venueAddress,
            event_date:date,event_time:time,event_total:totalAmount
        });
        console.log(response);
        res.send({result:response.dataValues})

    } catch (error) {
        console.log(error);
    }
}

exports.getAllEvent = async(req , res , next) =>{
    let date = moment().add(1, 'days').format('YYYY-MM-D');
        console.log(date);
    
    // res.send('All Users');
    const response = await 
    usereventdetail.findAll({ where : { status : ['Pending','Accept']},order: [['event_date', 'DESC']] },
        {attributes :{exclude : ['createdAt','updatedAt']}
    });
    console.log("respose:  ",response);
    res.send({result:response});
};

exports.getNewEvent = async(req , res , next) =>{
    // // let date = moment().add(1, 'days').format('YYYY-MM-D');
    // //     console.log(date);
    // let date = moment().format('YYYY-MM-D');
    // console.log(date);
    
    // res.send('All Users');
    const response = await 
    usereventdetail.findAll({   where : { status : 'New'}},
        {attributes :{exclude : ['createdAt','updatedAt']}
    });
    console.log("respose:  ",response);
    res.send({result:response});
};


// get one user details
exports.getUserDetail = async(req , res , next) =>{
    let userId = req.body.userId;
    // res.send('All Users');
    const response = await 
    usereventdetail.findOne( {   where : { user_id : userId},
        attributes :{exclude : ['createdAt','updatedAt']}
    });
    console.log("respose:  ",response);
    res.send({result:response});
};

// update status
exports.upDateStatus = async(req,res) => {
    try {
        let status = req.body.status;
        let event_id = req.body.event_id;
        console.log(status);

        const result = await usereventdetail.update({status:status},{where:{event_id:event_id}});
        console.log(result);
        res.send({Message:"Success"})
    } catch (error) {
        console.log("Error",error);
    }
}

exports.acceptOrder = async(req,res) => {
    try {
        let { event_id,user_id,status } = req.body;
        console.log(event_id);
        // get user email from database through id
        const response = await user.findOne(
            {   where : { userId : user_id},attributes :{exclude : ['createdAt','updatedAt']} });
        console.log(response.dataValues);
        let email = response.dataValues.email;
            // update status
        const result = await usereventdetail.update({status:status},{where:{event_id:event_id}});
        console.log(result);
        // defined transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'abhishek.gupta.17696@ves.ac.in',
                pass: 'Abhigupta@17696'
            },
        });
                   
        // send mail with defined transport object
        let info = await transporter.sendMail({
                from: '"Server" <jolie15@ethereal.email>', // sender address
                to: `${email}`, // list of receivers
                subject: "Your Event Info", // Subject line
                text: "Your Event Order is Accepted!", // plain text body
                html: `<b>Please see your status page for payment details!</b>
                        <small>*Note:You have to minimum amount to start the work.</small>
                        <p><strong>Thank You!Have A Great Day.</strong></p>
                `, // html body
            });
            
            console.log("Message sent: %s", info.messageId);
            res.send({Message:"Success"});
    } catch (error) {
        console.log(error);
    }

}

exports.rejectOrder = async(req,res) => {
    try {
        let { event_id,user_id,status } = req.body;
        console.log(event_id,status);
        // get user email from database through id
        const response = await user.findOne(
            {   where : { userId : user_id},attributes :{exclude : ['createdAt','updatedAt']} });
        console.log(response.dataValues);
        let email = response.dataValues.email;
            // update status
        const result = await usereventdetail.destroy({where:{event_id:event_id}});
        console.log(result);
        // defined transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'abhishek.gupta.17696@ves.ac.in',
                pass: 'Abhigupta@17696'
            },
        });
                   
        // send mail with defined transport object
        let info = await transporter.sendMail({
                from: '"Server" <jolie15@ethereal.email>', // sender address
                to: `${email}`, // list of receivers
                subject: "Sorry order is not accepted", // Subject line
                text: "Your event order is not accepted!", // plain text body
                html: `<b>We are already booked for that day so can't handle your event!</b>
                        <p><strong>Thank You!Have A Great Day.</strong></p>
                `, // html body
            });
            
            console.log("Message sent: %s", info.messageId);
            res.send({Message:"Success"});
    } catch (error) {
        console.log(error);
    }

}



// const { Op } = require("sequelize");
// Post.findAll({
//   where: {
//     [Op.and]: [
//       { authorId: 12 },
//       { status: 'active' }
//     ]
//   }
// });
// // SELECT * FROM post WHERE authorId = 12 AND status = 'active';