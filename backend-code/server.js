const mysql = require('mysql');
const bcrypt = require('bcrypt');
const express = require('express');
const multer = require('multer');
const app = express();
const jwt = require("jsonwebtoken");
const cors = require('cors');
const corsOptions ={
    origin:'*', 
    //credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


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
const BACKENDPORT = process.env.BACKENDPORT || 5008;
app.listen(BACKENDPORT, () => {
  console.log(`Server running on port ${BACKENDPORT}`);
});

//function to get the current time
function getCurrentTime(){
  mysqlDateTime = new Date().toISOString().slice(0, 19).replace('T', ' '); //this is a way to get the current date and time and format it so it will go into a datetime column in mysql correctly
  return mysqlDateTime;
}


// Create a pool of connections so the DB is up and available for use
const pool = mysql.createPool({
  connectionLimit : 10, // the maximum number of connections in the pool
  host            : 'localhost',
  user            : DBUsername,
  password        : DBPassword,
  database        : DBName
});





{/* Used in form validation */}
const Joi = require('joi');
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().min(3).max(45).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  firstName: Joi.string().alphanum().max(45).required(),
  lastName: Joi.string().alphanum().max(45).required(),
  DOB: Joi.date().iso().required(), // Checks for 'YYYY-MM-DD' format
  notificationsOn: Joi.number().integer().valid(0, 1).required(),
  height:Joi.number().integer().required(),
  goal: Joi.number().integer().valid(1, 2, 3).required(),
  weight: Joi.number().positive().required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().min(3).max(45).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});
const updateProfileSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().min(3).max(45).required(),
  //password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  firstName: Joi.string().alphanum().max(45).required(),
  lastName: Joi.string().alphanum().max(45).required(),
  DOB: Joi.date().iso().required(), // Checks for 'YYYY-MM-DD' format
  height:Joi.number().integer().required(),
  notificationsOn: Joi.number().integer().valid(0, 1).required(),
});
const setUserGoalSchema = Joi.object({
  goal: Joi.number().integer().valid(1, 2, 3).required(),
});
{/* End of form validation */}






{/*
* === SECTION START: JSON WEB TOKEN ===
* This section is related to the verification of a users JWT.
* Methods in this section:
*  -/jwtVerify
*/}
//This function will be used to verify the json web token from the user.
//Acts as a middleware. When a method is called, it's HTTP headers are verified here first.
const jwtVerify = (req, res, next) => {
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
app.get('/jwtVerify', upload.none(), jwtVerify);
{/*
  * END OF SECTION: JSON WEB TOKEN
*/}








{/*
* === SECTION START: LOGIN/REGISTER ===
* This section is all related to the login and registration functions.
* Methods in this section:
*  -/register
*  -/login
*/}
//Function to register the users
//Need to add the user inputting their weight and selected goal to the registration process***
const register = async function(req,res){
  const validationResult = registerSchema.validate(req.body);
  if (validationResult.error) {
    console.error(validationResult.error)
    res.status(400).json({
      message:"Error with "+validationResult.error.details[0].path
    })
  }
  else{
    const password = req.body.password;
    const encryptedPassword = await bcrypt.hash(password, saltRounds)
    let user={       
    "email":req.body.email,
    "username":req.body.username,
    "password":encryptedPassword,
    "firstName":req.body.firstName,
    "lastName":req.body.lastName,
    "DOB":req.body.DOB,
    "notificationsOn":req.body.notificationsOn,
    "height":req.body.height,

    "goal":req.body.goal,

    "weight":req.body.weight
    }

    try {
      // Creates a new user row in the userTable table
      const userTableQuery = "INSERT INTO userTable (email, username, password, firstname, lastname, DOB, height, notificationsOn) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
      const userTableQueryValues = [user.email, user.username, encryptedPassword, user.firstName, user.lastName, user.DOB, user.height, user.notificationsOn];
      const userTableInsert = await executeQuery(userTableQuery, userTableQueryValues);

      // Get the ID of the newly inserted user
      const newUserId = userTableInsert.insertId;

      // Inserts the goal of the user
      const userGoalTableQuery = "INSERT INTO user_goalTable (goalTable_id, userTable_id, dateTimeChanged) VALUES (?, ?, ?);";
      const userGoalTableQueryValues = [user.goal, newUserId, getCurrentTime()];
      const userGoalTableInsert = await executeQuery(userGoalTableQuery, userGoalTableQueryValues);

      // Inserts the weight of the user
      const userWeightTableQuery = "INSERT INTO userWeightTable (userTable_id, userWeight, dateTimeChanged) VALUES (?, ?, ?);";
      const userWeightTableQueryValues = [newUserId, user.weight, getCurrentTime()];
      const userWeightTableInsert = await executeQuery(userWeightTableQuery, userWeightTableQueryValues);
      dailyNutritionTableCalculator(); //calls the dailynutritiontablecalculator upon an account registration, updating it for every user
      return res.status(200).json({
        message: "Account creation successful"
      });
    }

    catch{
      console.error("error occured while registering account")
    }
    //Used to execute queries
    function executeQuery(query, values){
      return new Promise((resolve, reject) =>{
        pool.query(query, values, (error, results) =>{
          if(error){
            console.error(error)
            reject(error);
            if (error.code === 'ER_DUP_ENTRY') {
              if (error.sqlMessage.includes('userTable.email_UNIQUE')) {
                  //Error for if email is already in use
                  res.status(400).json({
                      message: "Email already in use"
                  });
              }
              else if (error.sqlMessage.includes('userTable.username_UNIQUE')) {
                  //Error for if username is already in use
                  res.status(400).json({
                      message: "Username already in use"
                  });
              }
          }
          else {
              //Any other types of errors
              res.status(400).json({
                  message: "Internal Server Error"
              });
          }
          }
          else{
            resolve(results);
          }
        })
      })
    }
  }


}



const login = async function(req, res) {
  let email = req.body.email || "placeholder@gmail.com"
  let username = req.body.username || "placeholderUsername";
  let password = req.body.password;
  let validatorObject = {email: email, username: username, password: password}

  const validationResult = loginSchema.validate(validatorObject);
  if (validationResult.error) {
    res.status(400).json({
      message:"Error with "+validationResult.error.details[0].path
    })
  }
  else{
    // Adjust the query to select from userTable
    pool.query('SELECT * FROM userTable WHERE email = ? OR username = ?', [email, username], async function (error, results, fields) {      
      if (error) {
        res.status(400).json({
          message: error
        });
      } else {
        if (results.length > 0) {
          // Compare the provided password with the stored hashed password
          const comparison = await bcrypt.compare(password, results[0].password);          
          if (comparison) {//if login successful
            //creates a jwt upon login
            const user = { id: results[0].userTable_id, username: results[0].username }; //user object is generated w/ username and userTable_id which is the primary key for each user
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '31d' }); //jwt is generated with user object inside of it
            res.status(200).json({
              message: "login successful",
              accessToken: accessToken
            });
          }
          else {
            // Password does not match
            res.status(400).json({
              message: "Password does not match provided username/email"
            });
          }
        } else {
          // Email does not exist
          res.status(400).json({
            message: "Email/username does not exist"
          });
        }
      }
    });
  }
}
app.post('/register', upload.none(), register);
app.post('/login', upload.none(), login);
{/*
  * END OF SECTION: LOGIN/REGISTER
*/}












