import React, { useEffect, useState, useContext } from 'react';
import { LineChart, XAxis, YAxis, Line, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import {HttpPopupContext} from '../../components/HttpPopupContext';





function WeightGraph(props) {

  const [axiosData, setAxiosData] = useState();
  const [dataObject, setDataObject] = useState()
  const {setResponse} = useContext(HttpPopupContext);


  useEffect(()=>{
    //Runs when the component is rendered
    getUserWeightLog();
  },[props.weightLogged])
  
  async function getUserWeightLog(){
    try{
      const axiosResponse = await axios.get("https://capstone.parkert.dev/backend/getUserWeightLog", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt")
        }
      });
      console.log(axiosResponse)
      setResponse(axiosResponse) //used in httpopup.js
      setAxiosData(axiosResponse.data.results)
    }
    catch(error){
      console.error("error: ", error.response)
      setResponse(error.response)
    }
  }



  useEffect(()=>{
    //Called when axiosData is changed, sorts through it and puts it in a data object usable by <LineChart>
    axiosDataFormatter();
  },[axiosData])

  function axiosDataFormatter(){
    setDataObject(axiosData)
  }
  
  return (
    <div className="WeightGraph">
      <h4>Weight Graph</h4>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dataObject}
          margin={{right: 20}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dateTimeChanged" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="weight" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

  </div>
  );
}

export default WeightGraph;
