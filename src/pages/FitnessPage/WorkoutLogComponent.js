import "./WorkoutLogComponent.css";
import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
const token = localStorage.getItem("jwt"); //Token for backend operations

function WorkoutLogComponent(props) {
  const [workoutLog, setWorkoutLog] = useState([]);

  useEffect(() => {
    const getWorkouts = async () => {
      try {
        const response = await axios.get(
          "https://capstone.parkert.dev/backend/getUserWorkoutLogByDate?dateAccessed="+encodeURIComponent(props.date),
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        
        console.log(response.data)
        setWorkoutLog(response.data)
      } 

      catch (error) {
        console.error("Error - Cannot get workouts: ", error);
      }
    };
    getWorkouts();
  }, [props.date]);


  return (
    <div className="workout-log">
      <div className="WorkoutLogHeader">
        <p>Workout Name</p>
        <p>Duration</p>
        <p>Date</p>
        <p>Rating</p>
      </div>
      {workoutLog.length > 0 &&
      <div>
        {workoutLog.map((object, index) =>(
          <div key={index} className="WorkoutLogRow" onClick={()=>{console.log(object)}}>
              <p>{object.workoutName}</p>
              <p>10 seconds</p>
              <p>{props.date}</p>
              <p>#</p>
          </div>
        ))}
        </div>
      }
    </div>
  );
}

export default WorkoutLogComponent;