import React, { useState, useEffect } from 'react';


function Tips() {
  const tips = [
      "Drink plenty of water.",
      "Listen to your body and take breaks when you need.",
      "Don't overwork yourself.",
      "You can achieve whatever you put your mind to.",
      "Stay motivated and don't give up.",
      "Don't forget to warm up before you start.",
      "Make sure you cool down when you're done.", 
      "Mix it up, include a variety of exercises to your routine.",
      "Consistency is key.",
    ];
  const [tip, setTip] = useState(tips[Math.floor(Math.random()*tips.length)]); //Sets the current tip to be displayed, the starting default value is a random tip from the tips array
  const [usedTips, setUsedTips] = useState([]);
  const [wasClicked, setWasClicked] = useState(0);

  //Sets a timer for 8000ms every time the tip state is changed
  useEffect(()=>{
      setTimeout(() =>{
          let unusedTips = tips.filter(t => !usedTips.includes(t));
          if (unusedTips.length === 0) {
              // If all tips have been used, reset usedTips array
              unusedTips = tips;
              setUsedTips([]);
          }
          const randomIndex = Math.floor(Math.random() * unusedTips.length);
          const nextTip = unusedTips[randomIndex];
          setTip(nextTip);
          setUsedTips([...usedTips, nextTip]);
          },8000)//Wait 10 seconds before changing to a new randomized tip
    },[tip])




  return (
    <div className="Tips" onClick={()=>{
        let unusedTips = tips.filter(t => !usedTips.includes(t));
        if (unusedTips.length === 0) {
            // If all tips have been used, reset usedTips array
            unusedTips = tips;
            setUsedTips([]);
        }
        const randomIndex = Math.floor(Math.random() * unusedTips.length);
        const nextTip = unusedTips[randomIndex];
        setTip(nextTip);
        setUsedTips([...usedTips, nextTip]);
      }}>
        <h4>Tips</h4>
        <p>{tip}</p>
  </div>
  );
}

export default Tips;
