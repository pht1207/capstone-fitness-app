import './ WorkoutComponent.css'
import ExerciseComponent from "./ExerciseComponent";
import { useEffect, useState } from "react";

function WorkoutComponent() {
  //Your code to make the site functional goes in this empty space. The 'return()' below is what renders on the page (the html)
  //Inserted by parker: https://capstone.parkert.dev/backend/getFoods
  
  const [createWorkout, setCreateWorkout] = useState(false);
  const [selectWorkout,setSelectWorkout] = useState(false);
  
  const [workoutName, setWorkoutName] = useState('');
  const [exerciseCount, setExerciseCount] = useState(0);
	const [exercises, setExercises] = useState([<ExerciseComponent key={exerciseCount-1} index={exerciseCount-1}/>]);
	
  const [startTime, setStartTime] = useState(null);
  const [continueWorkout, setContinueWorkout] = useState(false);
  const [timer, setTimer] = useState(null);
  const [workoutDuration, setWorkoutDuration] = useState(0);

  const initiateCreateWorkout = () => {
    setCreateWorkout(true);
  }
  const toggleSelectWorkout = () => {
    setSelectWorkout(!selectWorkout);
  }
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

  const addPrebuiltWorkout = (workout) => {
    setWorkoutName(workout.workoutName);
    setExercises(workout.exercises.map((exercise, index) => (
      <ExerciseComponent
        exerciseName={exercise.name}
        sets={exercise.sets}
        reps={exercise.reps}
        key={index}
        index={index}
        />
    )))
    setCreateWorkout(true);
  };

  const handleWorkoutNameChange = (e) => {
    setWorkoutName(e.target.value);
  }
	const createExercise = () => {
		setExerciseCount(exerciseCount +1);
		setExercises([
      ...exercises, 
      <ExerciseComponent 
        exerciseName="" 
        setCount="" 
        repCount="" 
        key={exerciseCount} 
        index={exerciseCount} 
        />
      ]);
	};

  const startWorkout = () => {
    setStartTime( new Date());
    setContinueWorkout(true);
    setTimer(setInterval(() => {
      setWorkoutDuration ((prevDuration) => prevDuration +1)
    }, 1000));
  };

  const finishWorkout = () => {
    setContinueWorkout(false);
    clearInterval(timer);
    setWorkoutDuration(0);
  }

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
          style = {{width: '250px'}}
          />
            </th>
          </tr>

        </thead>
        <tbody>
            {exercises.map((exercise, index) => (
              <tr key={index}>
              <td>{exercise}</td>
              </tr>   
          ))}
        </tbody>
      </table>
      <button onClick={startWorkout} disabled={continueWorkout}>
      Begin Workout
    </button>
    <button onClick={finishWorkout} disabled={!continueWorkout}>
      Finish Workout
    </button>
    {continueWorkout && (
      <p>Workout Duration: {workoutDuration} seconds</p>
    )}
      </div>
      ) : (
        <div>
        <div className = "create-workout-box" onClick={initiateCreateWorkout}>Create Workout</div>
        <div className="select-workout-box" onClick={toggleSelectWorkout}
        >Choose Workout</div>
        {selectWorkout &&(
          <div>
            <h2>Workout Templates</h2>
              <ul className="prebuilt-workout-list">
                {prebuiltWorkout.map((workout, index) => (
                  <li key={index}
                    className="prebuilt-workout-item"
                   onClick={() => addPrebuiltWorkout(workout)}>
                    {workout.workoutName}
                  </li>
                ))}
              </ul>
          </div>
        )}
        </div>
      )}
      {createWorkout && ( <button onClick={createExercise}>Add Exercise</button>
      )}
    </div>
  );
}

export default WorkoutComponent;
