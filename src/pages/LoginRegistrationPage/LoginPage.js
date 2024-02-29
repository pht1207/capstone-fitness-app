import './LoginPage.css'
import axios from 'axios';

function LoginPage() {

  //Your code to make the site functional goes in this empty space. The 'return()' below is what renders on the page (the html)
  async function handleSubmit(event){
    event.preventDefault();
    console.log("form submitted");
    const body = {
      username:event.target[0].value,
      password:event.target[1].value,
    }
    const response = await axios.post("https://capstone.parkert.dev/backend/login", body, {})
    console.log(response)


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
