import "./WorkoutLogComponent.css";
import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";

const token = localStorage.getItem("jwt"); // Token for backend operations

function WorkoutLogComponent({ date }) {
  const [workoutLog, setWorkoutLog] = useState([]);
  const [chosenWorkout, setChosenWorkout] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const getWorkouts = async () => {
      try {
        const response = await axios.get(
          // Fetch workout logs by date from the backend
          "https://capstone.parkert.dev/backend/getCompleteWorkoutLogByDate?dateAccessed=" + encodeURIComponent(date),
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setWorkoutLog(response.data);
      } catch (error) {
        console.error("Error - Cannot get workouts: ", error);
      }
    };
    getWorkouts();
  }, [date]);
  
  const workoutDetails = (workoutName) => {
    const chosenWorkout = workoutLog.find((workout) => workout.workoutName === workoutName);
    setChosenWorkout(chosenWorkout);
    setShowPopup(true);
  }

  const closePopup = () => {
    setShowPopup(false);
  }

  return (
    <div className="workout-log">
      {/* Main workout log table */}
      <div className="main-workout-log-table">
        <table>
          <thead>
            <tr>
              <th>Workout Name</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {workoutLog.map((log, index) => (
              <tr key={index} onClick={() => workoutDetails(log.workoutName)}>
                <td>{log.workoutName}</td>
                <td>{log.duration}</td>
                <td>{date}</td>
                <td>{log.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detailed workout log popup */}
      {showPopup && chosenWorkout && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closePopup}>&times;</span>
            <h2>{chosenWorkout.workoutName}</h2>
            {chosenWorkout.exercises.map((exercise, index) => (
              <div key={index} className="ExerciseLogEntry">
                <p>{exercise.exerciseName}</p>
                {exercise.sets.map((set, idx) => (
                  <div key={idx} className="SetLogEntry" onClick={() => console.log(set)}>
                    <p>Set #{set.setNumber}</p>
                    <p>Reps: {set.reps}</p>
                    <p>Weight: {set.weight}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkoutLogComponent;