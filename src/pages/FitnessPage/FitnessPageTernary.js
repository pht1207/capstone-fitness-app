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
    


  return (
    <>
        {isBeginner ? <BeginnerHome setIsBeginner={setIsBeginner}/> : <AdvancedFitness setIsBeginner={setIsBeginner}/>}
        {isBeginner ? <button className='SwitchModeButton' onClick={async ()=>{{setIsBeginner(false); await localStorage.setItem("beginnerBoolean", false)}}}>Switch to advanced mode</button> 
        :
        <button className='SwitchModeButton' onClick={async ()=>{{setIsBeginner(true); await localStorage.setItem("beginnerBoolean", false)}}}>Switch to beginner mode</button>
        }

    </>
  );
}

export default FitnessPageTernary;
