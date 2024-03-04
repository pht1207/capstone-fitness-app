import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import FitnessPage from './pages/FitnessPage/FitnessPage';
import HomePage from './pages/HomePage/HomePage';

import NutritionPage from './pages/NutritionPage/NutritionPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import LoginRegisterPage from './pages/LoginRegistrationPage/LoginRegister';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import HttpPopup from './components/HttpPopup';
import { HttpPopupContext } from './components/HttpPopupContext';


function App() {
  //localStorage.setItem("jwt", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNzA4NjQ5MjExLCJleHAiOjE3MTEzMjc2MTF9._umAnFpQ1Y7sNRogBEY50tTdsGTKetHgZ0QbbOmv31U")

  const [isJWTExpired, setJWTExpired] = useState(true);
  const [loginEvent, setLoginEvent] = useState(0) //loginpage.js will increment this upon login effectively re-rendering the homepage upon login, showing profilepage.js in the navigation bar rather than loginregister.js

  //These are state's used in the context api
  const [message, setMessage] = useState(false)

  //Checks if jwt is expired using the jwtDecode library
  function jwtExpiryCheck(jwt){
    try{
      const decoded = jwtDecode(jwt);
      const currentTime = Date.now()/1000;
      return decoded.exp < currentTime; //returns false if the current time is less than expiration date of jwt
    }
    catch{
      console.error("Error decoding jwt")
      return true
    }
  }

  useEffect(() =>{
    //If the user's json web token is not expired, show their profile page instead of the login/register
    const usersJWT = localStorage.getItem('jwt');
    if(jwtExpiryCheck(usersJWT))
    {
      console.log("JWT is expired")
      setJWTExpired(true);
    }
    else{
      setJWTExpired(false);
    }

  }, [])

  return (
    <HttpPopupContext.Provider value={{message, setMessage}}>
    <div className="App">
      {/*Below this text is the navigation bar. The default is the 'home page'. This page shouldn't need to be editted except to change the navigation bar. Change the 'fitnesspage.js', the 'homepage.js', etc. to change each page. */}
      <Router>
      <HttpPopup/>
            <nav className="NavigationFlexBox">
                <h1>Logo</h1>
                <Link to="/">HomePage</Link>
                <Link to="/FitnessPage">FitnessPage</Link>
                <Link to="/NutritionPage">NutritionPage</Link>
                {isJWTExpired ? <Link to="/LoginRegisterPage" >Login/Register</Link> : <Link to="/ProfilePage">ProfilePage</Link>}
            </nav>

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/FitnessPage" element={<FitnessPage />} />
                <Route path="/NutritionPage" element={<NutritionPage />} />
                <Route path="/ProfilePage" element={<ProfilePage />} />
                <Route path="/LoginRegisterPage" element={<LoginRegisterPage loginEvent= {loginEvent} setLoginEvent={setLoginEvent}/>} />
            </Routes>
        </Router>
    </div>
    </HttpPopupContext.Provider>
  );
}

export default App;
