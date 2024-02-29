import './LoginPage.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function LoginPage(props) {
  const navigate = useNavigate();

  //Your code to make the site functional goes in this empty space. The 'return()' below is what renders on the page (the html)
  async function handleSubmit(event){
    event.preventDefault();
    console.log("form submitted");
    const body = {
      username:event.target[0].value,
      password:event.target[1].value,
    }
    const response = await axios.post("https://capstone.parkert.dev/backend/login", body, {})
    if(response.data.code === 200){ //If successful, set the new json web token to localstorage
      localStorage.setItem('jwt', response.data.accessToken);
      console.log("This is new token " + response.data.accessToken);
      props.setLoginEvent(props.loginEvent+1) //This will re-render the homepage.js file, showing profilepage.js instead of loginregister.js
      navigate('/'); //redirects the user to the homepage upon login
    }
    else{ //If failed, console.log the error message
      console.log(response.data.message)
    }
  }



  return (
    <div className="LoginPage">
        <h1>This is the login page</h1>
        <form className='LoginForm' onSubmit={handleSubmit}>
          <h3>Login Here</h3>
          <label>Your username: <input type='text'></input></label>
          <label>Your password: <input type='text'></input></label>
          <button type='submit'>Login</button>
        </form>

    </div>
  );
}

export default LoginPage;
