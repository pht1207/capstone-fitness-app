import React, { useState } from 'react';
import WorkoutLogRow from './WorkoutLogRow';
import './HomePage.css'
import WorkoutLog from './WorkoutLog';
import WeightGraph from './WeightGraph';
import Tips from './Tips';
import RightContainer from './RightContainer/RightContainer';

function HomePage() {

//        <Tips/>

  return (
    <div className="HomePage">

      <div className='HorizontalFlexBox'>
        <WeightGraph/>
        <div className='SpacerDiv'/>
        <RightContainer/>
      </div>
      <WorkoutLog/>

    </div>
  );
}

export default HomePage;
