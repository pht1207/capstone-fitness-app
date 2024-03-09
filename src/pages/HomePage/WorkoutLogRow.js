import React, { useEffect, useState } from 'react';

function WorkoutLogRow(props) {
    const [workoutTable_id, setWorkoutTable_id] = useState(props.workoutLog.workoutTable_id);
    const [timeCompleted, setTimeCompeleted] = useState(props.workoutLog.timeCompleted.substring(0,4));
    const [timeTaken, setTimeTaken] = useState("example");
    useEffect(()=>{
        setWorkoutTable_id(props.workoutLog.workoutTable_id);
        setTimeCompeleted(props.workoutLog.timeCompleted.substring(0,10));
        setTimeTaken("example");
        
    },[props.workoutLog])

    return (
    <div className="WorkoutLogRow">
        <p>Workout Name: {workoutTable_id}</p>
        <p>Day Completed: {timeCompleted}</p>
        <p>Time Taken: {timeTaken}</p>
    </div>
    );
}

export default WorkoutLogRow;
