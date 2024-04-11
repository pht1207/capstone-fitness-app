import "./WorkoutComponent.css";
import ExerciseComponent from "./ExerciseComponent";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import PickWorkout from "./PopupPages/PickWorkout";
import CreateWorkout from "./PopupPages/CreateWorkout";
import { HttpPopupContext } from '../../../components/HttpPopupContext';


function WorkoutComponent(props) {
  //Your code to make the site functional goes in this empty space. The 'return()' below is what renders on the page (the html)
  const [createWorkout, setCreateWorkout] = useState(false);
  const [workoutName, setWorkoutName] = useState("");
  const [exercises, setExercises] = useState([]);
  const [workoutType, setWorkoutType] = useState(""); // this is used to sepeerate recommended workouts from the create and prebuilt
  const [showPickWorkout, setShowPickWorkout] = useState(false);
  const [showCreateWorkout, setShowCreateWorkout] = useState(false);
  const {setResponse} = useContext(HttpPopupContext);

  const token = localStorage.getItem("jwt"); //Token for backend operations

  //Used in creating the workout object with exercises, sets, reps, weight included and submitting it to the backend to be logged
  const workoutSubmitted = async (exercises, workoutName, token) => {
    try {
      const durationInput = prompt(
        "Enter the duration of your workout (in minutes):"
      );
      if (!durationInput) {
        console.error("Duration input failed");
        return;
      }
      const duration = parseInt(durationInput);

      let ratingInput = prompt("Rate the workout experience between 1-5:");
      if (!ratingInput) {
        console.error("Rating input cancelled");
        return;
      }

      if (isNaN(ratingInput) || ratingInput < 1 || ratingInput > 5) {
        console.error(
          "Invalid input. The rating must be a number between 1-5."
        );
        return;
      }

      let exerciseBox = [];

      for (const exercise of exercises) {
        const setsInfo = [];

        // Check if exercise.sets exists and is iterable
        if (
          exercise.sets &&
          typeof exercise.sets[Symbol.iterator] === "function"
        ) {
          // Loop over sets if it's iterable
          for (const set of exercise.sets) {
            setsInfo.push({
              setNumber: 1,
              weight: set.weight,
              reps: set.reps,
            });
          }
        }

        exerciseBox.push({
          exerciseName: exercise.name,
          sets: setsInfo,
        });
      }
      const currentTime = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " "); // Format: yyyy-mm-ddThh:mm:ss

      const body = {
        workoutName: workoutName,
        timeCompleted: currentTime,
        duration: duration,
        rating: ratingInput,
        exercises: exerciseBox,
      };


      //Send the workout object to the database to be logged
      const response = await axios.post(
        "https://capstone.parkert.dev/backend/logCompleteWorkout",
        body,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setResponse(response) //used in httpopup.js
      props.setLoggedWorkout((props.loggedWorkout)+1);
    } 
    catch (error) {
      console.error("Error logging workout:", error);
      setResponse(error.response) //used in httpopup.js
    }
  };


  const initiateCreateWorkout = () => {
    setCreateWorkout(true);
  };

  const cancelWorkoutCreation = () => {
    resetWorkoutState();
    setCreateWorkout(false);
  };

  const resetWorkoutState = () => {
    setCreateWorkout(false);
    setWorkoutName("");
    setExercises([]);
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
      { name: "", sets: [] }, // Ensure weights is initialized as an array
    ]); //removed : , weights: [], reps: []
  };

  const handleCreateExercise = (index, updatedExercise) => {
    const updatedExercises = [...exercises];
    updatedExercises[index] = updatedExercise;
    setExercises(updatedExercises);
  };




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
            onClick={() => setShowPickWorkout(true)}
          />
          {showPickWorkout ? (
            <PickWorkout
              addPrebuiltWorkout={addPrebuiltWorkout}
              setWorkoutName={setWorkoutName}
              setShowPickWorkout={setShowPickWorkout}
            />
          ) : null}
          <div className="workout-components">
            {exercises.map((exercise, index) => (
              <div key={index} className="workout-component">
                <ExerciseComponent
                  key={index}
                  index={index}
                  exercise={exercise}
                  onChange={(updatedExercise) =>
                    handleCreateExercise(index, updatedExercise)
                  }
                  onDelete={() => deleteExercise(index)}
                />
              </div>
            ))}
          </div>
          <div className="button-container">
            <button onClick={createExercise}>Add Exercise</button>
            <button onClick={cancelWorkoutCreation}>Cancel</button>
            <button onClick={() => workoutSubmitted(exercises, workoutName, token)}>
              Log Workout
            </button>
          </div>
        </>
      )
      : 
      (
        <div>
          {showCreateWorkout ? (
            <CreateWorkout setShowCreateWorkout={setShowCreateWorkout} />
          ) : null}
            <div>
              <div className="create-workout-box" onClick={initiateCreateWorkout}>
                <h3>Log Workout</h3>
              </div>
              <div className="select-workout-box" onClick={() => setShowCreateWorkout(true)}>
                <h3>Create Workout</h3>
              </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default WorkoutComponent;