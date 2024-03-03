import './LoginPage.css'
import axios from 'axios';
import { useState } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

function LoginRegisterPage(props) {

    const [loginRegisterBoolean, setLoginRegisterBoolean] = useState(true)
  
    function handleBoolean(){
        setLoginRegisterBoolean(!loginRegisterBoolean);
    }

  return (
    <div className="LoginRegisterPage">
        <h1>This is the login/register page</h1>
        {loginRegisterBoolean ? <LoginPage loginEvent= {props.loginEvent} setLoginEvent={props.setLoginEvent} /> : <RegisterPage loginRegisterBoolean={loginRegisterBoolean} setLoginRegisterBoolean={setLoginRegisterBoolean}/>} {/* Sends loginevent state and method to loginpage for rerender of homepage.js upon login event */}
        <label><button onClick={handleBoolean}>Swap between Login and Register</button></label>
    </div>
  );
}

export default LoginRegisterPage;
