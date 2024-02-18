import React, { useState } from 'react';
import "./FitnessPage.css";
// EXPERIMENTAL CODE
function Workout({ onWorkoutComplete }) {
  // Store exercise values
  const [exercises, setExercises] = useState([]);
  const [exerciseName, setExerciseName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');

  // handle values when user updates data
  const handleExerciseNameUpdate = (event) => {
    setExerciseName(event.target.value);
  };

  const handleSetsUpdate = (event) => {
    setSets(event.target.value);
  };

  const handleRepsUpdate = (event) => {
    setReps(event.target.value);
  };

  // add exercise to the workout
  const handleAddExercise = () => {
    const newExercise = { exerciseName, sets, reps };
    setExercises([...exercises, newExercise]);
    setExerciseName('');
    setSets('');
    setReps('');
  };
  const handleSubmit = () =>{
    alert("page will reload");

  }
  
  // Function to calculate workout time
  const calculateTime = () => {
    return exerciseName.length * 10; // assuming user rests between sets
  };

  // handles the event in which a user completes their workout
  const handleCompleteWorkout = () => {
    const time = calculateTime();
    const workoutInfo = {
      workoutName: 'My Workout', // should allow user to name workout
      time,
      date: new Date().toISOString().slice(0, 10), //
      rating: '5', // user should rate workout once completed
    };
    onWorkoutComplete(workoutInfo);
  };

  return (
    <div className="workout-box">
      <h3>Workout</h3>
      <form onSubit={handleSubmit}>
      <div>
        <label htmlFor="exerciseName">Exercise Name:</label>
        <input
          type="text"
          id="exerciseName"
          value={exerciseName}
          onChange={handleExerciseNameUpdate}
        />
      </div>
      <div>
        <label htmlFor="sets">Sets:</label>
        <input
          type="text"
          id="sets"
          value={sets}
          onChange={handleSetsUpdate}
        />
      </div>
      <div>
        <label htmlFor="reps">Reps:</label>
        <input
          type="text"
          id="reps"
          value={reps}
          onChange={handleRepsUpdate}
        />
      </div>
      <button onClick={handleAddExercise}>Add Exercise</button>
      <button onClick={handleCompleteWorkout}>Complete Workout</button>
      </form>
    </div>
  );
}
// EXPERIMENTAL CODE










function FitnessPage() {
  //Your code to make the site functional goes in this empty space. The 'return()' below is what renders on the page (the html)
  //Inserted by parker: https://capstone.parkert.dev/backend/getExercises
  //https://capstone.parkert.dev/backend/createExercises
  //https://capstone.parkert.dev/backend/getWorkouts
  //https://capstone.parkert.dev/backend/createWorkouts


//EXPERIMENTAL CODE
const [workoutLog, setWorkoutLog] = useState([]);

  // Function to handle completing the workout and logging workout information
  const handleWorkoutComplete = (workoutInfo) => {
    setWorkoutLog([...workoutLog, workoutInfo]);
  };
//EXPERIMENTAL CODE
  


 
return (
  <div className='FitnessPage'>
    <div className="Banner">
      <div className="mworkout">
        <h1>My Workout</h1>
        <Workout onWorkoutComplete={handleWorkoutComplete} />
      </div>
      <div className="recommend">
        <h1>Recommended</h1>
      </div>
      <div className="workoutl">
        <h1>Workout Log</h1>
        <table id="workoutTable">
          <thead>
            <tr>
              <th>Workout Name</th>
              <th>Time</th>
              <th>Date</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {workoutLog.map((workout, index) => (
              <tr key={index}>
                <td>{workout.workoutName}</td>
                <td>{workout.time} minutes</td>
                <td>{workout.date}</td>
                <td>{workout.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
}

export default FitnessPage;
