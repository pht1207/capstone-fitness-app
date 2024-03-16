import './FitnessPage.css';
import React,{useState} from 'react';
import WorkoutComponent from './WorkoutComponent';
import WorkoutLogComponent from './WorkoutLogComponent';
import recommendedWorkouts from './RecommendedWorkouts';
function FitnessPage() {
  //Your code to make the site functional goes in this empty space. The 'return()' below is what renders on the page (the html)
  //Inserted by parker: https://capstone.parkert.dev/backend/getExercises?muscleGroup=biceps
  //https://capstone.parkert.dev/backend/createExercises
  //https://capstone.parkert.dev/backend/getWorkouts
  //https://capstone.parkert.dev/backend/createWorkouts

  const [completedWorkout, setCompletedWorkout] = useState([]);
  
  let curr = new Date();
  curr.setDate(curr.getDate() + 3);
  let currentDate = curr.toISOString().substring(0,10);
  const [date, setDate] = useState(currentDate)
  const [selectedWorkout, setSelectedWorkout] = useState(null);


  const handleCompletedWorkout = (workoutData) => {
    setCompletedWorkout([...completedWorkout, workoutData]);
  };

  const handleSelectWorkout = (workout) => {
    setSelectedWorkout(workout);
  };

console.log(date)

  return (
    <div className= "FitnessPage"> {/*This div will contain every component for the fitness page. */}
      <input type='date' onChange={((event)=>setDate(event.target.value))} defaultValue={date}></input>

      <div className= "Banner"> {/* Used to hold and seperate the 3 sections of the page. */}

        <div className= "mworkout"> {/* User made or templates will fall in this section */}

          <h1>My Workouts</h1>
          <h2>Workout</h2>
          <WorkoutComponent onWorkoutComplete={handleCompletedWorkout} 
          selectedWorkout={selectedWorkout}/> 

        </div>
      

      <div className="recommend"> {/* Recommended workouts will go here */}
        <h1>Recommended</h1>
        <h2>Recommended Workouts</h2>
        <ul className="recommended-workout-list">
            {recommendedWorkouts.map((workout, index) => (
              <li
                key={index}
                className="recommended-workout-item"
                onClick={() => handleSelectWorkout(workout)}
              >
                <button className="workout-button">{workout.workoutName}</button>
              </li>
            ))}
          </ul>
        </div>

      <div className="workoutl"> {/* The workout log will track certain info from the user's workout */}
        <h1>Workout Log</h1>
        <h2>History</h2>
        <WorkoutLogComponent workoutData={completedWorkout} date={date}/>
      </div>

      </div>
    </div>
  );
}

export default FitnessPage;
