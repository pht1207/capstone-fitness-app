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
            percentage={console.log(Math.round((remainingValue/props.goalValue)*100).toFixed(0))} //Goal (props.goalValue) = 100%. Goal (props.goalValue) - Current Count (props.loggedCount) = Remaining (remainingValue). To calculate the percent, divide by 100%, which is the Goal. (remainingValue/props.goalValue)
            duration={"100"}
          />
        <div><p>Goal:</p> <p>{props.goalValue}g</p></div>
        <div><p>Remaining:</p> <p>{remainingValue}g</p></div>
  </div>
  );
}

export default NutrientContainer;
