import React, { useState } from 'react';
import './HomePage.css'
import WorkoutLog from './WorkoutLog';
import WeightGraph from './WeightGraph';
import RightContainer from './RightContainer/RightContainer';

function HomePage() {
  const [weightLogged, setWeightLogged] = useState(0);

  return (
    <div className="HomePage">

      <div className='HorizontalFlexBox'>
        <WeightGraph weightLogged={weightLogged} setWeightLogged={setWeightLogged}/>
        <div className='SpacerDiv'/>
        <RightContainer weightLogged={weightLogged} setWeightLogged={setWeightLogged}/>
      </div>
      <WorkoutLog/>

    </div>
  );
}

export default HomePage;
