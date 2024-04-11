import { useEffect, useState, useContext } from 'react';
import './NutritionPage.css'
import axios from 'axios';
import NutrientContainer from './NutrientContainer';
import LogNutritionForm from './LogNutritionForm'
import { HttpPopupContext } from '../../components/HttpPopupContext';

function NutritionPage() {

  const [nutritionLog, setNutritionLog] = useState({ proteinConsumed:"0", carbsConsumed:"0", fatsConsumed:"0"});
  const [nutritionGoal, setNutritionGoal] = useState({ proteinGoal:"0", carbsGoal:"0", fatsGoal:"0"});
  const token = localStorage.getItem("jwt")
  
  const {response} = useContext(HttpPopupContext);

  const [goal, setGoal] = useState("Health");
  const [weight, setWeight] = useState(0);


  let curr = new Date();
  curr.setDate(curr.getDate());
  let currentDate = curr.toISOString().substring(0,10);
  const [date, setDate] = useState(currentDate)
  const [minDate, setMinDate] = useState();


  //This useEffect is used to get the user's nutrition log for the current select date as well as the systems recommended nutrition for that date
  useEffect(()=>{
    const fetchRecommendedNutritionByDate = async () =>{
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
    const fetchNutritionLogByDate = async () =>{
      try {
        let endpoint = "https://capstone.parkert.dev/backend/getUserNutritionLog?dateAccessed="+encodeURIComponent(date)
        const response = await axios.get(endpoint, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
        setNutritionLog(response.data  || { proteinConsumed:"0", carbsConsumed:"0", fatsConsumed:"0"});
      }
        catch (error) {
        console.error('Error fetching data: ', error);
      }
    }
    fetchRecommendedNutritionByDate();
    fetchNutritionLogByDate();
  }, [date, response])


  const [showlogNutritionForm, setShowLogNutritionForm] = useState(false); //Used to hide the nutrition form



  //This useEffect gets the user's most recent weight as well as their goal from the backend
  useEffect(() =>{
    const fetchWeight = async () =>{
      try {
        const response = await axios.get("https://capstone.parkert.dev/backend/getUserWeightLog", {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
        let length = response.data.results.length-1;
        setWeight(response.data.results[length].weight)
        setMinDate(response.data.results[0].dateTimeChanged);
      }
      catch (error) {
        console.error('Error fetching data: ', error);
      }

    }
    const fetchGoal = async () =>{
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
    }

    fetchWeight();
    fetchGoal();
  },[])

  return (
    <div className="NutritionPage">
      
      <div className='NutritionPageTopRow'>

        <div className='NutritionPageTopRowGoal'>
          <div><p>Calories Needed:</p> <p>{nutritionGoal.caloriesGoal}</p></div>
          <div><p>Calories Consumed:</p> <p>{nutritionLog.caloriesConsumed}</p></div>
        </div>

        <div className='NutritionPageTopRowMiddle'>
          <input type='date' onChange={((event)=>setDate(event.target.value))} defaultValue={date} max={currentDate} min={minDate}></input>
          <button onClick={(()=> setShowLogNutritionForm(!showlogNutritionForm))}>Log Nutrition</button>
        </div>
        
        <div className='NutritionPageTopRowWeight'>
          <div><p>Your Goal:</p> <p>{goal}</p></div>
          <div><p>Latest Weight:</p> <p>{weight}</p></div>
        </div>

      </div>

        {/*This block of code below hides or shows information on the page depending on if the button coded above has been clicked */}
        {
          showlogNutritionForm ? 
            <LogNutritionForm date={date} setShowLogNutritionForm={setShowLogNutritionForm}/> 
          : 
          <div className='NutritionContainerRow'>
            <NutrientContainer containerName="Protein" goalValue={nutritionGoal.proteinGoal} remainingValue={1} loggedCount={nutritionLog.proteinConsumed} backgroundColor={"rgb(255,204,204)"}/>
            <NutrientContainer containerName="Carbs" goalValue={nutritionGoal.carbsGoal} loggedCount={nutritionLog.carbsConsumed} backgroundColor={"rgb(204,255,204)"}/>
            <NutrientContainer containerName="Fats" goalValue={nutritionGoal.fatsGoal} remainingValue={1} loggedCount={nutritionLog.fatsConsumed} backgroundColor={"rgb(204,255,255)"}/>
          </div>
        }
    </div>
  );
}

export default NutritionPage;
