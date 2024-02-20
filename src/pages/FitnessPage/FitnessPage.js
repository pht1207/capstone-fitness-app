import React, { useState } from 'react';
import "./FitnessPage.css";

// EXPERIMENTAL CODE



function FitnessPage() {
  //Your code to make the site functional goes in this empty space. The 'return()' below is what renders on the page (the html)
  //Inserted by parker: https://capstone.parkert.dev/backend/getExercises
  //https://capstone.parkert.dev/backend/createExercises
  //https://capstone.parkert.dev/backend/getWorkouts
  //https://capstone.parkert.dev/backend/createWorkouts

 // workout containes exercise, exercise contains name, sets, and reps
 const [exercises, SetExercises] =  useState([]);
 const [exerciseName, setExerciseName] = useState('');
 const [sets, setSets] = useState('');
 const [reps, setReps] = useState('');

 const handleAddExercise = () => {
   if (!exerciseName || !sets || !reps){
     alert('Fill out all fields');
     return;
   }

   const newExercise = {
     name: exerciseName,
     sets: parseInt(sets),
     reps: parseInt(reps)
   };

   SetExercises([...exercises, newExercise]);
   setExerciseName('');
   setSets('');
   setReps('');

 };

 /*const handleAddWorkout = () =>{
   console.log('New Workout Template', exercises);
   setExercises ([]); */




return (
  <div className='FitnessPage'>
    <div className="Banner">
      <div className="mworkout">
        <h1>My Workout</h1>
        {/*<Workout onWorkoutComplete={handleWorkoutComplete} /> */}

        <div>
    <h2>Workout</h2>
    <table>
      <thead>
        <tr>
          <th>Exercise Name</th>
          <th>Sets</th>
          <th>Reps</th>
        </tr>
      </thead>
      <tbody>
        {exercises.map((exercise, index) => (
          <tr key={index}>
            <td>{exercise.name}</td>
            <td>{exercise.sets}</td>
            <td>{exercise.reps}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div>
      <label htmlFor="exerciseName">Exercise Name:</label>
      <input type="text" id="exerciseName" value={exerciseName} onChange={(e) => setExerciseName(e.target.value)} />
    </div>
    <div>
      <label htmlFor="sets">Sets:</label>
      <input type="number" id="sets" value={sets} onChange={(e) => setSets(e.target.value)} />
    </div>
    <div>
      <label htmlFor="reps">Reps:</label>
      <input type="number" id="reps" value={reps} onChange={(e) => setReps(e.target.value)} />
    </div>
    <button onClick={handleAddExercise}>Add Exercise</button>
   {/* <button onClick={handleAddWorkout}>Add Workout</button> */}
  </div>


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
            
          </tbody>
            </table> 
      </div>
    </div>
  </div>
  );
}

export default FitnessPage;
