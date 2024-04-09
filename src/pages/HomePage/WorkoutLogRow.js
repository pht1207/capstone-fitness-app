import React, { useEffect, useState } from 'react';

function WorkoutLogRow(props) {
    const [workoutTable_id, setWorkoutTable_id] = useState(props.workoutLog.workoutName);
    const [timeCompleted, setTimeCompeleted] = useState(props.workoutLog.timeCompleted.substring(0,4));
    const [backgroundColor, setBackgroundColor] = useState('')

    //Sets the text of the workoutlog if the page has been changed in the parent component
    useEffect(()=>{
        setWorkoutTable_id(props.workoutLog.workoutName);
        setTimeCompeleted(props.workoutLog.timeCompleted.substring(0,10));
    },[props.workoutLog])

    //sets background to a different color if it is an even number in the array of workoutlogrows
    useEffect(()=>{
        if(props.index % 2 === 0){
            setBackgroundColor("rgba(0, 0, 0, 0.123)");
        }
    },[])
    return (
    <div className="WorkoutLogRow" style={{background:backgroundColor}}>
        <p>Workout Name: {workoutTable_id}</p>
        <p>Day Completed: {timeCompleted}</p>
    </div>
    );
}

export default WorkoutLogRow;
