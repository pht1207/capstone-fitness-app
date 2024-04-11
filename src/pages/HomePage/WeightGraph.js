import React, { useEffect, useState, useContext } from 'react';
import { LineChart, XAxis, YAxis, Line, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import {HttpPopupContext} from '../../components/HttpPopupContext';

function WeightGraph(props) {

  const [axiosData, setAxiosData] = useState();
  const {setResponse} = useContext(HttpPopupContext);

  //This useEffect gets the user's weight log object and stores it to be used in the linechart component
  useEffect(()=>{
    async function getUserWeightLog(){
      try{
        const axiosResponse = await axios.get("https://capstone.parkert.dev/backend/getUserWeightLog", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt")
          }
        });
        setResponse(axiosResponse) //used in httpopup.js
        setAxiosData(axiosResponse.data.results) //This is the object that stores all the weight entries
      }
      catch(error){
        console.error("error: ", error.response)
        setResponse(error.response)
      }
    }
    getUserWeightLog();
  },[props.weightLogged])
  

  return (
    <div className="WeightGraph">
      <h4>Weight Graph</h4>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={axiosData} 
          margin={{right: 20}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dateTimeChanged" /> {/* Sets the x axis to the date */}
          <YAxis dataKey="weight"/> {/* Y axis is set to the weight */}
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="weight" stroke="#8884d8" /> {/* The line for the graph is set to each entries' weight and time */}
        </LineChart>
      </ResponsiveContainer>

  </div>
  );
}

export default WeightGraph;
