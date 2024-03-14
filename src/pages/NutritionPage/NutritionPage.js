import { useEffect, useState, useContext } from 'react';
import './NutritionPage.css'
import axios from 'axios';
import NutrientContainer from './NutrientContainer';
import LogNutritionForm from './LogNutritionForm'
import { HttpPopupContext } from '../../components/HttpPopupContext';

function NutritionPage() {

  const [nutritionLog, setNutritionLog] = useState({ proteinConsumed:"0", carbsConsumed:"0", fatsGoal:"0"});
  const [nutritionGoal, setNutritionGoal] = useState({ proteinGoal:"0", carbsGoal:"0", fatsGoal:"0"});
  const token = localStorage.getItem("jwt")
  
  const {response} = useContext(HttpPopupContext);


  let curr = new Date();
  curr.setDate(curr.getDate() + 3);
  let currentDate = curr.toISOString().substring(0,10);
  const [date, setDate] = useState(currentDate)

  useEffect(() => {//This useEffect gets the user's nutrition log when the date is changed to a valid date value
    const fetchData = async () => {
      try {
        let endpoint = "https://capstone.parkert.dev/backend/getUserNutritionLog?dateAccessed="+date
        const response = await axios.get(endpoint, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
        setNutritionLog(response.data  || { proteinConsumed:"0", carbsConsumed:"0", fatsGoal:"0"});
      }
        catch (error) {
        console.error('Error fetching data: ', error);
      }
    }
    fetchData();
  }, [date, response]); //Called if date is called or if form is submitted (response changes)

  useEffect(() => {//This useEffect gets the user's suggessted nutrition values when the date is changed to a valid date value
    const fetchData = async () => {
      try {
        let endpoint = "https://capstone.parkert.dev/backend/getDailyRecommendedNutrition?dateAccessed="+date
        const response = await axios.get(endpoint, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
        setNutritionGoal(response.data[0] || { proteinGoal:"0", carbsGoal:"0", fatsGoal:"0"});
      }
        catch (error) {
        console.error('Error fetching data: ', error);
      }
    }
    fetchData();
  }, [date, response]); //Called if date is called or if form is submitted (response changes)


  const [showlogNutritionForm, setShowLogNutritionForm] = useState(false); //Used to hide the nutrition form


  {/* Instructions for additions to this page

  
  To start, write all your code BELOW this block of comments. Don't delete or change anything above
  
  Your code needs to be written in React, do not write it on an HTML page and try and make it work by copying and pasting it here, it will not work.
  
  Look into what useEffect is. There will be one written below this comment block.
    - On a very basic level, useEffect runs code that you write inside it when the page is loaded.

  Currently there are a few missing values in this page that need to be filled in.
    -Two of these values are: Calories Needed and Calories Consumed.
      -Both of these can be found via nutritionLog.caloriesConsumed and nutritionGoal.caloriesGoal
        -You just need to replace the {1} with both of those variables, this is just to show you how it is done
  
  The other two missing values are the user's latest weight and the user's goal.
    -To do this, you will need to use two GET requests to the backend. One for the user's goal and one for the user's latest weight.
      -Calls to the backend for these values have already been done in both ProfilePage.js and LogWeight.js
        -LogWeight.js has the https://capstone.parkert.dev/backend/getUserWeightLog
          -This will return every log the user has ever made of their weight. You just need the most recent, so do results[0] and store that.
        -ProfilePage.js has the https://capstone.parkert.dev/backend/getProfileData which will return the users profile data, the goal is included in that.
    -As a tip, it is almost as simple as copying and pasting the entire useEffect from each of those pages. It will also be easier to start with getProfileData.
      -You will store the values from the response object using setGoal() and setWeight(). This will update the 'goal' and 'weight' variables respectively.
        -These are setter methods. You cannot update the values of goal and weight by just doing goal = x or weight = y.
          -You will have to do setGoal(response.data.[0].goalName) to change the value of goal. This is done similarly to weight.

  Another tip, when you call these backend methods, doing console.log(response) will make understanding the data easier.
    -If you don't know what you're working with, it's very difficult to understand what is going on
 */}

 const [goal, setGoal] = useState("default value");
 const [weight, setWeight] = useState(0);

 //write your useeffects here
 useEffect(() => {
  const fetchData = async () => { 
    try {
      const response = await axios.get("https://capstone.parkert.dev/backend/getProfileData", {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      setGoal(response.data[0].goalName);
    }
      catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  fetchData();
}, []);

//log weight useEffect - Josiah
useEffect(() => {
  const fetchData = async () => { 
    try {
      const response = await axios.get("https://capstone.parkert.dev/backend/getUserWeightLogByDate?dateAccessed="+date, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      //setWeight(response.data[0].weightName);
      console.log("Below is the response data for getUserWeightLogByDate: ")
      console.log(response.data.results[0])
    }
      catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  fetchData();
}, [date]);

  return (
    <div className="NutritionPage">
      
      <div className='NutritionPageTopRow'>

        <div className='NutritionPageTopRowGoal'>
          <div><p>Calories Needed:</p> <p>{nutritionGoal.caloriesGoal}</p></div> {/* Replace 1 with nutritionGoal.caloriesGoal*/}
          <div><p>Calories Consumed:</p> <p>{nutritionLog.caloriesConsumed}</p></div> {/* Replace 1 with nutritionLog.caloriesConsumed */}
        </div>

        <div className='NutritionPageTopRowMiddle'>
          <input type='date' onChange={((event)=>setDate(event.target.value))} defaultValue={date}></input>
          <button onClick={(()=> setShowLogNutritionForm(!showlogNutritionForm))}>Log Nutrition</button>
        </div>
        
        <div className='NutritionPageTopRowWeight'>
          <div><p>Your Goal:</p> <p>{goal}</p></div> {/* Put the data gathered from your useeffects here */}
          <div><p>Latest Weight:</p> <p>{weight}</p></div> {/* Put the data gathered from your useeffects here */}
        </div>

      </div>

        {/*This block of code below hides or shows information on the page depending on if the button coded above has been clicked */}
        {
          showlogNutritionForm ? 
            <LogNutritionForm date={date}/> 
          : 
          <div className='NutritionContainerRow'>
            <NutrientContainer containerName="Protein" goalValue={nutritionGoal.proteinGoal} remainingValue={1} loggedCount={nutritionLog.proteinConsumed} backgroundColor={"rgb(255,204,204)"}/>
            <NutrientContainer containerName="Carb" goalValue={nutritionGoal.carbsGoal} loggedCount={nutritionLog.carbsConsumed} backgroundColor={"rgb(204,255,204)"}/>
            <NutrientContainer containerName="Fat" goalValue={nutritionGoal.fatsGoal} remainingValue={1} loggedCount={nutritionLog.fatsConsumed} backgroundColor={"rgb(204,255,255)"}/>
          </div>
        }
    </div>
  );
}

export default NutritionPage;
