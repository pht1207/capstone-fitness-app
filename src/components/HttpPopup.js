import './HttpPopup.css'
import { useContext, useEffect, useState } from 'react';
import { HttpPopupContext } from './HttpPopupContext';


function HttpPopup() {
  const {message, setMessage} = useContext(HttpPopupContext);

  useEffect(()=>{
    console.log("useeffect called")
  },[message])
  
  return (
    <div className="HttpPopup">
      <p>Message: {message}</p>
    </div>
  );
}

export default HttpPopup;
