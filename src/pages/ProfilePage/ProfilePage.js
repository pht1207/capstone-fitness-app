import './ProfilePage.css'
import './EditProfilePage.css'
import { useState } from 'react';

function ProfilePage() {
  const [editProfileClicked, setEditProfileClicked] = useState(true)
  
function editClicked(){
  //make code to toggle editprofileclicked to false or true
  setEditProfileClicked(!editProfileClicked);
}

//do ternary operator to toggle html


  return (
    editProfileClicked ? (
    <div class="ProfilePage">
      <h1>PROFILE</h1>

        <div class="UserI">
          <div><p>First Name:</p><p>placeholder</p></div>
          <div><p>Last Name:</p><p>placeholder</p></div>
        </div>

        <div class="UserI">
          <div><p>Username:</p><p>placeholder</p></div>
          <div><p>Email:</p><p>placeholder</p></div>
        </div>

        <div class="UserI">
          <div><p>Password:</p><p>placeholder</p></div>
        </div>

        <div class="UserI">
          <div><p>Height:</p><p>placeholder</p></div>
          <div><p>Weight:</p><p>placeholder</p></div>
        </div>

        <div class="UserI">
          <div><p>Goal:</p><p>placeholder</p></div>
        </div>

        <div class="UserI">
          <div><p>notifications:<label class="switch" ><input type="checkbox"/><span class="slider"></span></label></p></div>
        </div>

        <div class="UserI">
          <div><button class="button1" onClick={editClicked}>EDIT</button></div>
        </div>
      </div>
      ):(
        <div class="ProfilePage">
        <h1>UPDATE PROFILE</h1>
  
          <div class="UserI">
            <div><p>First Name:</p><input type='text' placeholder='Name'/></div>
            <div><p>Last Name:</p><input type='text' placeholder='Name'/></div>
          </div>
  
          <div class="UserI">
            <div><p>Username:</p><input type='text' placeholder='Name'/></div>
            <div><p>Email:</p><input type='text' placeholder='Name'/></div>
          </div>
  
          <div class="UserI">
            <div><p>Password:</p><input type='password' placeholder='Name'/></div>
          </div>
  
          <div class="UserI">
            <div><p>Height:</p><input type='text' placeholder='Name'/></div>
            <div><p>Weight:</p><input type='text' placeholder='Name'/></div>
          </div>
  
          <div class="UserI">
            <div><p>Goal:</p><select>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                              </select>
            </div>
          </div>
  
          <div class="UserI">
            <div><button class="button2" onClick={editClicked}>Save</button><button class="button3" onClick={editClicked}>Cancel</button></div>
          </div>
        </div>
      )
  );
}

export default ProfilePage;
