import React,{useState} from 'react';
import './BeginnerFitness.css'
import BeginnerHome from './BeginnerHome';
import Day1 from './Day1';
import Day2 from './Day2';
import Day3 from './Day3';
function BeginnerFitness(props) {
    const [currentPage, setCurrentPage] = useState('home')


    return (
        <div className= "BeginnerFitness">
            <nav>
                <label>Home<button hidden='true' onClick={()=>{setCurrentPage('home')}}></button></label>
                <label>Day 1<button hidden='true' onClick={()=>{setCurrentPage('day1')}}></button></label>
                <label>Day 2<button hidden='true' onClick={()=>{setCurrentPage('day2')}}></button></label>
                <label>Day 3<button hidden='true' onClick={()=>{setCurrentPage('day3')}}></button></label>
            </nav>

        {currentPage === 'home' && <BeginnerHome/>}
        {currentPage === 'day1' && <Day1/>}
        {currentPage === 'day2' && <Day2/>}
        {currentPage === 'day3' && <Day3/>}
        
        <button className='SwitchModeButton' onClick={async ()=>{{props.setIsBeginner(false); await localStorage.setItem("beginnerBoolean", false)}}}>Switch to advanced mode</button>

    </div>
  );
}

export default BeginnerFitness;
