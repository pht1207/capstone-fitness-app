import './ProfilePage.css'
import './EditProfilePage.css'
import { useState, useEffect } from 'react';
import axios from 'axios';


function ProfilePage() {

  const [userData, setData] = useState(null);
  const token = localStorage.getItem("jwt")
  //Write a state element and setstate method for each input element in your form here
  const [firstnameInput, setFirstname] = useState()
  const [lastnameInput, setLastname] = useState()
  const [usernameInput, setUsername] = useState()
  const [emailInput, setEmail] = useState()
  const [passwordInput, setPassword] = useState()
  const [heightInput, setHeight] = useState()
  const [weightInput, setWeight] = useState()
  const [notificationsChecked, setNotificationscheck] = useState(0)
  {/*
    Using updateProfile
    It follows the same premise as getProfileData, except you use axios.post(), do not use axios.get()
    You're going to have an 'onSubmit={updateProfileFormSubmit}' attribute in your form element, I've added it already.
      -This will call profileSubmitFunction whenever your form is submitted
      -You are not submitting the form, onSubmit will just be a queue to submit a object you are going to dynamically create. This is explained further below
    You will need to create a body element to send to the backend, this will be included in your axios.post(https://.....), body, {headers}
      -The body element will be a javascript object named body that will contain data formatted like this:
            - {
                "email": "ts@gmail.com",
                "username": "test321",
                "password": "t",
                "firstName": "changed",
                "lastName": "changed",
                "DOB": "2000-12-07",
                "height": "72",
                "notificationsOn": "1"
              }
\\      -Include the 'editClicked' upon successful return code of axios updateProfile

    The proper way to do forms in react is to have an 'onChange' attribute on each of your <input> and other form elements. (This is done in LogWeight.js in the homepage folder if you need an example)
      -Each onChange should update a state variable you've made for each input element
        -Finally, when you submit, you are combining all those State's into an object named body so it can be sent when you use the axios.post method.

    Goals are updated using a different method, so ignore updating the goals right now. Only the values listed in the example object above can be sent
    
    notificationsOn can only be a 0 or 1, 0 meaning off and 1 meaning on


        
  */}
  async function updateProfileFormSubmit(event){
    event.preventDefault();//This prevents the page from reloading right when you submit
    try{
      let body = {

        
      }
      const axiosResponse = await axios.post("https://capstone.parkert.dev/backend/logWeight", body, {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      
    }
    catch(error){
      console.error("error: ", error.response)
    }
  }
  //Combine all the state values that were updated from your form into a body element and send it via axios.post

  useEffect(() => {
    const fetchData = async () => { 
      try {
        const response = await axios.get("https://capstone.parkert.dev/backend/getProfileData", {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
        setData(response.data[0]);
      }
        catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, []);

//Fuction to change from ProfilePage to UpdateProfile page when edit is clickled,  using useState to trigger a re-render that allows seeing the new data
const [editProfileClicked, setEditProfileClicked] = useState(true)
//changes current state value(true) according to previous state, since its boolean it changes between true and false
function editClicked(){
  setEditProfileClicked(!editProfileClicked);
  }
//fuction to hide or show password when show is clicked, using useState to trigger a re-render that allows seeing the new data
const [passwordShow, setpasswordShow] = useState(true)
//changes current state value(true) according to previous state
function passwordShowClickled(){
  setpasswordShow(!passwordShow);
}





  return (
    editProfileClicked ? (
    <div className="ProfilePage">
      <h1>PROFILE</h1>

        <div className="UserI">
          <div><p>First Name:</p><p>{userData ? (userData.firstName):('')}</p></div>
          <div><p>Last Name:</p><p>{userData ? (userData.lastName):('')}</p></div>
        </div>

        <div className="UserI">
          <div><p>Username:</p><p>{userData ? (userData.username):('')}</p></div>
          <div><p>Email:</p><p>{userData ? (userData.email):('')}</p></div>
        </div>

        <div className="UserI">
          <div><p>Password:</p><p>{userData ? (userData.firstName):('')}</p></div>
        </div>

        <div className="UserI">
          <div><p>Height:</p><p>{userData ? (userData.height):('')}</p></div>
          <div><p>Weight:</p><p>{userData ? (userData.userWeight):('')}</p></div>
        </div>

        <div className="UserI">
          <div><p>Goal:</p><p>{userData ? (userData.goalName):('')}</p></div>
        </div>

        <div className="UserI">
          <div><p>notifications:<label className="switch" ><input type="checkbox"/><span className="slider"></span></label></p></div>
        </div>

        <div className="UserI">
          <div><button className="button1" onClick={editClicked}>EDIT</button></div>
        </div>
      </div>
      ):(
        <div className="ProfilePage">

        <form onSubmit={updateProfileFormSubmit}>
        <h1>UPDATE PROFILE</h1>
          <div className="UserI">
            <div><p>First Name:</p><input type='text' name='firstName'  defaultValue={userData ? (userData.firstName):('')}/></div>
            <div><p>Last Name:</p><input type='text' name='lastName' defaultValue={userData ? (userData.lastName):('')}/></div>
          </div>
  
          <div className="UserI">
            <div><p>Username:</p><input type='text' name='username' defaultValue={userData ? (userData.username):('')}/></div>
            <div><p>Email:</p><input type='text' name='email' defaultValue={userData ? (userData.email):('')}/></div>
          </div>
  
          <div className="UserI">
            <div><p>Password:</p><input type={passwordShow?('password'):('text')} name='password' defaultValue=''/><button type='button' onClick={passwordShowClickled}>show</button></div>
          </div>
  
          <div className="UserI">
            <div><p>Height:</p><input type='text' name='height' defaultValue={userData ? (userData.height):('')}/></div>
            <div><p>Weight:</p><input type='text' name='userWeight' defaultValue={userData ? (userData.userWeight):('')}/></div>
          </div>
          <div className="UserI">
            <div><p>Goal:</p><select>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                              </select>
            </div>
          </div>
          <div className="UserI">
            <div>
              <button className="button2" type='submit'>Save</button>
              <button className="button3" type='button' onClick={editClicked}>Cancel</button></div>
          </div>
          </form>

        </div>
      )
  );
  
}

export default ProfilePage;
