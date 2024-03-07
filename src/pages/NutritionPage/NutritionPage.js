import { useEffect, useState } from 'react';
import './NutritionPage.css'
import axios from 'axios';

function NutritionPage() {
  const [userData, setData] = useState(null);
  const token = localStorage.getItem("jwt")

  //Your code to make the site functional goes in this empty space. The 'return()' below is what renders on the page (the html)
  //Inserted by parker: https://capstone.parkert.dev/backend/getFoods
  //https://capstone.parkert.dev/backend/getFoods/getNutrition?dateAccessed=2024-02-20 {change date to whatever you need it to be}
  //https://capstone.parkert.dev/backend/getFoods/logNutrition {log via json post}
  useEffect(() => {
    const fetchData = async () => { 
      try {
        const response = await axios.get("https://capstone.parkert.dev/backend/getProfileData", {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
        setData(response.data[0]);
        console.log(response.data)
      }
        catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="FitnessPage">
        <h1>This is the nutrition page</h1>
    </div>
  );
}

export default NutritionPage;
