import "./WorkoutComponent.css";
import ExerciseComponent from "./ExerciseComponent";
import WorkoutLogComponent from "./WorkoutLogComponent";
import { useEffect, useState } from "react";
import axios from "axios";

function WorkoutComponent({onWorkoutComplete}) {
  //Your code to make the site functional goes in this empty space. The 'return()' below is what renders on the page (the html)
  
  const [createWorkout, setCreateWorkout] = useState(false);
  const [selectWorkout,setSelectWorkout] = useState(false);
  const [workoutName, setWorkoutName] = useState('');
	const [exercises, setExercises] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [continueWorkout, setContinueWorkout] = useState(false);
  const [timer, setTimer] = useState(null);
  const [workoutDuration, setWorkoutDuration] = useState(0);
  const [workoutRating, setWorkoutRating] = useState(null);
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  
  const token = localStorage.getItem("jwt"); //Token for backend operations

  const initiateCreateWorkout = () => {
    setCreateWorkout(true);
  }
  const toggleSelectWorkout = () => {
    setSelectWorkout(!selectWorkout);
  }

  const cancelWorkoutCreation =() => {
    resetWorkoutState();
  };

  const resetWorkoutState = () => {
    setCreateWorkout(false);
    setWorkoutName('');
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
      exercises: exercises
    };
    setSavedWorkouts([...savedWorkouts, newWorkout]);
    cancelWorkoutCreation();
  };


  const prebuiltWorkout = [
    {
      workoutName: 'PUSH DAY',
      exercises: [
        {name: 'Dumbbell Flat Press', sets:'', reps:''},
        {name: 'Incline Smith Press', sets:'', reps:''},
        {name: 'Dumbbell Shoulder Press', sets:'', reps:''},
        {name: 'Dumbell Lateral Raise', sets:'', reps:''},
        {name: 'Tricep Pushdown', sets:'', reps:''}
      ]
    },
    {
      workoutName: 'PULL DAY',
      exercises: [
        {name: 'Chest-Supported Row', sets:'', reps:''},
        {name: 'Lat Pulldown', sets:'', reps:''},
        {name: 'Cable Lat Row', sets:'', reps:''},
        {name: 'Reverse Pec Dec Fly', sets:'', reps:''},
        {name: 'Dumbbell Curl', sets:'', reps:''}
      ]
    },
    {
      workoutName: 'LEG DAY',
      exercises: [
        {name: 'Calf Raise', sets:'', reps:''},
        {name: 'Seated Leg Curl', sets:'', reps:''},
        {name: 'Leg Press', sets:'', reps:''},
        {name: 'Leg Extension', sets:'', reps:''},
        {name: 'Adductor Machine', sets:'', reps:''},
      ]
    }
  ]


  {/* SECTION START: getWorkouts 
    This section is based around creating a state object from the getWorkouts method results.
    This method will get workouts created by the user as well as standard ones included in the system already.
    Problems with this are that the user may be able to create workouts that have the same name or a slightly different name.
      -This means the list could get flooded by the user. Look into later.

      Guide for what you need to do:
      You need to call the getWorkouts method from the backend. This will return every workout in the DB that is standard or created by the specified user.
        -This should be done inside a useEffect(), with an empty dependency.
          -This means that the [] should be empty (like below there is useeffect with useeffect(()=>{},[timer]).
            -This makes it to where it is only ran once, when the page is rendered.
      
      Console.log is your friend, it will make it easy to see what the results are from the backend method.
      
      This is a useEffect that is mostly copied and pasted from the profilepage.js file. It should at least be close to what you need:

            useEffect(() => {

              const fetchData = async () => { 
                try {
                  const response = await axios.get("https://capstone.parkert.dev/backend/getWorkouts", {
                    headers: {
                      'Authorization': 'Bearer ' + token
                    }
                  });
                  console.log(response.data) //Response.data is the return data from the backend request. You will make a state variable to store this in (like setWorkoutArray(response.data))
                }
                  catch (error) {
                  console.error('Error fetching data: ', error);
                }
              };

              fetchData(); //This calls the function above
            }, []);

      
  */}

  //Write your code here

  useEffect(() => {
    const getWorkouts = async () => {
      try {
        const response = await axios.get("https://capstone.parkert.dev/backend/getWorkouts", {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
        
        console.log(response.data);
        
      } catch (error) {
        console.error('Error - Cannot get workouts: ', error);
      }
    };
    getWorkouts();
  }, []);

  {/* SECTION END: getWorkouts */}

  const addPrebuiltWorkout = (workout) => {
    setWorkoutName(workout.workoutName);
    setExercises(workout.exercises);
    setCreateWorkout(true);
  };
  

  const handleWorkoutNameChange = (e) => {
    setWorkoutName(e.target.value);
  }
	const createExercise = () => {
    setExercises([...exercises, { name: '', sets: '', reps: '' }]);
  };

  const handlecreateExercise = (index, updatedExercise) => {
    const updatedExercises = [...exercises];
    updatedExercises[index] = updatedExercise;
    setExercises(updatedExercises);
  };

  const startWorkout = () => {
    setStartTime( new Date());
    setContinueWorkout(true);
    setTimer(setInterval(() => {
      setWorkoutDuration (prevDuration => prevDuration +1)
    }, 1000));
  };

  const finishWorkout = () => {
    setContinueWorkout(false);
    clearInterval(timer);
    requestRate();
  }

  const requestRate = () => {
    const rate = prompt("Rate your Workout from 1-5: ");
    if (rate !== null && rate.trim() !== "" && !isNaN(rate)) {
      const userRating = parseInt(rate, 10);
      if (userRating >= 1 && userRating <= 5) {
        setWorkoutRating(userRating);
        const workoutData = {
          workoutName: workoutName,
          workoutDuration: workoutDuration,
          workoutRating: userRating
        };
        onWorkoutComplete(workoutData); // Ensure that onWorkoutComplete is called here
      } else {
        alert("Please enter a valid rating between 1 and 5.")
      }
    } else {
      alert("Please enter a valid rating between 1 and 5.")
    }
  };

  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);



  return (
    <div className="myworkout-table">
      {createWorkout ? (
        <div>
          <table className='workout-table'>
            <thead>
              <tr>
                <th>
                  <input 
                    type="text"
                    value={workoutName}
                    onChange={handleWorkoutNameChange}
                    placeholder="Workout Name"
                    style={{ width: '250px' }}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {exercises.map((exercise, index) => (
                <tr key={index}>
                  <td>
                  <ExerciseComponent
                    key={index}
                    exercise = {exercise}
                    onChange={(updatedExercise) => handlecreateExercise(index, updatedExercise)}
                  />
                  </td>
                </tr>     
              ))}
            </tbody>
          </table>
          <button onClick={startWorkout} disabled={continueWorkout}>
            Start
          </button>
          <button onClick={finishWorkout} disabled={!continueWorkout}>
            Finish 
          </button>
          {continueWorkout && (<p>Workout Duration: {workoutDuration} seconds</p>)}
          <button onClick={cancelWorkoutCreation}>Cancel</button>
          <button onClick={saveWorkout}>Save Workout</button>
        </div>
      ) : (
        <div>
          <div className="create-workout-box" onClick={initiateCreateWorkout}>Create Workout</div>
          <div className="select-workout-box" onClick={toggleSelectWorkout}>Choose Workout</div>
          {selectWorkout && (
            <div>
              <h2>Workout Templates</h2>
              <ul className="prebuilt-workout-list">
                {prebuiltWorkout.map((workout, index) => (
                  <li key={index} className="prebuilt-workout-item" onClick={() => addPrebuiltWorkout(workout)}>
                    {workout.workoutName}
                  </li>
                ))}
              </ul>
              <h2>Saved Workouts</h2>
            <ul className="saved-workout-list">
            {savedWorkouts.map((workout, index) => (
              <li key={index} className="saved-workout-item" onClick={() => addPrebuiltWorkout(workout)}>
                {workout.workoutName}
              </li>
            ))}
            </ul>
            </div>
          )}
          
        </div>
        
      )}
      {createWorkout && (<button onClick={createExercise}>Add Exercise</button>)}
     
    </div>
  );
}

export default WorkoutComponent;
