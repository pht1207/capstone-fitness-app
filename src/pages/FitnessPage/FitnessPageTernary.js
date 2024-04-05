import React,{useEffect, useState} from 'react';
import AdvancedFitness from './AdvancedMode/AdvancedFitness';
import BeginnerHome from './BeginnerMode/BeginnerHome';
function FitnessPageTernary() {
    useEffect(()=>{
      if(localStorage.getItem("beginnerBoolean") === null){
        localStorage.setItem("beginnerBoolean", true);
      }
    })

    const [isBeginner, setIsBeginner] = useState(JSON.parse(localStorage.getItem("beginnerBoolean")));
    
    useEffect(()=>{
      localStorage.setItem("beginnerBoolean", isBeginner)
    },[isBeginner])

  return (
    <>
        {isBeginner ? <BeginnerHome setIsBeginner={setIsBeginner}/> : <AdvancedFitness setIsBeginner={setIsBeginner}/>}
    </>
  );
}

export default FitnessPageTernary;
