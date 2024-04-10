import './ProfilePage.css'
import './EditProfilePage.css'
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { HttpPopupContext } from '../../components/HttpPopupContext';
import { toInteger } from 'lodash';

function ViewProfile(props) {

  //Used as default case for if no data is retrieved for userData
  const emptyUserData = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    height: "",
    weight: "",
    goal: "1",
    DOB: "",
    notificationsOn: false
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
  const [goal, setGoal] = useState("1");
  const [DOB, setDOB] = useState("");
  const [notificationsOn, setNotificationsOn] = useState(false);

  const [feet, setFeet] = useState("")
  const [inches, setInches] = useState("")
  const [disablesave, setDisablesave] = useState(false)
  const [cancel, setCancel] = useState(false)


  async function updateProfileFormSubmit(event){
    event.preventDefault();//This prevents the page from reloading right when you submit

    if (password){
      try{
        let body = {  
          password: password
        }
        const axiosResponse = await axios.post("https://capstone.parkert.dev/backend/updatePassword", body, {
          headers: {
            Authorization: "Bearer " + token
          }
        });
        setResponse(axiosResponse) //used in httpopup.js
      }
      catch(error){
        console.error("post error: ", error.response)
      }
  }
  try{
    setDisablesave(true)
    let body = {  
      email: email,
      username: username,
      firstName: firstname,
      lastName: lastname,
      goal:goal,
      DOB: DOB,
      height: (feet*12)+inches,
      notificationsOn: Number(notificationsOn)
    }
    console.log(body)
    const axiosResponse = await axios.post("https://capstone.parkert.dev/backend/updateProfile", body, {
      headers: {
        Authorization: "Bearer " + token
      }
    });
    setResponse(axiosResponse) //used in httpopup.js

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


  //This useEffect is used on render to get the profile data from the backend
  useEffect(() => {
    const fetchData = async () => { 
      try {
        const axiosResponse = await axios.get("https://capstone.parkert.dev/backend/getProfileData", {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
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
  props.setProfileView("edit");
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
    <div className="ProfilePage">
      <section>
      <br></br>
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
          <div className='ButtonContainerForProfileView'><button className="button2" onClick={()=>{props.setProfileView("password")}}>Change Password</button><button className="button3" onClick={()=>{props.setProfileView("edit")}}>Edit Profile</button></div>
        </div>
        </section>
      </div>
  );
}

export default ViewProfile;
