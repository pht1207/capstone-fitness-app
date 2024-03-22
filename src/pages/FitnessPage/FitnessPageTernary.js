import React,{useState} from 'react';
import AdvancedFitness from './AdvancedMode/AdvancedFitness';
import BeginnerFitness from './BeginnerMode/BeginnerFitness';
function FitnessPageTernary() {

    const [isBeginner, setIsBeginner] = useState(false);



  return (
    <div className= "FitnessPage"> {/*This div will contain every component for the fitness page. */}
        <button onClick={() =>{setIsBeginner(!isBeginner)}}>switch</button>
        {isBeginner ? <BeginnerFitness/> : <AdvancedFitness/>}
    </div>
  );
}

export default FitnessPageTernary;
