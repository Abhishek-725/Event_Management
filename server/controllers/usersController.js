const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const db = require('../models/index');
const user = db.users; 

        /*    ***** Insert user data *****   */
exports.createUsers = (async(req,res,next) => {
    const data = req.body;
    console.log(data);
    let {firstName , lastName , email , password , contact} = data;
    /*   *****  Encrypt code *****    */
    const salt =  await bcrypt.genSalt(10);
    //  console.log(salt); 
    password =  await bcrypt.hash(password,salt);
    console.log(password);
    /* *****  insert data  ******  */
    const response = await user.create({firstName , lastName , email , password , contact});
    res.send({result:response});
    // res.send(true);
    console.log("Server run",data);
    });

            /*    ***** Login user  *****   */
exports.loginUser = (async(req,res,next) => {
    var pswdMatch;
    let { e_mail , userpassword} = req.body;
    console.log("password",userpassword);
    //Getting user from data base if exist.
    const response = await user.findOne(
    {   where : { email : e_mail,},
        attributes :{exclude : ['createdAt','updatedAt']}
    });
    console.log({result:response});
    if (response) {
        console.log("Email found");
        const { userId,password,userRole,userToken} = response.dataValues;
        const userData = response.dataValues;
        console.log(userData);
        // Checking Hash and password
        try {
            pswdMatch = await bcrypt.compare(userpassword, password);
            if (pswdMatch) {
                if (userRole) {
                    const token = jwt.sign({id:userId},"secret");
                    console.log(token);
                    // insert token
                    const response = await user.update({userToken:token},{where:{id:userId}});
                    // const userVerify = jwt.verify(token,"secret");
                    // console.log(userVerify);
                    res.cookie("jwt",token,{httpOnly:true});
                    res.send({Message : "Valid Password",Admin : true,userData:userData})
                } else {
                    // generate token
                    const token = jwt.sign({id:userId},"secret");
                    console.log(token);
                    // insert token
                    const response = await user.update({userToken:token},{where:{userId:userId}});
                    console.log("response:",response);
                    res.cookie("jwt",token,{httpOnly:true});
                    res.send({Message : "Valid Password",Admin : false,userData:userData});
                }
                
            } else {
                res.send({Message : "Invalid Credential!"});
            }
        }
        catch (error) {
            console.log("Password match Error: ",error);
        }
    } else {
        console.log("Invalid user");
        res.send(response);
    }  
});
/*           *********** Logout User   *********    */
exports.logOutUser = async(req,res,next) => {
    try {
        console.log(req.cookies.jwt);
        res.clearCookie("jwt");
        // res.clearCookie("jwt","none", {
        //     expires: new Date(Date.now() + 5 * 1000),
        //     httpOnly: true,
        // });
        
        // res.render("/");
        res.status(200).send("Logout Successful");
        
    } catch (error) {
        console.error(error);
    }
}
    /* *******     Authenticate User ************   */
exports.authUser = async(req,res,next) => {
    try {
        const token = req.cookies.jwt;
        console.log(token);
        const userVerify = jwt.verify(token,"secret");
        console.log(userVerify.id);
        const response = await user.findOne(
            {   where : { userId : userVerify.id},attributes :{exclude : ['createdAt','updatedAt']} });
        console.log(response.dataValues);
        
        const userData = response.dataValues;
        if (response.dataValues.userToken && response.dataValues.userRole) {
            res.send({Message : "Valid User",Admin : true,userData:userData})
        } else {
            res.send({Message : "Valid User",Admin : false,userData:userData});
        }
    } catch (error) {
        // console.log(error);
        res.send({Message:"Token Not Found"});
    }

}
exports.getUsers = async(req , res , next) =>{
    res.send('All Users');
    // const response = await user.findAll({attributes :{exclude : ['createdAt','updatedAt']}});
    // res.send({result:response});
};