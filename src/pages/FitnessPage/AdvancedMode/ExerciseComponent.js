import './ExerciseComponent.css'
import PickExercise from './PopupPages/PickExercise'

import { useState, useEffect } from "react";

function ExerciseComponent(props) {

  const [exerciseName, setExerciseName] = useState(props.exercise.name);
  const [sets, setSets] = useState(props.exercise.sets || []);
  //const [weights, setWeights] = useState(props.exercise.weights || []);
  //const [reps, setReps] = useState(props.exercise.reps || []);
  const [showPickExercise, setShowPickExercise] = useState(false);

  //useEffect(() => {
   // setExerciseName(props.exercise.name);
   // setSets(props.exercise.sets || []);
   // setWeights(props.exercise.weights || []);
   // setReps(props.exercise.reps || []);
 // }, [props.exercise]);

// NEW CODE
useEffect(() => {
  setExerciseName(props.exercise.name);
  if (Array.isArray(props.exercise.sets)) {
    setSets(props.exercise.sets);
  }
}, [props.exercise]);

  const handleExerciseNameChange = (e) => {
    setExerciseName(e.target.value);
    props.onChange({ ...props.exercise, name: e.target.value });
  };

  //const handleWeightChange = (e, index) => {
    //const newWeights = [...weights];
    //newWeights[index] = e.target.value;
    //setWeights(newWeights);
  //};

  //const handleRepsChange = (e, index) => {
    //const newReps = [...reps];
    //newReps[index] = e.target.value;
    //setReps(newReps);
  //};

  //const addSet = () => {
    //setSets([...sets, sets.length + 1]); // Adding set number
    //setWeights([...weights, '']); // Initialize weight for the new set
    //setReps([...reps, '']); // Initialize reps for the new set
  //};

  //NEW CODE
  const addSet = () => {
    const newSet = { weight: "", reps: "" };
    setSets([...sets, newSet]);
    props.onChange({ ...props.exercise, sets: [...sets, newSet] });
  };


  // const removeSet = (index) => {
  //   const newSets = [...sets];
  //   newSets.splice(index, 1); // Removing the set at the specified index
  //   setSets(newSets);

  //   const newWeights = [...weights];
  //   newWeights.splice(index, 1); // Removing weight at the same index
  //   setWeights(newWeights);

  //   const newReps = [...reps];
  //   newReps.splice(index, 1); // Removing reps at the same index
  //   setReps(newReps);

  //   // Ensure you're passing the updated state to the parent component
  //   props.onChange({ ...props.exercise, sets: newSets, weights: newWeights, reps: newReps });
  // };

//NEW CODE
const removeSet = (index) => {
  const newSets = [...sets];
  newSets.splice(index, 1);
  setSets(newSets);
  props.onChange({ ...props.exercise, sets: newSets });
};

//NEW CODE
const handleSetChange = (index, key, value) => {
  const newSets = [...sets];
  if (!Array.isArray(newSets)) {
    newSets = [];
  }
  newSets[index][key] = value;
  setSets(newSets);
  props.onChange({ ...props.exercise, sets: newSets });
};
  const handleDelete = () => {
    props.onDelete();
  }

  return (
    <div className="ExerciseComponent">
      <div className="exercise-input-group">
        <input
          type="text"
          onClick={(() => { setShowPickExercise(true) })}
          value={exerciseName}
          onChange={handleExerciseNameChange}
          placeholder="Exercise Name"
          className="exercise-name-input"
          style={{width:'200px'}}
        />
        <button className="delete-exercise-button" onClick={() => props.onDelete()}>
          Delete
        </button>
      </div>
      {sets.map((set, index) => (
        <div className="set-container" key={index}>
          <div className="set-number">{`Set ${index + 1}`}</div>
          {/* <input
            type="number"
            value={weights[index] || ''}
            onChange={(e) => handleWeightChange(e, index)}
            placeholder="Weight"
            style={{ width: '60px' }}
          />
          <input
            type="number"
            value={reps[index] || ''}
            onChange={(e) => handleRepsChange(e, index)}
            placeholder="Reps"
            style={{ width: '60px' }}
          /> */}

          <input
          type ="number"
          value = {set.weight}
          onChange={(e) => handleSetChange(index, "weight", e.target.value)}
          placeholder="Weight"
          style={{ width: '60px'}}
          />
          
          <input
          type="number"
          value={set.reps}
          onChange={(e) => handleSetChange(index, "reps", e.target.value)}
          placeholder="Reps"
          style={{ width: '60px' }}
          />

          <button className="remove-set-button" onClick={() => removeSet(index)}>
            Remove Set
          </button>
        </div>
      ))}
      <div className="button-container">
        <button className="add-set-button" onClick={addSet}>
          Add Set
        </button>
      </div>
      {showPickExercise ? <PickExercise setExerciseName={setExerciseName} setShowPickExercise={setShowPickExercise} /> : <></>}

    </div>
  );
}

export default ExerciseComponent;