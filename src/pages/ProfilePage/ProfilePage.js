import './ProfilePage.css'
import './EditProfilePage.css'
import { useState, useEffect } from 'react';
import axios from 'axios';


function ProfilePage() {

  const [userData, setData] = useState(null);
  const token = localStorage.getItem("jwt")


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
        <form>
        <div className="ProfilePage">
        <h1>UPDATE PROFILE</h1>
          <div className="UserI">
            <div><p>First Name:</p><input type='text' name='firstName'  placeholder={userData ? (userData.firstName):('')}/></div>
            <div><p>Last Name:</p><input type='text' name='lastName' placeholder={userData ? (userData.lastName):('')}/></div>
          </div>
  
          <div className="UserI">
            <div><p>Username:</p><input type='text' name='username' placeholder={userData ? (userData.username):('')}/></div>
            <div><p>Email:</p><input type='text' name='email' placeholder={userData ? (userData.email):('')}/></div>
          </div>
  
          <div className="UserI">
            <div><p>Password:</p><input type={passwordShow?('password'):('text')} name='password' placeholder=''/><button type='button' onClick={passwordShowClickled}>show</button></div>
          </div>
  
          <div className="UserI">
            <div><p>Height:</p><input type='text' name='height' placeholder={userData ? (userData.height):('')}/></div>
            <div><p>Weight:</p><input type='text' name='userWeight' value={userData ? (userData.userWeight):('')}/></div>
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
              <button className="button2" type='submit' onClick={editClicked}>Save</button>
              <button className="button3" type='button' onClick={editClicked}>Cancel</button></div>
          </div>
        </div>
        </form>
      )
  );
}

export default ProfilePage;
