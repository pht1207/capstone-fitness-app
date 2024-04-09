import './FitnessPage.css';
import React,{useState} from 'react';
import WorkoutComponent from './WorkoutComponent';
import WorkoutLogComponent from './WorkoutLogComponent';

function AdvancedFitness(props) {

  const [date, setDate] = useState(new Date().toISOString().substring(0,10));

  const [loggedWorkout, setLoggedWorkout] = useState(0);

 
  return (
    <div className= "FitnessPage"> {/*This div will contain every component for the fitness page. */}
      <div className='MainPage'>
        <p>Pick date to check or log for:</p><input type='date' onChange={((event)=>setDate(event.target.value))} defaultValue={date}max={date} />
          <div className='FitnessPageMainRow'>

            <div className= "WorkoutFunctionContainer"> {/* User made or templates will fall in this section */}
              <h1>My Workouts</h1>
              <WorkoutComponent loggedWorkout={loggedWorkout} setLoggedWorkout={setLoggedWorkout}/> 
            </div>
        
            <div className="WorkoutLogContainer"> {/* The workout log will track certain info from the user's workout */}
              <h1>Workout Log</h1>
              <WorkoutLogComponent  date = {date} loggedWorkout={loggedWorkout} setLoggedWorkout={setLoggedWorkout}/>
            </div>

          </div>

      </div>
      <button className='SwitchModeButton' onClick={async ()=>{{props.setIsBeginner(true);}}}>Switch to beginner mode</button> 
    </div>
  );
}

export default AdvancedFitness;
