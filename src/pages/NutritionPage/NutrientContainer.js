import { useEffect, useState } from 'react';
import './NutritionPage.css'

function NutrientContainer(props) {
  const [remainingValue, setRemainingValue] = useState(0);
  
  useEffect(()=>{
    setRemainingValue(props.goalValue-props.loggedCount);
  },[props.goalValue, props.loggedCount])

console.log(props.remainingValue)
  return (
    <div className="MacroNutrientContainer" style={{backgroundColor:props.backgroundColor}}>
        <h3>{props.containerName}</h3>
        <p>Current Count</p>
          <p>{props.loggedCount}</p>
        <div><p>Goal:</p> <p>{props.goalValue}g</p></div>
        <div><p>Remaining:</p> <p>{remainingValue}g</p></div>
  </div>
  );
}

export default NutrientContainer;