{/*
* === SECTION START: PROFILE ===
* This section is all related to the profile information tables in the database.
* Methods in this section:
*  -/updateProfile
*  -/getProfileData
*/}

const updateProfile = async function(req, res) {
  const userID = req.user.id;
  const requestData = req.body;
  const email = requestData.email;
  const username = requestData.username;
  const firstName = requestData.firstName;
  const lastName = requestData.lastName;
  const DOB = requestData.DOB;
  const height = requestData.height;
  const goal = requestData.goal
  const notificationsOn = requestData.notificationsOn;

 {/* removed  from validator object for now*/}
  let validatorObject = {email: email, username: username, firstName: firstName, lastName: lastName, DOB: DOB, height:height, notificationsOn: notificationsOn}

  const validationResult = updateProfileSchema.validate(validatorObject);
  if (validationResult.error) {
    console.error(validationResult.error)
    res.status(400).json({
      message:"Error with "+validationResult.error.details[0].path
    })
  }
  else{
    const query = (
    "UPDATE userTable "+
    "SET userTable.email = ?, userTable.username = ?, userTable.firstName = ?, userTable.lastName = ?, userTable.DOB = ?, userTable.height = ?, userTable.notificationsOn = ? "+
    "WHERE userTable.userTable_id = ?")
    const values = [email, username, firstName, lastName, DOB, height, notificationsOn, userID] //removed encryptedPassword from this array for now
    pool.query(query, values, (error, results) =>{
      if(error){
        console.error(error)
        if (error.code === 'ER_DUP_ENTRY') {
          if (error.sqlMessage.includes('userTable.email_UNIQUE')) {
              //Error for if email is already in use
              res.status(400).json({
                  message: "Email already in use"
              });
          }
          else if (error.sqlMessage.includes('userTable.username_UNIQUE')) {
              //Error for if username is already in use
              res.status(400).json({
                  message: "Username already in use"
              });
          }
      }
      else {
          //Any other types of errors
          res.status(500).json({
              message: "Internal Server Error"
          });
      }
      }
      else{
        const updateGoalQuery = "UPDATE user_goalTable SET goalTable_id = ? WHERE userTable_id = ?"
        const updateGoalValues = [goal, userID]
        pool.query(updateGoalQuery, updateGoalValues, (error, results) =>{
          if(error){
            console.error("error setting goal:"+error)
            res.status(500).json({
              message: "Internal Server Error"
          });
          }
          else{
            dailyNutritionTableCalculator();
            res.status(200).json({
              message:"update profile successful"
            });
          }
        })
      }
    })
  }
}

const updatePassword = async function(req, res) {
  const userID = req.user.id;
  const password = req.body.password;

  const encryptedPassword = await bcrypt.hash(password, saltRounds)

  /*const validationResult = updateProfileSchema.validate(validatorObject);
  if (validationResult.error) {
    console.error(validationResult.error)
    res.status(400).json({
      message:"Error with "+validationResult.error.details[0].path
    })
  }*/
  //else{
    const query = (
    "UPDATE userTable "+
    "SET userTable.password = ? "+
    "WHERE userTable.userTable_id = ?")
    const values = [encryptedPassword, userID] //removed encryptedPassword from this array for now
    pool.query(query, values, (error, results) =>{
      if(error){
        console.error(error)
        res.status(400).json({
          message: "Error changing password"
        });
      }
      else{
        res.status(200).json({
          message:"update profile successful"
        });
      }
    })
  //}
}

