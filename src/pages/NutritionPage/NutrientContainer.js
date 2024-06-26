import { useEffect, useState } from 'react';
import './NutritionPage.css'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function NutrientContainer(props) {
  
  const [remainingValue, setRemainingValue] = useState(0);

  useEffect(()=>{ //Sets the remaining value if goalvalue or loggedcount are changed
    setRemainingValue(props.goalValue-props.loggedCount);
  },[props.goalValue, props.loggedCount])

  return (
    <div className="MacroNutrientContainer" style={{backgroundColor:props.backgroundColor}}>
        <h1>{props.containerName}</h1>
        <p>{props.containerName} Logged</p>
          <p>{props.loggedCount}g</p>
          <CircularProgressbar
            className="CircularProgressBar"
            size={".5rem"}
            radius={"6rem"}
            maxValue={100}
            minValue={0}
            text={Math.round((props.loggedCount/props.goalValue)*100)+"%"}
            value={Math.round((props.loggedCount/props.goalValue)*100)} //Goal (props.goalValue) = 100%. Goal (props.goalValue) - Current Count (props.loggedCount) = Remaining (remainingValue). To calculate the percent, divide by 100%, which is the Goal. (remainingValue/props.goalValue). Then multiply by 100.
            duration={"100"}
            padding={".8"}
          />
        <div><p>Goal:</p> <p>{props.goalValue}g</p></div>
        <div><p>Remaining:</p> <p>{remainingValue}g</p></div>
  </div>
  );
}

export default NutrientContainer;
