import React,{useEffect, useState} from 'react';
import AdvancedFitness from './AdvancedMode/AdvancedFitness';
import BeginnerHome from './BeginnerMode/BeginnerHome';
function FitnessPageTernary(props) {
    //If there isn't a beginnerboolean set, set ti to true
    useEffect(()=>{
      if(localStorage.getItem("beginnerBoolean") === null){
        localStorage.setItem("beginnerBoolean", true);
      }
    })

    const [isBeginner, setIsBeginner] = useState(JSON.parse(localStorage.getItem("beginnerBoolean")));
    //If beginner mode is set, set it in localstorage
    useEffect(()=>{
      localStorage.setItem("beginnerBoolean", isBeginner)
    },[isBeginner])

  return (
    <>
    {!props.isJWTExpired ? 
      <>  {/* Shows beginnermode or advanced mode depending ont he value of isbeginner */}
          {isBeginner ? <BeginnerHome setIsBeginner={setIsBeginner}/> : <AdvancedFitness setIsBeginner={setIsBeginner}/>}
      </>
    :
      <>
        <h1>Login or create an account to view the contents of this page</h1>
      </>
    }
    </>
  );
}

export default FitnessPageTernary;
