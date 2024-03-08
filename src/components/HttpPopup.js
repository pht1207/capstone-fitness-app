import './HttpPopup.css'
import { useContext, useEffect, useState } from 'react';
import { HttpPopupContext } from './HttpPopupContext';


function HttpPopup() {
  const {response, setResponse} = useContext(HttpPopupContext);
  const [popupColor, setPopupColor] = useState("LightGreen")
  useEffect(()=>{
    if(response.status === 200){
      setPopupColor("LightGreen")
    }
    else{
      setPopupColor("LightPink")
    }
    setTimeout(() =>{ //Wait 10 seconds before hiding the response message
      setResponse(false)
    },10000)
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
