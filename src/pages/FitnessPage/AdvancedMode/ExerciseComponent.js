import './ExerciseComponent.css'
import PickExercise from './PopupPages/PickExercise'

import { useState, useEffect } from "react";

function ExerciseComponent(props) {

  const [exerciseName, setExerciseName] = useState(props.exercise.name);
  const [sets, setSets] = useState(props.exercise.sets || []);
  const [showPickExercise, setShowPickExercise] = useState(false);

  //Sets the exercise name from the parent element
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



  //Adds a set to the exercise object
  const addSet = () => {
    const newSet = { weight: "", reps: "" };
    setSets([...sets, newSet]);
    props.onChange({ ...props.exercise, sets: [...sets, newSet] });
  };



  //Removes the set from the selected index of the exercise object
  const removeSet = (index) => {
    const newSets = [...sets];
    newSets.splice(index, 1);
    setSets(newSets);
    props.onChange({ ...props.exercise, sets: newSets });
  };

  const handleSetChange = (index, key, value) => {
    const newSets = [...sets];
    if (!Array.isArray(newSets)) {
      newSets = [];
    }
    newSets[index][key] = value;
    setSets(newSets);
    props.onChange({ ...props.exercise, sets: newSets });
  };

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
          style={{width:'200px',height: '30px'}}
        />
        <button className="delete-exercise-button" onClick={() => props.onDelete()}>Delete</button>
      </div>
      {sets.map((set, index) => (
        <div className="set-container" key={index}>
          <div className="set-number">{`Set ${index + 1}`}</div>
            <input
            type ="number"
            value = {set.weight}
            onChange={(e) => handleSetChange(index, "weight", e.target.value)}
            placeholder="Weight"
            className="input"
            />
            
            <input
            type="number"
            value={set.reps}
            onChange={(e) => handleSetChange(index, "reps", e.target.value)}
            placeholder="Reps"
            className="input"
            />
          <button className="remove-set-button" onClick={() => removeSet(index)}>Remove Set</button>
        </div>
      ))}
      <div className="button-container">
        <button className="add-set-button" onClick={addSet}>Add Set</button>
      </div>
      {showPickExercise ? <PickExercise setExerciseName={setExerciseName} setShowPickExercise={setShowPickExercise} /> : <></>}

    </div>
  );
}

export default ExerciseComponent;