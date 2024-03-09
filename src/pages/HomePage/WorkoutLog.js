import React, { useEffect, useState } from 'react';
import WorkoutLogRow from './WorkoutLogRow';
import axios from 'axios';

function WorkoutLog() {
    const [workoutLog, setWorkoutLog] = useState(false);
    
    const token = localStorage.getItem("jwt")
    let page = 1;

    //There will be 5 WorkoutLogRowComponents returned from the backend when it is called
    //Don't worry about how that happens yet, but it will be done here
    useEffect(() => {
        const fetchData = async () => { 
          try {
            const response = await axios.get("https://capstone.parkert.dev/backend/getUserWorkoutLog?page="+page, {
              headers: {
                'Authorization': 'Bearer ' + token
              }
            });
            setWorkoutLog(response.data)
          }
            catch (error) {
            console.error('Error fetching data: ', error);
          }
        };
        fetchData();
      }, []);

        return (
    <div class="WorkoutLog">
        {workoutLog ?
            <>
                <h4>Workout Log</h4>
                <hr/>        
                <WorkoutLogRow workoutLog={workoutLog[0]}/>
                <WorkoutLogRow workoutLog={workoutLog[1]}/>
                <WorkoutLogRow workoutLog={workoutLog[2]}/>
                <WorkoutLogRow workoutLog={workoutLog[3]}/>
                <WorkoutLogRow workoutLog={workoutLog[4]}/>
            </>
            :
            <></>
        }
    </div>
    );
}

export default WorkoutLog;
