import React, { useState } from 'react';


function Tips() {
    const [tip, setTip] = useState("Click here for tips");
    const [usedTips, setUsedTips] = useState([]);
  
  
    const tips = [
      "Drink plenty of water.",
      "Listen to your body and take breaks when you need.",
      "Don't overwork yourself.",
      "You can achieve whatever you put your mind to.",
      "Stay motivated and don't give up.",
      "Don't forget to warm up before you start.",
      "Make sure you cool down when you're done.", 
      "Mix it up, include a variety of exercises to your routine.",
      "Consistency is key."
    ];
  
    const nextTip = () => {
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
    };

  return (
    <div className="tips">
        <h4>Tips</h4>
        <p id="tipText">{tip}</p>
        <button id="next_button" onClick={nextTip}>Next</button>
        <hr/>

  </div>
  );
}

export default Tips;