const getProfileData = async function(req, res){
  const userID = req.user.id;
  pool.query(
    'SELECT userTable.email, userTable.DOB, userTable.username, userTable.firstName, userTable.lastName, userTable.height, userTable.notificationsOn, goalTable.goalName, userWeightTable.userWeight, userWeightTable.dateTimeChanged ' + //specify each column that should be gathered throughout the query
    'FROM userTable ' + //get all rows from usertable and only show columns in select statement
    'LEFT JOIN user_goalTable ON userTable.userTable_id = user_goalTable.userTable_id '+ //get all rows from user_goalTable that match the userTable_id in userTable
    'INNER JOIN goalTable ON user_goalTable.goalTable_id = goalTable.goalTable_id '+ //Gets the rows from goalTable where goalTable_id matches both tables
    'LEFT JOIN userWeightTable  ON userTable.userTable_id = userWeightTable.userTable_id ' +
    'WHERE userTable.userTable_id = ? ' + //filter all results to only show if they match the usertable_id in the request
    'ORDER BY userWeightTable.dateTimeChanged DESC LIMIT 1',
    [userID],
    (error, results, fields) =>{
      if(error){
        console.error("db query error", error);
        res.status(500).send("Error fetching profile data from database");
      }
      else{
        res.status(200).json(results);
        
      }
    })
}
app.post('/updateProfile', jwtVerify, updateProfile);
app.get('/getProfileData', jwtVerify, getProfileData);
app.post('/updatePassword', jwtVerify, updatePassword);
{/*
  * END OF SECTION: PROFILE
*/}






{/*
* === SECTION START: GOALS ===
* This section is all related to the goal tables in the database.
* Methods in this section:
*  -/setUserGoal
*/}

const setUserGoal = async function(req, res){
  const userID = req.user.id;
  const goal = req.body.goal
  const validationResult = setUserGoalSchema.validate(req.body);
  if (validationResult.error) {
    console.error(validationResult.error)
    res.status(400).json({
      message:"Error with "+validationResult.error.details[0].path
    })
  }
  else{
    //Make query to set userGoal in user_goalTable
    const query = "INSERT INTO user_goalTable "+
    "(goalTable_id, userTable_id, dateTimeChanged) VALUES (?, ?, ?)"
    const values = [goal, userID, getCurrentTime()];
    pool.query(query, values, (error, results) =>{
      if(error){
        console.error(error);
        res.status(500).send("Error setting goal in database");
      }
      else{
        res.status(200).json({
          message:"new goal set"
        });
      }
    })
  }
}
app.post('/setUserGoal', jwtVerify, setUserGoal);

{/*
  * END OF SECTION: GOALS
*/}







{/*
* === SECTION START: NUTRITION ===
* This section is all related to the nutrition tables in the database.
* Methods in this section:
*  -/logNutrition
*  -/getFoods
*  -dailyNutritionTableCalculator (not a http method)
*     -cron job to run this function everyday
*/}
//allows the use of the nutrition page to log food for the user
const logNutrition = async function(req, res) {    
  //write insert statements for the user
  const userID = req.user.id;
  const nutritionLog = req.body;
  const values = [userID, nutritionLog.caloriesConsumed, nutritionLog.carbsConsumed, nutritionLog.proteinConsumed, nutritionLog.fatsConsumed, nutritionLog.dateTimeConsumed]
  const query = "INSERT INTO userConsumptionTable (userTable_id, caloriesConsumed, carbsConsumed, proteinConsumed, fatsConsumed, dateTimeConsumed)  VALUES (?, ?, ?, ?, ?, ?)"
  pool.query(query, values, (error, results) =>{
    if(error){
      console.error(error);
    }
    else{
      res.status(200).json({
        message: "logNutrition successful",
      });      
    }
  });
}


const getUserNutritionLog = async function(req, res) {
  const dateAccessed = req.query.dateAccessed;
  const userID = req.user.id;

  pool.query(
  'SELECT userConsumptionTable_id, caloriesConsumed, carbsConsumed, proteinConsumed, fatsConsumed, dateTimeConsumed ' +
  'FROM userConsumptionTable ' +
  'WHERE userTable_id = ? AND DATE(dateTimeConsumed) = ? ',
  [userID, dateAccessed],
  (error, results, fields) =>{
    if(error){
      console.error("db query error", error);
      res.status(500).send("Error fetching foods from database");
    }
    else{
      try{
        let nutritionLog = {
          caloriesConsumed: 0,
          carbsConsumed: 0,
          proteinConsumed: 0,
          fatsConsumed: 0,
          dateTimeConsumed: dateAccessed
        }
        //This will combine the logs from the day retrieved into one object
        if(results.length != 0){//if any rows are retrieved, add their values to the nutritionLog object
          for(let i = 0; i < results.length; i++){
            nutritionLog.caloriesConsumed += results[i].caloriesConsumed;
            nutritionLog.carbsConsumed += results[i].carbsConsumed;
            nutritionLog.proteinConsumed += results[i].proteinConsumed;
            nutritionLog.fatsConsumed += results[i].fatsConsumed;
          }
        }
          res.status(200).json(nutritionLog);
    }
    catch(error){
      console.error("db query error", error);
      res.status(500).send("Error fetching nutrition log from database");
    }
    }
  })
}



const getFoods = async function(req, res){
  //return all foods as json, let frontend sort through it as there's not going to be much to it
  pool.query('SELECT * FROM foodsTable', (error, results, fields) =>{
    if(error){
      console.error("db query error", error);
      res.status(500).send("Error fetching foods from database");
    }
    else{
      res.status(200).json(results);
    }
  })
}

