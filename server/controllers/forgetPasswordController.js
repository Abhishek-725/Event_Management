const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const db = require('../models/index');
const otpGenerator = require('otp-generator');
var nodemailer = require("nodemailer");
const user = db.users; 

var otp;
        /*    ***** mail user otp *****   */
exports.mailUsers = (async(req,res,next) => {
    const data = req.body;
    console.log(data);
    let { email } = data;
    const response = await user.findOne(
        {   where : { email : email,},
            attributes : ['userId','email'],
        });
        console.log({result:response});
        if (response) {
            console.log("Email found");
            const { userId,email} = response.dataValues;
            // Sending Mail
            try {
                // Generate Otp 
                otp = otpGenerator.generate(4, { upperCaseAlphabets: false,lowerCaseAlphabets:false, specialChars: false });
                console.log(otp);
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
                    from: '"Server 👻" <jolie15@ethereal.email>', // sender address
                    to: email, // list of receivers
                    subject: "Password Changed!", // Subject line
                    text: "Your OTP For Password Changed!", // plain text body
                    html: `<b>Your OTP For Password Changed :</b>
                            <p><strong>${otp}</strong></p>
                    `, // html body
                });
                
                console.log("Message sent: %s", info.messageId);
                res.send({Message:"Success"});
            }
            catch (error) {
                console.log("Otp generate Error: ",error);
                res.send({Message:"Network Error!"});
            }
        } else {
            console.log("Invalid user");
            res.send(response);
        }

    });

/*   ***************            Verify otp   *****************        */
exports.verifyOtp = async (req,res,next) => {
    let {userOtp} = req.body;
    console.log("Otp : ",userOtp);
    console.log("Actual :",otp);
    try {
        if (userOtp == otp) {
            res.send({Message:"Valid OTP"});
        } else {
            res.send({Message:"Invalid OTP"});
        }
    } catch (error) {
        console.log(error);
    }
}

            /*    ***** Login user  *****   */
exports.changePassword = (async(req,res,next) => {

    let { email , userPassword} = req.body;
    console.log("password",userPassword);
    //Getting user from data base if exist.
    const response = await user.findOne(
    {   where : { email : email,},
        attributes : ['userId'],
    });
    console.log({result:response});
    if (response) {    
        try {
                 /*   *****  Encrypt code *****    */
                const salt =  await bcrypt.genSalt(10);
                 //  console.log(salt); 
                userPassword =  await bcrypt.hash(userPassword,salt);
                console.log(userPassword);
                 /* *****  insert data  ******  */
                const response = await user.update({password:userPassword},{where:{email:email}});
                console.log(response);
                //  res.send({result:response});
                res.send({Message:"Password Change"})
        }
        catch (error) {
            console.log("Password match Error: ",error);
        }
    } else {
        console.log("Invalid user");
        res.send(response);
    }  
});

exports.authUser = async(req,res,next) => {
    try {
        const token = req.cookies.jwt;
        console.log(token);
        const userVerify = jwt.verify(token,"secret");
        console.log(userVerify.id);
        const response = await user.findOne(
            {   where : { userId : userVerify.id},attributes :{exclude : ['createdAt','updatedAt']} });
        console.log(response.dataValues);
        if (response.dataValues.userToken) {
            res.send({Message : "Valid Password",Admin : true})
        } else {
            res.send({Message : "Valid Password",Admin : false});
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }

}
exports.getUsers = async(req , res , next) =>{
    res.send('All Users');
    // const response = await user.findAll({attributes :{exclude : ['createdAt','updatedAt']}});
    // res.send({result:response});
};



// /*   *****  Encrypt code *****    */
// const salt =  await bcrypt.genSalt(10);
// //  console.log(salt); 
// password =  await bcrypt.hash(password,salt);
// console.log(password);
// /* *****  insert data  ******  */
// const response = await user.create({firstName , lastName , email , password , contact});
// res.send({result:response});
// // res.send(true);
// console.log("Server run",data);