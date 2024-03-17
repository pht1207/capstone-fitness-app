import './ExerciseComponent.css'

import { useState, useEffect } from "react";

function ExerciseComponent(props) {

  //Your code to make the site functional goes in this empty space. The 'return()' below is what renders on the page (the html)
  //Inserted by parker: https://capstone.parkert.dev/backend/getFoods
  const [exerciseName, setExerciseName] = useState(props.exercise.name);
  const [sets, setSets] = useState(props.exercise.sets || []);
  const [weights, setWeights] = useState(props.exercise.weights || []);
  const [reps, setReps] = useState(props.exercise.reps || []);

  useEffect(() => {
    setExerciseName(props.exercise.name);
    setSets(props.exercise.sets || []);
    setWeights(props.exercise.weights || []);
    setReps(props.exercise.reps || []);
  }, [props.exercise]);

  const handleExerciseNameChange = (e) => {
    setExerciseName(e.target.value);
    props.onChange({ ...props.exercise, name: e.target.value });
  };

  const handleWeightChange = (e, index) => {
    const newWeights = [...weights];
    newWeights[index] = e.target.value;
    setWeights(newWeights);
  };

  const handleRepsChange = (e, index) => {
    const newReps = [...reps];
    newReps[index] = e.target.value;
    setReps(newReps);
  };

  const addSet = () => {
    setSets([...sets, sets.length + 1]); // Adding set number
    setWeights([...weights, '']); // Initialize weight for the new set
    setReps([...reps, '']); // Initialize reps for the new set
  };

  const removeSet = (index) => {
    const newSets = [...sets];
    newSets.splice(index, 1); // Removing the set at the specified index
    setSets(newSets);

    const newWeights = [...weights];
    newWeights.splice(index, 1); // Removing weight at the same index
    setWeights(newWeights);

    const newReps = [...reps];
    newReps.splice(index, 1); // Removing reps at the same index
    setReps(newReps);

    // Ensure you're passing the updated state to the parent component
    props.onChange({ ...props.exercise, sets: newSets, weights: newWeights, reps: newReps });
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
      {sets.map((set, index) => (
        <div className="set-container" key={index}>
          <div className="set-number">{`Set ${index + 1}`}</div>
          <input
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
    </div>
  );
}

export default ExerciseComponent;