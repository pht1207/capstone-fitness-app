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
                <img src={props.image1src}></img>
                <figcaption>{props.image1Header}</figcaption>
            </figure>

            <figure>
                <img src={props.image2src}></img>
                <figcaption>{props.image2Header}</figcaption>
            </figure>

            <figure>
                <img src={props.image3src}></img>
                <figcaption>{props.image3Header}</figcaption>
            </figure>
        </div>
  </div>  
);
}

export default PPLDayComponent;
