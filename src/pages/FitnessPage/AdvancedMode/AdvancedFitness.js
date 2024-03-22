import './FitnessPage.css';
import React,{useState} from 'react';
import WorkoutComponent from './WorkoutComponent';
import WorkoutLogComponent from './WorkoutLogComponent';
function AdvancedFitness() {

  const [completedWorkout, setCompletedWorkout] = useState([]);
  
  let curr = new Date();
  curr.setDate(curr.getDate() + 3);
  let currentDate = curr.toISOString().substring(0,10);
  const [date, setDate] = useState(currentDate)
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const handleCompletedWorkout = (workoutData) => {
    setCompletedWorkout([...completedWorkout, workoutData]);
    console.log(completedWorkout)
  };



  return (
    <div className= "FitnessPage"> {/*This div will contain every component for the fitness page. */}
      <p>Pick date to check or log for:</p><input type='date' onChange={((event)=>setDate(event.target.value))} defaultValue={date}></input>

        <div className='FitnessPageMainRow'>
          <div className= "WorkoutFunctionContainer"> {/* User made or templates will fall in this section */}
            <h1>My Workouts</h1>
            <WorkoutComponent onWorkoutComplete={handleCompletedWorkout} 
            selectedWorkout={selectedWorkout}/> 
          </div>
      



          <div className="WorkoutLogContainer"> {/* The workout log will track certain info from the user's workout */}
            <h1>Workout Log</h1>
            <WorkoutLogComponent workoutData={completedWorkout} date={date}/>
          </div>

        </div>
    </div>
  );
}

export default AdvancedFitness;
