import React, { useState, useContext } from 'react';
import axios from 'axios';
import {HttpPopupContext} from '../../../components/HttpPopupContext';
import { useNavigate } from 'react-router';

function LogWeight(props) {
  const [weightInput, setWeightInput] = useState();
  const [dateLogged, setDateLogged] = useState();
  const {setResponse} = useContext(HttpPopupContext);
  
  async function weightLogSubmit(event){
    event.preventDefault();
    try{
      let body = {
        userWeight: weightInput,
        dateTimeChanged: dateLogged
      }
      const axiosResponse = await axios.post("https://capstone.parkert.dev/backend/logWeight", body, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt")
        }
      });
      setResponse(axiosResponse) //used in httpopup.js
      props.setWeightLogged(props.weightLogged+1)
    }
    catch(error){
      console.error("error: ", error.response)
      setResponse(error.response)
    }
  }

  function weightChange(event){
    setWeightInput(event.target.value);
  }
  function dateChange(event){
    setDateLogged(event.target.value);

  }


  return (
    <div className="LogWeight">
        <h3>Log Weight</h3>
        <form onSubmit={weightLogSubmit} className='LogWeightForm'>
          <label>Weight: <input className='WeightInput' type='number' onChange={weightChange}/></label>
          <label>Date Logged: <input type='date' onChange={dateChange} defaultValue={Date}></input></label>
          <button type='submit'>Submit</button>
        </form>

  </div>
  );
}

export default LogWeight;
