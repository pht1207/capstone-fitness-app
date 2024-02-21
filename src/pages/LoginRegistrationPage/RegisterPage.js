import './RegisterPage.css'
function RegisterPage() {

  //Your code to make the site functional goes in this empty space. The 'return()' below is what renders on the page (the html)

  //Inserted by parker: https://capstone.parkert.dev/backend/login
  
  //Added by Parker to be used later. Leave this code for now.
  function handleSubmit(event){
    event.preventDefault();
    console.log("form submitted");
  }



  return (
    <div className="RegisterPage">
        <h1>This is the registration page</h1>
        <form className='RegisterForm' onSubmit={handleSubmit}>
          <h3>Registrater Here</h3>
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