//runs the function everyday at 12am
const cron = require('node-cron');
cron.schedule('0 0 * * *', function() {
  console.log('Running daily user nutrition calculator every day at 12 AM for each user');
  dailyNutritionTableCalculator()
});
cron.schedule('0 6 * * *', function() {
  console.log('Running daily user nutrition calculator every day at 6 AM for each user');
  dailyNutritionTableCalculator()
});
cron.schedule('0 12 * * *', function() {
  console.log('Running daily user nutrition calculator every day at 12 PM for each user');
  dailyNutritionTableCalculator()
});
cron.schedule('0 18 * * *', function() {
  console.log('Running daily user nutrition calculator every day at 6 PM for each user');
  dailyNutritionTableCalculator()
});
//Calculates a daily nutrition recommendation for each user in the DB based around their weight and goal as a user.
function dailyNutritionTableCalculator(){
  pool.query(
    'SELECT userTable.userTable_id, goalTable.goalName, userWeightTable.userWeight, userWeightTable.dateTimeChanged ' +
    'FROM userTable ' +
    'LEFT JOIN user_goalTable ON userTable.userTable_id = user_goalTable.userTable_id ' +
    'INNER JOIN goalTable ON user_goalTable.goalTable_id = goalTable.goalTable_id ' +
    'LEFT JOIN userWeightTable ON userTable.userTable_id = userWeightTable.userTable_id ' +
    'INNER JOIN (SELECT userTable_id, MAX(dateTimeChanged) as MaxDateTime ' +
      'FROM userWeightTable ' +
      'GROUP BY userTable_id) latestWeight ON userWeightTable.userTable_id = latestWeight.userTable_id AND userWeightTable.dateTimeChanged = latestWeight.MaxDateTime ' +
    'ORDER BY userTable.userTable_id, userWeightTable.dateTimeChanged DESC',
    (error, results, fields) =>{
      if(error) {
        console.error("db query error", error);
      }
      else {
        userData = results;
        let currentUser;
        let mysqlDateTime;
        for(let i = 0; i < userData.length; i++){
          currentUser = userData[i];
          let calculatedNutrition = nutritionCalculator(userData[i]);
          mysqlDateTime = getCurrentTime(); //this is a way to get the current date and time and format it so it will go into a datetime column in mysql correctly
          let query = "INSERT INTO dailyNutritionTable (userTable_id, caloriesGoal, carbsGoal, proteinGoal, fatsGoal, dateCalculated)  VALUES (?, ?, ?, ?, ?, ?)"
          let values = [currentUser.userTable_id, calculatedNutrition.dailyCalories || null, calculatedNutrition.gramsCarbs || null, calculatedNutrition.gramsProtein || null, calculatedNutrition.gramsFat || null, mysqlDateTime || null]
          pool.query(query, values, (error, results) =>{
            if(error){
              console.error(error);        
            }
            else{
              //continue loop as normal
            }
          }) 
        }
      }
  }); //End of pool query

  //Calculates the daily calories and macronutrients for a user based on weight and goal
  function nutritionCalculator(userData){
    let goalName = userData.goalName;
    let userWeight = userData.userWeight;
    let maintenanceCalories = userWeight*14;
    const carbCalories = 4;
    const proteinCalories = 4;
    const fatCalories = 9;

    let dailyNutritionIntake = {
      dailyCalories: null,
      gramsCarbs: null,
      gramsProtein: null,
      gramsFat: null
    }

    if(goalName === "Weight Loss"){ //40% carbs, 35% protein, 25% fat
      dailyNutritionIntake.dailyCalories = maintenanceCalories-500;
      dailyNutritionIntake.gramsCarbs = (Math.round(dailyNutritionIntake.dailyCalories*.40/carbCalories));
      dailyNutritionIntake.gramsProtein = (Math.round(dailyNutritionIntake.dailyCalories*.35/proteinCalories));
      dailyNutritionIntake.gramsFat = (Math.round(dailyNutritionIntake.dailyCalories*.25/fatCalories));

      return(dailyNutritionIntake)
    }
    else if(goalName === "Weight Gain"){ //40% carbs, 30% protein, 30% fat
      dailyNutritionIntake.dailyCalories = maintenanceCalories+500;
      dailyNutritionIntake.gramsCarbs = (Math.round(dailyNutritionIntake.dailyCalories*.40/carbCalories));
      dailyNutritionIntake.gramsProtein = (Math.round(dailyNutritionIntake.dailyCalories*.30/proteinCalories));
      dailyNutritionIntake.gramsFat = (Math.round(dailyNutritionIntake.dailyCalories*.30/fatCalories));

      return(dailyNutritionIntake)
    }
    else{ //Default case for 'health' (maintain weight) //50% carbs, 25% protein, 25% fat
      dailyNutritionIntake.dailyCalories = maintenanceCalories;
      dailyNutritionIntake.gramsCarbs = (Math.round(dailyNutritionIntake.dailyCalories*.50/carbCalories));
      dailyNutritionIntake.gramsProtein = (Math.round(dailyNutritionIntake.dailyCalories*.25/proteinCalories));
      dailyNutritionIntake.gramsFat = (Math.round(dailyNutritionIntake.dailyCalories*.25/fatCalories));
      return(dailyNutritionIntake)
    }
  }
}

const getDailyRecommendedNutrition = async function(req, res){
  const dateAccessed = req.query.dateAccessed;
  const userID = req.user.id;
  pool.query(
  'SELECT caloriesGoal, carbsGoal, proteinGoal, fatsGoal, dateCalculated ' +
  'FROM dailyNutritionTable ' +
  'WHERE userTable_id = ? '+
  'AND DATE(dateCalculated) = ? '+
  'ORDER BY dateCalculated DESC '+
  'LIMIT 1',
  [userID, dateAccessed],
  (error, results, fields) =>{
    if(error){
      console.error("db query error", error);
      res.status(500).send("Error fetching foods from database");
    }
    else{
      res.status(200).json(results);
    }
  })
}
app.post('/logNutrition', jwtVerify, logNutrition);
app.get('/getFoods', jwtVerify, getFoods);
app.get('/getUserNutritionLog', jwtVerify, getUserNutritionLog);
app.get('/getDailyRecommendedNutrition', jwtVerify, getDailyRecommendedNutrition)
{/*
  * END OF SECTION: NUTRITION
*/}










