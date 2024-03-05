import React, { useEffect, useState, useContext } from 'react';
import { LineChart, XAxis, YAxis, Line, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import {HttpPopupContext} from '../../components/HttpPopupContext';



function WeightGraph() {
  const data = [
    {
      "name": "Page A",
      "uv": 4000,
      "pv": 2400,
      "amt": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398,
      "amt": 2210
    },
    {
      "name": "Page C",
      "uv": 2000,
      "pv": 9800,
      "amt": 2290
    },
    {
      "name": "Page D",
      "uv": 2780,
      "pv": 3908,
      "amt": 2000
    },
    {
      "name": "Page E",
      "uv": 1890,
      "pv": 4800,
      "amt": 2181
    },
    {
      "name": "Page F",
      "uv": 2390,
      "pv": 3800,
      "amt": 2500
    },
    {
      "name": "Page G",
      "uv": 3490,
      "pv": 4300,
      "amt": 2100
    }
  ]
  const [axiosData, setAxiosData] = useState();
  const {response, setResponse} = useContext(HttpPopupContext);

  async function getUserWeightLog(){
    try{
      const axiosResponse = await axios.get("https://capstone.parkert.dev/backend/getUserWeightLog", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt")
        }
      });
      console.log(axiosResponse)
      setResponse(axiosResponse) //used in httpopup.js
      setAxiosData(axiosResponse.data.results.results)
      console.log(axiosData)
    }
    catch(error){
      console.error("error: ", error.response)
      setResponse(error.response)
    }
  }

  useEffect(()=>{
    getUserWeightLog();
  },[])
  
  return (
    <div class="weight_graph">
      <h4>Weight Graph</h4>
      <hr/>
      <ResponsiveContainer width={700} height="80%">
        <LineChart data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

  </div>
  );
}

export default WeightGraph;
