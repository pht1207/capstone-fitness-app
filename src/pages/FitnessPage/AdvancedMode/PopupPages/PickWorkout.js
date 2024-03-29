import { useEffect, useState } from "react";
import axios from "axios";
import recommendedWorkouts from "./RecommendedWorkouts";
import './PopupPages.css'

function PickWorkout(props) {
    const [backendSystemWorkouts, setBackendSystemWorkouts] = useState([])
    const [backendUserWorkouts, setBackendUserWorkouts] = useState([])
    const token = localStorage.getItem("jwt"); //Token for backend operations

    useEffect(() => {
      const getWorkouts = async () => {
        try {
          const response = await axios.get(
            "https://capstone.parkert.dev/backend/getWorkouts",
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
  
          let tempArrayUser = [];
          let tempArraySystem = [];
          for(let i = 0; i < response.data.length; i++){
            if(response.data[i].createdBy !== null){
              tempArrayUser.push(response.data[i]);
            }
            else{
              tempArraySystem.push(response.data[i]);
            }
          }
          setBackendSystemWorkouts(tempArraySystem);
          setBackendUserWorkouts(tempArrayUser);
  
        
        } 
  
        catch (error) {
          console.error("Error - Cannot get workouts: ", error);
        }
      };
      getWorkouts();
    }, []);
  

    return (
        <div className="PickWorkout">
            <div className="PickWorkoutWindowColumn">
            <div className="PopupHeaderFlexRow"><button style={{opacity:0}}>.</button><h1>Pick Workout</h1><button className="ExitButton"onClick={()=>{props.setShowPickWorkout(false)}}>X</button></div>
                <div className="PickWorkoutWindowContent">
                    {backendSystemWorkouts.length > 0 ?
                        <div className="CreatedWorkouts">
                            <h4>System Created Workouts</h4>
                            {backendSystemWorkouts.map((object, index) =>(
                                <div key={index} className="PickWorkoutWindowListElement" onClick={()=>{props.setShowPickWorkout(false); props.addPrebuiltWorkout(object)}}>
                                    <p>{object.workoutName}</p>
                                </div>
                            ))}
                        </div>
                    :
                    <div className="CreatedWorkouts">
                      <h4>System Created Workouts</h4>
                      <h4>No results found</h4>
                    </div>                    
                  }
                    <div className="CreatedWorkouts">
                        <h4>Recommended Workouts</h4>
                        {recommendedWorkouts.map((object, index) => (
                        <div key={index} className="PickWorkoutWindowListElement" onClick={()=>{props.setShowPickWorkout(false); props.addPrebuiltWorkout(object)}}>
                            <p>{object.workoutName}</p>
                        </div>
                        ))}
                    </div>
                    {backendUserWorkouts.length > 0 ?
                    
                        <div className="CreatedWorkouts">
                            <h4>User Created Workouts</h4>
                            {backendUserWorkouts.map((object, index) =>(
                                <div key={index} className="PickWorkoutWindowListElement" onClick={()=>{props.setShowPickWorkout(false); props.addPrebuiltWorkout(object)}}>
                                    <p>{object.workoutName}</p>
                                </div>
                            ))}
                        </div>
                    :
                        <div className="CreatedWorkouts">
                          <h4>User Created Workouts</h4>
                          <h4>No results found</h4>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default PickWorkout;