{/*
* === SECTION START: EXERCISES ===
* This section is all related to the exercise tables in the database.
* Methods in this section:
*  -/getExercises
*  -/createExercises
*  -/logExercises
*  -/getUserExerciseLog
*/}
//Returns exercises that are stored in the database. These may be filtered by muscleGroups and will also show exercises created by users.
const getExercises = async function(req, res){
  //in the request, have there be a musclegroup variable, so data can be sorted by muscle groups
  //have some sort of method to send users workout they have created as well
  const userID = req.user.id;

  //Will return every exercise, including ones made by the user, with a filter for what muscle group they are search for (if one exists)
  if(req.query.muscleGroup){
    pool.query(
      'SELECT exerciseTable.exerciseTable_id, exerciseTable.exerciseName, exerciseTable.muscleGroup ' +
      'FROM exerciseTable ' +
      'LEFT JOIN userTable ON exerciseTable.createdBy = userTable.userTable_id ' + //Joins all values from exerciseTable and when there is a match between the userTable_id and the createdBy columns & only if they match muscleGroup filter
      'WHERE (userTable.userTable_id = ? AND exerciseTable.muscleGroup = ?) ' +
      'OR (exerciseTable.createdBy IS NULL AND exerciseTable.muscleGroup = ?)', //Also gets every exercise that shows a NULL value in createdBy column & only if they match muscleGroup filter
      [userID, req.query.muscleGroup, req.query.muscleGroup], 
      (error, results, fields) => { 
        if(error){
          // Handle the error
          console.error("db query error", error);
          res.status(500).send("Error fetching exercises from database");
        } 
        else{
            // Process the results
            res.status(200).json(results)
          }
    });
  }
  else{
    //Will return every exercise, including ones created by the user
    pool.query(
      'SELECT exerciseTable.exerciseTable_id, exerciseTable.exerciseName, exerciseTable.muscleGroup ' +
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
          res.status(200).json(results)
        }
    });
  }
}

const createExercises = async function(req, res){
  const userID = req.user.id;
  {/* Write a checker to see if the information inserted is appropriate for the DB columns */}
  let exercise = req.body;
  const query = "INSERT INTO exerciseTable (exerciseName, muscleGroup, createdBy) VALUES (?, ?, ?)"
  const values = [exercise.exerciseName || null, exercise.muscleGroup, userID ]
  pool.query(query, values, (error, results) =>{
    if(error){
      console.error(error);
      res.status(500).send("Error creating exercise");
    }
    else{
      res.status(200).json({
        message:"exercise created"
    })
    }
  })
}

//allows the use of the exercises page to log exercises for the user
const logExercises = async function(req, res) {    
  const userID = req.user.id;
  const exerciseLog = req.body;
  const getIDQuery = "SELECT exerciseTable_id from exerciseTable WHERE exerciseName = ? AND (createdBy = ? OR createdBy IS NULL)";
  let exerciseID;
  pool.query(getIDQuery, [exerciseLog.exerciseName, userID], (error, results) =>{
    if(error){
      console.error(error);
      res.status(500).send("Error logging exercise to database");
    }
    else if(results.length>0){
        exerciseID = results[0].exerciseTable_id;
        const query = "INSERT INTO user_exerciseTable (userTable_id, exerciseTable_id, timeStarted, timeCompleted, reps, sets, weight)  VALUES (?, ?, ?, ?, ?, ?, ?)"
        const values = [userID, exerciseID || null, exerciseLog.timeStarted || null, exerciseLog.timeCompleted || null, exerciseLog.reps ||null, exerciseLog.sets ||null, exerciseLog.weight]
        pool.query(query, values, (error, results) =>{
          if(error){
            console.error(error);
            res.status(500).send("Error logging exercise to database");
          }
          else{
            res.status(200).json({
              message: "exercise log successful",
            });      
          }
        });
    }
    else{
      res.status(500).send("Error logging exercise to database, no exercise by that name");
    }
  })

}

const getUserExerciseLog = async function(req, res) {
  const userID = req.user.id;

  //Need to do a left join on workoutsTable so names for the workouts can be attatched
  pool.query(
  'SELECT muscleGroup ' +
  'FROM user_exercise_workoutTable ' +
  'LEFT JOIN exerciseTable ON exerciseTable.exerciseTable_id = user_exercise_workoutTable.exerciseTable_id '+
  'WHERE userTable_id = ? '+
  'ORDER BY muscleGroup DESC ',
  [userID],
  (error, results, fields) =>{
    if(error){
      console.error("db query error", error);
      res.status(500).send("Error fetching exercise log from database");
    }
    else{
      res.status(200).json(results)
    }
  })
}
app.get('/getExercises', jwtVerify, getExercises);
app.post('/createExercises', jwtVerify, createExercises);
app.post('/logExercises', jwtVerify, logExercises);
app.get('/getUserExerciseLog', jwtVerify, getUserExerciseLog);
{/*
  * END OF SECTION: EXERCISES
*/}







