import { useEffect, useState, useContext } from 'react';
import './NutritionPage.css'
import { HttpPopupContext } from '../../components/HttpPopupContext';

function NutrientContainer(props) {
  
  const [remainingValue, setRemainingValue] = useState(0);
  const {response} = useContext(HttpPopupContext);

  useEffect(()=>{ //Sets the remaining value if goalvalue or loggedcount are changed or if the lognutrition form is submitted
    setRemainingValue(props.goalValue-props.loggedCount);
    console.log("Effect triggered", props.goalValue, props.loggedCount, response);
  },[props.goalValue, props.loggedCount, response])

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
