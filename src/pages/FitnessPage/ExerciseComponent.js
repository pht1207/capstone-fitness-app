import './ExerciseComponent.css'

import { useState, useEffect } from "react";

function ExerciseComponent(props) {

  //Your code to make the site functional goes in this empty space. The 'return()' below is what renders on the page (the html)
  //Inserted by parker: https://capstone.parkert.dev/backend/getFoods
  const [exerciseName, setExerciseName] = useState(props.exercise.name); // Use props.exercise.name
  const [sets, setSets] = useState(props.exercise.sets);
  const [weight, setWeight] = useState(props.exercise.weight)
  const [reps, setReps] = useState(props.exercise.reps);

  useEffect(() => {
    setExerciseName(props.exercise.name);
    setSets(props.exercise.sets);
    setWeight(props.exercise.weight);
    setReps(props.exercise.reps);
  }, [props.exercise.name, props.exercise.sets, props.exercise.reps]);

  const handleExerciseNameChange = (e) => {
    setExerciseName(e.target.value);
    props.onChange({ ...props.exercise, name: e.target.value });
  };

  const handleSetsChange = (e) => {
    setSets(e.target.value);
    props.onChange({ ...props.exercise, sets: e.target.value });
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
    props.onChange({...props.exercise, weight: e.target.value});
  };

  const handleRepsChange = (e) => {
    setReps(e.target.value);
    props.onChange({ ...props.exercise, reps: e.target.value });
  };

  return (
    <div className="ExerciseComponent">
      <input
        type="text"
        value={exerciseName}
        onChange={handleExerciseNameChange}
        placeholder="Exercise Name"
        style={{ width: '150px' }}
      />

      <input
        type="number"
        value={sets}
        onChange={handleSetsChange}
        placeholder="Sets"
        style={{ width: '50px' }}
      />

      <input
        type="number"
        value={weight}
        onChange={handleWeightChange}
        placeholder="Weight"
        style={{width: '60px'}}
      />

      <input
        type="number"
        value={reps}
        onChange={handleRepsChange}
        placeholder="Reps"
        style={{ width: '50px' }}
      />
    </div>
  );
}

export default ExerciseComponent;