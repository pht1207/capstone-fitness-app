import './LoginPage.css'
import RegisterPage from './RegisterPage';

function LoginPage() {

  //Your code to make the site functional goes in this empty space. The 'return()' below is what renders on the page (the html)
  



  return (
    <div className="LoginPage">
        <h1>This is the login page</h1>
        <form id="login">
            <fieldset>
                <legend>Login</legend>
                    <label>Email: </label>
                    <input type="email" name="email" placeholder="Email Address" required/>
                    {/*<!--<span id="emailError" style="color:red"></span>-->*/}<br/>
                    <label>Password: </label>
                    <input type="password" name="password" placeholder="Password" required/>
                    {/*<!--<span id="passwordError" style="color:red"></span>-->*/}<br/>
                {/*<!--How to save the user information, so they can login?-->
                <!--Forgot Password-->*/}
                {/*<!--The system shall verify if an email exists, so that it doesn't tell people that an email and password is wrong, and they have more than one email, so they don't know which one.-->*/}
                <a href="HomePage.js"><button type="submit">Login</button></a><br/>
                <fieldset>
                    <legend>Not registered to login?: </legend><br/><a href="RegisterPage.js"><button type="button" formnovalidate>Register</button></a>
                </fieldset>
            </fieldset>
        </form>
    </div>
  );
}

export default LoginPage;
