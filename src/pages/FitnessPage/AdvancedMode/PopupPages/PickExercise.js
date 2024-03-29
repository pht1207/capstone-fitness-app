import { useEffect, useState } from "react";
import axios from "axios";
import './PopupPages.css'

function PickExercise(props) {
    const [exerciseList, setExerciseList] = useState([]);
    const [muscleGroup, setMuscleGroup] = useState("Any");
    const token = localStorage.getItem("jwt"); //Token for backend operations

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


    return (
        <div className="PickExercise">
            <div className="PickExerciseWindow">
                <div className="PopupHeaderFlexRow"><button style={{opacity:0}}>.</button><h1>Pick Exercise</h1><button className="ExitButton"onClick={()=>{props.setShowPickExercise(false)}}>X</button></div>
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

                {exerciseList.length > 0 ?
                    <div className="PickExerciseWindowList">
                        {exerciseList.map((object, index) =>(
                            <div key={index} className="PickExerciseWindowListElement" onClick={()=>{(props.setExerciseName(object.exerciseName)); props.setShowPickExercise(false)}}>
                                <h4>{object.exerciseName}</h4>
                                <p>{object.muscleGroup}</p>
                            </div>
                        ))}
                    </div>
                :
                    <h3>No results found</h3>
                }
            </div>
        </div>
    );
}

export default PickExercise;
