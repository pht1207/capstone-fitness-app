import React, { useState } from 'react';
import axios from 'axios';

function LogWeight() {
  


  return (
    <div className="LogWeight">
        <h4>Log Weight</h4>
        <form>
          <input className='WeightInput'/>
          <input type='date'/>
          <input type='submit'/>
        </form>

  </div>
  );
}

export default LogWeight;
