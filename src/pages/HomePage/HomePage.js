import React, { useState } from 'react';
import WorkoutLogRow from './WorkoutLogRow';
import './HomePage.css'
import WorkoutLog from './WorkoutLog';
import WeightGraph from './WeightGraph';
import Tips from './Tips';

function HomePage() {


  return (
    <div className="HomePage">

      <div className='HorizontalFlexBox'>
        <WeightGraph/>
        <div className='SpacerDiv'/>
        <Tips/>
      </div>
      <WorkoutLog/>

    </div>
  );
}

export default HomePage;
