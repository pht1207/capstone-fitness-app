import "./WorkoutLogComponent.css";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
const token = localStorage.getItem("jwt"); //Token for backend operations

function WorkoutLogComponent(props) {
  const [workoutLog, setWorkoutLog] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  useEffect(() => {
    const getWorkouts = async () => {
      try {
        console.log(props.date);
        const response = await axios.get(
          "https://capstone.parkert.dev/backend/getCompleteWorkoutLogByDate?dateAccessed=" +
            encodeURIComponent(props.date),
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log("API Response:", response.data); // Log the response data
        setWorkoutLog(response.data);
      } catch (error) {
        console.error("Error - Cannot get workouts: ", error);
      }
    };
    getWorkouts();
  }, [props.date]); // Ensure useEffect updates when props.date changes

  const handleWorkoutClick = (workout) => {
    setSelectedWorkout(workout);
  };
  const handleExitClick = () => {
    setSelectedWorkout(null); // Clear selected workout
  };

  return (
    <div className="workout-log">
      <table className="main-workout-log-table">
        <thead>
          <tr>
            <th>Workout Name</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {workoutLog.map((workout, workoutIndex) => (
            <tr key={workoutIndex} onClick={() => handleWorkoutClick(workout)}>
              <td>{workout.workoutName}</td>
              <td>{workout.duration}</td>
              <td>{workout.date.substring(0, 10)}</td>
              <td>{workout.rating}</td>
              {console.log(
                "Duration for workout",
                workout.workoutName,
                "is",
                workout.duration,
                "and workout date is ",
                workout.date
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedWorkout && (
        <div className="selected-workout-details">
          <button onClick={handleExitClick}>Exit</button> {/* Exit button */}
          <h3>Selected Workout Details</h3>
          <div className="WorkoutLogItem">
            {selectedWorkout.exercises.map((exercise, exerciseIndex) => (
              <div key={exerciseIndex} className="ExerciseLogEntry">
                <h6 className="ExerciseName">{exercise.exerciseName}</h6>
                {exercise.sets.map((set, setIndex) => (
                  <div key={setIndex} className="SetLogEntry">
                    <p>Set #{set.setNumber}: Reps: {set.reps}, Weight: {set.weight}</p>
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