{/*
* === SECTION START: WORKOUTS ===
* This section is all related to the workouts tables in the database.
* Methods in this section:
*  -/getWorkouts
*  -/logWorkotus
*  -/getUserWorkoutLog
*  -/getUserWorkoutLogByDate
*  -/createWorkouts
*  -/createWorkoutWithExercises
*/}
const getWorkouts = async function(req, res){
  const userID = req.user.id;
  
  {/* This query returns every workout from the workoutTable as well as every iteration of where it appears within workout_exerciseTable. 
  It also shows every exercise that the workoutTable_id is associated with.
  This data is used in the else statement to create the object that will be sent to the frontend*/}
  pool.query( 
    `SELECT workoutTable.workoutTable_id, workoutTable.workoutName, workoutTable.workoutDescription, workoutTable.createdBy, 
            exerciseTable.exerciseTable_id, exerciseTable.exerciseName, exerciseTable.muscleGroup 
     FROM workoutTable
     LEFT JOIN workout_exerciseTable ON workoutTable.workoutTable_id = workout_exerciseTable.workoutTable_id
     LEFT JOIN exerciseTable ON workout_exerciseTable.exerciseTable_id = exerciseTable.exerciseTable_id
     WHERE workoutTable.createdBy = ? OR workoutTable.createdBy IS NULL`,
    [userID], 
    (error, results, fields) => {   
      if(error){
        console.error("db query error", error);
        res.status(500).send("Error fetching workouts from database");
      }
      else {
        // Initialize workouts as an empty object
        const workoutsMap = results.reduce((accumulator, current) => {
          // Check if the workout has already been processed
          if (!accumulator[current.workoutTable_id]) {
            // If not, create a new workout object
            accumulator[current.workoutTable_id] = {
              workoutTable_id: current.workoutTable_id,
              workoutName: current.workoutName,
              createdBy: current.createdBy,
              description: current.workoutDescription, // assuming you want to include this
              exercises: [] // Initialize exercises as an empty array
            };
          }
          // Add exercises to the workout object if they exist
          if (current.exerciseTable_id) {
            accumulator[current.workoutTable_id].exercises.push({
              id: current.exerciseTable_id,
              name: current.exerciseName,
              muscleGroup: current.muscleGroup
            });
          }
          return accumulator;
        }, {}); // The initial value is an empty object
      
        // Convert the workouts object into an array
        const workoutsArray = Object.values(workoutsMap);
      
        // Send the array of workouts to the frontend
        res.status(200).json(workoutsArray);
      }
      
  });
}


  const createWorkouts = async function(req, res){
    const userID = req.user.id;
    {/* Write a checker to see if the information inserted is appropriate for the DB columns */}
    let workout = req.body;
    const query = "INSERT INTO workoutTable (workoutName, workoutDescription, createdAt, createdBy) VALUES (?, ?, ?, ?)"
    const values = [workout.workoutName || null, workout.workoutDescription || null, getCurrentTime(), userID ]
    pool.query(query, values, (error, results) =>{
      if(error){
        console.error(error);
        res.status(500).send("Error creating workout");
      }
      else{
        res.status(200).json({
          message:"workout created"
      })
      }
    })
  }

  const createWorkoutsWithExercises = async function(req, res){
    const userID = req.user.id;
    let workout = req.body;
    const query = "INSERT INTO workoutTable (workoutName, workoutDescription, createdAt, createdBy) VALUES (?, ?, ?, ?)"
    const values = [workout.workoutName || null, workout.workoutDescription || null, getCurrentTime(), userID ]
    pool.query(query, values, (error, results) =>{
      if(error){
        console.error(error);
        res.status(500).send("Error creating workout");
      }
      else{
        let workoutID = results.insertId;
        for(let i = 0; i < workout.exercises.length; i++){
          //First, find the exercise id
          pool.query("SELECT exerciseTable.exerciseTable_id FROM exerciseTable WHERE exerciseName = ?", [workout.exercises[i]], (error, results)=>{
            if(error){
              console.error(error);
              res.status(500).send("Error creating workout");
            }
            else{
              let exerciseTableId = results[0].exerciseTable_id;
              pool.query("INSERT INTO workout_exerciseTable (workoutTable_id, exerciseTable_id, dateTimeChanged) VALUES (?, ?, ?) ", [workoutID, exerciseTableId, getCurrentTime()], (error, results)=>{
                if(error){
                  console.error(error);
                  res.status(500).send("Error creating workout");
                }
              })
            }
          })
        }

        //if full success
        res.status(200).json({
          message:"workout created"
      })
      }
    })
  }

//allows the use of the exercises page to log exercises for the user
const logWorkouts = async function(req, res) {    
  //write insert statements for the user
  const userID = req.user.id;
  const workoutLog = req.body;
  const query = "INSERT INTO user_workoutTable (userTable_id, workoutTable_id, timeStarted, timeCompleted)  VALUES (?, ?, ?, ?)"
  const values = [userID, workoutLog.workoutTable_id || null, workoutLog.timeStarted || null, workoutLog.timeCompleted || null]
  pool.query(query, values, (error, results) =>{
    if(error){
      console.error(error);
      res.status(500).send("Error logging workout to database");

    }
    else{
      res.status(200).json({
        message: "logWorkouts successful",
      });      
    }
  });
}

