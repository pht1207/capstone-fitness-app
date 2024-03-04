import { useState, useContext } from 'react';
import './RegisterPage.css'
import axios from 'axios';
import {HttpPopupContext} from '../../components/HttpPopupContext';


function RegisterPage(props) {  
  const [checked, setChecked] = useState(false);
  //Used in the httpopup component
  const {message, setMessage, popupCalled, setPopupCalled} = useContext(HttpPopupContext);

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
      email:event.target[0].value,
      username:event.target[1].value,
      password:event.target[2].value,
      firstName:event.target[3].value,
      lastName:event.target[4].value,
      DOB:event.target[5].value,
      weight:event.target[6].value,
      height:event.target[7].value,
      goal:event.target[8].value,
      notificationsOn:checkValue
    }

    const response = await axios.post("https://capstone.parkert.dev/backend/register", body, {})
      console.log("code: "+response.data.code+" Message: "+response.data.message) //log the response from the server
      if(response.data.message === "Account creation successful"){
        props.setLoginRegisterBoolean(!props.loginRegisterBoolean);
      }

  }

  function handleCheckboxChange(){
    setChecked(!checked)
  }



  return (
    <div className="RegisterPage">
        <h1>This is the registration page</h1>
        <form className='RegisterForm' onSubmit={handleSubmit}>
          <h3>Register Here</h3>
          <label>Email: <input type='text'></input></label>
          <label>Your username: <input type='text'></input></label>
          <label>Your password: <input type='text'></input></label>
          <label>Your first name: <input type='text'></input></label>
          <label>Your last name: <input type='text'></input></label>
          <label>Your date of birth: <input type='date'></input></label>
          <label>Your weight: <input type='text'></input></label>
          <label>Your height: <input type='text'></input></label>
          <label>Fitness goal: 
            <select>
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
