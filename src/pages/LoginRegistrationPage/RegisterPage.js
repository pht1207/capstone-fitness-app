import './RegisterPage.css'
import axios from 'axios';


function RegisterPage() {

  //Your code to make the site functional goes in this empty space. The 'return()' below is what renders on the page (the html)
  
  async function handleSubmit(event){
    event.preventDefault();
    console.log("form submitted");
    const body = {
      email:event.target[0].value,
      username:event.target[1].value,
      password:event.target[2].value,
      firstName:event.target[3].value,
      lastName:event.target[4].value,
      DOB:event.target[5].value,
      weight:event.target[6].value,
      notificationsOn:event.target[7].value
    }

    const response = await axios.post("http://192.168.1.127:5008/register", body, {
  
    })
    

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
          <label>Your date of birth: <input type='text'></input></label>
          <label>Your weight: <input type='text'></input></label>
          <label>Notifications on: <input type='text'></input></label>
          <button type='submit'>Register</button>
        </form>
    </div>
  );
}

export default RegisterPage;