const logCompleteWorkout = async function(req, res) {
  function getWorkoutID(workoutName){
    return new Promise((resolve, reject) =>{
      let query = "SELECT workoutTable_id from workoutTable WHERE workoutName = ?";
      let values = [workoutName]

      pool.query(query, values, (error, results) =>{
        if(error){
          console.error(error)
          reject(error);
        }
        else{
          resolve(results[0].workoutTable_id);
        }
      })
    })
  }
  function getExerciseID(exercises) {
    return new Promise((resolve, reject) => {
      let promises = exercises.map(exercise => {
        return new Promise((res, rej) => {
          let query = "SELECT exerciseTable_id from exerciseTable WHERE exerciseName = ?";
          let values = [exercise.exerciseName];
          pool.query(query, values, (error, results) => {
            if(error){
              console.error(error);
              rej(error);
            } 
            else{
              res(results[0].exerciseTable_id);
            }
          });
        });
      });
  
      Promise.all(promises)
        .then(exerciseIDs => {
          resolve(exerciseIDs);
        })
        .catch(error => {
          console.error("Error in querying exercise IDs", error);
          reject(error);
        });
    });
  }

  //write insert statements for the user
  const userID = req.user.id;
  const workoutObject = req.body;
  const exercises = workoutObject.exercises;

  const workoutID = await getWorkoutID(workoutObject.workoutName);
  const exerciseIDs = await getExerciseID(exercises);

  //First, insert into user_workoutTable
  const uwTQuery = "INSERT INTO user_workoutTable (userTable_id, workoutTable_id, timeCompleted, rating, duration) VALUES (?,?,?,?,?)"
  const uwtValues = [userID, workoutID, workoutObject.timeCompleted, workoutObject.rating, workoutObject.duration]
  pool.query(uwTQuery, uwtValues, (error, results)=>{
    if(error){
      console.error(error);
      res.status(500).send("Error inserting workout to database");
    }
    else{ //if succesfully logged the workout, start logging the exercises
      let uwtInsertID = results.insertId;
      for(let i = 0; i < exerciseIDs.length; i++){
        const uewtQuery = "INSERT INTO user_exercise_workoutTable (exerciseTable_id, userWorkoutTable_id, userTable_id) VALUES (?,?,?)"
        const uewtValues = [exerciseIDs[i], uwtInsertID, userID]
        pool.query(uewtQuery, uewtValues, (error, results)=>{
          if(error){
            console.error(error);
            res.status(500).send("Error inserting exercise to database");
          }
          else{
            let uewtInsertID = results.insertId;
            for(let k = 0; k < exercises[i].sets.length; k++){
              let currentSet = exercises[i].sets[k];
              const sitQuery = "INSERT INTO set_infoTable (user_exercise_workoutTable_id, setNumber, reps, weight) VALUES (?,?,?,?)";
              const sitValues = [uewtInsertID, currentSet.setNumber, currentSet.reps, currentSet.weight]
              pool.query(sitQuery, sitValues, (error, results)=>{
                if(error){
                  console.error(error);
                  res.status(500).send("Error set info to database");
                }
                else{
                  //continue
              }
              })
            }
          }
        })
      }
      res.status(200).json({
        message:"workout insert created"
      })
    }
  })


}

const getCompleteWorkoutLogByDate = async function(req, res){
  const date = req.query.dateAccessed;
  const userID = req.user.id;

  const query = `
    SELECT 
      uw.userWorkoutTable_id,
      wt.workoutName, 
      uw.rating, 
      uw.duration, 
      uw.timeCompleted, 
      et.exerciseName, 
      sit.setNumber, 
      sit.reps, 
      sit.weight
    FROM user_workoutTable uw
    LEFT JOIN workoutTable wt ON uw.workoutTable_id = wt.workoutTable_id
    LEFT JOIN user_exercise_workoutTable uet ON uw.userWorkoutTable_id = uet.userWorkoutTable_id
    LEFT JOIN exerciseTable et ON uet.exerciseTable_id = et.exerciseTable_id
    LEFT JOIN set_infoTable sit ON uet.user_exercise_workoutTable_id = sit.user_exercise_workoutTable_id
    WHERE uw.userTable_id = ? AND DATE(uw.timeCompleted) = ?
    ORDER BY uw.timeCompleted DESC, uet.exerciseTable_id, sit.setNumber;`;

  pool.query(query, [userID, date], (error, results, fields) => {
    if(error){
      console.error("db query error", error);
      res.status(500).send("Error fetching workout log from database");
    } 
    else{
      //creates a workouts object that contains all the workouts logged on this day by reducing the results object
      const workouts = results.reduce((workoutsAcc, cur) => {
        //finds workouts in the results object
        let workout = workoutsAcc.find(w => w.userWorkoutTable_id === cur.userWorkoutTable_id);
        if (!workout) {//creates a workout object if one does not exist
          workout = {
            userWorkoutTable_id: cur.userWorkoutTable_id,//used to distinguish between workout instances
            workoutName: cur.workoutName,
            rating: cur.rating,
            duration: cur.duration,
            date: cur.timeCompleted, 
            exercises: [],
          };
          workoutsAcc.push(workout);
        }
        
        //finds exercising that belong to the current workout
        let exercise = workout.exercises.find(e => e.exerciseName === cur.exerciseName);
        if (!exercise) { //creates an exercise object if one does not exist
          exercise = {
            exerciseName: cur.exerciseName,
            sets: [],
          };
          workout.exercises.push(exercise);
        }
        
        //pushes the set info into the exercise array (this should be included in every exercise? Check in future, leave be for right now as it works for the moment)
        exercise.sets.push({
          setNumber: cur.setNumber,
          reps: cur.reps,
          weight: cur.weight,
        });

        return workoutsAcc;
      }, []);
      //sends the completed workouts object to the frontend
      res.status(200).json(workouts);
    }
  });
};

