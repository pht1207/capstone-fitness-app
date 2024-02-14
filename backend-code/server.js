const mysql = require('mysql');
const bcrypt = require('bcrypt');
const express = require('express');
const multer = require('multer');
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
require('dotenv').config();
const saltRounds = 10;
// Set up multer
const upload = multer();

//Imports the username and password from .env file
const DBUsername = process.env.DBUsername;
const DBPassword = process.env.DBPassword;
const DBName = process.env.DBName

// Start the server
const PORT = process.env.PORT || 5008;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// Create a pool of connections
const pool = mysql.createPool({
  connectionLimit : 10, // the maximum number of connections in the pool
  host            : 'localhost',
  user            : DBUsername,
  password        : DBPassword,
  database        : DBName
});


// Use the pool to perform a query
pool.query('SELECT * FROM userTable', (error, results, fields) => {
  if (error) {
    throw error;
  }
  console.log(results);
  // No need to explicitly close the connection, it's managed by the pool
});


//Function to register the users
const register = async function(req,res){
  console.log("THIS IS THE REQ")
  //Write a regex checker to make sure the password contains certain characteristics
  console.log(req.body)
  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds)
  let users={       
  "email":req.body.email,
  "username":req.body.username,
  "password":encryptedPassword,
  "firstName":req.body.firstName,
  "lastName":req.body.lastName,
  "DOB":req.body.DOB,
  "weight":req.body.weight,
  "notificationsOn":req.body.notificationsOn
  }        
  pool.query('INSERT INTO userTable SET ?',users, function (error, results, fields) {      
  if (error) {
    console.log(error)
    if(error.sqlMessage.includes("for key 'userTable.username'")){
      res.send({
        "code":400,          
        "failed":"error occurred, username already in use"})      
    }
  
    else if(error.sqlMessage.includes("for key 'userTable.email'")){
      res.send({
        "code":400,          
        "failed":"error occurred, email already in use"})      
    }

    else{
      res.send({          
        "code":400,          
        "failed":"error occurred"})   
    }
  }

    else {        
    res.send({          
    "code":200,          
    "success":"user registered sucessfully"            
    });        
    }    
    });
  }



  const login = async function(req, res) {    
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
  
    // Adjust the query to select from userTable
    pool.query('SELECT * FROM userTable WHERE email = ? OR username = ?', [email, username], async function (error, results, fields) {      
      if (error) {
        res.send({
          "code": 400,          
          "failed": "error occurred",
          "error": error
        });
      } else {
        if (results.length > 0) {
          // Compare the provided password with the stored hashed password
          const comparison = await bcrypt.compare(password, results[0].password);          
          if (comparison) {//if login successful
            //creates a jwt upon login
            const user = { id: results[0].userTable_id, username: results[0].username };
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '31d' });
        

            res.send({
              "code": 200,
              "success": "login successful",
              "userTable_id": results[0].userTable_id,
              "username": results[0].username,
              "accessToken": accessToken

            },
            );
          }
          else {
            // Password does not match
            res.send({
              "code": 204,
              "error": "Password does not match provided username/email"
            });
          }
        } else {
          // Email does not exist
          res.send({
            "code": 206,
            "error": "Email/username does not exist"
          });
        }
      }
    });
  }
  


  //This is an exampleGetRequest to demonstrate to groupmates how a get request works
  //Delete later once it is demonstrated
  //To test, use capstone.parkert.dev/backend/exampleGetRequest     (make sure node program is open on server)
  //When you go the link above, it will call this method. This is the basis for all HTTP requests
  const exampleGetRequest = async function(req, res) {
    console.log("Get request called")
    res.send("You've connected to the backend via /exampleGetRequest");
}

  


  



const connection = mysql.createConnection({
  host            : 'localhost',
  user            : DBUsername,
  password        : DBPassword,
  database        : DBName

});

connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");

  // SQL query to select all data from a table
  const selectQuery = 'SELECT * FROM userTable'; // Replace with your table name

  connection.query(selectQuery, (error, results, fields) => {
    if (error) throw error;

    // Log the results
    console.log("Data from the table:");
    console.log(results); // This will print the rows retrieved

    // Close the connection
    connection.end();
  });
});





//This function will be used to verify the json web token from the user
const jwtVerify = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if(token == null){
    return(res.sendStatus(401))
  }
  else{
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
      if(err){
        return(res.sendStatus(403));
      }
      req.user = user;
      next();
    })
  }
}












app.get('/jwtVerify', upload.none(), jwtVerify);
app.post('/register', upload.none(), register);
app.post('/login', upload.none(), login);
app.get('/exampleGetRequest', upload.none(), exampleGetRequest);

