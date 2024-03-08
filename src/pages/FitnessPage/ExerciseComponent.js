import './ExerciseComponent.css'

import { useState } from "react";

function ExerciseComponent(props) {

  //Your code to make the site functional goes in this empty space. The 'return()' below is what renders on the page (the html)
  //Inserted by parker: https://capstone.parkert.dev/backend/getFoods

  const [exerciseName, setExerciseName] = useState(props.exerciseName)
  const [sets, setSets] = useState(props.sets);
  const [reps, setReps] = useState(props.reps);

  const handleExerciseNameChange = (e) => {
    setExerciseName(e.target.value);
  };

  const handleSetsChange =(e) => {
    setSets(e.target.value)
  };

  const handleRepsChange =(e) =>{
    setReps(e.target.value)
  };

  return (
    <div className="ExerciseComponent">
       <input
        type="text"
        value={exerciseName}
        onChange={handleExerciseNameChange}
        placeholder="Exercise Name"
        style={{width: '150px'}}
       />

       <input
       type="number"
       value= {sets}
       onChange={handleSetsChange}
       placeholder="Sets"
       style={{width:'40px'}}
       />

       <input
       type="number"
       value= {reps}
       onChange={handleRepsChange}
       placeholder="Reps"
       style={{width:'40px'}}
       />
    </div>
  );
}

export default ExerciseComponent;
