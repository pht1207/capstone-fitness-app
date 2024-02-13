const mysql = require('mysql');
const bcrypt = require('bcrypt');
const express = require('express');
const multer = require('multer');

const app = express();
app.use(express.json());
require('dotenv').config();
const saltRounds = 10;
// Set up multer
const upload = multer();


const DBUsername = process.env.DBUsername;
const DBPassword = process.env.DBPassword;
console.log(DBUsername)
console.log(DBPassword)


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
  database        : 'fitnessAppDB'
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
  console.log(req.body)
  const password = req.body.password;    
  const encryptedPassword = await bcrypt.hash(password, saltRounds)
  let users={       
  "email":req.body.email,       
  "password":encryptedPassword,
  }        
  pool.query('INSERT INTO userTable SET ?',users, function (error, results, fields) {      
  if (error) {    
    if(error.code === "ER_DUP_ENTRY"){
      res.send({
        "code":400,          
        "failed":"error occurred, email already used"})      
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
    var email = req.body.email;    
    var password = req.body.password;    
  
    // Adjust the query to select from userTable
    pool.query('SELECT * FROM userTable WHERE email = ?', [email], async function (error, results, fields) {      
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
          if (comparison) {
            // Login successful
            res.send({                
              "code": 200,                
              "success": "login successful",                
              "userID": results[0].userID  // Assuming 'userID' is the column name in your table         
            });          
          } else {            
            // Password does not match
            res.send({                 
              "code": 204,                 
              "error": "Email and password does not match"
            });
          }
        } else {
          // Email does not exist
          res.send({
            "code": 206,
            "error": "Email does not exist"
          });
        }
      }
    });
  }
  
  



const connection = mysql.createConnection({
  host: 'localhost',
  user: 'capstone',
  password:'Capstone@)@#',
  database:'fitnessAppDB'
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












app.post('/register', upload.none(), register);
app.post('/login', upload.none(), login);
