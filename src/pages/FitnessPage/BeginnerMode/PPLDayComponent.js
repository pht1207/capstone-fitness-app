import React,{useState} from 'react';
import './BeginnerFitness.css'
import './PPLDayComponent.css'
function PPLDayComponent(props) {

  return (
    <div className="PPLDayComponent">
        <strong><p>{props.title}</p></strong>
        <div className="ExerciseDescription">
            <p>{props.description1}</p>
            <p>{props.description2}</p>
        </div>
        <div className='ExercisePictureRow'>
        <figure>
          <p>{props.exercise1Header}</p>
          <a href={props.link1} target="_blank" rel="noopener noreferrer">Tutorial</a>
        </figure>

        <figure>
          <p>{props.exercise2Header}</p>
          <a href={props.link2} target="_blank" rel="noopener noreferrer">Tutorial</a>
        </figure>

        <figure>
          <p>{props.exercise3Header}</p>
          <a href={props.link3} target="_blank" rel="noopener noreferrer">Tutorial</a>
        </figure>

        <figure>
          <p>{props.exercise4Header}</p>
          <a href={props.link4} target="_blank" rel="noopener noreferrer">Tutorial</a>
        </figure>

        <figure>
          <p>{props.exercise5Header}</p>
          <a href={props.link5} target="_blank" rel="noopener noreferrer">Tutorial</a>
        </figure>
        </div>
  </div>  
);
}

export default PPLDayComponent;
