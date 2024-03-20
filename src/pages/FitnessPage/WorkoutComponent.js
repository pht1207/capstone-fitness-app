import "./WorkoutComponent.css";
import ExerciseComponent from "./ExerciseComponent";
import recommendedWorkouts from "./RecommendedWorkouts";
import { useEffect, useState } from "react";
import axios from "axios";

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

  const deleteSavedWorkout = (index) => {
    const confirmDelete = window.confirm(
      "Are your sure you want to delete this workout? "
    );
    if (confirmDelete) {
      const updatedSavedWorkouts = [...savedWorkouts];
      updatedSavedWorkouts.splice(index, 1);
      setSavedWorkouts(updatedSavedWorkouts);
    }
  };




  const [backendSystemWorkouts, setBackendSystemWorkouts] = useState([])
  const [backendUserWorkouts, setBackendUserWorkouts] = useState([])
  useEffect(() => {
    const getWorkouts = async () => {
      try {
        const response = await axios.get(
          "https://capstone.parkert.dev/backend/getWorkouts",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        let tempArrayUser = [];
        let tempArraySystem = [];
        for(let i = 0; i < response.data.length; i++){
          if(response.data[i].createdBy !== null){
            tempArrayUser.push(response.data[i]);
          }
          else{
            tempArraySystem.push(response.data[i]);
          }
        }
        setBackendSystemWorkouts(tempArraySystem);
        setBackendUserWorkouts(tempArrayUser);

      
      } 

      catch (error) {
        console.error("Error - Cannot get workouts: ", error);
      }
    };
    getWorkouts();
  }, []);

  {
    /* SECTION END: getWorkouts */
  }

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



  return (
    <div className="myworkout-table">
      {createWorkout ? (
        <div>
          <input
            type="text"
            value={workoutName}
            onChange={handleWorkoutNameChange}
            placeholder="Workout Name"
            className="workout-name-input"
          />
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
            <button onClick={startWorkout} disabled={continueWorkout}>
              Start
            </button>
            <button onClick={finishWorkout} disabled={!continueWorkout}>
              Finish
            </button>
            {continueWorkout && (
              <p>Workout Duration: {workoutDuration} seconds</p>
            )}
            <button onClick={cancelWorkoutCreation}>Cancel</button>
            <button onClick={saveWorkout}>Save Workout</button>
          </div>
        </div>
      ) 
      
      : 

      (
        <div>
          {workoutType === "recommended" && (
            <div>
              <h2>Recommended Workouts</h2>
              <ul className="recommended-workout-list">
                {recommendedWorkouts.map((workout, index) => (
                  <li
                    key={index}
                    className="recommended-workout-item"
                    onClick={() => addPrebuiltWorkout(workout)}
                  >
                    {workout.workoutName}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {workoutType !== "recommended" && (
            <div>
              <div className="create-workout-box"onClick={initiateCreateWorkout}>
                <p>Create Workout</p>
              </div>
              <div className="select-workout-box" onClick={toggleSelectWorkout}>
              <p>Choose Workout</p>
              </div>
              {selectWorkout && (
                <div>
                  <div>
                    <h2>Default Workouts</h2>
                      {backendSystemWorkouts.map((object, index) =>(
                        <div key={index} className="PickExerciseWindowListElement" onClick={()=>{console.log(object); addPrebuiltWorkout(object)}}>
                            <h4>{object.workoutName}</h4>
                        </div>
                      ))}      
                  </div>
                  <div>
                    <h2>User Workouts</h2>
                      {backendUserWorkouts.map((object, index) =>(
                        <div key={index} className="PickExerciseWindowListElement" onClick={()=>{console.log(object)}}>
                            <h4>{object.workoutName}</h4>
                        </div>
                      ))}      
                  </div>

                  <div className="cancel-button-container">
                    <button onClick={cancelWorkoutCreation}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {createWorkout && <button onClick={createExercise}>Add Exercise</button>}
    </div>
  );
}

export default WorkoutComponent;
