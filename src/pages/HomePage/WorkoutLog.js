import React, { useState } from 'react';
import WorkoutLogRow from './WorkoutLogRow';
function WorkoutLog() {
    

    //There will be 5 WorkoutLogRowComponents returned from the backend when it is called
    //Don't worry about how that happens yet, but it will be done here
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
