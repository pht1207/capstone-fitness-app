import React, { useState } from 'react';
import Tips from './Tips';
import LogWeight from './LogWeight';
import './RightContainer.css'

function RightContainer() {

  return (
    <div className="RightContainer">
        <Tips/>
        <br/>
        <LogWeight/>

    </div>
  );
}

export default RightContainer;
