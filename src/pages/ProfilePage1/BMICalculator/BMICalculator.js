import React, { useEffect, useState, useContext } from 'react';
import "./BMICalculator.css"

function BMICalculator(props) {
  const [weight, setWeight] = useState(props.userData.userWeight)
  const [height, setHeight] = useState(props.userData.height)

  return (
    <div className="BMICalculator">
      <div className='BMIContainer'>
        <h4>BMI Calculator</h4>
        <div className='BMIRow'><p>Height (inches):</p><input defaultValue={height} onChange={(e)=>{setHeight(e.target.value)}}></input></div>
        <div className='BMIRow'><p>Weight (lbs):</p><input defaultValue={weight} onChange={(e)=>{setWeight(e.target.value)}}></input></div>
        <p>Calculated BMI: </p> <h4>{((weight)/((height**2))*703).toFixed(1)}</h4>
        <br></br>
        <h4>BMI Definitions</h4>
        <div className='BMIRow'><p>Underweight: </p><p>{"<"}18.5</p></div>
        <div className='BMIRow'><p>Normal: </p><p>18.5-24.9</p></div>
        <div className='BMIRow'><p>Overweight: </p><p>24.9-29.9</p></div>
        <div className='BMIRow'><p>Obese: </p><p>{"≥"}30</p></div>

      </div>
  </div>
  );
}

export default BMICalculator;
