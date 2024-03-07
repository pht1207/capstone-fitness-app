import { useEffect, useState } from 'react';
import './NutritionPage.css'
import axios from 'axios';
import validator from 'validator';

function NutritionPage() {
  const [nutritionLog, setNutritionLog] = useState(null);
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
        setNutritionLog(response.data[0]);
        console.log(response)
      }
        catch (error) {
        console.error('Error fetching data: ', error);
      }
    }
    fetchData();

  }, [date]);

  

  return (
    <div className="FitnessPage">
        <h1>This is the nutrition page</h1>
        <input type='date' onChange={((event)=>setDate(event.target.value))} defaultValue={date}></input>
    </div>
  );
}

export default NutritionPage;
