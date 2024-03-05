import React, { useState } from 'react';
import WorkoutLogRow from './WorkoutLogRow';
function WorkoutLog() {
    

  return (
    <div class="workout_log">
        <h4>Workout Log</h4>
        <hr/>
        <WorkoutLogRow/>
        <WorkoutLogRow/>
        <WorkoutLogRow/>
        <WorkoutLogRow/>
        <WorkoutLogRow/>

  </div>
  );
}

export default WorkoutLog;
