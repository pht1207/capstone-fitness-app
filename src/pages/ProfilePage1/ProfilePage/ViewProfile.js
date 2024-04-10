import './ProfilePage.css'
import './EditProfilePage.css'
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { HttpPopupContext } from '../../../components/HttpPopupContext';
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
  },[userData])
  

function flipDate (){
  let parts = DOB.split('-')
  return parts[2]+'-'+parts[1]+'-'+parts[0]
}

  return (
    <div className="ProfilePage">
      <h1>Your Profile</h1>
      <section>
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
