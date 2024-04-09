import { useEffect, useState } from "react";
import axios from "axios";
import './CreateWorkout.css'

function CreateWorkout(props) {
    const [exerciseList, setExerciseList] = useState([]);
    const [muscleGroup, setMuscleGroup] = useState("Any");
    const token = localStorage.getItem("jwt"); //Token for backend operations
    const [createdWorkoutContent, setCreatedWorkoutContent] = useState({workoutName:'Placeholder', exercises:[],});

    //This useeffect gets all exercises available to the user in DB, and shows them. It also has a filter available to sort by muscle group
    useEffect(() => {
        const getExercises = async () => {
        let response;
        try {
            if(muscleGroup === "Any"){ //if no muscle filter set, do this
                response = await axios.get(
                    "https://capstone.parkert.dev/backend/getExercises",
                    {
                        headers: {
                        Authorization: "Bearer " + token,
                        }
                    }
                );
                setExerciseList(response.data)
            }
            else{ //if a muscle group filter is set do this
                response = await axios.get(
                    "https://capstone.parkert.dev/backend/getExercises?muscleGroup="+encodeURIComponent(muscleGroup),
                    {
                        headers: {
                        Authorization: "Bearer " + token,
                        }
                    }
                );
                setExerciseList(response.data)
            }

        } catch (error) {
            console.error("Error - Cannot get workouts: ", error);
        }
        };
        getExercises();
    }, [muscleGroup]);


    function filterChange(e){
        setMuscleGroup(e.target.value)
    }

    useEffect(()=>{
        console.log(createdWorkoutContent)
    },[createdWorkoutContent])

    //This function sends a workout object to be inserted into the DB to be used for future use by the user as a preset
    function SubmitWorkout(){
        const SendWorkout = async () => {
            let response;
            let body = createdWorkoutContent;
            try{
                response = await axios.post(
                    "https://capstone.parkert.dev/backend/createWorkoutsWithExercises",
                    body,
                    {
                        headers: {
                        Authorization: "Bearer " + token,
                        }
                    }
                );
                props.setShowCreateWorkout(false);
            }
    
            catch (error) {
                console.error("Error - Cannot submit workout: ", error);
            }
            };
            SendWorkout();
    }

    return (
        <div className="CreateWorkout">
            <div className="CreateWorkoutWindow">
                <div className="CreateWorkoutRow">
                    <div className="MadeExercise">
                        <h4>Your Workout</h4>
                        <label> <input placeholder={"Type a Workout Name"} onChange={(e)=>{setCreatedWorkoutContent({workoutName:e.target.value, exercises:createdWorkoutContent.exercises})}}></input></label>
                        {createdWorkoutContent.exercises.length > 0 ?
                                <>
                                    {createdWorkoutContent.exercises.map((object, index) =>(
                                        <div key={index} className="CreatedWorkoutContentElement" onClick={()=>{console.log("implement feature to remove me on click later")}}>
                                            <p>{index}: {object}</p>
                                        </div>
                                        
                                    ))}
                                    <button onClick={SubmitWorkout}>Create Workout</button>
                                </>
                            :
                                <h5>Click exercises to add them to your workout</h5>
                            }
                    </div>
                    <div className="PickExerciseWindowColumn">
                    <div className="PopupHeaderFlexRow"><button style={{opacity:0}}>.</button><button className="ExitButton"onClick={()=>{props.setShowCreateWorkout(false)}}>X</button></div>

                        <h4>Choose exercises to put in your workout</h4>
                    <p>Muscle Group Filter: </p>
                    <select onChange={filterChange}>

                        <option value={"Any"}>Any</option>

                        <option disabled>──Chest──</option>
                        <option value={"Overall Chest"}>Overall Chest</option>
                        <option value={"Upper Chest"}>Upper Chest</option>
                        <option value={"Lower Chest"}>Lower Chest</option>

                        <option disabled>──Back──</option>
                        <option value={"Overall Back"}>Overall Back</option>
                        <option value={"Upper Back"}>Upper Back</option>
                        <option value={"Lat"}>Lats</option>

                        <option disabled>─Shoulders─</option>
                        <option value={"Front Delt"}>Front Delt</option>
                        <option value={"Rear Delt"}>Rear Delt</option>
                        <option value={"Lateral Delt"}>Lateral Delt</option>

                        <option disabled>──Core──</option>
                        <option value={"Abs"}>Abs</option>
                        <option value={"Obliques"}>Obliques</option>

                        <option disabled>──Arms──</option>
                        <option value={"Bicep"}>Biceps</option>
                        <option value={"Tricep"}>Triceps</option>

                        <option disabled>──Legs──</option>
                        <option value={"Quads"}>Quads</option>
                        <option value={"Hamstrings"}>Hamstrings</option>
                        <option value={"Calfs"}>Calfs</option>

                    </select>
                    <div>

                    </div>
                        <div className="PickExerciseWindowList">
                            {exerciseList.length > 0 ?
                                <>
                                    {exerciseList.map((object, index) =>(
                                        <div key={index} className="PickExerciseWindowListElement" onClick={()=>{setCreatedWorkoutContent({workoutName:createdWorkoutContent.workoutName, exercises:[...createdWorkoutContent.exercises, object.exerciseName]})}}>
                                            <h4>{object.exerciseName}</h4>
                                            <p>{object.muscleGroup}</p>
                                        </div>
                                        
                                    ))}
                                </>
                            :
                                <h3>No results found</h3>
                            }
                        </div>
                    </div>

                </div>



            </div>
        </div>
    );
}

export default CreateWorkout;
