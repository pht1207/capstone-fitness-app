import "./WorkoutLogComponent.css";
import React from 'react';

function WorkoutLogComponent({ workoutData }) {
 
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