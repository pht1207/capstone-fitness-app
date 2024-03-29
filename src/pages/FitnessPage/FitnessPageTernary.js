import React,{useEffect, useState} from 'react';
import AdvancedFitness from './AdvancedMode/AdvancedFitness';
import BeginnerFitness from './BeginnerMode/BeginnerFitness';
function FitnessPageTernary() {
    useEffect(()=>{
      if(localStorage.getItem("beginnerBoolean") === null){
        localStorage.setItem("beginnerBoolean", true);
      }
    })

    const [isBeginner, setIsBeginner] = useState(JSON.parse(localStorage.getItem("beginnerBoolean")));
    


  return (
    <>
        {isBeginner ? <BeginnerFitness setIsBeginner={setIsBeginner}/> : <AdvancedFitness setIsBeginner={setIsBeginner}/>}
    </>
  );
}

export default FitnessPageTernary;
