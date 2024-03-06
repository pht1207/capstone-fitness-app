import React, { useState } from 'react';
import Tips from './Tips';
import LogWeight from './LogWeight';
import './RightContainer.css'

function RightContainer(props) {

  return (
    <div className="RightContainer">
        <Tips/>
        <br/>
        <LogWeight weightLogged={props.weightLogged} setWeightLogged={props.setWeightLogged}/>

    </div>
  );
}

export default RightContainer;
