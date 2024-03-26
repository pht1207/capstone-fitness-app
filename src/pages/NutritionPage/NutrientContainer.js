import { useEffect, useState } from 'react';
import './NutritionPage.css'
import { CircularProgressBar } from "react-percentage-bar";

function NutrientContainer(props) {
  
  const [remainingValue, setRemainingValue] = useState(0);

  useEffect(()=>{ //Sets the remaining value if goalvalue or loggedcount are changed
    setRemainingValue(props.goalValue-props.loggedCount);
  },[props.goalValue, props.loggedCount])

  return (
    <div className="MacroNutrientContainer" style={{backgroundColor:props.backgroundColor}}>
        <h3>{props.containerName}</h3>
        <p>Current Count</p>
          <p>{props.loggedCount}</p>
          <CircularProgressBar
            className="CircularProgressBar"
            size={".5rem"}
            radius={"6rem"}
            text={"Based on your remaining"}
            percentage={"90"}
          />
        <div><p>Goal:</p> <p>{props.goalValue}g</p></div>
        <div><p>Remaining:</p> <p>{remainingValue}g</p></div>
  </div>
  );
}

export default NutrientContainer;
