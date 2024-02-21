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
const DBName = process.env.DBName;

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
          const user = { id: results[0].userTable_id, username: results[0].username }; //user object is generated w/ username and userTable_id which is the primary key for each user
          const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '31d' }); //jwt is generated with user object inside of it
      

          res.send({
            "code": 200,
            "success": "login successful",
            "userTable_id": results[0].userTable_id,
            "username": results[0].username,
            "accessToken": accessToken

          }
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
  


//This is an example to demonstrate to groupmates how a get request works
//Delete later once it is demonstrated
//To test, use capstone.parkert.dev/backend/example     (make sure node program is open on server)
//When you go the link above, it will call this method. This is the basis for all HTTP requests
app.get('/example', async (req, res) =>{
  res.send("hello")
})



  


  



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
  const selectQuery = 'SELECT * FROM userTable';

  connection.query(selectQuery, (error, results, fields) => {
    if (error) throw error;

    // Log the results
    console.log("Data from the table:");
    console.log(results); // This will print the rows retrieved

    // Close the connection
    connection.end();
  });
});





//This function will be used to verify the json web token from the user.
//Acts as a middleware. When a method is called, it's HTTP headers are verified here first.
const jwtVerify = (req, res, next) => {
  console.log("jwtverify called")
  const authHeader = req.headers['authorization']; //extracts the token from the http header
  const token = authHeader && authHeader.split(' ')[1]; //object that contains the token

  if(token == null){//If the token is null, then the user will be sent an error code
    return(res.sendStatus(401)) //error code
  }
  else{
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
      if(err){//If the token does not match an ongoing session, it will sent an error code
        return(res.sendStatus(403)); //error code
      }
      req.user = user; //Assign the jwt user values to the request so it may be sent to the following function
      next(); //Go the the code that is after this middleware function
    })
  }
}







const updateProfile = async function(req, res) {    
  //write code here that mirrors /register but use an alter statement instead of an insert statement
  
}



//allows the use of the nutrition page to log food for the user
const logNutrition = async function(req, res) {    
  //write insert statements for the user
  console.log(req.body)
  const userID = req.user.id;
  const nutritionLog = req.body.nutritionLog;
  const values = [userID, nutritionLog.caloriesConsumed || null, nutritionLog.carbsConsumed || null, nutritionLog.proteinConsumed || null, nutritionLog.fatConsumed || null, nutritionLog.dateTimeConsumed || null]
  const query = "INSERT INTO userConsumptionTable (userTable_id, caloriesConsumed, carbsConsumed, proteinConsumed, fatsConsumed, dateTimeConsumed)  VALUES (?, ?, ?, ?, ?, ?)"
  console.log("logNutrition Called");
  pool.query(query, values, (error, results) =>{
    if(error){
      console.log(error);
    }
    else{
      console.log("logged nutrition");
      console.log(results);
      res.send({
        "code": 200,
        "success": "logNutrition successful",
      });      
    }
  });
}


const getNutrition = async function(req, res) {
  const dateAccessed = req.query.dateAccessed;
  const userID = req.user.id;

  pool.query(
  'SELECT * ' +
  'FROM userConsumptionTable ' +
  'WHERE(userTable_id = ? AND DATE(dateTimeConsumed) = ?)', //DATE(dateTimeConsumed) extracts only the date from dateTimeConsumed column
  [userID, dateAccessed],
  (error, results, fields) =>{
    if(error){
      console.error("db query error", error);
      res.status(500).send("Error fetching foods from database");
    }
    else{
      console.log("data from foods: ", results);
      res.json(results);
    }
  })
}




const getFoods = async function(req, res){
  console.log("getfoods called")
  //return all foods as json, let frontend sort through it as there's not going to be much to it
  pool.query('SELECT * FROM foodsTable', (error, results, fields) =>{
    if(error){
      console.error("db query error", error);
      res.status(500).send("Error fetching foods from database");
    }
    else{
      console.log("data from foods: ", results);
      res.json(results);
    }
  })
}


//Returns exercises that are stored in the database. These may be filtered by muscleGroups and will also show exercises created by users.
const getExercises = async function(req, res){
  //in the request, have there be a musclegroup variable, so data can be sorted by muscle groups
  //have some sort of method to send users workout they have created as well
  const userID = req.user.id;

  //Will return every exercise, including ones made by the user, with a filter for what muscle group they are search for (if one exists)
  if(req.query.muscleGroup){
    pool.query(
      'SELECT exerciseTable.* ' +
      'FROM exerciseTable ' +
      'LEFT JOIN userTable ON exerciseTable.createdBy = userTable.userTable_id ' + //Joins all values from exerciseTable and when there is a match between the userTable_id and the createdBy columns & only if they match muscleGroup filter
      'WHERE (userTable.userTable_id = ? AND exerciseTable.muscleGroup = ?) ' +
      'OR (exerciseTable.createdBy IS NULL AND exerciseTable.muscleGroup = ?)', //Also gets every exercise that shows a NULL value in createdBy column & only if they match muscleGroup filter
      [userID, req.query.muscleGroup, req.query.muscleGroup], 
      (error, results, fields) => { 
        console.log("filtered by muscle group")
        if(error){
          // Handle the error
          console.error("db query error", error);
          res.status(500).send("Error fetching foods from database");
        } 
        else{
            // Process the results
            console.log("data from exercises: ", results);
            res.json(results);
          }
    });
  }

  else{
    //Will return every exercise, including ones created by the user
    pool.query(
      'SELECT exerciseTable.* ' +
      'FROM exerciseTable ' +
      'LEFT JOIN userTable ON exerciseTable.createdBy = userTable.userTable_id ' + //Joins all values from exerciseTable and when there is a match between the userTable_id and the createdBy columns
      'WHERE userTable.userTable_id = ? '+
      'OR exerciseTable.createdBy IS NULL', //Also gets every exercise that shows a NULL value in createdBy column
      [userID], 
      (error, results, fields) => {      
        if(error){
          // Handle the error
          console.error("db query error", error);
          res.status(500).send("Error fetching foods from database");
        }
        else{
          console.log("data from exercises: ", results);
          res.json(results);
        }
    });
  }
}
const createExercises = async function(req, res){

}


const getWorkouts = async function(req, res){
//
}





//used to login to the database, register and establish a jwt
app.get('/jwtVerify', upload.none(), jwtVerify);
app.post('/register', upload.none(), register);
app.post('/login', upload.none(), login);

//methods that allow users to update or change information regarding themselves in the DB
app.post('/updateProfile', jwtVerify, updateProfile);
app.post('/logNutrition', jwtVerify, logNutrition);

//methods that allow users to get foods/exercises/workouts from db
app.get('/getFoods', jwtVerify, getFoods);
app.get('/getExercises', jwtVerify, getExercises);
app.get('/getWorkouts', jwtVerify, getWorkouts);
app.get('/getNutrition', jwtVerify, getNutrition);


//methods that are used daily to calculate goals for users


//method uses to create exercises
app.get('/createExercises', jwtVerify, createExercises);
