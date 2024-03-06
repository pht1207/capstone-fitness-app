import React, { useState } from 'react';
import axios from 'axios';

function LogWeight() {
  
  function WeightLogSubmit(event){
    event.preventDefault();
  }


  return (
    <div className="LogWeight">
        <h3>Log Weight</h3>
        <form onSubmit={WeightLogSubmit} className='LogWeightForm'>
          <label>Weight: <input className='WeightInput' type='number'/></label>
          <label>Date Logged: <input type='date'></input></label>
          <button type='submit'>Submit</button>
        </form>

  </div>
  );
}

export default LogWeight;
