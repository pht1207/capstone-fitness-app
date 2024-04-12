import './ProfilePage.css'
import './EditProfilePage.css'
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { HttpPopupContext } from '../../../components/HttpPopupContext';
import { toInteger } from 'lodash';
import 'bootstrap/dist/css/bootstrap.css';
import { Form, FormGroup, Label, Input } from 'reactstrap';


function EditProfile(props) {

  //Used as default case for if no data is retrieved for userData
  const emptyUserData = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    height: "",
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
  const [height, setHeight] = useState("");
  const [goal, setGoal] = useState("1");
  const [DOB, setDOB] = useState("");
  const [notificationsOn, setNotificationsOn] = useState(false);
  const [feet, setFeet] = useState("")
  const [inches, setInches] = useState("")
  const [cancel, setCancel] = useState(false)


  async function updateProfileFormSubmit(event){
    event.preventDefault();//This prevents the page from reloading right when you submit
    try{
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
        props.setProfileView("view");
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
        console.log(axiosResponse)
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
    setHeight(userData.height);
    setGoal(goalNumberSet(userData))
    setDOB(userData.DOB.substring(0,10))
    setNotificationsOn(Number(userData.notificationsOn))
    setFeet(toInteger(height/12))
    setInches(toInteger(height%12))

    function goalNumberSet(userData){
        if(userData.goalName === "Weight Loss"){
            return("1");
        }
        else if(userData.goalName === "Weight Gain"){
            return("2");
        }
        else{
            return("3");
        }
    }
  },[userData,cancel])
  


  return (
    <div className="EditProfile">

      <form className='EditProfileColumn'>
        <h1>Update Profile</h1>
        <div className='EditProfileRow'><p>First Name:</p><input type='text' name='firstName'  defaultValue={firstname} onChange={(event)=>{setFirstname(event.target.value)}}/></div>
        <div className='EditProfileRow'><p>Last Name:</p><input type='text' name='lastName' defaultValue={lastname} onChange={(event)=>{setLastname(event.target.value)}}/></div>

        <div className='EditProfileRow'><p>Username:</p><input type='text' name='username' onChange={(event)=>{setUsername(event.target.value)}} defaultValue={username}/></div>
        <div className='EditProfileRow'><p>Email:</p><input type='text' name='email' onChange={(event)=>{setEmail(event.target.value)}} defaultValue={email}/></div>

        <div className='EditProfileRow'><p>Date of Birth:</p><input type="date" id='DOB' defaultValue={DOB} onChange={(event)=>{setDOB(event.target.value)}}/></div>

        <div className='EditProfileRow'><p>Height:</p><label className='HeightChanger'><input type='text' name='feet' onChange={(event)=>{setFeet(event.target.value)}} defaultValue={feet}/><p>ft.</p><input type='text' name='inches' onChange={(event)=>{setInches(event.target.value)}} defaultValue={inches}/><p>in.</p></label></div>

        <div className='EditProfileRow'>
            <p>Goal:</p>
            <select defaultValue={goal} onChange={(event)=>{setGoal(event.target.value)}}>
                <option value="1">Weight Loss</option>
                <option value="2">Weight Gain</option>
                <option value="3">Health</option>
            </select>
        </div>

        <div className='EditProfileRow'>
          <p>Notifications:</p>
          <label className='NotificationsSwitch'> 
            <FormGroup switch >
              <Input 
              type="switch" 
              role="switch" 
              checked={notificationsOn}
              onChange={() => setNotificationsOn(!notificationsOn)}
              />
            </FormGroup>
          </label>
        </div>

        <div className='ButtonContainerForProfileView'>
            <button type='submit' onClick={updateProfileFormSubmit}>Save</button>
            <button type='button' onClick={()=>{props.setProfileView("view")}}>Cancel</button>
      </div>      </form>
    </div>
  );
  
}

export default EditProfile;
