import React, { useState } from 'react';
import WorkoutLogRow from './WorkoutLogRow';
import './HomePage.css'
import WorkoutLog from './WorkoutLog';
import WeightGraph from './WeightGraph';
import Tips from './Tips';

function HomePage() {


  return (
    <div className="HomePage">
        <div class="hp_img">
          <h1 id="welcome_msg"><u>Welcome</u></h1>
          <img id="homepage_img" src={require('./background.png')} alt="Man resting after exercise"></img>
        </div>

      <WeightGraph/>

      <Tips/>

      <WorkoutLog/>

    </div>
  );
}

export default HomePage;
