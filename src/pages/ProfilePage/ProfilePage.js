import './ProfilePage.css'
import './EditProfilePage.css'
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { HttpPopupContext } from '../../components/HttpPopupContext';
import { toInteger } from 'lodash';

function ProfilePage() {

  //Used as default case for if no data is retrieved for userData
  const emptyUserData = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    height: "",
    weight: "",
    goal: "",
    DOB: "",
    notificationsOn: ""
}
  const [userData, setData] = useState(emptyUserData);
  const token = localStorage.getItem("jwt")
  const {setResponse} = useContext(HttpPopupContext);

  //Write a state element and setstate method for each input element in your form here
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");
  const [DOB, setDOB] = useState("");
  const [notificationsOn, setNotificationsOn] = useState('');
  const [savedPassword, setsavedPassword] = useState('')

  const [feet, setFeet] = useState("")
  const [inches, setInches] = useState("")
  const [disablesave, setDisablesave] = useState(false)
  const [editProfileClicked, setEditProfileClicked] = useState(true)
  const [cancel, setCancel] = useState(false)


  async function updateProfileFormSubmit(event){
    event.preventDefault();//This prevents the page from reloading right when you submit

    if (password){
    try{      
      setsavedPassword(password)
      savePasswordto(password)
      console.log(password)
      let body = {  
        password: savedPassword
      }
      const axiosResponse = await axios.post("https://capstone.parkert.dev/backend/updatePassword", body, {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      console.log("success password")

    }
    catch(error){
      console.error("post error: ", error.response)
    }
  }
    try{
      setDisablesave(true)
      console.log(firstname, lastname, Number(notificationsOn))
      let body = {  
        email: email,
        username: username,
        firstName: firstname,
        lastName: lastname,
        DOB: DOB,
        height: (feet*12)+inches,
        notificationsOn: Number(notificationsOn)
      }
      const axiosResponse = await axios.post("https://capstone.parkert.dev/backend/updateProfile", body, {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      setResponse(axiosResponse) //used in httpopup.js
      console.log("success else")

      if (axiosResponse.status === 200){

        editClicked()
        setTimeout(() => {
        setDisablesave(false);
      }, 2000);
     }
    }
    catch(error){
      console.error("post error: ", error.response)
      setResponse(error.response) //used in httpopup.js
    }
  }

  //Combine all the state values that were updated from your form into a body element and send it via axios.post

  useEffect(() => {
    const fetchData = async () => { 
      try {
        const axiosResponse = await axios.get("https://capstone.parkert.dev/backend/getProfileData", {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
        console.log(axiosResponse.data[0])
        if(axiosResponse.data[0] !== undefined){
          setData(axiosResponse.data[0]);
        }
      }
        catch (error) {
        console.error('Error fetching data: ', error);
        setResponse(error.response) //used in httpopup.js
      }
    };
    fetchData();
    console.log(userData)
  }, []);

  function savePasswordto (savepassword){
    localStorage.setItem('savedPassword', savepassword)
  }

  useEffect(() => {
    const savedPasswordfrom = localStorage.getItem('savedPassword');
    if (savedPasswordfrom) {
      setsavedPassword(savedPasswordfrom);
    }
  }, []);

  //Used to set the variables inside profile page once userData is changed
  useEffect(()=>{
    setFirstname(userData.firstName);
    setLastname(userData.lastName);
    setUsername(userData.username);
    setEmail(userData.email);
    setPassword(userData.password)
    setHeight(userData.height);
    setWeight(userData.userWeight);
    setGoal(userData.goalName);
    setDOB(userData.DOB.substring(0,10))
    setNotificationsOn(0);
    setFeet(toInteger(height/12))
    setInches(toInteger(height%12))
  },[userData,cancel])
  

//Fuction to change from ProfilePage to UpdateProfile page when edit is clickled,  using useState to trigger a re-render that allows seeing the new data
//changes current state value(true) according to previous state

function editClicked(){
  setEditProfileClicked(!editProfileClicked);
  }

function cancelClicked(){
  editClicked()
  setCancel(!cancel)
}
//fuction to hide or show password when show is clicked, using useState to trigger a re-render that allows seeing the new data
//changes current state value(true) according to previous state

const [passwordShow, setpasswordShow] = useState(true)
function passwordShowClickled(){
  setpasswordShow(!passwordShow);
}

function notificationsSwitch(){
  setNotificationsOn(!notificationsOn)
}

function flipDate (){
  let parts = DOB.split('-')
  return parts[2]+'-'+parts[1]+'-'+parts[0]
}

  return (
    editProfileClicked ? (
    <div className="ProfilePage">
      <section>
      <h1>PROFILE</h1>
        <div className="UserI">
          <div><p>First Name:</p><p>{firstname}</p></div>
          <div><p>Last Name:</p><p>{lastname}</p></div>
        </div>

        <div className="UserI">
          <div><p>Username:</p><p>{username}</p></div>
          <div><p>Email:</p><p>{email}</p></div>
        </div>

        <div className="UserI">
          <div><p>Date of Birth:</p><p>{flipDate()}</p></div>
        </div>

        <div className="UserI">
          <div><p>Height:</p><p>{feet} feet {inches} inches</p></div>
          <div><p>Weight:</p><p>{weight} </p></div>
        </div>

        <div className="UserI">
          <div><p>Goal:</p><p>{goal}</p></div>
        </div>

        <div className="UserI">
          <div><p>Notifications:</p><p>{notificationsOn ? 'on': 'off'}</p></div>
        </div>

        <div className="UserI">
          <div><button className="button1" onClick={editClicked}>EDIT</button></div>
        </div>
        </section>
      </div>
      ):(
        <div className="ProfilePage">
        <form onSubmit={updateProfileFormSubmit}>
        <h1>UPDATE PROFILE</h1>
          <div className="UserI">
            <div><p>First Name:</p><input type='text' name='firstName'  defaultValue={firstname} onChange={(event)=>{setFirstname(event.target.value)}}/></div>
            <div><p>Last Name:</p><input type='text' name='lastName' defaultValue={lastname} onChange={(event)=>{setLastname(event.target.value)}}/></div>
          </div>
  
          <div className="UserI">
            <div><p>Username:</p><input type='text' name='username' onChange={(event)=>{setUsername(event.target.value)}} defaultValue={username}/></div>
            <div><p>Email:</p><input type='text' name='email' onChange={(event)=>{setEmail(event.target.value)}} defaultValue={email}/></div>
          </div>
  
          <div className="UserI">
            <div><p>Password:</p><input type={passwordShow?('password'):('text')} name='password' defaultValue={savedPassword} onChange={(event)=>{setPassword(event.target.value)}}/><button type='button' onClick={passwordShowClickled}>show</button></div>
            <div><p>Date of Birth:</p><input type="date" id='DOB' Value={DOB} onChange={(event)=>{setDOB(event.target.value)}}/></div>
          </div>
  
          <div className="UserI">
            <div><p>Height:</p><input type='text' name='feet' onChange={(event)=>{setFeet(event.target.value)}} defaultValue={feet}/><label>ft.</label><input type='text' name='inches' onChange={(event)=>{setInches(event.target.value)}} defaultValue={inches}/><label>in.</label></div>
            <div><p>Weight:</p><input type='text' name='Weight' onChange={(event)=>{setWeight(event.target.value)}} defaultValue={weight}/></div>
          </div>

          <div className="UserI">
            <div><p>Goal:</p><select>
                                <option value="1">Weight Loss</option>
                                <option value="2">Weight Gain</option>
                                <option value="3">Health</option>
                              </select>
            </div>
          </div>

            <div className="UserI">
             <div><p>Notifications:<label className="switch" ><input type="checkbox" checked={notificationsOn} onClick={notificationsSwitch} /><span className="slider"></span></label></p></div>
            </div>

          <div className="UserI">
            <div>
              <button className="button2" type='submit' disabled={disablesave} >Save</button>
              <button className="button3" type='button' onClick={cancelClicked}>Cancel</button></div>
          </div>
          </form>
        </div>
      )
  );
  
}

export default ProfilePage;
