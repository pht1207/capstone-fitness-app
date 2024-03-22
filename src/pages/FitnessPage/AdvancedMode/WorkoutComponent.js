import "./WorkoutComponent.css";
import ExerciseComponent from "./ExerciseComponent";
import recommendedWorkouts from "./PopupPages/RecommendedWorkouts";
import { useEffect, useState } from "react";
import axios from "axios";
import PickWorkout from "./PopupPages/PickWorkout";
import CreateWorkout from "./PopupPages/CreateWorkout";

function WorkoutComponent({ onWorkoutComplete, selectedWorkout }) {
  //Your code to make the site functional goes in this empty space. The 'return()' below is what renders on the page (the html)
  const [createWorkout, setCreateWorkout] = useState(false);
  const [selectWorkout, setSelectWorkout] = useState(false);
  const [workoutName, setWorkoutName] = useState("");
  const [exercises, setExercises] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [continueWorkout, setContinueWorkout] = useState(false);
  const [timer, setTimer] = useState(null);
  const [workoutDuration, setWorkoutDuration] = useState(0);
  const [workoutRating, setWorkoutRating] = useState(null);
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [workoutType, setWorkoutType] = useState(""); // this is used to sepeerate recommended workouts from the create and prebuilt

  const token = localStorage.getItem("jwt"); //Token for backend operations

  
  const initiateCreateWorkout = () => {
    setCreateWorkout(true);
  };
  const toggleSelectWorkout = () => {
    setSelectWorkout(!selectWorkout);
  };

  const cancelWorkoutCreation = () => {
    resetWorkoutState();
    setCreateWorkout(false);
    setSelectWorkout(false);
  };

  const resetWorkoutState = () => {
    setCreateWorkout(false);
    setWorkoutName("");
    setExercises([]);
    setContinueWorkout(false);
    clearInterval(timer);
    setTimer(null);
    setWorkoutDuration(0);
    setWorkoutRating(null);
  };

  const saveWorkout = () => {
    const newWorkout = {
      workoutName: workoutName,
      exercises: exercises,
    };
    setSavedWorkouts([...savedWorkouts, newWorkout]);
    cancelWorkoutCreation();
  };

  const deleteExercise = (index) => {
    const updatedExercises = [...exercises];
    updatedExercises.splice(index, 1);
    setExercises(updatedExercises);
  };





  const addPrebuiltWorkout = (workout) => {
    setWorkoutName(workout.workoutName);
    setExercises(workout.exercises);
    setCreateWorkout(true);
  };

  const handleWorkoutNameChange = (e) => {
    setWorkoutName(e.target.value);
  };

  const createExercise = () => {
    setExercises([
      ...exercises,
      { name: "", sets: [], weights: [], reps: [] } // Ensure weights is initialized as an array
    ]);
  };

  const handlecreateExercise = (index, updatedExercise) => {
    const updatedExercises = [...exercises];
    updatedExercises[index] = updatedExercise;
    setExercises(updatedExercises);
  };

  const startWorkout = () => {
    setStartTime(new Date());
    setContinueWorkout(true);
    setTimer(
      setInterval(() => {
        setWorkoutDuration((prevDuration) => prevDuration + 1);
      }, 1000)
    );
  };

  const finishWorkout = () => {
    setContinueWorkout(false);
    clearInterval(timer);
    requestRate();
  };

  const requestRate = () => {
    const rate = prompt("Rate your Workout from 1-5: ");
    if (rate !== null && rate.trim() !== "" && !isNaN(rate)) {
      const userRating = parseInt(rate, 10);
      if (userRating >= 1 && userRating <= 5) {
        setWorkoutRating(userRating);
        const workoutData = {
          workoutName: workoutName,
          workoutDuration: workoutDuration,
          workoutRating: userRating,
        };
        onWorkoutComplete(workoutData); // Ensure that onWorkoutComplete is called here
      } else {
        alert("Please enter a valid rating between 1 and 5.");
      }
    } else {
      alert("Please enter a valid rating between 1 and 5.");
    }
  };

  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

  useEffect(() => {
    if (selectedWorkout) {
      setWorkoutName(selectedWorkout.workoutName);
      setExercises(selectedWorkout.exercises);
      setCreateWorkout(true);
    }
  }, [selectedWorkout]);

  const [showPickWorkout, setShowPickWorkout] = useState(false);
  const [showCreateWorkout, setShowCreateWorkout] = useState(false);

  return (
    <div className="myworkout-table">
      {createWorkout ? (
        <>
          <input
            type="text"
            value={workoutName}
            onChange={handleWorkoutNameChange}
            placeholder="Workout Name"
            className="workout-name-input"
            onClick={()=>{setShowPickWorkout(true)}}
          />
          {showPickWorkout ? <PickWorkout addPrebuiltWorkout={addPrebuiltWorkout} setWorkoutName={setWorkoutName} setShowPickWorkout={setShowPickWorkout}/>: <></>}
          <table className="workout-table">
            <tbody>
              {exercises.map((exercise, index) => (
                <tr key={index}>
                  <td>
                    <ExerciseComponent
                      key={index}
                      exercise={exercise}
                      onChange={(updatedExercise) =>
                        handlecreateExercise(index, updatedExercise)
                      }
                    />
                  </td>
                  <td>
                    <button className="delete-exercise-button" onClick={() => deleteExercise(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>


          <div className="button-container">
            <button onClick={cancelWorkoutCreation}>Cancel</button>
          </div>
        </>
      ) 
      
      : 

      (
        <div>
          {showCreateWorkout ? <CreateWorkout setShowCreateWorkout={setShowCreateWorkout}/>: <></>}
          {workoutType !== "recommended" && (
            <div>
              <div className="create-workout-box"onClick={initiateCreateWorkout}>
                <p>Log Workout</p>
              </div>
              <div className="select-workout-box" onClick={()=>{setShowCreateWorkout(true)}}>
              <p>Create Workout</p>
              </div>
            </div>
          )}
        </div>
      )}
      {createWorkout && <button onClick={createExercise}>Add Exercise</button>}
    </div>
  );
}

export default WorkoutComponent;
