import './LoginRegisterPage.css'
import { useState } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

function LoginRegisterPage(props) {

    const [loginRegisterBoolean, setLoginRegisterBoolean] = useState(true)

  return (
    <div className="LoginRegisterPage">
        {loginRegisterBoolean ? <LoginPage loginEvent= {props.loginEvent} setLoginEvent={props.setLoginEvent} setLoginRegisterBoolean={setLoginRegisterBoolean}/> : <RegisterPage loginRegisterBoolean={loginRegisterBoolean} setLoginRegisterBoolean={setLoginRegisterBoolean}/>} {/* Sends loginevent state and method to loginpage for rerender of homepage.js upon login event */}
    </div>
  );
}

export default LoginRegisterPage;
