import { useState, useContext } from 'react';
import './RegisterPage.css'
import axios from 'axios';
import {HttpPopupContext} from '../../components/HttpPopupContext';


function RegisterPage(props) {  
  //Used in the httpopup component
  const {response, setResponse} = useContext(HttpPopupContext);
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstname] = useState();
  const [lastName, setLastname] = useState();
  const [DOB, setDOB] = useState();
  const [checked, setChecked] = useState(false);
  const [weight, setWeight] = useState();
  const [goal, setGoal] = useState('1');
  const [height, setHeight] = useState();



  async function handleSubmit(event){
    let checkValue;
    event.preventDefault();
    if(checked === true){
      checkValue = 1;
    }
    else{
      checkValue = 0;
    }

    const body = {
      email:email,
      username:username,
      password:password,
      firstName:firstName,
      lastName:lastName,
      DOB:DOB,
      notificationsOn:checkValue,
      weight:weight,
      height:height,
      goal:goal,
      notificationsOn:checkValue
    }
    console.log(body);

    try{
      const axiosResponse = await axios.post("https://capstone.parkert.dev/backend/register", body, {})
      console.log(axiosResponse)

      setResponse(axiosResponse)
      if(axiosResponse.data.message === "Account creation successful"){
        props.setLoginRegisterBoolean(!props.loginRegisterBoolean); //sends the user to the login page
      }
    }
    catch(error){
      console.error("error: ", error.response)
      setResponse(error.response)
    }
  }



  //Used for 'notifications on' box
  function handleCheckboxChange(){
    setChecked(!checked)
  }


  return (
    <div className="RegisterPage">
        <form className='RegisterForm' onSubmit={handleSubmit}>
          <h3>Register Here</h3>
          <label>Email: <input type='text' onChange={(e)=>{setEmail(e.target.value)}}></input></label>
          <label>Your username: <input type='text' onChange={(e)=>{setUsername(e.target.value)}}></input></label>
          <label>Your password: <input type='text' onChange={(e)=>{setPassword(e.target.value)}}></input></label>
          <label>Your first name: <input type='text' onChange={(e)=>{setFirstname(e.target.value)}}></input></label>
          <label>Your last name: <input type='text' onChange={(e)=>{setLastname(e.target.value)}}></input></label>
          <label>Your date of birth: <input type='date' onChange={(e)=>{setDOB(e.target.value)}}></input></label>
          <label>Your weight (lbs): <input type='text' onChange={(e)=>{setWeight(e.target.value)}}></input></label>
          <label>Your height (inches): <input type='text' onChange={(e)=>{setHeight(e.target.value)}}></input></label>
          <label>Fitness goal: 
            <select  onChange={(e)=>{setGoal(e.target.value)}} defaultValue={goal}>
              <option value="1">Weight loss</option>
              <option value="2">Weight gain</option>
              <option value="3">Health</option>
            </select>
          </label>
          <label>Notifications on: <input type='checkbox' checked={checked} onChange={handleCheckboxChange}></input></label>

          <button type='submit'>Register</button>
        </form>
    </div>
  );
}

export default RegisterPage;
