import './HttpPopup.css'
import { useContext, useEffect, useState } from 'react';
import { HttpPopupContext } from './HttpPopupContext';


function HttpPopup() {
  const {response, setResponse} = useContext(HttpPopupContext);
  const [popupColor, setPopupColor] = useState("LightGreen")
  //This useEffect sets the background color of the http response popup and has it timeout after 8 seconds
  useEffect(()=>{
    if(response.status === 200){
      setPopupColor("LightGreen")
    }
    else{
      setPopupColor("LightPink")
    }
    setTimeout(() =>{ //Wait 10 seconds before hiding the response message
      setResponse(false)
    },8000)
  },[response])

  
  
  return (
    <div className="HttpPopup" style={{backgroundColor:popupColor}}>
      {/* Below will show the message if one is set, or show nothing once message state has been set to empty */}
      {response ? 
            <p>Message: {response.data.message}</p>
            :
            <></>
      }
    </div>
  );
}

export default HttpPopup;
