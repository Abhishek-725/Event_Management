const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt  = require('bcrypt');
const cors = require("cors");
const mysql = require("mysql2");
// app.use(bodyParser.raw());

app.use(cors());
app.use(express.json());

//    **********

// header('Access-Control-Allow-Origin', 'example.com');
// header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
// header('Access-Control-Allow-Headers', 'Content-Type');

// app.use(allowCrossDomain);
// *****************

// Connecting to Port
let port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Connecting to Port ${port}...`);
});
// End Of Connecting to Port
// Connecting to DataBase
const db = mysql.createPool({
  user: "root",
  password: "MySql@123",
  database: "crud_database",
  host: "127.0.0.1",
});
db.getConnection((err, re) => {
  if (err) {
    console.log("Error : " + err);
  } else {
    console.log("Connection successful!");
    // console.log(re);
  }
});
// End Connecting to DataBase
app.get("/", (req, res) => {
  console.log("FrontEnd Data");
  res.send("FrontEnd Data");
});
app.post("/Home",async (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  console.log("name :", name);
//   Encrypt code
  const salt =  await bcrypt.genSalt(10);
  console.log(salt);
  password =  await bcrypt.hash(password,salt);
  console.log(password);

  //Insert code
  let insertQuery =
    "INSERT INTO USER_DETAILS(user_name , user_email , user_password) VALUES(?, ? , ?);";
  db.query(insertQuery, [name, email, password], (err, result) => {
    if (err) {
      console.log("Error is : " + err);
    } else {
      console.log(result);
    }
  });
  //Testing code
  try {
    console.log("Body Data");
    console.log(req.body);
    return res.send(req.body);
  } catch (error) {
    console.log("Error is : ", error);
  }
});


                    //  Display Home data
app.get('/Home',async (req , res) =>{
    let pass = "Fauz@123";
    let email = "sayyedfauziya724@gmail.com";
    let getQuery = `SELECT  user_password FROM user_details WHERE user_email = '${email}';`;
    db.query(getQuery,(err,result) =>{
        if (err) {
            console.log("DataBase Error['Invalid user name'] : ",err);
        } else {
            
            console.log("DataBase Result[valid user name] :" , result);
            const hash = result[0].user_password;
            console.log(hash);
            bcrypt.compare(pass , hash, (err , result) =>{
                if (err) {
                    console.log("Invalid Password : ",err);
                } else {
                    console.log("Successful login : ",result);
                }
        
            } )
        }
    });
     
    

});

app.get("/Display", (req, res) => {
  let sqlQuery = "SELECT * FROM USER_DETAILS;";
  db.query(sqlQuery, (err, result) => {
    if (err) {
      res.send("Error is : " + err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});