const getUserWorkoutLog = async function(req, res) {
  const page = (parseInt(req.query.page)*5)-5;
  const userID = req.user.id;

  //Need to do a left join on workoutsTable so names for the workouts can be attatched
  pool.query(
  'SELECT * ' +
  'FROM user_workoutTable ' +
  'LEFT JOIN workoutTable ON user_workoutTable.workoutTable_id = workoutTable.workoutTable_id ' +
  'WHERE userTable_id = ? '+
  'ORDER BY timeCompleted DESC '+
  'LIMIT ?, 6', //DATE(dateTimeConsumed) extracts only the date from dateTimeConsumed column
  [userID, page],
  (error, results, fields) =>{
    if(error){
      console.error("db query error", error);
      res.status(500).send("Error fetching workout log from database");
    }
    else{
      res.status(200).json(results)
    }
  })
}
const getUserWorkoutLogByDate = async function(req, res) {
  const date = req.query.dateAccessed;
  const userID = req.user.id;

  pool.query(
    'SELECT * ' +
    'FROM user_workoutTable ' +
    'LEFT JOIN workoutTable ON user_workoutTable.workoutTable_id = workoutTable.workoutTable_id ' +
    'WHERE userTable_id = ? ' +
    'AND DATE(timeCompleted) = ? ' +
    'ORDER BY timeCompleted DESC ',
    [userID, date],
    (error, results, fields) => {
      if(error){
        console.error("db query error", error);
        res.status(500).send("Error fetching workout log from database");
      }
      else{
        // Map the results to the desired format
        const workoutsArray = results.map(item => ({
          userWorkoutTable_id: item.userWorkoutTable_id,
          workoutName: item.workoutName,
          timeCompleted: item.timeCompleted
        }));

        // Sends the array of workouts to the frontend
        res.status(200).json(workoutsArray);
      }
    }
  );
}
//Allows users to insert exercises into a workout assuming it has been made by them
const insertExerciseIntoWorkout = async function(req, res){
  {/* Write a checker to see if the information inserted is appropriate for the DB columns */}
  let parameters = req.body;
  const query = "INSERT INTO workout_exerciseTable (workoutTable_id, exerciseTable_id, dateTimeChanged) VALUES (?, ?, ?)"
  const values = [parameters.workoutTable_id, parameters.exerciseTable_id, getCurrentTime()]
  pool.query(query, values, (error, results) =>{
    if(error){
      console.error(error);
      res.status(500).send("Error inserting into workout");
    }
    else{
      res.status(200).json({
        message:"workout insert created"
    })
    }
  })
}


app.get('/getWorkouts', jwtVerify, getWorkouts);
app.post('/createWorkouts', jwtVerify, createWorkouts);
app.get('/getUserWorkoutLog', jwtVerify, getUserWorkoutLog);
app.get('/getUserWorkoutLogByDate', jwtVerify, getUserWorkoutLogByDate);
app.get('/getCompleteWorkoutLogByDate', jwtVerify, getCompleteWorkoutLogByDate);

app.post('/logWorkouts', jwtVerify, logWorkouts);
app.post('/logCompleteWorkout', jwtVerify, logCompleteWorkout);
app.post('/insertExerciseIntoWorkout', jwtVerify, insertExerciseIntoWorkout)
app.post('/createWorkoutsWithExercises', jwtVerify, createWorkoutsWithExercises)

{/*
  * END OF SECTION: WORKOUTS
*/}






{/*
* === SECTION START: WEIGHT ===
* This section is all related to the tables in the database regarding weight.
* Methods in this section:
*  -/logWeight
*/}
const logWeight = async function(req, res) {    
  //Write a validation schema later for this function
  const userID = req.user.id;
  const weightLog = req.body;
  const values = [userID, weightLog.userWeight, weightLog.dateTimeChanged];
  const query = "INSERT INTO userWeightTable (userTable_id, userWeight, dateTimeChanged)  VALUES (?, ?, ?)"
  pool.query(query, values, (error, results) =>{
    if(error){
      console.error(error);
      res.status(500).json({
        message: "error logging weight",
      });
    }
    else{
      dailyNutritionTableCalculator();
      res.status(200).json({
        message: "weight log successful",
      });
    }
  });
}
const getUserWeightLog = async function(req, res) {
  //const page = (parseInt(req.query.page)*5)-5;
  const userID = req.user.id;

  pool.query(
  'SELECT userWeightTable.userWeight AS weight, userWeightTable.dateTimeChanged ' +
  'FROM userWeightTable ' +
  'WHERE userTable_id = ? '+
  'ORDER BY dateTimeChanged ASC',
  [userID],
  (error, results, fields) =>{
    if(error){
      console.error("db query error", error);
      res.status(500).send("Error fetching weight log from database");
    }
    else{

      for(let i = 0; i < results.length; i++){
        results[i].dateTimeChanged = results[i].dateTimeChanged.toISOString().split('T')[0];
      }
      res.status(200).json({
        results,
        message:"Successfully fetched user's weight log"
      })
    }
  })
}
const getUserWeightLogByDate = async function(req, res) {
  //const page = (parseInt(req.query.page)*5)-5;
  const userID = req.user.id;;
  const dateAccessed = req.query.dateAccessed

  pool.query(
  'SELECT userWeightTable.userWeight AS weight ' +
  'FROM userWeightTable ' +
  'WHERE userTable_id = ? '+
  'AND DATE(dateTimeChanged) = ? '+
  'LIMIT 1',
  [userID, dateAccessed],
  (error, results, fields) =>{
    if(error){
      console.error("db query error", error);
      res.status(500).send("Error fetching weight log from database");
    }
    else{
      if(results.length !== 0){
        res.status(200).json({
          results,
          message:"Successfully fetched user's weight log"
        })
    }
    else{
      res.status(200).json({
        results:{
          0:{
            weight:0,
          },
          length:0,
        },
        message:"Successfully fetched user's weight log"
      })
      
    }
    }
  })
}
app.post('/logWeight', jwtVerify, logWeight);
app.get('/getUserWeightLog', jwtVerify, getUserWeightLog);
app.get('/getUserWeightLogByDate', jwtVerify, getUserWeightLogByDate)
{/*
  * END OF SECTION: WEIGHT
*/}







