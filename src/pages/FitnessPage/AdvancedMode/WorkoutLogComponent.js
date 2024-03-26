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
          "https://capstone.parkert.dev/backend/getCompleteWorkoutLogByDate?dateAccessed="+encodeURIComponent(props.date),
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setWorkoutLog(response.data)
        //console.log(response.data)

      } 

      catch (error) {
        console.error("Error - Cannot get workouts: ", error);
      }
    };
    getWorkouts();
  }, [props.date]); //write another dependency to update upon logging a workout in parent/sister components


  return (
    <div className="workout-log">

      {workoutLog.length > 0 &&
      <div>
        {workoutLog.map((object, index) =>(
          <>
            <div key={index} className="WorkoutLogItem" onClick={()=>{console.log(object)}}>
              <div className="WorkoutLogHeader">
                <p>{object.workoutName}</p>
              </div>
              
                {object.exercises.map((exercise, index) =>
                <>
                <div key={index} className="ExerciseLogEntry" style={{backgroundColor:"#f2f2f2"}}>
                  <p>{exercise.exerciseName}</p>
                </div>

                  {exercise.sets.map((set, index) =>
                  <>
                    <div key={index} className="SetLogEntry" onClick={()=>{console.log(set)}}>
                      <p>Set #{set.setNumber}</p>
                      <p>Reps: {set.reps}</p>
                      <p>Weight: {set.weight}</p>
                    </div>
                  </>
                  )}
                </>
                )}

            </div>          
          </>
        ))}
        </div>
      }
    </div>
  );
}

export default WorkoutLogComponent;