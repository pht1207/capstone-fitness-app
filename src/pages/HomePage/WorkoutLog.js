import React, { useEffect, useState } from 'react';
import WorkoutLogRow from './WorkoutLogRow';
import axios from 'axios';
import { render } from '@testing-library/react';

function WorkoutLog() {
  const [workoutLog, setWorkoutLog] = useState([]);
  const [renderedLog, setRenderedLog] = useState([]);
  const [page, setPage] = useState(1);
  
  const token = localStorage.getItem("jwt")

  //This useEffect gets the users workoutlog entries
  useEffect(() => {
      const fetchData = async () => { 
        try {
          const response = await axios.get("https://capstone.parkert.dev/backend/getUserWorkoutLog?page="+page, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          });
          setWorkoutLog(response.data)
            {/*The http request returns a maximum 6 length array
              Only 5 of the items are rendered, and if the length of the array is less than 6, the page forward button will not be shown
              Because that means there are no more workout log rows to show
            */}
        }
          catch (error) {
          console.error('Error fetching data: ', error);
        }
      };
      fetchData();
    }, [page]);

  //Used to create the 5 length array of workout log items from workoutLog state value
  useEffect(()=>{
    const updateRenderedLog = async () =>{
      try{
        setRenderedLog(workoutLog.slice(0,5));
      }
      catch (error){
        console.error(error)
      }
    }
    updateRenderedLog();
  }, [workoutLog])


  //If there is more content to show, the user is allowed to move forward a page
  function pageForward(){
    if(workoutLog.length > 5){
      setPage(page+1)
    }
  }
  //If there is more content to show, the user is allowed to move backward a page
  function pageBackward(){
    if(page > 1){
      setPage(page-1);
    }
  }

  return (
    <div className="WorkoutLog">
      <h3>Workout Log</h3>
      <div className='WorkoutLogContainer'>
        {renderedLog.length > 0 ?
          <>
              {renderedLog.map((log, index) =>(
                <WorkoutLogRow key={index} workoutLog={log} index={index}/>
              ))}
          </>
          :
          <h4>No Workout Log Found</h4>
        }
      </div>

      <div className='PageChanger'>
        {/* If there is no content to show forward or backward, hide the button for the appropriate page change button */}
        {page > 1 ? <button onClick={pageBackward}>{'<'}</button> : <button style={{opacity:"0%"}}onClick={pageBackward}>{'<'}</button>}
        <p>Page {page}</p>
        {workoutLog.length > 5 ? <button onClick={pageForward}>{'>'}</button> : <button style={{opacity:"0%"}} onClick={pageForward}>{'>'}</button>}

      </div>

    </div>
    );
}

export default WorkoutLog;
