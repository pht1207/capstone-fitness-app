import { useState, useContext } from 'react';
import './LoginPage.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {HttpPopupContext} from '../../components/HttpPopupContext';


function LoginPage(props) {
  const navigate = useNavigate();
  const {response, setResponse} = useContext(HttpPopupContext);

  //Your code to make the site functional goes in this empty space. The 'return()' below is what renders on the page (the html)
  async function handleSubmit(event){
    event.preventDefault();
    console.log("form submitted");
    const body = {
      username:event.target[0].value,
      password:event.target[1].value,
    }
    try{
        const axiosResponse = await axios.post("https://capstone.parkert.dev/backend/login", body, {})
        setResponse(axiosResponse)
        localStorage.setItem('jwt', axiosResponse.data.accessToken);
        console.log("This is new token " + axiosResponse.data.accessToken);
        props.setLoginEvent(props.loginEvent+1) //This will re-render the homepage.js file, showing profilepage.js instead of loginregister.js
        navigate('/'); //redirects the user to the homepage upon login
    }
    catch(error){
      console.error("error: ", error.response)
      setResponse(error.response)
    }
  }



  return (
    <div className="LoginPage">
        <form className='LoginForm' onSubmit={handleSubmit}>
          <h3>Login Here</h3>
          <label>Your username: <input type='text'></input></label>
          <label>Your password: <input type='text'></input></label>
          <button type='submit'>Login</button>
          <div className='SwapToLogin'><p>Don't have an account?</p><p className='SwapLink'>Sign up</p></div>
        </form>
    </div>
  );
}

export default LoginPage;
