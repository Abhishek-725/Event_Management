const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const db = require('../models/index');
var nodemailer = require("nodemailer");
const user = db.users;

exports.sendMessage = async(req,res,next) => {
    try {
        let data = req.body.data;
        let {name , email , subject , message} = data;
        console.log(email);
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
                from: `"${email}" <jolie15@ethereal.email>`, // sender address
                to: `${email}`, // admin of receivers
                subject: `${subject}`, // Subject line
                text: ``, // plain text body
                html: `<b>You have message from ${name} :</b>
                        <p><strong>${message}</strong></p>
                `, // html body
            });
            console.log("Message sent: %s", info.messageId);
            res.send({Message:"Success"});
        
    } catch (error) {
        console.error(error);
    }

}