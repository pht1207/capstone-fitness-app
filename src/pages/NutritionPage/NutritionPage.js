import { useEffect, useState } from 'react';
import './NutritionPage.css'
import axios from 'axios';
import NutrientContainer from './NutrientContainer';
import LogNutritionForm from './LogNutritionForm'

function NutritionPage() {

  const [nutritionLog, setNutritionLog] = useState({ proteinConsumed:"0", carbsConsumed:"0", fatsGoal:"0"});
  const [nutritionGoal, setNutritionGoal] = useState({ proteinGoal:"0", carbsGoal:"0", fatsGoal:"0"});
  const token = localStorage.getItem("jwt")
  
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
        console.log("logged values: ");
        console.log(response.data);
      }
        catch (error) {
        console.error('Error fetching data: ', error);
      }
    }
    fetchData();
  }, [date]);



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
        console.log("recommended: "+response.data)
      }
        catch (error) {
        console.error('Error fetching data: ', error);
      }
    }
    fetchData();
  }, [date]);


  const [showlogNutritionForm, setShowLogNutritionForm] = useState(false);



  return (
        <div className="NutritionPage">
          <input type='date' onChange={((event)=>setDate(event.target.value))} defaultValue={date}></input>
          <button onClick={(()=> setShowLogNutritionForm(!showlogNutritionForm))}>Log Nutrition</button>
          {showlogNutritionForm ? <LogNutritionForm date={date}/> : <></>}

          <div className='NutrientContainerRow'>
            <NutrientContainer containerName="Protein" goalValue={nutritionGoal.proteinGoal} remainingValue={1} loggedCount={nutritionLog.proteinConsumed} backgroundColor={"rgb(255,204,204)"}/>
            <NutrientContainer containerName="Carb" goalValue={nutritionGoal.carbsGoal} loggedCount={nutritionLog.carbsConsumed} backgroundColor={"rgb(204,255,204)"}/>
            <NutrientContainer containerName="Fat" goalValue={nutritionGoal.fatsGoal} remainingValue={1} loggedCount={nutritionLog.fatsConsumed} backgroundColor={"rgb(204,255,255)"}/>
          </div>

        </div>
  );
}

export default NutritionPage;
