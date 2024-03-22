import React,{useState} from 'react';
import './BeginnerFitness.css'
function Day1() {

  return (
    <div className= "Day">
        <div className='Guide'>
        <h1>X Day</h1>
            <p>example text</p>
            <p>example text</p>
            <p>example text</p>
        </div>

        <div className='ExerciseRow'>
            <div className='ExerciseDescription'>
                <h4>Dumbbell Bench Press</h4>
                <p>Sets: 3 Repetitions 8-12</p>
            </div>
                <img src='/dumbbell-bench-press.png'></img> {/* src is done in the public folder, so /image.png would direct the users request to our public folder */}
        </div>

        <div className='ExerciseRow'>
            <div className='ExerciseDescription'>
                <h4>Dumbbell Bench Press</h4>
                <p>Sets: 3 Repetitions 8-12</p>
            </div>
                <img src='/dumbbell-bench-press.png'></img> {/* src is done in the public folder, so /image.png would direct the users request to our public folder */}
        </div>

        <div className='ExerciseRow'>
            <div className='ExerciseDescription'>
                <h4>Dumbbell Bench Press</h4>
                <p>Sets: 3 Repetitions 8-12</p>
            </div>
                <img src='/dumbbell-bench-press.png'></img> {/* src is done in the public folder, so /image.png would direct the users request to our public folder */}
        </div>
    </div>
  );
}

export default Day1;
