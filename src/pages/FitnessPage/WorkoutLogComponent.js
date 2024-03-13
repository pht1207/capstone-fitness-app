import "./WorkoutLogComponent.css";
import React from 'react';

function WorkoutLogComponent({ workoutData }, props) {
   {/* WorkoutLogComponent
    Here, the user's workoutLog from the database will be shown, mapped out using workoutData.map(...).
    Data will be fetched from getUserWorkoutLogByDate.
      -It will be a get method that uses '...getUserWorkoutLogByDate?dateAccessed='+props.date.
        -This will concatenate the string to take in the date that was set ontop of the page in this components parent element.
      
  */} 
  return (
    <div className="workout-log">
      <table className="log-table">
        <thead>
          <tr>
            <th>Workout Name</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {workoutData.map((workout, index) => (
            <tr key={index}>
              <td>{workout.workoutName}</td>
              <td>{workout.workoutDuration}</td>
              <td>{new Date().toLocaleDateString()}</td>
              <td>{workout.workoutRating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WorkoutLogComponent;