import "./WorkoutComponent.css";
import ExerciseComponent from "./ExerciseComponent";
import recommendedWorkouts from "./PopupPages/RecommendedWorkouts";
import { useEffect, useState } from "react";
import axios from "axios";
import PickWorkout from "./PopupPages/PickWorkout";
import CreateWorkout from "./PopupPages/CreateWorkout";

function WorkoutComponent({selectedWorkout }) {
  //Your code to make the site functional goes in this empty space. The 'return()' below is what renders on the page (the html)
  const [createWorkout, setCreateWorkout] = useState(false);
  const [workoutName, setWorkoutName] = useState("");
  const [exercises, setExercises] = useState([]);
  const [workoutType, setWorkoutType] = useState(""); // this is used to sepeerate recommended workouts from the create and prebuilt
  const [showPickWorkout, setShowPickWorkout] = useState(false);
  const [showCreateWorkout, setShowCreateWorkout] = useState(false);

  const token = localStorage.getItem("jwt"); //Token for backend operations

<<<<<<< HEAD
  function workoutSubmitted(){
    
  }
=======

  function WorkoutSubmitted(){

  }

>>>>>>> 3df6305b1159b1cb8feca8d254a45648aeff4b4a
  
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
      { name: "", sets: [], weights: [], reps: [] } // Ensure weights is initialized as an array
    ]);
  };

  const handleCreateExercise = (index, updatedExercise) => {
    const updatedExercises = [...exercises];
    updatedExercises[index] = updatedExercise;
    setExercises(updatedExercises);
  };

  useEffect(() => {
    if (selectedWorkout) {
      setWorkoutName(selectedWorkout.workoutName);
      setExercises(selectedWorkout.exercises);
      setCreateWorkout(true);
    }
  }, [selectedWorkout]);

  console.log(exercises)

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
          {showPickWorkout ? <PickWorkout addPrebuiltWorkout={addPrebuiltWorkout} setWorkoutName={setWorkoutName} setShowPickWorkout={setShowPickWorkout} /> : null}
          <div className="workout-components">
            {exercises.map((exercise, index) => (
              <div key={index} className="workout-component">
                <ExerciseComponent
                  key={index}
                  index={index} // Passing the index of the exercise
                  exercise={exercise}
                  onChange={(updatedExercise) => handleCreateExercise(index, updatedExercise)}
                  onDelete = {() => deleteExercise(index)}
                />
              </div>
            ))}
          </div>
          <div className="button-container">
            <button onClick={cancelWorkoutCreation}>Cancel</button>
          </div>
        </>
      ) : (
        <div>
          {showCreateWorkout ? <CreateWorkout setShowCreateWorkout={setShowCreateWorkout} /> : null}
          {workoutType !== "recommended" && (
            <div>
              <div className="create-workout-box" onClick={initiateCreateWorkout}>
                <p>Log Workout</p>
              </div>
              <div className="select-workout-box" onClick={() => setShowCreateWorkout(true)}>
                <p>Create Workout</p>
              </div>
            </div>
          )}
        </div>
      )}
      {createWorkout && <button onClick={createExercise}>Add Exercise</button>}
<<<<<<< HEAD
      {createWorkout && <button onClick={workoutSubmitted}>Log Workout</button>}
=======
      {createWorkout && <button onClick={WorkoutSubmitted}>Log Exercise</button>}

>>>>>>> 3df6305b1159b1cb8feca8d254a45648aeff4b4a
    </div>
  );
}

export default WorkoutComponent;