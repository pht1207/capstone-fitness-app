import { useEffect, useState, useContext } from 'react';
import './NutritionPage.css'
import axios from 'axios';
import { HttpPopupContext } from '../../components/HttpPopupContext';


function NutrientContainer(props) {
const [date, setDate] = useState(props.date);
const [caloriesConsumed, setCaloriesConsumed] = useState(0);
const [proteinCosumed, setProteinConsumed] = useState(0);
const [carbsConsumed, setCarbsConsumed] = useState(0);
const [fatsConsumed, setFatsConsumed] = useState(0);

const {setResponse} = useContext(HttpPopupContext);

 async function formSubmitted(event){


  event.preventDefault();
  try{
    let body = {
      caloriesConsumed:caloriesConsumed,
      carbsConsumed:carbsConsumed,
      proteinCosumed:proteinCosumed,
      fatsConsumed:fatsConsumed,
      dateTimeConsumed:date
    }
    const axiosResponse = await axios.post("https://capstone.parkert.dev/backend/logNutrition", body, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    });
    setResponse(axiosResponse) //used in httpopup.js
  }
  catch(error){
    console.error("error: ", error.response)
    setResponse(error.response)
  }

 }

  return (
    <div className="LogNutritionForm">
      <p>Log your nutrition here:</p>
      <form onSubmit={formSubmitted}>
        <label>Date: <input type='date' defaultValue={date} onChange={(event)=>{setDate(event.target.value)}}/></label>
        <label>Calories Consumed: <input type='number' onChange={(event)=>{setCaloriesConsumed(event.target.value)}}/></label>
        <label>Protein Consumed: <input type='number' onChange={(event)=>{setProteinConsumed(event.target.value)}}/></label>
        <label>Carbs  Consumed: <input type='number' onChange={(event)=>{setCarbsConsumed(event.target.value)}}/></label>
        <label>Fats Consumed: <input type='number' defaultValue={fatsConsumed} onChange={(event)=>{setFatsConsumed(event.target.value)}}/></label>
        <button>Submit</button>

      </form>
    </div>
  );
}

export default NutrientContainer;
