import './HttpPopup.css'
import { useContext, useEffect, useState } from 'react';
import { HttpPopupContext } from './HttpPopupContext';


function HttpPopup() {
  const {message, setMessage} = useContext(HttpPopupContext);

  useEffect(()=>{
    console.log("useeffect called")
    setTimeout(() =>{
      setMessage(false)
    },10000)
  },[message])
  
  return (
    <div className="HttpPopup">
      {message ? 
            <p>Message: {message}</p>
            :
            <></>
      }
    </div>
  );
}

export default HttpPopup;
