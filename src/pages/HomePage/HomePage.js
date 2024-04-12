import React, { useState } from 'react';
import './HomePage.css'
import WorkoutLog from './WorkoutLog';
import WeightGraph from './WeightGraph';
import RightContainer from './RightContainer/RightContainer';

function HomePage(props) {
  const [weightLogged, setWeightLogged] = useState(0);

  return (
  <>
    {!props.isJWTExpired ?
      <div className="HomePage">
      <div className='HorizontalFlexBox'>
        <WeightGraph weightLogged={weightLogged} setWeightLogged={setWeightLogged}/>
        <div className='SpacerDiv'/>
        <RightContainer weightLogged={weightLogged} setWeightLogged={setWeightLogged}/>
      </div>
      <WorkoutLog/>
      </div>
      :
    <>
    <h1>Login or create an account to view the contents of this page</h1>
    </>
    }
  </>
  );
}

export default HomePage;
